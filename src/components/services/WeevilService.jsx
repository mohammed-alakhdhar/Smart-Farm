import React, { useState } from "react";
import { Upload, Sparkles, AlertTriangle, ShieldCheck, Check } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { base44 } from "@/api/base44Client";

export default function WeevilService() {
  const { state, subscribeService, addWeevilAnalysis } = useApp();
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const subscribed = state.serviceSubs.includes("weevil");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setAnalyzing(true);
    try { await base44.integrations.Core.UploadPrivateFile({ file }); } catch (err) {}
    setTimeout(() => {
      const high = Math.random() > 0.5;
      const r = { level: high ? "مرتفعة" : "منخفضة", recommendation: "يوصى بإجراء فحص ميداني." };
      setResult(r);
      addWeevilAnalysis(r);
      setAnalyzing(false);
    }, 2400);
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl">🪲</div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">سوسة النخيل</h2>
            <div className="text-sm opacity-85">أصحاب المزارع</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">المشكلة: </span>صعوبة اكتشاف الإصابة في وقت مبكر.
        </div>
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">الحل: </span>خدمة ذكية تساعد على رصد مؤشرات الإصابة واكتشاف الحالات المشتبه بها مبكرًا.
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold"><Sparkles className="w-4 h-4" /> 🤖 تحليل صورة النخلة</div>

        {!preview ? (
          <label className="block cursor-pointer border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-colors">
            <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <div className="font-bold">ارفع صورة النخلة</div>
            <div className="text-xs text-muted-foreground mt-1">JPG / PNG — سيتم تحليل الصورة تجريبيًا</div>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative h-56 rounded-2xl overflow-hidden border border-border">
              <img src={preview} alt="النخلة" className="w-full h-full object-cover" />
            </div>
            {analyzing && (
              <div className="flex items-center justify-center gap-3 py-4 text-primary font-bold">
                <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                جارٍ تحليل الصورة...
              </div>
            )}
            {result && (
              <div className="animate-float-up space-y-3">
                <div className={`flex items-center gap-3 rounded-2xl p-4 ${result.level === "مرتفعة" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                  {result.level === "مرتفعة" ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                  <div className="font-bold">احتمالية الإصابة: {result.level}</div>
                </div>
                <div className="bg-secondary/60 rounded-2xl p-4 text-sm leading-relaxed">
                  <span className="font-bold">التوصية: </span>{result.recommendation}
                </div>
                <div className="text-[11px] text-amber-700 bg-amber-50 rounded-xl p-3 text-center">⚠️ هذه نتيجة تجريبية وليست تشخيصًا زراعيًا نهائيًا.</div>
              </div>
            )}
            {!analyzing && (
              <label className="block cursor-pointer text-center px-5 py-2.5 rounded-full bg-secondary font-bold text-sm hover:bg-accent">
                تحليل صورة أخرى
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <button onClick={() => subscribeService("weevil")} disabled={subscribed} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold ${subscribed ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-accent"}`}>
            {subscribed ? <><Check className="w-5 h-5" /> مشترك في الخدمة</> : "اشترك في الخدمة"}
          </button>
        </div>
      </div>
    </div>
  );
}