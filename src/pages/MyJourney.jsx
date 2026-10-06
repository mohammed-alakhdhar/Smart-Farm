import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footprints, Star, Award, Play, Square, Plus, Check, MapPin, Clock, Sparkles, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { FARMS } from "@/lib/mockData";

export default function MyJourney() {
  const { state, startVisit, addSteps, completeActivity, endVisit } = useApp();
  const [simulating, setSimulating] = useState(false);
  const visit = state.activeVisit;

  const farm = visit ? FARMS.find((f) => f.id === visit.farmId) : FARMS[0];

  // simulate step increments
  useEffect(() => {
    if (!simulating || !visit) return;
    const stepsBatch = [1250, 1550, 420, 600];
    let i = 0;
    const timer = setInterval(() => {
      if (i < stepsBatch.length) {
        addSteps(stepsBatch[i]);
        i++;
      } else {
        setSimulating(false);
        clearInterval(timer);
      }
    }, 900);
    return () => clearInterval(timer);
  }, [simulating, visit]);

  const handleStart = () => startVisit(farm.id, farm.name);

  const visitDuration = visit ? "1 ساعة و42 دقيقة" : "—";

  return (
    <div className="bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-3"><Footprints className="w-4 h-4" /> رحلتي</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">رحلتك الزراعية</h1>
          <p className="mt-2 text-primary-foreground/85">تتبع زيارتك، احسب خطواتك، واجمع النقاط</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {!visit ? (
          <div className="bg-card rounded-3xl border border-border shadow-card p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4"><Play className="w-8 h-8" /></div>
            <h2 className="font-heading font-bold text-xl">ابدأ زيارتك</h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-md mx-auto">اختر المزرعة التي ستبدأ زيارتها لتتبع خطواتك واحتساب نقاطك تلقائيًا.</p>
            <div className="mt-6 max-w-sm mx-auto">
              <label className="block text-xs text-muted-foreground mb-1.5">اختر المزرعة</label>
              <select id="journey-farm" defaultValue={FARMS[0].id} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm font-semibold outline-none border border-transparent focus:border-primary">
                {FARMS.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <button
                onClick={() => { const sel = document.getElementById("journey-farm").value; const f = FARMS.find((x) => x.id === sel); startVisit(f.id, f.name); }}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90"
              >
                <Play className="w-5 h-5" /> بدء الزيارة
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="w-4 h-4 text-primary" /> يتم احتساب النقاط بعد التحقق من زيارة المزرعة.</div>
          </div>
        ) : (
          <>
            {/* Today's journey */}
            <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden mb-6">
              <div className="relative h-40">
                <img src={farm.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 right-5 left-5 text-white">
                  <div className="text-sm font-semibold opacity-90">🌱 رحلتك اليوم</div>
                  <h2 className="font-heading text-2xl font-extrabold">{visit.farmName}</h2>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {farm.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {visitDuration}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Step counter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2"><Footprints className="w-5 h-5 text-primary" /><span className="font-bold">عدد الخطوات</span></div>
                    <div className="font-heading font-extrabold text-2xl">{visit.steps.toLocaleString("ar-EG")} <span className="text-sm text-muted-foreground font-medium">خطوة</span></div>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-l from-primary to-olive transition-all duration-500" style={{ width: `${Math.min(100, (visit.steps / 5000) * 100)}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1.5">
                    <span>الهدف: 5,000 خطوة</span>
                    <span className="flex items-center gap-1 text-primary font-bold"><Star className="w-3.5 h-3.5" /> +{visit.points} نقطة</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <MiniStat icon={<Clock className="w-4 h-4" />} label="مدة الزيارة" value="1:42" />
                  <MiniStat icon={<Footprints className="w-4 h-4" />} label="الخطوات" value={visit.steps.toLocaleString("ar-EG")} />
                  <MiniStat icon={<Check className="w-4 h-4" />} label="أنشطة مكتملة" value={`${visit.activitiesDone}`} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSimulating(true)} disabled={simulating} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90">
                    {simulating ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> جارٍ الاحتساب...</> : <><Footprints className="w-5 h-5" /> احتساب الخطوات</>}
                  </button>
                  <button onClick={completeActivity} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-secondary font-bold hover:bg-accent">
                    <Plus className="w-5 h-5" /> إكمال نشاط (+50)
                  </button>
                  <button onClick={endVisit} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-border font-bold hover:bg-secondary">
                    <Square className="w-4 h-4" /> إنهاء الزيارة (+100)
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="w-4 h-4 text-primary" /> يتم احتساب النقاط بعد التحقق من زيارة المزرعة.</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-3xl border border-border shadow-card p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> الإنجازات</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: "🗺️", t: "مستكشف المزارع", e: true },
                  { icon: "🌿", t: "محب الطبيعة", e: true },
                  { icon: "🌱", t: "تجربة زراعية أولى", e: true },
                  { icon: "⭐", t: "مستكشف محترف", e: visit.steps >= 5000 }
                ].map((a, i) => (
                  <div key={i} className={`rounded-2xl p-4 text-center border-2 ${a.e ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
                    <div className="text-3xl mb-1">{a.icon}</div>
                    <div className="text-sm font-bold">{a.t}</div>
                    {a.e && <div className="text-[10px] text-primary font-semibold mt-0.5">تم الإنجاز</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Points summary */}
        <div className="mt-6 bg-gradient-to-l from-primary to-olive text-primary-foreground rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center"><Star className="w-6 h-6" /></div>
            <div>
              <div className="text-sm opacity-85">رصيدك الحالي</div>
              <div className="font-heading font-extrabold text-2xl">{state.points.toLocaleString("ar-EG")} نقطة</div>
            </div>
          </div>
          <Link to="/rewards" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary font-bold hover:scale-[1.02] transition-transform">
            <Sparkles className="w-4 h-4" /> استبدل نقاطك
          </Link>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="bg-secondary/60 rounded-2xl p-4 text-center">
      <div className="w-9 h-9 mx-auto rounded-xl bg-primary/10 text-primary grid place-items-center mb-1.5">{icon}</div>
      <div className="font-heading font-extrabold text-lg">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}