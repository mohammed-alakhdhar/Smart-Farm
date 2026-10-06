import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, ArrowLeft, Star, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { aiRecommend } from "@/lib/mockData";
import { Image } from "@/components/ui/image";
import { SectionTitle } from "@/components/ui-bits";

const companions = [
  { v: "solo", l: "فردي", icon: "🧍" },
  { v: "couple", l: "زوجان", icon: "💑" },
  { v: "family", l: "عائلة", icon: "👨‍👩‍👧" },
  { v: "friends", l: "أصدقاء", icon: "👫" }
];
const interests = ["الطبيعة", "الزراعة", "التمور", "الأنشطة العائلية", "التصوير", "الاسترخاء"];
const times = [
  { v: "morning", l: "صباحًا", icon: "🌅" },
  { v: "noon", l: "ظهرًا", icon: "☀️" },
  { v: "afternoon", l: "عصرًا", icon: "🌤️" },
  { v: "sunset", l: "غروب الشمس", icon: "🌇" }
];
const budgets = [
  { v: "lt100", l: "أقل من 100 ريال" },
  { v: "100-200", l: "100–200 ريال" },
  { v: "200-400", l: "200–400 ريال" },
  { v: "gt400", l: "أكثر من 400 ريال" }
];
const distances = [
  { v: "near", l: "قريب من المدينة" },
  { v: "30km", l: "حتى 30 كم" },
  { v: "any", l: "أي مسافة" }
];

export default function AIFinder() {
  const [companion, setCompanion] = useState("");
  const [picked, setPicked] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const toggle = (i) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const canSubmit = companion && picked.length && date && time && budget && distance;

  const submit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const recs = aiRecommend({ companion, interests: picked, time, budget, distance });
      setResults(recs);
      setLoading(false);
    }, 2200);
  };

  return (
    <div className="bg-background">
      <div className="relative overflow-hidden bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -right-10 bottom-0 w-56 h-56 rounded-full bg-white/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-4"><Sparkles className="w-4 h-4" /> رفيقك الذكي</div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold">رفيقك الذكي لاختيار التجربة</h1>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">أخبرنا عن تفضيلاتك وسنقترح لك المزرعة الأنسب بنسبة تطابق دقيقة.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-card rounded-3xl border border-border shadow-card p-6 sm:p-8">
          {/* Companion */}
          <Question step="1" title="من سيشاركك التجربة؟">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {companions.map((c) => (
                <Choice key={c.v} active={companion === c.v} onClick={() => setCompanion(c.v)}>
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <div className="text-sm font-semibold">{c.l}</div>
                </Choice>
              ))}
            </div>
          </Question>

          {/* Interests */}
          <Question step="2" title="ما الذي تهتم به؟">
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <button key={i} onClick={() => toggle(i)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${picked.includes(i) ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-accent"}`}>
                  {picked.includes(i) && <Check className="w-3.5 h-3.5 inline ml-1" />}{i}
                </button>
              ))}
            </div>
          </Question>

          {/* Date & Time */}
          <Question step="3" title="التاريخ والوقت">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">التاريخ</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none border border-transparent focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">الوقت</label>
                <div className="grid grid-cols-2 gap-2">
                  {times.map((t) => (
                    <button key={t.v} onClick={() => setTime(t.v)} className={`px-2 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 ${time === t.v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>
                      <span>{t.icon}</span>{t.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Question>

          {/* Budget */}
          <Question step="4" title="الميزانية">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {budgets.map((b) => (
                <button key={b.v} onClick={() => setBudget(b.v)} className={`px-3 py-2.5 rounded-xl text-xs font-semibold ${budget === b.v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{b.l}</button>
              ))}
            </div>
          </Question>

          {/* Distance */}
          <Question step="5" title="المسافة">
            <div className="grid grid-cols-3 gap-2">
              {distances.map((d) => (
                <button key={d.v} onClick={() => setDistance(d.v)} className={`px-3 py-2.5 rounded-xl text-xs font-semibold ${distance === d.v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{d.l}</button>
              ))}
            </div>
          </Question>

          <button
            onClick={submit}
            disabled={!canSubmit || loading}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ التحليل...</> : <><Sparkles className="w-5 h-5" /> اقترح لي تجربة</>}
          </button>
          {!canSubmit && !loading && <p className="text-center text-xs text-muted-foreground mt-3">أكمل جميع الحقول للحصول على توصية دقيقة</p>}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 bg-card rounded-3xl border border-border shadow-card p-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-ring" style={{ animationDelay: "0.3s" }} />
              <div className="absolute inset-2 rounded-full bg-primary text-primary-foreground grid place-items-center"><Brain className="w-8 h-8" /></div>
            </div>
            <h3 className="font-heading font-bold text-lg">جارٍ تحليل تفضيلاتك...</h3>
            <p className="text-muted-foreground text-sm mt-1">نطابق تفضيلاتك مع آلاف التجارب لإيجاد الأنسب لك</p>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="mt-8 animate-float-up">
            <SectionTitle center eyebrow="✨ توصيات مخصصة لك" title="توصيات مخصصة لك" subtitle="بناءً على تفضيلاتك، إليك أفضل المزارع تطابقًا" />
            <div className="space-y-5">
              {results.slice(0, 4).map((r, idx) => (
                <RecommendationCard key={r.farm.id} rec={r} rank={idx + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Question({ step, title, children }) {
  return (
    <div className="mb-6 pb-6 border-b border-border last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">{step}</span>
        <h3 className="font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Choice({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`rounded-2xl p-4 border-2 transition-all ${active ? "border-primary bg-primary/5" : "border-border bg-secondary/50 hover:border-primary/40"}`}>
      {children}
    </button>
  );
}

function RecommendationCard({ rec, rank }) {
  const { farm, score, reasons } = rec;
  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <div className="relative h-44 sm:h-full min-h-[180px]">
          <Image src={farm.image} alt={farm.name} className="w-full h-full" fittingType="fill" />
          <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white shadow-lift grid place-items-center">
            <div className="text-center leading-none">
              <div className="text-[10px] text-muted-foreground">#</div>
              <div className="font-heading font-extrabold text-sm text-primary">{rank}</div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-heading font-extrabold text-xl">🌴 {farm.name}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {farm.rating}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {farm.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {farm.duration}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">{score}%</div>
              <div className="text-[11px] text-muted-foreground">تطابق</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-l from-primary to-olive" style={{ width: `${score}%` }} />
            </div>
          </div>

          <div className="mt-3 bg-accent/30 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-earth mb-1"><Sparkles className="w-3.5 h-3.5" /> لماذا نوصي بهذه التجربة؟</div>
            <p className="text-sm text-foreground/80 leading-relaxed">{reasons.length ? "نوصي بهذه التجربة لأنها " + reasons.join("، ") + "." : "تجربة مناسبة لتفضيلاتك العامة."}</p>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="text-lg font-heading font-extrabold text-primary">{farm.price} <span className="text-sm font-medium text-muted-foreground">ريال</span></div>
            <div className="flex gap-2">
              <Link to={`/farms/${farm.id}`} className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">عرض التفاصيل</Link>
              <Link to={`/book/${farm.id}`} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">احجز الآن</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}