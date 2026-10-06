import React from "react";
import { Sprout, Users, MapPin, Sparkles, TrendingUp, Handshake, Percent, Star } from "lucide-react";
import { SectionTitle } from "@/components/ui-bits";

export default function BusinessModel() {
  return (
    <div className="bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-3"><TrendingUp className="w-4 h-4" /> نموذج الأعمال</div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold">نموذج أعمال المزرعة الذكية</h1>
          <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">نربط المزارع بالزوار عبر تجربة ذكية مربحة لجميع الأطراف</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Segments */}
        <section>
          <SectionTitle eyebrow="العملاء" title="شريحات العملاء" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Sprout className="w-5 h-5" />, t: "أصحاب المزارع" },
              { icon: <Users className="w-5 h-5" />, t: "الزوار" },
              { icon: <MapPin className="w-5 h-5" />, t: "العائلات" },
              { icon: <Star className="w-5 h-5" />, t: "السياح" },
              { icon: <Handshake className="w-5 h-5" />, t: "الجهات السياحية" }
            ].map((s, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-card p-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center">{s.icon}</div>
                <span className="font-bold">{s.t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Value props */}
        <section>
          <SectionTitle eyebrow="القيمة" title="القيمة المقدمة" />
          <div className="grid lg:grid-cols-2 gap-6">
            <ValueCard title="للمزارع" color="from-primary to-olive" items={[
              "زيادة عدد الزوار والحجوزات",
              "تحسين الحضور الرقمي للمزرعة",
              "رؤى بيانات وتحليلات الطلب",
              "توصيات ذكية لتحسين التجربة",
              "زيادة إيرادات السياحة الزراعية"
            ]} />
            <ValueCard title="للزوار" color="from-earth to-amber-600" items={[
              "اكتشاف المزارع بسهولة",
              "توصيات مخصصة بالذكاء الاصطناعي",
              "حجز سهل وفوري",
              "تجارب تفاعلية ممتعة",
              "نقاط ومكافآت"
            ]} />
          </div>
        </section>

        {/* Revenue */}
        <section>
          <SectionTitle eyebrow="الإيرادات" title="مصادر الإيرادات" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Percent className="w-5 h-5" />, t: "عمولة على الحجوزات", d: "نسبة من كل حجز يتم عبر المنصة" },
              { icon: <Sprout className="w-5 h-5" />, t: "اشتراكات اختيارية للمزارع", d: "باقات مميزة لأصحاب المزارع" },
              { icon: <Sparkles className="w-5 h-5" />, t: "خدمات تسويق مميزة", d: "ترقية المزارع والتجارب" },
              { icon: <Handshake className="w-5 h-5" />, t: "شراكات ورعايات", d: "تعاون مع جهات سياحية" }
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">{r.icon}</div>
                <div>
                  <div className="font-bold">{r.t}</div>
                  <div className="text-sm text-muted-foreground">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ValueCard({ title, color, items }) {
  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
      <div className={`bg-gradient-to-l ${color} text-white p-5`}><h3 className="font-heading font-bold text-lg">{title}</h3></div>
      <div className="p-5 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-bold">{i + 1}</div>
            <span className="text-sm font-medium">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}