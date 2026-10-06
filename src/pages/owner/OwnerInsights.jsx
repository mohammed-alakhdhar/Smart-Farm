import React from "react";
import { Sparkles, TrendingUp, Sun, Leaf, Lightbulb } from "lucide-react";
import { OWNER_INSIGHTS } from "@/lib/mockData";

const iconMap = {
  "📈": <TrendingUp className="w-5 h-5" />,
  "🌅": <Sun className="w-5 h-5" />,
  "🌴": <Leaf className="w-5 h-5" />,
  "💡": <Lightbulb className="w-5 h-5" />
};

const toneCls = {
  up: "from-primary to-olive",
  info: "from-earth to-amber-600",
  tip: "from-amber-500 to-amber-700"
};

export default function OwnerInsights() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2"><Sparkles className="w-4 h-4" /> مدعوم بالذكاء الاصطناعي</div>
        <h1 className="font-heading text-2xl font-extrabold">رؤى الذكاء الاصطناعي</h1>
        <p className="text-muted-foreground text-sm">تحليلات وتوصيات ذكية لتحسين أداء مزرعتك</p>
      </div>

      {/* Main recommendation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary to-olive text-primary-foreground p-6 sm:p-8">
        <Sparkles className="absolute -left-6 -top-6 w-32 h-32 opacity-10" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-3"><Lightbulb className="w-4 h-4" /> 💡 توصية ذكية</div>
          <p className="font-heading text-xl sm:text-2xl font-bold leading-relaxed max-w-2xl">
            تشير بيانات الحجوزات إلى ارتفاع الطلب على التجارب العائلية في عطلة نهاية الأسبوع. ننصح بزيادة المواعيد المتاحة يومي الخميس والجمعة.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-full bg-white text-primary font-bold hover:scale-[1.02] transition-transform">تطبيق التوصية</button>
            <button className="px-5 py-2.5 rounded-full bg-white/15 text-white font-bold hover:bg-white/25">عرض التفاصيل</button>
          </div>
        </div>
      </div>

      {/* Insights grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {OWNER_INSIGHTS.map((ins) => (
          <div key={ins.id} className={`relative overflow-hidden rounded-2xl bg-gradient-to-l ${toneCls[ins.tone]} text-white p-5`}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 grid place-items-center shrink-0">{iconMap[ins.icon] || <Sparkles className="w-5 h-5" />}</div>
              <div>
                <div className="text-xs font-bold opacity-80 mb-1">رؤية ذكية</div>
                <p className="font-semibold leading-relaxed">{ins.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demand analysis */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-6">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> تحليل الطلب</h3>
        <div className="space-y-4">
          <DemandBar label="التجارب العائلية" value={78} trend="+24%" />
          <DemandBar label="تجارب الغروب" value={65} trend="+38%" />
          <DemandBar label="قطف التمور" value={88} trend="+15%" />
          <DemandBar label="الجلسات الريفية" value={52} trend="+8%" />
          <DemandBar label="تجارب التصوير" value={44} trend="+12%" />
        </div>
      </div>
    </div>
  );
}

function DemandBar({ label, value, trend }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-primary font-bold">{trend}</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-l from-primary to-olive" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}