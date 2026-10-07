import React, { useState } from "react";
import { Check } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const SKILLS = ["عمال زراعة عامة", "عمال قطف تمور", "فني ري", "فني صيانة", "عمال تغليف"];
const RATE = 25; // ريال / ساعة / عامل

export default function LaborService() {
  const { addLaborRequest } = useApp();
  const [workers, setWorkers] = useState(10);
  const [skill, setSkill] = useState(SKILLS[0]);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(6);
  const [location, setLocation] = useState("");
  const [done, setDone] = useState(null);

  const cost = workers * hours * RATE;
  const ready = workers > 0 && hours > 0 && date && location;

  const submit = () => {
    const req = { workers, skill, date, hours, location, cost };
    addLaborRequest(req);
    setDone(req);
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl">👷</div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">العمالة حسب الحاجة</h2>
            <div className="text-sm opacity-85">المزارع ومصانع التمور</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">المشكلة: </span>تفاوت احتياج المنشأة للعمالة بين فترات العمل المختلفة.
        </div>
        <div className="bg-secondary/60 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">الحل: </span>خدمة توفر عمالة منظمة حسب الحاجة باليوم أو الساعة.
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="عدد العمال">
            <input type="number" min={1} value={workers} onChange={(e) => setWorkers(+e.target.value)} className="inp" />
          </Field>
          <Field label="نوع المهارة">
            <select value={skill} onChange={(e) => setSkill(e.target.value)} className="inp">
              {SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="التاريخ">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="inp" />
          </Field>
          <Field label="عدد الساعات">
            <input type="number" min={1} value={hours} onChange={(e) => setHours(+e.target.value)} className="inp" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="الموقع">
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="مثال: العوالي - المدينة المنورة" className="inp" />
            </Field>
          </div>
        </div>

        <div className="bg-secondary/60 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-muted-foreground">التكلفة التقديرية</div>
          <div className="font-heading font-extrabold text-2xl text-primary">{cost.toLocaleString("ar-EG")} <span className="text-sm font-medium text-muted-foreground">ريال</span></div>
        </div>

        <button onClick={submit} disabled={!ready} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90">
          طلب العمالة
        </button>

        {done && (
          <div className="animate-float-up bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-2 text-sm">
            <div className="font-bold text-primary flex items-center gap-2 mb-1"><Check className="w-5 h-5" /> تم استلام طلبك</div>
            <Row k="عدد العمال" v={`${done.workers} عمال`} />
            <Row k="عدد الساعات" v={`${done.hours} ساعة`} />
            <Row k="التاريخ" v={done.date} />
            <Row k="الموقع" v={done.location} />
            <Row k="التكلفة التقديرية" v={`${done.cost.toLocaleString("ar-EG")} ريال`} />
            <Row k="الحالة" v="متاح" />
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
function Row({ k, v }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{k}</span><span className="font-bold">{v}</span></div>;
}