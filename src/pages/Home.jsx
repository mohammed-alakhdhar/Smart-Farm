import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Search, ArrowLeft, Star, MapPin, Sprout, Brain, Award, Footprints } from "lucide-react";
import { Image } from "@/components/ui/image";
import { FARMS } from "@/lib/mockData";
import FarmCard from "@/components/FarmCard";
import { SectionTitle } from "@/components/ui-bits";

const HERO_IMG = "https://images.unsplash.com/photo-1518972559570-7cc1309f3a9e?auto=format&fit=crop&w=1600&q=80";

const interests = ["الطبيعة", "التمور", "الزراعة", "الأنشطة العائلية", "التصوير", "الاسترخاء"];

export default function Home() {
  const navigate = useNavigate();
  const [expType, setExpType] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [picked, setPicked] = useState([]);

  const toggleInterest = (i) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const goAI = () => navigate("/ai-finder");

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="مزرعة نخيل" className="w-full h-full" fittingType="fill" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-semibold mb-5 border border-white/20">
              <Sprout className="w-4 h-4" /> السياحة الزراعية الذكية في المدينة المنورة
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white leading-tight text-balance drop-shadow">
              اكتشف تجارب زراعية أصيلة في المدينة المنورة
            </h1>
            <p className="mt-5 text-lg text-white/90 leading-relaxed max-w-xl">
              منصة ذكية تربطك بالمزارع وتجاربها، وتساعدك على اختيار التجربة المناسبة لك.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-primary font-bold shadow-lift hover:scale-[1.02] transition-transform">
                اكتشف المزارع <ArrowLeft className="w-4 h-4" />
              </Link>
              <button onClick={goAI} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold shadow-lift hover:scale-[1.02] transition-transform">
                <Sparkles className="w-4 h-4" /> دع الذكاء الاصطناعي يختار لك
              </button>
            </div>
          </div>

          {/* AI SEARCH BOX */}
          <div className="mt-10 max-w-3xl bg-card/95 backdrop-blur rounded-3xl p-5 sm:p-6 shadow-lift border border-white/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center"><Sparkles className="w-5 h-5" /></div>
              <div>
                <div className="font-heading font-bold">ما التجربة التي تبحث عنها؟</div>
                <div className="text-xs text-muted-foreground">أخبرنا وسنقترح لك الأنسب</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Field label="نوع التجربة">
                <select value={expType} onChange={(e) => setExpType(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
                  <option value="">الكل</option>
                  <option>جولة + قطف تمور</option>
                  <option>تجربة زراعية عائلية</option>
                  <option>جلسة ريفية</option>
                  <option>تصوير</option>
                </select>
              </Field>
              <Field label="التاريخ">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" />
              </Field>
              <Field label="عدد الأشخاص">
                <select value={people} onChange={(e) => setPeople(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
                  <option value="">الكل</option>
                  <option>1</option><option>2</option><option>3-4</option><option>+5</option>
                </select>
              </Field>
              <Field label="الميزانية">
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
                  <option value="">الكل</option>
                  <option value="lt100">أقل من 100 ريال</option>
                  <option value="100-200">100–200 ريال</option>
                  <option value="200-400">200–400 ريال</option>
                  <option value="gt400">أكثر من 400 ريال</option>
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-2">الاهتمامات</div>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button key={i} onClick={() => toggleInterest(i)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${picked.includes(i) ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-accent"}`}>{i}</button>
                ))}
              </div>
            </div>
            <button onClick={goAI} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
              <Sparkles className="w-5 h-5" /> احصل على توصيات ذكية
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle center eyebrow="كيف تعمل المنصة" title="اكتشف → الذكاء يوصي → احجز → عِش التجربة → اجمع النقاط" subtitle="رحلة سلسة من الإكتشاف إلى المكافآت، مدعومة بالذكاء الاصطناعي." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: <Search className="w-5 h-5" />, t: "اكتشف", d: "تصفّح مزارع المدينة المنورة" },
              { icon: <Brain className="w-5 h-5" />, t: "الذكاء يوصي", d: "اقتراحات مخصصة لتفضيلاتك" },
              { icon: <MapPin className="w-5 h-5" />, t: "احجز", d: "حجز فوري وسهل" },
              { icon: <Footprints className="w-5 h-5" />, t: "عِش التجربة", d: "زيارة وتتبع خطواتك" },
              { icon: <Award className="w-5 h-5" />, t: "اجمع النقاط", d: "احصل على المكافآت" }
            ].map((s, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 border border-border shadow-card text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-3">{s.icon}</div>
                <div className="font-bold mb-1">{s.t}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FARMS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <SectionTitle eyebrow="مختارة لك" title="مزارع مميزة في المدينة المنورة" />
            <Link to="/explore" className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2.5 transition-all">عرض الكل <ArrowLeft className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FARMS.slice(0, 3).map((f) => <FarmCard key={f.id} farm={f} />)}
          </div>
        </div>
      </section>

      {/* AI BANNER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary to-olive p-8 sm:p-12 text-primary-foreground">
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10" />
            <div className="relative max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-4"><Sparkles className="w-4 h-4" /> رفيقك الذكي</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">دع الذكاء الاصطناعي يختار التجربة الأنسب لك</h2>
              <p className="mt-4 text-primary-foreground/85 leading-relaxed">أخبرنا عن تفضيلاتك وسنحللها لنقترح المزرعة الأنسب بنسبة تطابق دقيقة.</p>
              <button onClick={goAI} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-bold hover:scale-[1.02] transition-transform">جرّب الآن <ArrowLeft className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: "125+", l: "مزرعة مسجلة", icon: <Sprout className="w-5 h-5" /> },
            { v: "340+", l: "تجربة زراعية", icon: <Sparkles className="w-5 h-5" /> },
            { v: "3,920", l: "زائر سعيد", icon: <MapPin className="w-5 h-5" /> },
            { v: "1.25M", l: "نقطة ممنوحة", icon: <Award className="w-5 h-5" /> }
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 border border-border shadow-card text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-primary/10 text-primary grid place-items-center mb-2">{s.icon}</div>
              <div className="text-2xl font-heading font-extrabold">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block bg-secondary/60 rounded-2xl px-3.5 py-2.5 border border-border/60 focus-within:border-primary transition-colors">
      <span className="block text-[11px] text-muted-foreground mb-0.5">{label}</span>
      {children}
    </label>
  );
}