import React from "react";
import { Calendar, Users, Wallet, Star, Gauge, ArrowUpLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { OWNER_KPI, OWNER_BOOKINGS_CHART, OWNER_TOP_EXPERIENCES, OWNER_PEAK_HOURS } from "@/lib/mockData";
import { StatCard } from "@/components/ui-bits";

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">مرحبًا، أبو عبدالله 👋</h1>
        <p className="text-muted-foreground text-sm">إليك نظرة عامة على أداء مزرعتك هذا الشهر</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<Calendar className="w-5 h-5" />} label="عدد الحجوزات" value={OWNER_KPI.bookings} tone="primary" />
        <StatCard icon={<Users className="w-5 h-5" />} label="الزوار" value={OWNER_KPI.visitors} tone="olive" />
        <StatCard icon={<Wallet className="w-5 h-5" />} label="الإيرادات" value={OWNER_KPI.revenue.toLocaleString("ar-EG")} suffix="ريال" tone="earth" />
        <StatCard icon={<Star className="w-5 h-5" />} label="التقييم" value={OWNER_KPI.rating} tone="amber" />
        <StatCard icon={<Gauge className="w-5 h-5" />} label="معدل الإشغال" value={OWNER_KPI.occupancy} suffix="%" tone="primary" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">الحجوزات والإيرادات خلال الأسبوع</h3>
            <span className="inline-flex items-center gap-1 text-xs text-primary font-bold"><ArrowUpLeft className="w-3.5 h-3.5" /> +18% عن الأسبوع الماضي</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={OWNER_BOOKINGS_CHART} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
              <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="الحجوزات" />
              <Bar dataKey="revenue" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4">أكثر التجارب طلبًا</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={OWNER_TOP_EXPERIENCES} dataKey="bookings" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {OWNER_TOP_EXPERIENCES.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {OWNER_TOP_EXPERIENCES.map((e) => (
              <div key={e.name} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ background: e.color }} />
                <span className="flex-1">{e.name}</span>
                <span className="font-bold">{e.bookings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <h3 className="font-bold mb-4">أوقات الذروة</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={OWNER_PEAK_HOURS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#peak)" name="الحجوزات" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}