"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  Stars
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- Mountains ---------- */

function Mountains() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 30, 200, 120);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const ridge =
        Math.sin(x * 0.18) * 1.6 +
        Math.cos(x * 0.32 + 1.3) * 1.0 +
        Math.sin(x * 0.6 + 0.7) * 0.45;
      const valley = Math.cos(y * 0.4) * 0.4;
      const noise = (Math.sin(x * 1.4 + y * 0.9) + Math.cos(x * 0.7 - y * 1.2)) * 0.25;
      const height = Math.max(0, ridge + valley + noise);
      pos.setZ(i, height * (1 - Math.abs(y) / 14));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -3.8, -22]}
    >
      <meshStandardMaterial
        color="#15533F"
        emissive="#093023"
        emissiveIntensity={0.3}
        roughness={0.9}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}

/* ---------- Distant ridge silhouette ---------- */

function DistantRidge() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 18, 220, 40);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h =
        Math.sin(x * 0.12) * 2.2 +
        Math.cos(x * 0.24 + 0.4) * 1.4 +
        Math.sin(x * 0.5) * 0.6;
      pos.setZ(i, Math.max(0, h) * Math.max(0, 1 - Math.abs(y) / 9));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -2.4, -52]}
    >
      <meshStandardMaterial
        color="#0a1f1a"
        roughness={1}
        metalness={0}
        emissive="#06141C"
        emissiveIntensity={0.25}
        flatShading
      />
    </mesh>
  );
}

/* ---------- Field grid (terraces) ---------- */

function FieldGrid() {
  const ref = useRef<THREE.Mesh>(null!);
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#8DFF8A") },
        uColorB: { value: new THREE.Color("#00D1FF") },
        uColorEarth: { value: new THREE.Color("#5E3B28") }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vWorld;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        varying vec3 vWorld;
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorEarth;

        float gridLine(float v, float thickness) {
          float f = abs(fract(v) - 0.5);
          return smoothstep(0.5, 0.5 - thickness, f);
        }

        void main() {
          // depth fade away from camera (toward -z) plus radial fade
          float dist = length(vWorld.xz) / 60.0;
          float radial = smoothstep(1.0, 0.05, dist);

          float gx = gridLine(vWorld.x * 0.6, 0.06);
          float gz = gridLine(vWorld.z * 0.6, 0.06);
          float coarse = max(gx, gz) * radial;

          float fineX = gridLine(vWorld.x * 2.4, 0.025) * 0.3;
          float fineZ = gridLine(vWorld.z * 2.4, 0.025) * 0.3;
          float fine = max(fineX, fineZ) * radial;

          // pulse along z based on time
          float pulse = 0.5 + 0.5 * sin(vWorld.z * 0.4 - uTime * 1.4);
          pulse = pow(pulse, 3.0);

          vec3 col = mix(uColorEarth * 0.18, uColorA * 0.9, coarse + fine);
          col += uColorB * pulse * coarse * 0.6;

          float alpha = (coarse * 0.85 + fine * 0.45) * radial;
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(col, alpha);
        }
      `
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.5, -8]}
      material={material}
    >
      <planeGeometry args={[80, 80, 1, 1]} />
    </mesh>
  );
}

/* ---------- Particles (atmospheric) ---------- */

function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 22;
      const t = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(t) * r;
      arr[i * 3 + 1] = (Math.random() - 0.2) * 8;
      arr[i * 3 + 2] = Math.sin(t) * r - 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] += Math.sin(t + i) * 0.0015;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#B4FFB1"
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ---------- Drones ---------- */

function Drone({
  orbit = 6,
  height = 2,
  speed = 0.6,
  phase = 0,
  color = "#8DFF8A"
}: {
  orbit?: number;
  height?: number;
  speed?: number;
  phase?: number;
  color?: string;
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    group.current.position.x = Math.cos(t) * orbit;
    group.current.position.z = Math.sin(t) * orbit - 5;
    group.current.position.y = height + Math.sin(t * 1.6) * 0.25;
    group.current.rotation.y = -t + Math.PI / 2;
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#0e1614" metalness={0.6} roughness={0.3} />
      </mesh>
      {[
        [0.35, 0.08, 0.35],
        [-0.35, 0.08, 0.35],
        [0.35, 0.08, -0.35],
        [-0.35, 0.08, -0.35]
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
      <pointLight color={color} intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

/* ---------- Satellite scan beam ---------- */

function SatelliteBeam() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.25;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.18 + (Math.sin(t * 1.2) + 1) * 0.08;
  });
  return (
    <mesh ref={ref} position={[3, 6, -8]} rotation={[0, 0, -0.2]}>
      <coneGeometry args={[2.4, 8, 32, 1, true]} />
      <meshBasicMaterial
        color="#00D1FF"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Satellite() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.x = 3 + Math.sin(t * 0.2) * 0.6;
    ref.current.position.y = 6 + Math.cos(t * 0.2) * 0.3;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.4, 0.4, 0.6]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.4]} />
        <meshStandardMaterial color="#0E2A3A" emissive="#00D1FF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.4]} />
        <meshStandardMaterial color="#0E2A3A" emissive="#00D1FF" emissiveIntensity={0.4} />
      </mesh>
      <pointLight color="#00D1FF" intensity={1.2} distance={4} />
    </group>
  );
}

/* ---------- Holographic Panels (sprite-like) ---------- */

function HoloPanel({
  position,
  label,
  value,
  unit,
  color = "#8DFF8A",
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  label: string;
  value: string;
  unit?: string;
  color?: string;
  rotation?: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.08;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[2.4, 1.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[2.36, 1.16]} />
        <meshBasicMaterial color="#020a08" transparent opacity={0.85} />
      </mesh>
      {/* Top accent line */}
      <mesh position={[0, 0.55, 0.002]}>
        <planeGeometry args={[2.2, 0.02]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Bottom accent line */}
      <mesh position={[0, -0.55, 0.002]}>
        <planeGeometry args={[1.4, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      {/* Use HTML overlay handled outside via Drei Html if needed; here we use sprites of text */}
      <BillboardText
        text={label.toUpperCase()}
        size={0.09}
        position={[0, 0.32, 0.01]}
        color="#aef0c2"
      />
      <BillboardText
        text={value}
        size={0.32}
        position={[0, -0.02, 0.01]}
        color={color}
        bold
      />
      {unit && (
        <BillboardText
          text={unit}
          size={0.1}
          position={[0, -0.32, 0.01]}
          color="#7be8a0"
        />
      )}
    </group>
  );
}

/* ---------- Lightweight billboard text using canvas texture ---------- */

function BillboardText({
  text,
  size = 0.2,
  position = [0, 0, 0],
  color = "#8DFF8A",
  bold = false
}: {
  text: string;
  size?: number;
  position?: [number, number, number];
  color?: string;
  bold?: boolean;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const w = 1024;
    const h = 192;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    ctx.font = `${bold ? "700" : "500"} ${bold ? 120 : 72}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = bold ? 24 : 10;
    ctx.fillText(text, w / 2, h / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    return tex;
  }, [text, color, bold]);

  const aspect = 1024 / 192;
  return (
    <mesh position={position}>
      <planeGeometry args={[size * aspect, size]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ---------- Camera parallax ---------- */

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (1.5 + mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.4, -8);
  });
  return null;
}

