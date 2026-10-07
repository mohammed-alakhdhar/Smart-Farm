// Mock data for المزرعة الذكية platform

export const FARMS = [
  {
    id: "f1",
    name: "مزرعة نخيل المدينة",
    location: "المدينة المنورة - العوالي",
    region: "العوالي",
    rating: 4.9,
    reviews: 312,
    farmType: "مزرعة نخيل",
    experienceType: "جولة + قطف تمور",
    price: 120,
    duration: "ساعتان",
    capacity: 12,
    familyFriendly: true,
    available: true,
    area: "15 دونم",
    owner: "أبو عبدالله",
    ownerTitle: "مزارع بخبرة 20 عامًا",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "مزرعة نخيل تقليدية في قلب المدينة المنورة، تقدم تجربة أصيلة للتعرف على زراعة النخيل وقطف التمور بأنواعها المختلفة، مع جلسة ريفية بين الأشجار.",
    activities: ["جولة بين أشجار النخيل", "التعرف على طرق الزراعة", "تجربة قطف التمور", "التعرف على المنتجات المحلية", "جلسة ريفية"],
    times: ["8:00 ص", "11:00 ص", "5:00 م"],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
    tags: ["الطبيعة", "التمور", "الزراعة", "الأنشطة العائلية"],
    occupancy: 78,
    distance: "8 كم"
  },
  {
    id: "f2",
    name: "مزرعة الوادي",
    location: "المدينة المنورة - وادي العقيق",
    region: "وادي العقيق",
    rating: 4.8,
    reviews: 245,
    farmType: "مزرعة عائلية",
    experienceType: "تجربة زراعية عائلية",
    price: 150,
    duration: "3 ساعات",
    capacity: 20,
    familyFriendly: true,
    available: true,
    area: "25 دونم",
    owner: "مزارع الوادي",
    ownerTitle: "مزرعة عائلية متكاملة",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "مزرعة عائلية واسعة في وادي العقيق، تجمع بين الزراعة والطبيعة والأنشطة التفاعلية لكل أفراد العائلة، مع مساحات خضراء مفتوحة.",
    activities: ["جولة زراعية", "تجربة الزراعة", "نشاط عائلي", "جلسة ريفية", "تصوير"],
    times: ["9:00 ص", "3:00 م", "5:30 م"],
    days: ["الجمعة", "السبت", "الأحد", "الخميس"],
    tags: ["الطبيعة", "الأنشطة العائلية", "الزراعة", "الاسترخاء"],
    occupancy: 65,
    distance: "15 كم"
  },
  {
    id: "f3",
    name: "مزرعة الريف",
    location: "المدينة المنورة - قباء",
    region: "قباء",
    rating: 4.7,
    reviews: 188,
    farmType: "مزرعة عضوية",
    experienceType: "جولة زراعية + جلسة ريفية",
    price: 100,
    duration: "ساعة ونصف",
    capacity: 10,
    familyFriendly: true,
    available: true,
    area: "10 دونم",
    owner: "أم سعد",
    ownerTitle: "مزرعة عضوية معتمدة",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "مزرعة عضوية صغيرة تقدم تجربة هادئة بين المزروعات العضوية، مع جلسة ريفية وضيافة من المنتجات الطازجة.",
    activities: ["جولة زراعية", "التعرف على الزراعة العضوية", "جلسة ريفية", "تجربة المنتجات المحلية"],
    times: ["8:30 ص", "4:00 م", "6:00 م"],
    days: ["السبت", "الأحد", "الإثنين", "الجمعة"],
    tags: ["الطبيعة", "الاسترخاء", "الزراعة"],
    occupancy: 52,
    distance: "5 كم"
  },
  {
    id: "f4",
    name: "مزرعة الأصالة",
    location: "المدينة المنورة - العوالي",
    region: "العوالي",
    rating: 4.6,
    reviews: 156,
    farmType: "مزرعة نخيل",
    experienceType: "تجربة قطف التمور + تصوير",
    price: 180,
    duration: "3 ساعات",
    capacity: 15,
    familyFriendly: true,
    available: true,
    area: "20 دونم",
    owner: "أبو ماجد",
    ownerTitle: "مزرعة نخيل تراثية",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "مزرعة تراثية تجمع بين عراقة النخيل وجمال التصوير، مثالية لمحبي التصوير والتجارب الأصيلة.",
    activities: ["تجربة قطف التمور", "جلسة تصوير", "جولة بين النخيل", "ضيافة ريفية"],
    times: ["4:00 م", "5:30 م", "6:30 م"],
    days: ["الخميس", "الجمعة", "السبت"],
    tags: ["التصوير", "التمور", "الطبيعة"],
    occupancy: 60,
    distance: "12 كم"
  },
  {
    id: "f5",
    name: "مزرعة الواحة",
    location: "المدينة المنورة - وادي العقيق",
    region: "وادي العقيق",
    rating: 4.5,
    reviews: 132,
    farmType: "مزرعة مختلطة",
    experienceType: "تجربة الري + زراعة",
    price: 90,
    duration: "ساعة ونصف",
    capacity: 8,
    familyFriendly: false,
    available: true,
    area: "8 دونم",
    owner: "مزارع الواحة",
    ownerTitle: "مزرعة مختلطة",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "مزرعة مختلطة تركز على طرق الري التقليدية والحديثة، تجربة تعليمية هادئة بعيدًا عن صخب المدينة.",
    activities: ["التعرف على طرق الري", "تجربة الزراعة", "جولة زراعية"],
    times: ["7:00 ص", "9:00 ص"],
    days: ["السبت", "الأحد", "الثلاثاء"],
    tags: ["الزراعة", "الطبيعة"],
    occupancy: 40,
    distance: "20 كم"
  },
  {
    id: "f6",
    name: "مزرعة الغروب",
    location: "المدينة المنورة - قباء",
    region: "قباء",
    rating: 4.8,
    reviews: 201,
    farmType: "مزرعة نخيل",
    experienceType: "جولة غروب + جلسة ريفية",
    price: 220,
    duration: "3 ساعات",
    capacity: 18,
    familyFriendly: true,
    available: false,
    area: "18 دونم",
    owner: "أبو فيصل",
    ownerTitle: "مزرعة غروب مميزة",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "تجربة غروب فريدة بين النخيل مع جلسة ريفية وضيافة، الأكثر طلبًا في أوقات المساء.",
    activities: ["جولة غروب", "جلسة ريفية", "تجربة المنتجات المحلية", "تصوير الغروب"],
    times: ["5:00 م", "6:00 م"],
    days: ["الخميس", "الجمعة", "السبت"],
    tags: ["غروب الشمس", "الطبيعة", "الاسترخاء", "التصوير"],
    occupancy: 85,
    distance: "10 كم"
  }
];

