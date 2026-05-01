import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Blaster…");

  await prisma.transaction.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    [
      { name: "Lokesh Budha", tier: "Gold", streak: 12, points: 18420, cash: 1842, refCode: "LOKESH-BLAST" },
      { name: "Aayush Tamang", tier: "Diamond", streak: 41, points: 84200, cash: 6500, refCode: "AAYUSH-X" },
      { name: "Sneha Karki", tier: "Diamond", streak: 33, points: 72500, cash: 5800, refCode: "SNEHA-7" },
      { name: "Bibek Rai", tier: "Gold", streak: 22, points: 64300, cash: 4200, refCode: "BIBEK-Q" },
      { name: "Pooja Sharma", tier: "Gold", streak: 19, points: 58900, cash: 3900, refCode: "POOJA-1" },
      { name: "Rohan Magar", tier: "Silver", streak: 9, points: 17900, cash: 1100, refCode: "ROHAN-2" },
      { name: "Anita Gurung", tier: "Silver", streak: 7, points: 12100, cash: 800, refCode: "ANITA-9" },
      { name: "Bishal Limbu", tier: "Bronze", streak: 4, points: 9400, cash: 600, refCode: "BISHAL-3" }
    ].map((u, i) =>
      prisma.user.create({
        data: {
          email: `${u.name.toLowerCase().replace(/\s+/g, ".")}@blaster.app`,
          name: u.name,
          tier: u.tier,
          streak: u.streak,
          pointsBalance: u.points,
          cashBalance: u.cash,
          referralCode: u.refCode,
          avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(u.name)}`
        }
      })
    )
  );

  const tasks = [
    {
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

  for (const t of tasks) {
    await prisma.task.create({ data: t });
  }

  const me = users[0];
  const recentTxs = [
    { amount: 1500, unit: "points", kind: "earn", status: "completed", ref: "Daraz install" },
    { amount: 30, unit: "points", kind: "earn", status: "completed", ref: "Unity ad" },
    { amount: 500, unit: "points", kind: "referral", status: "completed", ref: "@aayush joined" },
    { amount: 1000, unit: "NPR", kind: "withdraw", method: "eSewa", status: "pending", ref: "eSewa 98xxxxx12" },
    { amount: 4200, unit: "points", kind: "earn", status: "completed", ref: "CPX survey" },
    { amount: 250, unit: "points", kind: "bonus", status: "completed", ref: "Daily streak +12" },
    { amount: 2000, unit: "NPR", kind: "withdraw", method: "Khalti", status: "completed", ref: "Khalti 98xxxxx88" }
  ];
  for (const tx of recentTxs) {
    await prisma.transaction.create({ data: { ...tx, userId: me.id } });
  }

  console.log(`✓ Seeded ${users.length} users, ${tasks.length} tasks, ${recentTxs.length} transactions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
