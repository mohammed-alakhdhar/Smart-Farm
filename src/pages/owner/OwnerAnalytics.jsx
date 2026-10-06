import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { OWNER_BOOKINGS_CHART, OWNER_TOP_EXPERIENCES, OWNER_PEAK_HOURS } from "@/lib/mockData";

const REVENUE_TREND = [
  { month: "يونيو", revenue: 9800, visitors: 210 },
  { month: "يوليو", revenue: 13200, visitors: 280 },
  { month: "أغسطس", revenue: 16100, visitors: 340 },
  { month: "سبتمبر", revenue: 18420, visitors: 438 }
];

export default function OwnerAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">التحليلات</h1>
        <p className="text-muted-foreground text-sm">تحليل أداء مزرعتك بالتفصيل</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="الإيرادات والزوار (شهري)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={REVENUE_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
              <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} name="الإيرادات" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="visitors" stroke="hsl(var(--chart-2))" strokeWidth={2.5} name="الزوار" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="الحجوزات حسب اليوم">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={OWNER_BOOKINGS_CHART} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
              <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="الحجوزات" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="توزيع التجارب">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={OWNER_TOP_EXPERIENCES} dataKey="bookings" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontFamily: "Tajawal", fontSize: 11 }}>
                {OWNER_TOP_EXPERIENCES.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
              <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="أوقات الذروة">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={OWNER_PEAK_HOURS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 12, fontFamily: "Tajawal" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontFamily: "Tajawal" }} />
              <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} name="الحجوزات" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5">
      <h3 className="font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}