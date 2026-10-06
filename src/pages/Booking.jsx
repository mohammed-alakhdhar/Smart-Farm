import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, Calendar, Clock, Users, MapPin, ArrowLeft, QrCode, Sparkles } from "lucide-react";
import { FARMS } from "@/lib/mockData";
import { useApp } from "@/lib/AppContext";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const farm = FARMS.find((f) => f.id === id);
  const { addBooking } = useApp();
  const [date, setDate] = useState("");
  const [time, setTime] = useState(farm?.times[2] || "5:00 م");
  const [people, setPeople] = useState(4);
  const [confirmed, setConfirmed] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!farm) {
    return <div className="max-w-3xl mx-auto px-6 py-20 text-center"><h2 className="font-bold text-xl">المزرعة غير موجودة</h2><Link to="/explore" className="mt-4 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">العودة</Link></div>;
  }

  const subtotal = farm.price * people;
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  const confirm = () => {
    if (!date) return;
    setSubmitting(true);
    setTimeout(() => {
      const booking = {
        id: "BK" + Math.floor(Math.random() * 90000 + 10000),
        farmId: farm.id,
        farmName: farm.name,
        experience: farm.experienceType,
        location: farm.location,
        date,
        time,
        people,
        total,
        createdAt: new Date().toISOString()
      };
      addBooking(booking);
      setConfirmed(booking);
      setSubmitting(false);
    }, 1400);
  };

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden text-center animate-float-up">
          <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground py-10 px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 grid place-items-center mb-3"><Check className="w-9 h-9" /></div>
            <h1 className="font-heading text-3xl font-extrabold">🎉 تم تأكيد حجزك</h1>
            <p className="text-primary-foreground/85 mt-1">استعد لتجربة زراعية أصيلة</p>
          </div>
          <div className="p-6 sm:p-8 text-right">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Detail label="رقم الحجز" value={confirmed.id} />
              <Detail label="المزرعة" value={confirmed.farmName} />
              <Detail label="الموقع" value={confirmed.location} icon={<MapPin className="w-4 h-4" />} />
              <Detail label="التاريخ" value={confirmed.date} icon={<Calendar className="w-4 h-4" />} />
              <Detail label="الوقت" value={confirmed.time} icon={<Clock className="w-4 h-4" />} />
              <Detail label="عدد الزوار" value={`${confirmed.people} أشخاص`} icon={<Users className="w-4 h-4" />} />
            </div>
            <div className="bg-secondary/60 rounded-2xl p-6 mb-6">
              <div className="text-xs text-muted-foreground mb-3 text-center">امسح رمز QR عند الوصول للمزرعة</div>
              <div className="w-40 h-40 mx-auto bg-white border-4 border-border rounded-2xl grid place-items-center">
                <QrCode className="w-24 h-24 text-foreground" />
              </div>
              <div className="text-center text-xs text-muted-foreground mt-3">{confirmed.id}</div>
            </div>
            <div className="flex gap-3">
              <Link to="/journey" className="flex-1 text-center px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90">عرض رحلتي</Link>
              <Link to="/explore" className="flex-1 text-center px-6 py-3.5 rounded-2xl border border-border font-bold hover:bg-secondary">استكشف مزارع أخرى</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"><ArrowLeft className="w-4 h-4" /> رجوع</button>
      <h1 className="font-heading text-3xl font-extrabold mb-6">تأكيد الحجز</h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Form */}
        <div className="bg-card rounded-3xl border border-border shadow-card p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <img src={farm.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <div className="font-heading font-bold text-lg">{farm.name}</div>
              <div className="text-sm text-muted-foreground">{farm.experienceType}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">التاريخ</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm font-semibold outline-none border border-transparent focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">الوقت</label>
            <div className="grid grid-cols-3 gap-2">
              {farm.times.map((t) => (
                <button key={t} onClick={() => setTime(t)} className={`px-2 py-2.5 rounded-xl text-sm font-semibold ${time === t ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">عدد الزوار</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-xl bg-secondary font-bold text-lg">−</button>
              <div className="w-16 text-center font-heading font-extrabold text-xl">{people}</div>
              <button onClick={() => setPeople(Math.min(farm.capacity, people + 1))} className="w-10 h-10 rounded-xl bg-secondary font-bold text-lg">+</button>
              <span className="text-xs text-muted-foreground">الحد الأقصى {farm.capacity}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="bg-card rounded-3xl border border-border shadow-card p-6 h-fit lg:sticky lg:top-20">
          <h3 className="font-bold mb-4">ملخص الحجز</h3>
          <div className="space-y-3 text-sm">
            <Row label="التجربة" value={farm.experienceType} />
            <Row label="التاريخ" value={date || "—"} />
            <Row label="الوقت" value={time} />
            <Row label="عدد الزوار" value={`${people}`} />
            <div className="border-t border-border pt-3 space-y-2">
              <Row label={`السعر (${people} × ${farm.price})`} value={`${subtotal} ريال`} />
              <Row label="رسوم الخدمة" value={`${fee} ريال`} muted />
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-bold">الإجمالي</span>
              <span className="font-heading font-extrabold text-xl text-primary">{total} ريال</span>
            </div>
          </div>
          <button onClick={confirm} disabled={!date || submitting} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90">
            {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> جارٍ التأكيد...</> : <><Check className="w-5 h-5" /> تأكيد الحجز</>}
          </button>
          {!date && <p className="text-center text-xs text-muted-foreground mt-2">اختر التاريخ للمتابعة</p>}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="w-4 h-4 text-primary" /> ستحصل على 100 نقطة عند إتمام الزيارة</div>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value, icon }) {
  return (
    <div className="bg-secondary/60 rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">{icon}{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground" : "font-semibold"}>{value}</span>
    </div>
  );
}