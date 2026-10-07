import React from "react";
import { Calendar, Users, Wallet, Star, Gauge, ArrowUpLeft, Sparkles, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { OWNER_KPI, OWNER_BOOKINGS_CHART, OWNER_TOP_EXPERIENCES, OWNER_INSIGHTS } from "@/lib/mockData";
import { StatCard } from "@/components/ui-bits";
import { useApp } from "@/lib/AppContext";

export default function OwnerDashboard() {
  const { state } = useApp();
  const { laborRequests, pesticideResults, weevilAnalyses, contaminationCases, exportBatches } = state;

  const pesticideStatus = pesticideResults[0];
  const weevilStatus = weevilAnalyses[0];
  const contaminationStatus = contaminationCases[0];
  const exportStatus = exportBatches[0];

  const alerts = [];
  if (pesticideStatus && !pesticideStatus.level.includes("آمنة")) alerts.push({ icon: "🧪", text: "نتيجة فحص مبيدات تحتاج إلى مراجعة." });
  if (weevilStatus && weevilStatus.level === "مرتفعة") alerts.push({ icon: "🌴", text: "تحليل صورة النخلة يظهر مؤشرات تستدعي فحصًا ميدانيًا." });
  if (laborRequests.length) alerts.push({ icon: "👷", text: `لديك ${laborRequests.length} طلب عمالة نشط.` });
  if (alerts.length === 0) alerts.push({ icon: "✅", text: "كل الخدمات تعمل بسلاسة، لا توجد تنبيهات." });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">مرحبًا، أبو عبدالله 👋</h1>
        <p className="text-muted-foreground text-sm">نظرة عامة على مزرعتك وخدماتك المشتركة</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<Calendar className="w-5 h-5" />} label="الحجوزات / الطلبات" value={OWNER_KPI.bookings + laborRequests.length} tone="primary" />
        <StatCard icon={<Users className="w-5 h-5" />} label="الزوار" value={OWNER_KPI.visitors} tone="olive" />
        <StatCard icon={<Wallet className="w-5 h-5" />} label="الإيرادات" value={OWNER_KPI.revenue.toLocaleString("ar-EG")} suffix="ريال" tone="earth" />
        <StatCard icon={<Star className="w-5 h-5" />} label="التقييم" value={OWNER_KPI.rating} tone="amber" />
        <StatCard icon={<Gauge className="w-5 h-5" />} label="معدل الإشغال" value={OWNER_KPI.occupancy} suffix="%" tone="primary" />
      </div>

      {/* Service status */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ServiceStatus emoji="🧪" title="متبقيات المبيدات" status={pesticideStatus ? (pesticideStatus.level.includes("آمنة") ? "ضمن الحدود الآمنة" : "تحتاج مراجعة") : "لا توجد نتائج"} ok={pesticideStatus ? pesticideStatus.level.includes("آمنة") : null} />
        <ServiceStatus emoji="🌴" title="صحة النخيل" status={weevilStatus ? (weevilStatus.level === "مرتفعة" ? "مؤشرات تستدعي فحصًا" : "مؤشرات طبيعية") : "لم يتم التحليل"} ok={weevilStatus ? weevilStatus.level !== "مرتفعة" : null} />
        <ServiceStatus emoji="👷" title="طلبات العمالة" status={`${laborRequests.length} طلب نشط`} ok={laborRequests.length ? true : null} />
        <ServiceStatus emoji="🍇" title="حالات التمور" status={contaminationStatus ? contaminationStatus.severity : "لا توجد حالات"} ok={contaminationStatus ? contaminationStatus.severity.includes("منخفضة") : null} />
        <ServiceStatus emoji="📦" title="جودة التصدير" status={exportStatus ? (exportStatus.ready ? "جاهز للتصدير" : "بحاجة تحسين") : "لا توجد دفعات"} ok={exportStatus ? exportStatus.ready : null} />
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

      {/* Product quality & batches */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">📦 جودة المنتجات والدفعات</h3>
          {exportBatches.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center">لا توجد دفعات مسجلة</div>
          ) : (
            <div className="space-y-2.5">
              {exportBatches.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center justify-between bg-secondary/50 rounded-xl p-3 text-sm">
                  <div><div className="font-bold">{b.batch}</div><div className="text-xs text-muted-foreground">مؤشر الجودة: {b.score}%</div></div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${b.ready ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"}`}>{b.ready ? "جاهز للتصدير" : "بحاجة تحسين"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">🍇 حالات التمور</h3>
          {contaminationCases.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center">لا توجد حالات مسجلة</div>
          ) : (
            <div className="space-y-2.5">
              {contaminationCases.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-xl p-3 text-sm">
                  <div><div className="font-bold">{c.batch}</div><div className="text-xs text-muted-foreground">{c.problem} · {c.status}</div></div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.severity.includes("منخفضة") ? "bg-primary/10 text-primary" : c.severity.includes("متوسطة") ? "bg-amber-100 text-amber-700" : "bg-destructive/10 text-destructive"}`}>{c.severity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alerts + AI insights */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> التنبيهات</h3>
          <div className="space-y-2.5">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3 text-sm">
                <span className="text-xl">{a.icon}</span>
                <span>{a.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> 🤖 رؤى الذكاء الاصطناعي</h3>
          <div className="space-y-2.5">
            {OWNER_INSIGHTS.map((ins) => (
              <div key={ins.id} className="flex items-start gap-3 bg-gradient-to-l from-primary/5 to-transparent rounded-xl p-3 text-sm">
                <span className="text-xl">{ins.icon}</span>
                <span className="leading-relaxed">{ins.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceStatus({ emoji, title, status, ok }) {
  const dot = ok === null ? "bg-muted-foreground" : ok ? "bg-primary" : "bg-amber-500";
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 grid place-items-center text-2xl">{emoji}</div>
        <div>
          <div className="font-bold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">حالة الخدمة</div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <span className="text-sm font-semibold">{status}</span>
      </div>
    </div>
  );
}