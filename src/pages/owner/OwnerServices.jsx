import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import PesticideService from "@/components/services/PesticideService";
import WeevilService from "@/components/services/WeevilService";
import LaborService from "@/components/services/LaborService";
import DateContaminationService from "@/components/services/DateContaminationService";
import ExportQualityService from "@/components/services/ExportQualityService";

const HERO_IMG = "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80";

const SERVICES = [
  { id: "pesticide", emoji: "🧪", title: "متبقيات المبيدات", features: ["تحليل نتائج الفحوصات المخبرية", "اكتشاف مؤشرات المخاطر", "تقديم توصيات ذكية", "تنبيهات عند وجود نتائج تحتاج إلى مراجعة"] },
  { id: "weevil", emoji: "🪲", title: "سوسة النخيل", features: ["رفع صورة النخلة", "تحليل الصورة بالذكاء الاصطناعي", "اكتشاف المؤشرات المحتملة للإصابة", "توصية بالفحص الميداني عند الحاجة"] },
  { id: "labor", emoji: "👷", title: "العمالة حسب الحاجة", features: ["طلب العمالة حسب عدد العمال", "تحديد المدة والساعات", "تحديد نوع المهارة المطلوبة", "عرض العمالة المتاحة والتكلفة التقديرية"] },
  { id: "contamination", emoji: "🍇", title: "معالجة التمور الملوثة", features: ["إدخال أو رفع نتائج الفحص", "تحديد نوع المشكلة أو التلوث", "تصنيف مستوى الخطورة", "اقتراح الإجراء المناسب وتوثيق حالة الدفعة"] },
  { id: "export", emoji: "📦", title: "جودة التمور والتصدير", features: ["متابعة جودة المنتج", "توثيق نتائج الفحوصات", "مؤشرات جودة المنتج", "تقارير جاهزية المنتج وسجل كامل للدفعات"] }
];

const COMPONENTS = { pesticide: PesticideService, weevil: WeevilService, labor: LaborService, contamination: DateContaminationService, export: ExportQualityService };

export default function OwnerServices() {
  const [active, setActive] = useState(null);
  const Active = active ? COMPONENTS[active] : null;

  return (
    <div className="space-y-8">
      {/* Hero */}
      {!active && (
        <section className="relative overflow-hidden rounded-3xl shadow-lift">
          <div className="absolute inset-0">
            <Image src={HERO_IMG} alt="المزرعة الذكية" className="w-full h-full" fittingType="fill" />
            <div className="absolute inset-0 hero-overlay" />
          </div>
          <div className="relative px-6 sm:px-10 py-14 sm:py-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-semibold mb-5 border border-white/20">
              <Sparkles className="w-4 h-4" /> ✨ مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow">🌾 المزرعة الذكية</h1>
            <p className="mt-5 text-lg sm:text-xl text-white/95 leading-relaxed">
              نحن نقدم لك حلولًا ذكية ومعالجة شاملة متكاملة للحفاظ على جودة منتجاتك، لتصل إلى المستهلك بثقة.
            </p>
            <p className="mt-3 text-2xl sm:text-3xl font-heading font-extrabold text-accent drop-shadow">مع المزرعة الذكية… منتجاتك نقية.</p>
          </div>
        </section>
      )}

      {active ? (
        <div>
          <button onClick={() => setActive(null)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowRight className="w-4 h-4" /> العودة للخدمات
          </button>
          <div className="max-w-2xl">
            <Active />
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">حلول ذكية لمزرعتك ومصنعك</h2>
            <p className="text-muted-foreground text-sm mt-1">اختر الخدمة المناسبة لتبدأ رحلتك نحو منتجات أنقى وجودة أعلى.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className="text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-6 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-3xl mb-4">{s.emoji}</div>
                <h3 className="font-heading font-extrabold text-lg mb-3">{s.title}</h3>
                <ul className="space-y-1.5 mb-4">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-0.5">✓</span>{f}</li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 text-primary font-bold text-sm">ابدأ الآن <ArrowLeft className="w-4 h-4" /></span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}