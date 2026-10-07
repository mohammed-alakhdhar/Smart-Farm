import React, { useState } from "react";
import { Sparkles, AlertTriangle, ShieldCheck, Check } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const PESTICIDES = [
  { id: "p1", name: "كلوربيريفوس", limit: 0.5 },
  { id: "p2", name: "ديازينون", limit: 0.02 },
  { id: "p3", name: "مالاثيون", limit: 1.0 },
  { id: "p4", name: "سيبرمثرين", limit: 0.7 }
];

export default function PesticideService() {
  const { state, subscribeService, addPesticideResult } = useApp();
  const [pesticide, setPesticide] = useState(PESTICIDES[0].id);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const subscribed = state.serviceSubs.includes("pesticide");

  const analyze = () => {
    const p = PESTICIDES.find((x) => x.id === pesticide);
    const v = parseFloat(value) || 0;
    let level, cls, rec;
    if (v <= p.limit) {
      level = "ضمن الحدود الآمنة"; cls = "bg-primary/10 text-primary";
      rec = "النتيجة ضمن الحدود المسموح بها. يوصى بمتابعة الجدول الزراعي الاعتيادي.";
    } else if (v <= p.limit * 2) {
      level = "مخاطر متوسطة"; cls = "bg-amber-100 text-amber-700";
      rec = "القيمة أعلى من الحد المسموح. يوصى بإيقاف الرش مؤقتًا وإعادة الفحص بعد أسبوع.";
    } else {
      level = "مخاطر مرتفعة"; cls = "bg-destructive/10 text-destructive";
      rec = "المتبقيات تجاوزت الحد الآمن. يوصى بعدم التسويق وإعادة الفحص المخبري والتواصل مع المختص.";
    }
    const r = { pesticide: p.name, value: v, limit: p.limit, level, recommendation: rec };
    setResult(r);
    addPesticideResult(r);
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl">🧪</div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">متبقيات المبيدات</h2>
            <div className="text-sm opacity-85">أصحاب المزارع ومصانع التمور</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">المشكلة: </span>الحاجة إلى متابعة نتائج الفحوصات ومخاطر متبقيات المبيدات واتخاذ الإجراءات المناسبة.
        </div>
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">الحل: </span>خدمة ذكية تساعد على إدارة نتائج الفحوصات وتحليل المخاطر وتقديم التنبيهات والتوصيات.
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold"><Sparkles className="w-4 h-4" /> ✨ تحليل ذكي للمخاطر</div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">نوع المبيد</label>
            <select value={pesticide} onChange={(e) => setPesticide(e.target.value)} className="inp">
              {PESTICIDES.map((p) => <option key={p.id} value={p.id}>{p.name} (الحد {p.limit})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">نتيجة الفحص (ملجم/كجم)</label>
            <input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} placeholder="أدخل نتيجة الفحص" className="inp" />
          </div>
        </div>

        <button onClick={analyze} disabled={!value} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90">
          <Sparkles className="w-5 h-5" /> تحليل المخاطر
        </button>

        {result && (
          <div className="animate-float-up space-y-3">
            <div className={`flex items-center gap-3 rounded-2xl p-4 ${result.cls}`}>
              {result.level.includes("آمنة") ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              <div>
                <div className="font-bold">{result.level}</div>
                <div className="text-xs opacity-80">{result.pesticide}: {result.value} (الحد {result.limit})</div>
              </div>
            </div>
            <div className="bg-secondary/60 rounded-2xl p-4 text-sm leading-relaxed">
              <span className="font-bold">التوصية: </span>{result.recommendation}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <button onClick={() => subscribeService("pesticide")} disabled={subscribed} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold ${subscribed ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-accent"}`}>
            {subscribed ? <><Check className="w-5 h-5" /> مشترك في الخدمة</> : "اشترك في الخدمة"}
          </button>
          <p className="text-[11px] text-muted-foreground text-center mt-2">ملاحظة: النظام يحلل نتائج الفحوصات التي يدخلها المستخدم ولا يجري فحصًا مخبريًا فعليًا.</p>
        </div>
      </div>
    </div>
  );
}