import React, { useState } from "react";
import { Star, Award, Check, Sparkles, Lock } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { REWARDS, BADGES, EARN_RULES } from "@/lib/mockData";

export default function Rewards() {
  const { state, redeemReward } = useApp();
  const [toast, setToast] = useState(null);

  const handleRedeem = (reward) => {
    const ok = redeemReward(reward);
    setToast(ok ? { ok: true, msg: `🎉 تم استبدال: ${reward.title}` } : { ok: false, msg: "نقاطك غير كافية لهذا المكافأة" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-3"><Star className="w-4 h-4" /> نقاطي ومكافآتي</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">اجمع النقاط واحصد المكافآت</h1>
          <p className="mt-2 text-primary-foreground/85">كلما زارت وعشت تجربة، زادت نقاطك ومكافآتك</p>
          <div className="mt-6 bg-white/15 backdrop-blur rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 grid place-items-center"><Star className="w-8 h-8" /></div>
              <div>
                <div className="text-sm opacity-85">رصيدك الحالي</div>
                <div className="font-heading font-extrabold text-4xl">{state.points.toLocaleString("ar-EG")} <span className="text-lg font-medium opacity-85">نقطة</span></div>
              </div>
            </div>
            <div className="text-sm opacity-85">لقد استبدلت {state.redeemed.length} مكافأة</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* How to earn */}
        <section>
          <h2 className="font-heading font-bold text-xl mb-4">كيف تكسب النقاط؟</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EARN_RULES.map((r, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/40 grid place-items-center text-2xl">{r.icon}</div>
                <div className="flex-1">
                  <div className="font-bold">{r.title}</div>
                  <div className="text-sm text-primary font-semibold">+{r.points} نقطة</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-accent/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-2xl">👣</div>
            <div className="text-sm">مثال: <span className="font-bold">20,000 خطوة</span> = <span className="font-bold text-primary">1,000 نقطة</span> (عند إكمال هدف الزيارة)</div>
          </div>
        </section>

        {/* Rewards */}
        <section>
          <h2 className="font-heading font-bold text-xl mb-4">المكافآت المتاحة</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {REWARDS.map((r) => {
              const can = state.points >= r.cost;
              const redeemed = state.redeemed.some((x) => x.id === r.id);
              return (
                <div key={r.id} className="bg-card rounded-3xl border border-border shadow-card p-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/40 grid place-items-center text-3xl shrink-0">{r.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold">{r.title}</div>
                    <div className="text-sm text-muted-foreground">{r.desc}</div>
                    <div className="text-sm font-bold text-primary mt-1">{r.cost.toLocaleString("ar-EG")} نقطة</div>
                  </div>
                  <button
                    onClick={() => handleRedeem(r)}
                    disabled={!can}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-1.5 shrink-0 ${can ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}
                  >
                    {can ? <><Sparkles className="w-4 h-4" /> استبدال</> : <><Lock className="w-4 h-4" /> غير متاح</>}
                  </button>
                </div>
              );
            })}
          </div>
          {state.redeemed.length > 0 && (
            <div className="mt-4 bg-secondary/60 rounded-2xl p-4">
              <div className="font-bold text-sm mb-2">المكافآت المستبدلة</div>
              {state.redeemed.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1.5"><Check className="w-4 h-4 text-primary" /> {r.title}</div>
              ))}
            </div>
          )}
        </section>

        {/* Badges */}
        <section>
          <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> الأوسمة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES.map((b) => {
              const earned = state.badges.includes(b.id);
              return (
                <div key={b.id} className={`bg-card rounded-3xl border-2 p-5 text-center ${earned ? "border-primary shadow-card" : "border-border opacity-60"}`}>
                  <div className={`text-4xl mb-2 ${earned ? "" : "grayscale"}`}>{b.icon}</div>
                  <div className="font-bold text-sm">{b.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.desc}</div>
                  {earned && <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary font-bold"><Check className="w-3 h-3" /> مكتسب</div>}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl font-bold shadow-lift animate-float-up ${toast.ok ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}