import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Users, Calendar, Check, Sparkles, ArrowLeft, ShieldCheck, Sprout } from "lucide-react";
import { FARMS } from "@/lib/mockData";
import { Image } from "@/components/ui/image";

const EMOJI = { "جولة": "🌴", "قطف": "🍇", "زراع": "🌱", "تصوير": "📸", "جلسة": "☕", "ري": "💧", "منتجات": "🥬", "غروب": "🌅" };
function emojiFor(a) { for (const k in EMOJI) if (a.includes(k)) return EMOJI[k]; return "✨"; }

export default function FarmDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const farm = FARMS.find((f) => f.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!farm) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-3">🌾</div>
        <h2 className="font-heading font-bold text-xl">المزرعة غير موجودة</h2>
        <Link to="/explore" className="mt-4 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">العودة للمزارع</Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> رجوع
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Gallery */}
        <div className="grid lg:grid-cols-[1fr_120px] gap-4 mb-8">
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-card">
            <Image src={farm.gallery[activeImg]} alt={farm.name} className="w-full h-full" fittingType="fill" />
            <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between">
              <div className="text-white">
                <div className="inline-flex px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold mb-2">{farm.farmType}</div>
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold drop-shadow">{farm.name}</h1>
                <div className="flex items-center gap-1 text-white/90 text-sm mt-1"><MapPin className="w-4 h-4" /> {farm.location}</div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-hide">
            {farm.gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`shrink-0 w-28 h-20 lg:w-full lg:h-24 rounded-2xl overflow-hidden border-2 ${activeImg === i ? "border-primary" : "border-transparent"}`}>
                <Image src={g} alt="" className="w-full h-full" fittingType="fill" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Main */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <Info icon={<Star className="w-4 h-4" />} label="التقييم" value={`${farm.rating} (${farm.reviews})`} />
              <Info icon={<Clock className="w-4 h-4" />} label="المدة" value={farm.duration} />
              <Info icon={<Users className="w-4 h-4" />} label="السعة" value={`حتى ${farm.capacity}`} />
              <Info icon={<Sprout className="w-4 h-4" />} label="المساحة" value={farm.area} />
            </div>

            <Section title="عن المزرعة">
              <p className="text-foreground/80 leading-relaxed">{farm.description}</p>
              <div className="mt-4 flex items-center gap-3 bg-secondary/60 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-lg">{farm.owner.charAt(0)}</div>
                <div>
                  <div className="font-bold">{farm.owner}</div>
                  <div className="text-sm text-muted-foreground">{farm.ownerTitle}</div>
                </div>
              </div>
            </Section>

            <Section title="ماذا تقدم هذه المزرعة؟">
              <div className="grid sm:grid-cols-2 gap-3">
                {farm.activities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 grid place-items-center shrink-0 text-lg">{emojiFor(a)}</div>
                    <span className="font-semibold text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="أوقات الزيارة">
              <div className="flex flex-wrap gap-2">
                {farm.times.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary text-sm font-semibold"><Clock className="w-3.5 h-3.5 text-primary" /> {t}</span>
                ))}
              </div>
            </Section>

            <Section title="الأنشطة المتاحة">
              <div className="flex flex-wrap gap-2">
                {farm.tags.map((t) => <span key={t} className="px-3.5 py-1.5 rounded-full bg-accent/50 text-earth text-sm font-semibold">{t}</span>)}
                {farm.familyFriendly && <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">✓ مناسب للعائلات</span>}
              </div>
            </Section>

            <Section title="لماذا يوصي بك الذكاء الاصطناعي بهذه المزرعة؟">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary to-olive text-primary-foreground p-6">
                <Sparkles className="absolute -left-4 -top-4 w-24 h-24 opacity-10" />
                <div className="relative">
                  <div className="text-3xl font-heading font-extrabold">92% تطابق</div>
                  <p className="mt-2 text-primary-foreground/90 leading-relaxed">هذه التجربة تتوافق بنسبة 92% مع اهتماماتك. تجمع بين {farm.tags.slice(0, 2).join(" و")}، وتناسب {farm.familyFriendly ? "العائلات" : "الزوار"} الباحثين عن تجربة أصيلة.</p>
                </div>
              </div>
            </Section>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="bg-card rounded-3xl border border-border shadow-card p-6">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-heading font-extrabold text-primary">{farm.price}</span>
                <span className="text-muted-foreground">ريال / شخص</span>
              </div>
              <div className="text-sm text-muted-foreground mb-5">{farm.experienceType}</div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">التاريخ</label>
                  <input type="date" className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm font-semibold outline-none border border-transparent focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">الوقت</label>
                  <div className="grid grid-cols-3 gap-2">
                    {farm.times.map((t, i) => (
                      <button key={i} className="px-2 py-2 rounded-xl bg-secondary text-xs font-semibold hover:bg-accent">{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">عدد الزوار</label>
                  <input type="number" min={1} max={farm.capacity} defaultValue={2} className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm font-semibold outline-none border border-transparent focus:border-primary" />
                </div>
              </div>

              <Link to={`/book/${farm.id}`} className="block w-full text-center px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">احجز زيارتك</Link>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" /> حجز آمن مع إلغاء مجاني قبل 24 ساعة
              </div>
            </div>

            <div className="mt-4 bg-secondary/60 rounded-2xl p-4">
              <div className="font-bold text-sm mb-2">أيام العمل</div>
              <div className="flex flex-wrap gap-1.5">
                {farm.days.map((d) => <span key={d} className="px-2.5 py-1 rounded-full bg-card text-xs font-semibold border border-border">{d}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">{icon}{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading font-bold text-xl mb-4">{title}</h2>
      {children}
    </div>
  );
}