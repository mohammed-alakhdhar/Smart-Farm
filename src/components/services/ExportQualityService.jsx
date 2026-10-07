import React, { useState } from "react";
import { Sparkles, Check, Award } from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function ExportQualityService() {
  const { state, subscribeService, addExportBatch } = useApp();
  const [batch, setBatch] = useState("");
  const [moisture, setMoisture] = useState("");
  const [purity, setPurity] = useState("");
  const [result, setResult] = useState(null);
  const subscribed = state.serviceSubs.includes("export");

  const analyze = () => {
    const m = parseFloat(moisture) || 0;
    const p = Math.min(100, Math.max(0, parseFloat(purity) || 0));
    const moistureScore = Math.max(0, 100 - Math.abs(m - 15) * 4);
    const score = Math.round(p * 0.6 + moistureScore * 0.4);
    const ready = score >= 80;
    const r = { batch: batch || "دفعة جديدة", moisture: m, purity: p, score, ready, date: new Date().toLocaleDateString("ar-EG") };
    setResult(r);
    addExportBatch(r);
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl">📦</div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">جودة التمور والتصدير</h2>
            <div className="text-sm opacity-85">جودة أنقى، ثقة أكبر، وتصدير أسهل</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold"><Sparkles className="w-4 h-4" /> ✨ مدعوم بالذكاء الاصطناعي</div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">اسم الدفعة</label>
            <input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="مثال: دفعة تصدير 10/2026" className="inp" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">نسبة النقاء (%)</label>
            <input type="number" min={0} max={100} value={purity} onChange={(e) => setPurity(e.target.value)} placeholder="0 - 100" className="inp" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1.5">نسبة الرطوبة (%)</label>
            <input type="number" step="0.1" value={moisture} onChange={(e) => setMoisture(e.target.value)} placeholder="المثالي حول 15%" className="inp" />
          </div>
        </div>

        <button onClick={analyze} disabled={!purity} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90">
          <Sparkles className="w-5 h-5" /> تقييم جاهزية التصدير
        </button>

        {result && (
          <div className="animate-float-up space-y-3">
            <div className={`flex items-center gap-3 rounded-2xl p-4 ${result.ready ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"}`}>
              <Award className="w-5 h-5" />
              <div>
                <div className="font-bold">{result.ready ? "جاهز للتصدير" : "بحاجة تحسين"}</div>
                <div className="text-xs opacity-80">{result.batch} · مؤشر الجودة {result.score}%</div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 space-y-2 text-sm">
              <div className="font-bold flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> تقرير الجاهزية</div>
              <Row k="الدفعة" v={result.batch} />
              <Row k="نسبة النقاء" v={`${result.purity}%`} />
              <Row k="نسبة الرطوبة" v={`${result.moisture}%`} />
              <Row k="مؤشر الجودة" v={`${result.score}%`} />
              <Row k="الحالة" v={result.ready ? "جاهز للتصدير" : "بحاجة تحسين"} />
              <Row k="التاريخ" v={result.date} />
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <button onClick={() => subscribeService("export")} disabled={subscribed} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold ${subscribed ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-accent"}`}>
            {subscribed ? <><Check className="w-5 h-5" /> مشترك في الخدمة</> : "اشترك في الخدمة"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{k}</span><span className="font-bold">{v}</span></div>;
}