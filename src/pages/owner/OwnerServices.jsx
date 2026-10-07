import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PesticideService from "@/components/services/PesticideService";
import WeevilService from "@/components/services/WeevilService";
import LaborService from "@/components/services/LaborService";

const SERVICES = [
  { id: "pesticide", emoji: "🧪", title: "متبقيات المبيدات", target: "أصحاب المزارع ومصانع التمور", problem: "الحاجة إلى متابعة نتائج الفحوصات ومخاطر متبقيات المبيدات.", solution: "خدمة ذكية لإدارة نتائج الفحوصات وتحليل المخاطر وتقديم التنبيهات والتوصيات." },
  { id: "weevil", emoji: "🪲", title: "سوسة النخيل", target: "أصحاب المزارع", problem: "صعوبة اكتشاف الإصابة في وقت مبكر.", solution: "خدمة ذكية تساعد على رصد مؤشرات الإصابة واكتشاف الحالات المشتبه بها مبكرًا." },
  { id: "labor", emoji: "👷", title: "العمالة حسب الحاجة", target: "المزارع ومصانع التمور", problem: "تفاوت احتياج المنشأة للعمالة بين فترات العمل المختلفة.", solution: "خدمة توفر عمالة منظمة حسب الحاجة باليوم أو الساعة." }
];

const COMPONENTS = { pesticide: PesticideService, weevil: WeevilService, labor: LaborService };

export default function OwnerServices() {
  const [active, setActive] = useState(null);
  const Active = active ? COMPONENTS[active] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">حلول المزرعة الذكية</h1>
        <p className="text-muted-foreground text-sm">حلول عملية وسريعة تساعد أصحاب المزارع ومصانع التمور على مواجهة التحديات اليومية.</p>
      </div>

      {!active ? (
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} className="text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-6 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-3xl mb-4">{s.emoji}</div>
              <h3 className="font-heading font-extrabold text-lg mb-1">{s.title}</h3>
              <div className="text-xs text-primary font-semibold mb-3">{s.target}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2"><span className="font-bold text-foreground">المشكلة: </span>{s.problem}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-auto pt-3"><span className="font-bold text-foreground">الحل: </span>{s.solution}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-primary font-bold text-sm">ابدأ الآن <ArrowLeft className="w-4 h-4" /></span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setActive(null)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowRight className="w-4 h-4" /> العودة للخدمات
          </button>
          <div className="max-w-2xl">
            <Active />
          </div>
        </div>
      )}
    </div>
  );
}