/* ---------- Network connections (curves between holo points) ---------- */

function NetworkLines() {
  const lines = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-5, 1.5, -6), new THREE.Vector3(0, 2.4, -8)],
      [new THREE.Vector3(0, 2.4, -8), new THREE.Vector3(5, 1.8, -6)],
      [new THREE.Vector3(-3.5, 0.6, -4), new THREE.Vector3(3.5, 0.8, -4)],
      [new THREE.Vector3(-5, 1.5, -6), new THREE.Vector3(3.5, 0.8, -4)]
    ];
    return segs.map(([a, b]) => {
      const curve = new THREE.QuadraticBezierCurve3(
        a,
        new THREE.Vector3((a.x + b.x) / 2, Math.max(a.y, b.y) + 1.4, (a.z + b.z) / 2),
        b
      );
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#00D1FF"),
        transparent: true,
        opacity: 0.4,
        depthWrite: false
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    lines.forEach((line, i) => {
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + (Math.sin(t * 1.3 + i) + 1) * 0.18;
    });
  });

  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </group>
  );
}

/* ---------- Sun glow plane ---------- */

function SunGlow() {
  return (
    <mesh position={[0, 1.5, -50]}>
      <planeGeometry args={[60, 35]} />
      <meshBasicMaterial
        transparent
        depthWrite={false}
        opacity={0.95}
        color={"#000"}
        visible={false}
      />
    </mesh>
  );
}

/* ---------- Scene root ---------- */

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows={false}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#040404"]} />
      <fog attach="fog" args={["#040404", 12, 60]} />
      <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={55} />
      <CameraRig />

      <Suspense fallback={null}>
        {/* Cinematic key light (dawn) */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[6, 10, -10]}
          intensity={2.4}
          color="#FFD7A6"
        />
        <directionalLight
          position={[-6, 4, 5]}
          intensity={0.8}
          color="#00D1FF"
        />
        <hemisphereLight args={["#FFE3B0", "#0B3D2E", 0.8]} />

        <Stars
          radius={120}
          depth={50}
          count={2400}
          factor={3}
          saturation={0}
          fade
          speed={0.4}
        />

        <SunGlow />
        <DistantRidge />
        <Mountains />
        <FieldGrid />
        <Particles count={900} />
        <Drone orbit={5.5} height={2.4} speed={0.55} phase={0} color="#8DFF8A" />
        <Drone orbit={7.5} height={1.8} speed={-0.35} phase={1.6} color="#00D1FF" />
        <Drone orbit={9} height={3.4} speed={0.4} phase={3.4} color="#D9B86C" />

        <Satellite />
        <SatelliteBeam />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <HoloPanel
            position={[-5, 1.6, -6]}
            label="Yield Forecast"
            value="+23.7%"
            unit="vs last cycle"
            color="#8DFF8A"
            rotation={[0, 0.4, 0]}
          />
        </Float>
        <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.4}>
          <HoloPanel
            position={[5, 1.8, -6]}
            label="Soil Index"
            value="0.86"
            unit="optimal range"
            color="#00D1FF"
            rotation={[0, -0.4, 0]}
          />
        </Float>
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
          <HoloPanel
            position={[0, 2.6, -8]}
            label="Connected Farmers"
            value="248,312"
            unit="nationwide"
            color="#D9B86C"
          />
        </Float>

        <NetworkLines />

        <Environment preset="dawn" />
      </Suspense>
    </Canvas>
  );
}
