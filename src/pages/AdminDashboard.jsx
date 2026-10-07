import React from "react";
import { Sprout, Sparkles, Calendar, Users, Star, MapPin, Award, Footprints } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts";
import { ADMIN_STATS, ADMIN_TREND, ADMIN_POPULAR } from "@/lib/mockData";
import { StatCard } from "@/components/ui-bits";
import { useApp } from "@/lib/AppContext";

// Stylized farm distribution around Madinah (mock map)
const FARM_DOTS = [
  { top: "22%", left: "38%", size: 10 },
  { top: "30%", left: "55%", size: 14 },
  { top: "40%", left: "30%", size: 8 },
  { top: "48%", left: "62%", size: 16 },
  { top: "55%", left: "45%", size: 12 },
  { top: "62%", left: "70%", size: 9 },
  { top: "68%", left: "35%", size: 11 },
  { top: "35%", left: "72%", size: 7 },
  { top: "25%", left: "50%", size: 13 },
  { top: "58%", left: "55%", size: 10 }
];

export default function AdminDashboard() {
  const { state, setStepThreshold } = useApp();
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-2"><Sparkles className="w-4 h-4" /> لوحة الإدارة</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">لوحة تحكم المنصة</h1>
          <p className="mt-2 text-primary-foreground/85">نظرة شاملة على المزرعة الذكية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={<MapPin className="w-5 h-5" />} label="إجمالي المزارع" value={ADMIN_STATS.totalFarms.toLocaleString("ar-EG")} tone="earth" />
          <StatCard icon={<Sprout className="w-5 h-5" />} label="مزارع مسجلة" value={ADMIN_STATS.registeredFarms} tone="primary" />
          <StatCard icon={<Sparkles className="w-5 h-5" />} label="التجارب" value={ADMIN_STATS.experiences} tone="olive" />
          <StatCard icon={<Calendar className="w-5 h-5" />} label="الحجوزات" value={ADMIN_STATS.bookings.toLocaleString("ar-EG")} tone="primary" />
          <StatCard icon={<Users className="w-5 h-5" />} label="الزوار" value={ADMIN_STATS.visitors.toLocaleString("ar-EG")} tone="earth" />
          <StatCard icon={<Award className="w-5 h-5" />} label="النقاط الممنوحة" value={(ADMIN_STATS.pointsGranted / 1000000).toFixed(2) + "M"} tone="amber" />
        </div>

        {/* Map + popular */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> توزيع المزارع حول المدينة المنورة</h3>
            <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-olive/20 via-accent/40 to-earth/20 border border-border">
              {/* Stylized terrain */}
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, hsl(var(--primary)) 0, transparent 40%), radial-gradient(circle at 70% 60%, hsl(var(--olive)) 0, transparent 40%)" }} />
              {/* Madinah center marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/20 animate-pulse-ring absolute -inset-3" />
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lift relative">
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>
                <div className="mt-1.5 text-xs font-bold bg-card px-2 py-0.5 rounded-full shadow">المدينة المنورة</div>
              </div>
              {/* Farm dots */}
              {FARM_DOTS.map((d, i) => (
                <div key={i} className="absolute rounded-full bg-olive border-2 border-white shadow" style={{ top: d.top, left: d.left, width: d.size, height: d.size }} title="مزرعة" />
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary" /> المدينة</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-olive border border-white" /> مزرعة مسجلة</span>
              <span className="mr-auto">125 مزرعة نشطة</span>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">التجارب الأكثر شعبية</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ADMIN_POPULAR} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {ADMIN_POPULAR.map((_, i) => <Cell key={i} fill={`hsl(var(--chart-${(i % 5) + 1}))`} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
                <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trends */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">النمو الشهري (مزارع وزوار)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={ADMIN_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} /><stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
                <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 12 }} />
                <Area type="monotone" dataKey="farms" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" name="المزارع" />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#g2)" name="الزوار" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">الحجوزات الشهرية</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ADMIN_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
                <Bar dataKey="bookings" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} name="الحجوزات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Footprints className="w-4 h-4 text-primary" /> إعدادات النقاط</h3>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-semibold">هدف الخطوات للزيارة</div>
              <div className="text-sm text-muted-foreground">عدد الخطوات المطلوبة لمنح الزائر {(state.stepReward || 1000).toLocaleString("ar-EG")} نقطة</div>
            </div>
            <div className="flex items-center gap-2">
              <input id="threshold-input" type="number" min={1000} step={1000} defaultValue={state.stepThreshold || 20000} className="w-40 bg-secondary rounded-xl px-3 py-2.5 text-sm font-bold outline-none border border-transparent focus:border-primary" />
              <button onClick={() => setStepThreshold(document.getElementById("threshold-input").value)} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">حفظ</button>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4">معدلات تفاعل الزوار</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <Engage label="إكمال الحجز" value={82} />
            <Engage label="إكمال الزيارة" value={91} />
            <Engage label="تتبع الخطوات" value={68} />
            <Engage label="استبدال النقاط" value={54} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Engage({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm font-bold text-primary">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-l from-primary to-olive" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}