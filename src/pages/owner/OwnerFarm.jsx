import React, { useState } from "react";
import { Sprout, MapPin, Star, Clock, Users, Plus, Check, Image as ImageIcon } from "lucide-react";
import { FARMS, REGIONS, FARM_TYPES } from "@/lib/mockData";

export default function OwnerFarm() {
  const [farm, setFarm] = useState(FARMS[0]);
  const [adding, setAdding] = useState(false);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState({ name: "", desc: "", location: "", farmType: "", area: "", activities: "", price: "", capacity: "", times: "", days: "" });

  const submit = (e) => { e.preventDefault(); setPublished(true); setTimeout(() => setPublished(false), 3500); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">مزرعتي</h1>
          <p className="text-muted-foreground text-sm">إدارة ملف المزرعة والتجارب</p>
        </div>
        <button onClick={() => setAdding(!adding)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90">
          <Plus className="w-4 h-4" /> إضافة مزرعة
        </button>
      </div>

      {published && (
        <div className="bg-primary text-primary-foreground rounded-2xl p-4 flex items-center gap-2 animate-float-up">
          <Check className="w-5 h-5" /> تم نشر المزرعة بنجاح!
        </div>
      )}

      {adding && (
        <form onSubmit={submit} className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-lg">إضافة مزرعة جديدة</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="اسم المزرعة" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Input label="الموقع" value={form.location} onChange={(v) => setForm({ ...form, location: v })} required />
            <Select label="نوع المزرعة" options={FARM_TYPES} value={form.farmType} onChange={(v) => setForm({ ...form, farmType: v })} />
            <Input label="المساحة (دونم)" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />
            <Input label="السعر (ريال)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
            <Input label="السعة (زائر)" type="number" value={form.capacity} onChange={(v) => setForm({ ...form, capacity: v })} />
            <Input label="أوقات الزيارة" value={form.times} onChange={(v) => setForm({ ...form, times: v })} placeholder="مثال: 8ص - 6م" />
            <Input label="أيام العمل" value={form.days} onChange={(v) => setForm({ ...form, days: v })} placeholder="مثال: السبت - الجمعة" />
          </div>
          <TextArea label="الوصف" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} />
          <Input label="الأنشطة (افصل بفاصلة)" value={form.activities} onChange={(v) => setForm({ ...form, activities: v })} />
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">الصور</label>
            <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center text-muted-foreground text-sm cursor-pointer hover:border-primary">
              <ImageIcon className="w-6 h-6 mx-auto mb-2" />
              اسحب الصور هنا أو اضغط للرفع
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90"><Check className="w-4 h-4" /> نشر المزرعة</button>
            <button type="button" onClick={() => setAdding(false)} className="px-6 py-3 rounded-2xl border border-border font-bold hover:bg-secondary">إلغاء</button>
          </div>
        </form>
      )}

      {/* Farm profile */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="relative h-48">
          <img src={farm.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 right-5 left-5 text-white">
            <h2 className="font-heading text-2xl font-extrabold">{farm.name}</h2>
            <div className="flex items-center gap-3 text-sm mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {farm.location}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {farm.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{farm.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Info icon={<Sprout className="w-4 h-4" />} label="النوع" value={farm.farmType} />
            <Info icon={<MapPin className="w-4 h-4" />} label="المساحة" value={farm.area} />
            <Info icon={<Clock className="w-4 h-4" />} label="المدة" value={farm.duration} />
            <Info icon={<Users className="w-4 h-4" />} label="السعة" value={`حتى ${farm.capacity}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none border border-transparent focus:border-primary" />
    </label>
  );
}
function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none border border-transparent focus:border-primary resize-none" />
    </label>
  );
}
function Select({ label, options, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none border border-transparent focus:border-primary">
        <option value="">اختر...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Info({ icon, label, value }) {
  return (
    <div className="bg-secondary/60 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">{icon}{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  );
}