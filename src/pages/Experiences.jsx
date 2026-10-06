import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star, Sparkles } from "lucide-react";
import { EXPERIENCES, FARMS } from "@/lib/mockData";
import { Pill } from "@/components/ui-bits";

export default function Experiences() {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => {
    if (filter === "popular") return EXPERIENCES.filter((e) => e.popular);
    return EXPERIENCES;
  }, [filter]);

  return (
    <div className="bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold mb-3"><Sparkles className="w-4 h-4" /> التجارب الزراعية</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">تجارب أصيلة في المدينة المنورة</h1>
          <p className="mt-2 text-primary-foreground/85">من قطف التمور إلى الجلسات الريفية، اختر تجربتك</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 mb-6">
          <Pill active={filter === "all"} onClick={() => setFilter("all")}>كل التجارب</Pill>
          <Pill active={filter === "popular"} onClick={() => setFilter("popular")}>الأكثر طلبًا 🔥</Pill>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((e) => {
            const farm = FARMS.find((f) => f.id === e.farmId);
            return (
              <div key={e.id} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden hover:shadow-lift transition-shadow">
                <div className="relative h-44">
                  <img src={farm.image} alt="" className="w-full h-full object-cover" />
                  {e.popular && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold">الأكثر طلبًا</span>}
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-1">{farm.name}</div>
                  <h3 className="font-heading font-bold text-lg mb-2">{e.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {e.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> حتى {e.capacity}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {farm.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {e.activities.map((a) => <span key={a} className="px-2.5 py-1 rounded-full bg-accent/40 text-xs text-earth">{a}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-heading font-extrabold text-xl text-primary">{e.price} <span className="text-sm font-medium text-muted-foreground">ريال</span></div>
                    <Link to={`/farms/${farm.id}`} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">التفاصيل والحجز</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}