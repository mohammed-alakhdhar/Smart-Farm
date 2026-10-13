import React from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, ArrowLeft, FlaskConical, Sparkles, Recycle, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useAuth } from "@/lib/AuthContext";

const HERO_IMG = "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80";
const SERVICE_IMG = "https://images.unsplash.com/photo-1604152135912-04a0cfe9a1c2?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const registerAs = (type) => {
    try { localStorage.setItem("pendingFacilityType", type); } catch (e) {}
    navigate("/register");
  };

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center"><Sprout className="w-5 h-5" /></div>
            <div className="leading-tight">
              <div className="font-heading font-extrabold text-base">المزرعة الذكية</div>
              <div className="text-[11px] text-muted-foreground">حلول ذكية للمزارعين ومصانع التمور</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">لوحة التحكم</button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-bold hover:bg-accent">
                  <LogIn className="w-4 h-4" /> تسجيل الدخول
                </button>
                <button onClick={() => navigate("/register")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
                  <UserPlus className="w-4 h-4" /> إنشاء حساب
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="المزرعة الذكية" className="w-full h-full" fittingType="fill" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight text-balance drop-shadow">نحو تمور أكثر جودة وفرص تسويق أوسع</h1>
          <p className="mt-5 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">نربط المزارعين ومصانع التمور بحلول ذكية لمعالجة التحديات، وتحسين الجودة، والاستفادة من الموارد الزراعية</p>
        </div>
      </section>

      {/* Registration cards */}
      <section className="py-14 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-center mb-2">انضم إلى المنصة</h2>
          <p className="text-center text-muted-foreground mb-8">سجّل منشأتك للوصول إلى الخدمات الذكية</p>
          <div className="grid md:grid-cols-2 gap-5">
            <button onClick={() => registerAs("مزرعة")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-7">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-3xl mb-4">🌾</div>
              <h3 className="font-heading text-xl font-extrabold mb-2">سجّل مزرعتك</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">أنشئ حسابًا لمزرعتك لتقديم طلبات معالجة متبقيات المبيدات ومتابعة حالتها والاستفادة من خدمات المنصة.</p>
              <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm">ابدأ التسجيل <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </button>
            <button onClick={() => registerAs("مصنع")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-7">
              <div className="w-14 h-14 rounded-2xl bg-olive/15 grid place-items-center text-3xl mb-4">🏭</div>
              <h3 className="font-heading text-xl font-extrabold mb-2">سجّل مصنعك</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">أنشئ حسابًا لمصنع التمور لإدارة طلبات المعالجة وتوثيق نتائج الفحوصات وتعزيز جاهزية منتجاتك للتسويق والتصدير.</p>
              <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm">ابدأ التسجيل <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </button>
          </div>
        </div>
      </section>

      {/* Main service — pesticide processing */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-lift">
            <div className="grid md:grid-cols-2">
              <div className="p-8 sm:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm font-bold mb-5">
                  <Sparkles className="w-4 h-4" /> الخدمة الرئيسية
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight mb-4">خدمة معالجة متبقيات المبيدات في التمور</h2>
                <p className="text-white/85 leading-relaxed mb-6">قدّم طلب معالجة لمحصولك، وأرفق نتائج التحاليل السابقة، وتابع حالة الطلب ونتائج الفحص بعد المعالجة.</p>
                <div className="flex items-center gap-3 mb-6 text-sm">
                  <div className="px-3 py-1.5 rounded-xl bg-white/10">سعر استرشادي: 1,500 ريال / طن</div>
                </div>
                <button onClick={() => navigate("/request-processing")} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-extrabold hover:bg-accent transition-colors">
                  <FlaskConical className="w-5 h-5" /> اطلب خدمة المعالجة
                </button>
              </div>
              <div className="relative min-h-[220px]">
                <Image src={SERVICE_IMG} alt="معالجة التمور" className="absolute inset-0 w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI assistant + waste */}
      <section className="pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-5">
          <button onClick={() => navigate("/assistant")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-7">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center mb-4"><Sparkles className="w-7 h-7 text-primary" /></div>
            <h3 className="font-heading text-xl font-extrabold mb-2">رفيق المزارع | مساعدك الزراعي الذكي</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">مساعد ذكي يجيب على أسئلتك حول قراءة تقارير التحليل والتخزين والتصدير، مع إمكانية رفع ملف للحصول على ملخص عملي.</p>
            <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm">ابدأ المحادثة <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </button>
          <button onClick={() => navigate("/waste")} className="group text-right bg-card rounded-3xl border border-border shadow-card hover:shadow-lift transition-all p-7">
            <div className="w-14 h-14 rounded-2xl bg-olive/15 grid place-items-center mb-4"><Recycle className="w-7 h-7 text-olive" /></div>
            <h3 className="font-heading text-xl font-extrabold mb-2">حوّل مخلفاتك الزراعية إلى قيمة</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">اكتشف فرص الاستفادة من مخلفات النخيل والتمور بدلًا من التخلص منها دون استفادة، وسجّل مخلفاتك للربط المحتمل.</p>
            <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm">سجّل مخلفاتك <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </button>
        </div>
      </section>

      {/* Trust note */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 grid place-items-center shrink-0"><ShieldCheck className="w-6 h-6 text-primary" /></div>
            <p className="text-sm text-muted-foreground leading-relaxed">المنصة تستقبل الطلبات وتديرها وتنسّق الخدمة مع الجهة التشغيلية والمختبر المتعاون. لا تُعرض نتائج مخبرية أو شهادات مطابقة وهمية، ولا يُدّعى تنفيذ المعالجة الفيزيائية داخل المنصة. القرار النهائي لصلاحية التصدير يعتمد على التحليل المختبري الموثق والأنظمة المعتمدة.</p>
          </div>
        </div>
      </section>
    </div>
  );
}