export const EXPERIENCES = [
  { id: "e1", farmId: "f1", name: "جولة نخيل + قطف تمر", price: 120, duration: "ساعتان", capacity: 12, activities: ["جولة بين النخيل", "قطف التمور", "ضيافة"], popular: true },
  { id: "e2", farmId: "f2", name: "تجربة زراعية عائلية", price: 150, duration: "3 ساعات", capacity: 20, activities: ["زراعة", "نشاط عائلي", "جلسة ريفية"], popular: true },
  { id: "e3", farmId: "f3", name: "جولة عضوية + جلسة ريفية", price: 100, duration: "ساعة ونصف", capacity: 10, activities: ["زراعة عضوية", "جلسة ريفية"], popular: false },
  { id: "e4", farmId: "f4", name: "قطف تمور + تصوير", price: 180, duration: "3 ساعات", capacity: 15, activities: ["قطف", "تصوير", "ضيافة"], popular: true },
  { id: "e5", farmId: "f6", name: "جولة غروب + جلسة ريفية", price: 220, duration: "3 ساعات", capacity: 18, activities: ["غروب", "جلسة ريفية"], popular: true }
];

export const REGIONS = ["العوالي", "وادي العقيق", "قباء"];
export const FARM_TYPES = ["مزرعة نخيل", "مزرعة عائلية", "مزرعة عضوية", "مزرعة مختلطة"];
export const EXPERIENCE_TYPES = ["جولة + قطف تمور", "تجربة زراعية عائلية", "جولة زراعية + جلسة ريفية", "تجربة قطف التمور + تصوير", "تجربة الري + زراعة", "جولة غروب + جلسة ريفية"];

