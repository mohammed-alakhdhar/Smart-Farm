import React, { useState } from "react";
import { Sparkles, Check, FileText } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const PROBLEMS = ["تلوث بمتبقيات مبيدات", "تلوث فطري", "عدم مطابقة المواصفات", "تلوث ميكروبي"];
const SEVERITY = {
  low: { label: "خطورة منخفضة", action: "إعادة فرز وفحص عشوائي ثم إعادة تقييم الدفعة." },
  medium: { label: "خطورة متوسطة", action: "عزل الدفعة مؤقتًا، إعادة المعالجة، ثم إعادة الفحص قبل التسويق." },
  high: { label: "خطورة مرتفعة", action: "عدم التسويق، إتلاف أو إعادة تصنيع تحت إشراف، وتوثيق الحالة." }
};

export default function DateContaminationService() {
  const { state, subscribeService, addContaminationCase } = useApp();
  const [batch, setBatch] = useState("");
  const [problem, setProblem] = useState(PROBLEMS[0]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const subscribed = state.serviceSubs.includes("contamination");

  const analyze = () => {
    const v = parseFloat(value) || 0;
    let key = "low";
    if (v > 3) key = "high"; else if (v > 1) key = "medium";
    const sev = SEVERITY[key];
    const r = { batch: batch || "دفعة جديدة", problem, value: v, severity: sev.label, action: sev.action, status: "قيد المعالجة", date: new Date().toLocaleDateString("ar-EG") };
    setResult(r);
    addContaminationCase(r);
  };

  const sevIcon = result?.severity.includes("منخفضة") ? "🟢" : result?.severity.includes("متوسطة") ? "🟡" : "🔴";
  const sevCls = result?.severity.includes("منخفضة") ? "bg-primary/10 text-primary" : result?.severity.includes("متوسطة") ? "bg-amber-100 text-amber-700" : "bg-destructive/10 text-destructive";

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl">🍇</div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">معالجة التمور الملوثة</h2>
            <div className="text-sm opacity-85">مصانع التمور</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          حل ذكي يساعد مصانع التمور على التعامل مع التمور التي تظهر عليها مؤشرات تلوث أو عدم مطابقة، من خلال تحليل البيانات والنتائج وتحديد الإجراء المناسب قبل وصول المنتج إلى المستهلك.
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold"><Sparkles className="w-4 h-4" /> ✨ مدعوم بالذكاء الاصطناعي</div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">اسم الدفعة</label>
            <input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="مثال: دفعة 10/2026" className="inp" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">نوع المشكلة</label>
            <select value={problem} onChange={(e) => setProblem(e.target.value)} className="inp">
              {PROBLEMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1.5">نتيجة الفحص (مؤشر التلوث)</label>
            <input type="number" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} placeholder="أدخل نتيجة الفحص" className="inp" />
          </div>
        </div>

        <button onClick={analyze} disabled={!value} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90">
          <Sparkles className="w-5 h-5" /> تحليل وتصنيف الخطورة
        </button>

        {result && (
          <div className="animate-float-up space-y-3">
            <div className={`flex items-center gap-3 rounded-2xl p-4 ${sevCls}`}>
              <span className="text-xl">{sevIcon}</span>
              <div>
                <div className="font-bold">{result.severity}</div>
                <div className="text-xs opacity-80">{result.batch} · {result.problem}</div>
              </div>
            </div>
            <div className="bg-secondary/60 rounded-2xl p-4 text-sm leading-relaxed">
              <span className="font-bold">الإجراء المقترح: </span>{result.action}
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 space-y-2 text-sm">
              <div className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> تقرير الحالة</div>
              <Row k="الدفعة" v={result.batch} />
              <Row k="نوع المشكلة" v={result.problem} />
              <Row k="مستوى الخطورة" v={result.severity} />
              <Row k="حالة المعالجة" v={result.status} />
              <Row k="التاريخ" v={result.date} />
              <div className="text-[11px] text-muted-foreground pt-2 border-t border-border">يوصى بإعادة الفحص بعد المعالجة عند توفر النتائج. النظام مسؤول عن التحليل والتصنيف والتوصية والتوثيق ولا يجري إزالة فعلية للتلوث.</div>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <button onClick={() => subscribeService("contamination")} disabled={subscribed} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold ${subscribed ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-accent"}`}>
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