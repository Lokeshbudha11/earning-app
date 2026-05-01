import { Trophy, Coins, Briefcase, Video, ListChecks, Wallet, Gift, Users } from "lucide-react";

export type TaskCategory = "microtask" | "video" | "offerwall" | "job";

export type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  rewardPoints: number;
  durationMin: number;
  difficulty: "easy" | "medium" | "hard";
  slotsLeft: number;
  expiresIn: string;
  provider?: string;
};

export type Tx = {
  id: string;
  kind: "earn" | "withdraw" | "bonus" | "referral";
  amount: number;
  unit: "points" | "NPR";
  status: "pending" | "completed" | "failed";
  ref: string;
  at: string;
};

export type LeaderRow = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  tier: "Bronze" | "Silver" | "Gold" | "Diamond";
};

export const me = {
  id: "u_001",
  name: "Lokesh Budha",
  email: "lokesh@blaster.app",
  avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=lokesh&radius=20",
  tier: "Gold" as const,
  pointsBalance: 18420,
  cashBalance: 1842,
  conversionRate: 100, // 100 points = 1 NPR
  streak: 12,
  referralCode: "LOKESH-BLAST"
};

export const stats = [
  { label: "Total Points", value: 18420, icon: Coins, accent: "from-brand-400 to-brand-600", suffix: "" },
  { label: "Cash Balance", value: 1842, icon: Wallet, accent: "from-emerald-400 to-emerald-600", prefix: "₨ " },
  { label: "Tasks Completed", value: 137, icon: ListChecks, accent: "from-amber-400 to-amber-600" },
  { label: "Daily Streak", value: 12, icon: Trophy, accent: "from-rose-400 to-rose-600", suffix: " days" }
];

export const categories = [
  { key: "microtask", label: "Microtasks", icon: ListChecks, color: "from-brand-400 to-brand-600" },
  { key: "video", label: "Video Ads", icon: Video, color: "from-rose-400 to-rose-600" },
  { key: "offerwall", label: "Offerwall", icon: Gift, color: "from-amber-400 to-amber-600" },
  { key: "job", label: "Mini Jobs", icon: Briefcase, color: "from-emerald-400 to-emerald-600" }
] as const;

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Install & Open the Daraz app",
    description: "Install Daraz, sign up, and reach the home screen. Submit a screenshot.",
    category: "microtask",
    rewardPoints: 1500,
    durationMin: 4,
    difficulty: "easy",
    slotsLeft: 18,
    expiresIn: "2d 4h"
  },
  {
    id: "t2",
    title: "Watch a 30-second skincare ad",
    description: "Watch the full ad without skipping. Auto-credited on completion.",
    category: "video",
    rewardPoints: 50,
    durationMin: 1,
    difficulty: "easy",
    slotsLeft: 200,
    expiresIn: "12h",
    provider: "AdColony"
  },
  {
    id: "t3",
    title: "Complete the CPX Research survey",
    description: "Demographic + brand recall survey, 7-9 minutes. Postback on finish.",
    category: "offerwall",
    rewardPoints: 4200,
    durationMin: 9,
    difficulty: "medium",
    slotsLeft: 5,
    expiresIn: "1d",
    provider: "CPX Research"
  },
  {
    id: "t4",
    title: "Write a 200-word product review",
    description: "Review a Nepali e-commerce app, 200+ words, English or Nepali.",
    category: "job",
    rewardPoints: 8000,
    durationMin: 25,
    difficulty: "hard",
    slotsLeft: 3,
    expiresIn: "3d"
  },
  {
    id: "t5",
    title: "Subscribe to the Blaster YouTube channel",
    description: "Subscribe and like the latest video, send screenshot proof.",
    category: "microtask",
    rewardPoints: 800,
    durationMin: 2,
    difficulty: "easy",
    slotsLeft: 64,
    expiresIn: "5d"
  },
  {
    id: "t6",
    title: "Lootably gaming offerwall",
    description: "Play a casual game and reach level 5 within 10 minutes.",
    category: "offerwall",
    rewardPoints: 6000,
    durationMin: 12,
    difficulty: "medium",
    slotsLeft: 11,
    expiresIn: "2d",
    provider: "Lootably"
  },
  {
    id: "t7",
    title: "Translate 20 product titles to Nepali",
    description: "Quick translation gig. Spreadsheet provided. Manual review.",
    category: "job",
    rewardPoints: 5500,
    durationMin: 20,
    difficulty: "medium",
    slotsLeft: 2,
    expiresIn: "1d 12h"
  },
  {
    id: "t8",
    title: "Watch a 15-second mobile game ad",
    description: "Single video reward, daily limit 25/day.",
    category: "video",
    rewardPoints: 30,
    durationMin: 1,
    difficulty: "easy",
    slotsLeft: 999,
    expiresIn: "24h",
    provider: "Unity Ads"
  }
];

export const transactions: Tx[] = [
  { id: "x1", kind: "earn", amount: 1500, unit: "points", status: "completed", ref: "Daraz install", at: new Date(Date.now() - 12 * 60_000).toISOString() },
  { id: "x2", kind: "earn", amount: 30, unit: "points", status: "completed", ref: "Unity ad", at: new Date(Date.now() - 35 * 60_000).toISOString() },
  { id: "x3", kind: "referral", amount: 500, unit: "points", status: "completed", ref: "@aayush joined", at: new Date(Date.now() - 6 * 3600_000).toISOString() },
  { id: "x4", kind: "withdraw", amount: 1000, unit: "NPR", status: "pending", ref: "eSewa 98xxxxx12", at: new Date(Date.now() - 9 * 3600_000).toISOString() },
  { id: "x5", kind: "earn", amount: 4200, unit: "points", status: "completed", ref: "CPX survey", at: new Date(Date.now() - 26 * 3600_000).toISOString() },
  { id: "x6", kind: "bonus", amount: 250, unit: "points", status: "completed", ref: "Daily streak +12", at: new Date(Date.now() - 30 * 3600_000).toISOString() },
  { id: "x7", kind: "withdraw", amount: 2000, unit: "NPR", status: "completed", ref: "Khalti 98xxxxx88", at: new Date(Date.now() - 3 * 86400_000).toISOString() }
];

export const leaderboard: LeaderRow[] = [
  { id: "l1", name: "Aayush Tamang", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=aayush", points: 84200, streak: 41, tier: "Diamond" },
  { id: "l2", name: "Sneha Karki", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=sneha", points: 72500, streak: 33, tier: "Diamond" },
  { id: "l3", name: "Bibek Rai", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=bibek", points: 64300, streak: 22, tier: "Gold" },
  { id: "l4", name: "Pooja Sharma", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=pooja", points: 58900, streak: 19, tier: "Gold" },
  { id: "l5", name: "Lokesh Budha", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=lokesh", points: 18420, streak: 12, tier: "Gold" },
  { id: "l6", name: "Rohan Magar", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=rohan", points: 17900, streak: 9, tier: "Silver" },
  { id: "l7", name: "Anita Gurung", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=anita", points: 12100, streak: 7, tier: "Silver" },
  { id: "l8", name: "Bishal Limbu", avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=bishal", points: 9400, streak: 4, tier: "Bronze" }
];

export const referrals = {
  invited: 14,
  joined: 9,
  earnedFromRefs: 4500,
  recent: [
    { name: "@aayush", at: "2d ago", reward: 500 },
    { name: "@sneha", at: "5d ago", reward: 500 },
    { name: "@bibek", at: "1w ago", reward: 500 }
  ]
};

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Trophy },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/leaderboard", label: "Leaderboard", icon: Users },
  { href: "/profile", label: "Profile", icon: Coins }
];
