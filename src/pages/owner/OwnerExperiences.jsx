import React, { useState } from "react";
import { Plus, Clock, Users, Sparkles, Check, Wand2, Tag } from "lucide-react";
import { EXPERIENCES, FARMS, generateExperienceDescription, suggestPriceRange } from "@/lib/mockData";

export default function OwnerExperiences() {
  const [list, setList] = useState(EXPERIENCES);
  const [adding, setAdding] = useState(false);
  const [published, setPublished] = useState(false);

  // AI assistant state
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [form, setForm] = useState({ name: "", desc: "", price: "", duration: "", capacity: "", activities: "", date: "", start: "", end: "" });

  const runAI = () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiOutput(null);
    setTimeout(() => {
      const desc = generateExperienceDescription(aiInput);
      const price = suggestPriceRange(aiInput);
      setAiOutput({ desc, price });
      setForm((f) => ({ ...f, desc, name: f.name || aiInput, price: String(price.min + Math.round((price.max - price.min) / 2)) }));
      setAiLoading(false);
    }, 1600);
  };

  const submit = (e) => {
    e.preventDefault();
    const newExp = { id: "e" + Date.now(), farmId: "f1", name: form.name, price: +form.price || 100, duration: form.duration || "ساعتان", capacity: +form.capacity || 10, activities: form.activities.split("،").filter(Boolean), popular: false };
    setList([newExp, ...list]);
    setAdding(false);
    setPublished(true);
    setForm({ name: "", desc: "", price: "", duration: "", capacity: "", activities: "", date: "", start: "", end: "" });
    setAiInput(""); setAiOutput(null);
    setTimeout(() => setPublished(false), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">التجارب</h1>
          <p className="text-muted-foreground text-sm">إدارة تجاربك الزراعية</p>
        </div>
        <button onClick={() => setAdding(!adding)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90">
          <Plus className="w-4 h-4" /> إضافة تجربة
        </button>
      </div>

      {published && <div className="bg-primary text-primary-foreground rounded-2xl p-4 flex items-center gap-2 animate-float-up"><Check className="w-5 h-5" /> تم نشر التجربة بنجاح!</div>}

      {adding && (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-primary to-olive text-primary-foreground rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1"><Wand2 className="w-5 h-5" /><h3 className="font-heading font-bold">✨ مساعد المزارع الذكي</h3></div>
            <p className="text-primary-foreground/80 text-sm mb-4">أدخل فكرة التجربة وسنولّد لك وصفًا احترافيًا ونقترح السعر</p>
            <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="مثال: جولة نخيل + قطف تمر" className="w-full bg-white/15 backdrop-blur rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none placeholder:text-white/60 border border-white/20" />
            <button onClick={runAI} disabled={!aiInput.trim() || aiLoading} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary font-bold disabled:opacity-50">
              {aiLoading ? <><span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> جارٍ التوليد...</> : <><Sparkles className="w-4 h-4" /> توليد بالذكاء الاصطناعي</>}
            </button>
            {aiOutput && (
              <div className="mt-4 space-y-3 animate-float-up">
                <div className="bg-white/15 backdrop-blur rounded-xl p-3">
                  <div className="text-xs font-bold mb-1 opacity-80">الوصف المولّد:</div>
                  <p className="text-sm leading-relaxed">{aiOutput.desc}</p>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl p-3">
                  <div className="text-xs font-bold mb-1 opacity-80 flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> نطاق السعر المقترح:</div>
                  <p className="text-sm">{aiOutput.price.min} – {aiOutput.price.max} ريال</p>
                  <p className="text-xs opacity-75 mt-1">{aiOutput.price.note}</p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={submit} className="bg-card rounded-2xl border border-border shadow-card p-5 space-y-3">
            <h3 className="font-heading font-bold">بيانات التجربة</h3>
            <Field label="اسم التجربة"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="inp" /></Field>
            <Field label="الوصف"><textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="inp resize-none" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="السعر (ريال)"><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="inp" /></Field>
              <Field label="المدة"><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="ساعتان" className="inp" /></Field>
              <Field label="عدد الزوار"><input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="inp" /></Field>
              <Field label="التاريخ"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="inp" /></Field>
              <Field label="وقت البداية"><input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="inp" /></Field>
              <Field label="وقت النهاية"><input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="inp" /></Field>
            </div>
            <Field label="الأنشطة (افصل بفاصلة)"><input value={form.activities} onChange={(e) => setForm({ ...form, activities: e.target.value })} className="inp" /></Field>
            <div className="flex gap-3 pt-1">
              <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90"><Check className="w-4 h-4" /> نشر التجربة</button>
              <button type="button" onClick={() => setAdding(false)} className="px-5 py-2.5 rounded-xl border border-border font-bold hover:bg-secondary">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Experiences list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((e) => {
          const farm = FARMS.find((f) => f.id === e.farmId);
          return (
            <div key={e.id} className="bg-card rounded-2xl border border-border shadow-card p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-heading font-bold">{e.name}</h3>
                {e.popular && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold">الأكثر طلبًا</span>}
              </div>
              <div className="text-xs text-muted-foreground mb-3">{farm?.name}</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {e.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {e.capacity}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.activities.map((a) => <span key={a} className="px-2 py-0.5 rounded-full bg-accent/40 text-xs text-earth">{a}</span>)}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-heading font-extrabold text-primary">{e.price} ريال</span>
                <span className="text-xs text-muted-foreground">{e.bookings || 0} حجز</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1">{label}</span>
      {children}
    </label>
  );
}