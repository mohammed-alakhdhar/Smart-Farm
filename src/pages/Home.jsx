import React from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";

const HERO_IMG = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1600&q=80";
const FARM_IMG = "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80";
const VISITOR_IMG = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[68vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="المزرعة الذكية" className="w-full h-full" fittingType="fill" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-semibold mb-5 border border-white/20">
            <Sprout className="w-4 h-4" /> السياحة الزراعية الذكية في المدينة المنورة
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white leading-tight text-balance drop-shadow">المزرعة الذكية</h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90 leading-relaxed">حلول ذكية للمزارع وتجارب مميزة للزوار</p>
        </div>
      </section>

      {/* Choice */}
      <section className="py-16 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-center mb-2">كيف يمكننا خدمتك؟</h2>
          <p className="text-center text-muted-foreground mb-10">اختر المسار المناسب لك</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Farm / Date factories */}
            <button onClick={() => navigate("/owner")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all duration-300 overflow-hidden">
              <div className="relative h-44">
                <Image src={FARM_IMG} alt="المزارع ومصانع التمور" className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
                <div className="absolute bottom-4 right-5 text-white text-4xl">🌱</div>
              </div>
              <div className="p-7">
                <h3 className="font-heading text-2xl font-extrabold mb-2">المزارع ومصانع التمور</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">حلول ذكية تساعدك على تحسين عملياتك الزراعية والتشغيلية، والوصول إلى خدمات متخصصة حسب احتياجك.</p>
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold group-hover:gap-3 transition-all">استكشف خدمات المزارع <ArrowLeft className="w-4 h-4" /></span>
              </div>
            </button>

            {/* Visitor */}
            <button onClick={() => navigate("/explore")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all duration-300 overflow-hidden">
              <div className="relative h-44">
                <Image src={VISITOR_IMG} alt="الزائر" className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-olive/85 to-transparent" />
                <div className="absolute bottom-4 right-5 text-white text-4xl">👤</div>
              </div>
              <div className="p-7">
                <h3 className="font-heading text-2xl font-extrabold mb-2">الزائر</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">اكتشف مزارع المدينة وتجاربها، احجز زيارتك، واستمتع بتجربتك واحصد نقاطك.</p>
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-olive text-white font-bold group-hover:gap-3 transition-all">اكتشف المزارع <ArrowLeft className="w-4 h-4" /></span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          {[
            { icon: "🌱", l: "الزراعة" },
            { icon: "🌴", l: "النخيل" },
            { icon: "🍇", l: "التمور" },
            { icon: "🤖", l: "الذكاء الاصطناعي" },
            { icon: "👣", l: "التجربة" },
            { icon: "⭐", l: "النقاط" }
          ].map((x, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border shadow-card p-4">
              <div className="text-3xl mb-1">{x.icon}</div>
              <div className="text-xs font-semibold text-muted-foreground">{x.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}