export const REWARDS = [
  { id: "r1", cost: 1000, title: "خصم 20% على زيارتك القادمة", icon: "🏷️", desc: "خصم فوري عند حجز تجربتك التالية" },
  { id: "r2", cost: 1500, title: "منتجات زراعية محلية", icon: "🥬", desc: "سلة منتجات طازجة من مزارع المدينة" },
  { id: "r3", cost: 2000, title: "تجربة زراعية مميزة", icon: "🌴", desc: "تجربة حصرية مجانية لشخصين" },
  { id: "r4", cost: 3000, title: "جولة خاصة مع المزارع", icon: "👨‍🌾", desc: "جولة مخصصة مع صاحب المزرعة" }
];

export const BADGES = [
  { id: "b1", icon: "🏅", title: "أول زيارة", desc: "أكملت أول زيارة لمزرعة", earned: true },
  { id: "b2", icon: "🌱", title: "مستكشف المزارع", desc: "زرت 3 مزارع مختلفة", earned: true },
  { id: "b3", icon: "🌴", title: "عاشق النخيل", desc: "أكملت تجربة قطف التمور", earned: true },
  { id: "b4", icon: "⭐", title: "مستكشف محترف", desc: "اجمع 5000 نقطة", earned: false }
];

export const EARN_RULES = [
  { icon: "🚶", title: "زيارة مزرعة", points: 100 },
  { icon: "✅", title: "إكمال تجربة", points: 150 },
  { icon: "👣", title: "إكمال 20,000 خطوة", points: 1000 },
  { icon: "🌾", title: "تجربة نشاط زراعي", points: 50 },
  { icon: "🗺️", title: "زيارة مزرعة جديدة", points: 80 }
];

export const OWNER_INSIGHTS = [
  { id: "i1", icon: "📈", text: "الطلب على التجارب العائلية ارتفع 24% هذا الشهر.", tone: "up" },
  { id: "i2", icon: "🌅", text: "التجارب المسائية تحقق معدل حجز أعلى بنسبة 38%.", tone: "info" },
  { id: "i3", icon: "🌴", text: "تجارب قطف التمور من أكثر التجارب طلبًا هذا الموسم.", tone: "info" },
  { id: "i4", icon: "💡", text: "ننصح بزيادة الطاقة الاستيعابية يوم الجمعة لمضاعفة الحجوزات.", tone: "tip" }
];

export const OWNER_SERVICE_INSIGHTS = [
  { icon: "🧪", text: "تم رصد نتيجة فحص تحتاج إلى مراجعة." },
  { icon: "🌴", text: "صورة النخلة المرفوعة تظهر مؤشرات تستدعي فحصًا ميدانيًا." },
  { icon: "👷", text: "من المتوقع ارتفاع احتياج العمالة نهاية الأسبوع." }
];

export const OWNER_KPI = {
  bookings: 126,
  visitors: 438,
  revenue: 18420,
  rating: 4.8,
  occupancy: 72
};

export const OWNER_BOOKINGS_CHART = [
  { day: "السبت", bookings: 14, revenue: 1680 },
  { day: "الأحد", bookings: 9, revenue: 1080 },
  { day: "الإثنين", bookings: 7, revenue: 840 },
  { day: "الثلاثاء", bookings: 8, revenue: 960 },
  { day: "الأربعاء", bookings: 11, revenue: 1320 },
  { day: "الخميس", bookings: 22, revenue: 2640 },
  { day: "الجمعة", bookings: 28, revenue: 3360 }
];

export const OWNER_TOP_EXPERIENCES = [
  { name: "جولة نخيل + قطف تمر", bookings: 54, color: "hsl(var(--chart-1))" },
  { name: "تجربة زراعية عائلية", bookings: 38, color: "hsl(var(--chart-2))" },
  { name: "قطف تمور + تصوير", bookings: 21, color: "hsl(var(--chart-3))" },
  { name: "جولة غروب", bookings: 13, color: "hsl(var(--chart-4))" }
];

