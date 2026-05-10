import { NextResponse } from "next/server";
import { dashboardMetrics, productionData } from "@/data/site";

export async function GET() {
  // In production this could pull live values from a database or upstream service.
  return NextResponse.json({
    ts: new Date().toISOString(),
    metrics: dashboardMetrics,
    production: productionData
  });
}