export const OWNER_PEAK_HOURS = [
  { hour: "8 ص", value: 12 },
  { hour: "11 ص", value: 18 },
  { hour: "3 م", value: 24 },
  { hour: "5 م", value: 42 },
  { hour: "6 م", value: 56 }
];

export const ADMIN_STATS = {
  totalFarms: 57000,
  registeredFarms: 125,
  experiences: 340,
  bookings: 1284,
  visitors: 3920,
  pointsGranted: 1250000
};

export const ADMIN_TREND = [
  { month: "يونيو", farms: 78, visitors: 2100, bookings: 640 },
  { month: "يوليو", farms: 96, visitors: 2750, bookings: 880 },
  { month: "أغسطس", farms: 112, visitors: 3300, bookings: 1080 },
  { month: "سبتمبر", farms: 125, visitors: 3920, bookings: 1284 }
];

export const ADMIN_POPULAR = [
  { name: "قطف التمور", value: 420 },
  { name: "تجربة عائلية", value: 360 },
  { name: "جولة زراعية", value: 280 },
  { name: "جلسة ريفية", value: 224 }
];

// AI recommendation engine — scores farms against visitor preferences
export function aiRecommend(prefs) {
  const { companion, interests = [], time, budget, distance } = prefs;
  return FARMS.map((farm) => {
    let score = 50;
    const reasons = [];

    // Interests matching
    const matched = farm.tags.filter((t) => interests.includes(t));
    score += matched.length * 9;
    matched.forEach((m) => reasons.push(`اهتمامك بـ«${m}»`));

    // Budget
    const budgetMax = budget === "lt100" ? 100 : budget === "100-200" ? 200 : budget === "200-400" ? 400 : 9999;
    if (farm.price <= budgetMax) {
      score += 12;
      reasons.push("ضمن ميزانيتك");
    } else {
      score -= 8;
    }

    // Companion
    if (companion === "family" && farm.familyFriendly) {
      score += 14;
      reasons.push("مناسبة للعائلات");
    }
    if (companion === "couple" && farm.tags.includes("الاسترخاء")) {
      score += 8;
      reasons.push("أجواء هادئة للأزواج");
    }
    if (companion === "solo" && farm.capacity <= 12) {
      score += 6;
      reasons.push("تجربة حميمية مناسبة للزيارة الفردية");
    }

    // Time
    if (time === "sunset" && farm.tags.includes("غروب الشمس")) {
      score += 16;
      reasons.push("تقدم تجربة غروب مميزة");
    }
    if (time === "morning" && farm.times.some((t) => t.includes("ص"))) {
      score += 6;
    }

    // Distance (mock — all farms in Madinah)
    if (distance === "near") {
      score += 4;
    }

    score = Math.min(99, Math.max(40, Math.round(score)));
    return { farm, score, reasons: reasons.slice(0, 3) };
  }).sort((a, b) => b.score - a.score);
}

// AI description generator for farm owners (mock LLM)
export function generateExperienceDescription(input) {
  const base = input.trim();
  const templates = [
    `انغمس في تجربة ${base} الفريدة وسط أشجار النخيل في المدينة المنورة. تجربة أصيلة تجمع بين التعلم والمتعة، حيث يرافقك مزارعون بخبرة طويلة لتعيش يومًا في قلب الطبيعة.`,
    `عِش ${base} بطريقة مختلفة — جولة تفاعلية بين المزروعات، مع فرصة للمشاركة العملية والاستمتاع بضيافة ريفية من المنتجات الطازجة. مثالية للعائلات ومحبي الطبيعة.`,
    `اكتشف سحر ${base} في أجواء هادئة وريفية. تجربة تعليمية وترفيهية تناسب جميع الأعمار، مع جلسة تصوير وضيافة من المنتجات المحلية.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

export function suggestPriceRange(input) {
  const has = (k) => input.includes(k);
  if (has("عائل") || has("عائلة")) return { min: 130, max: 200, note: "التجارب العائلية تتراوح عادة بين 130 و200 ريال." };
  if (has("تصوير") || has("غروب")) return { min: 180, max: 260, note: "تجارب التصوير والغروب تتميز بسعر أعلى." };
  return { min: 90, max: 160, note: "نطاق مناسب للتجارب الزراعية القياسية." };
}