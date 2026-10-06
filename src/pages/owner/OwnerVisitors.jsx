import React from "react";
import { Users, Star, MapPin } from "lucide-react";

const VISITORS = [
  { name: "عبدالله محمد", visits: 4, points: 980, last: "2026-10-05", type: "عائلة", rating: 5 },
  { name: "نورة سعد", visits: 2, points: 420, last: "2026-10-03", type: "زوجان", rating: 5 },
  { name: "خالد العتيبي", visits: 6, points: 1450, last: "2026-10-04", type: "أصدقاء", rating: 4 },
  { name: "سارة الأحمدي", visits: 1, points: 120, last: "2026-10-02", type: "فردي", rating: 5 },
  { name: "فهد القحطاني", visits: 3, points: 640, last: "2026-10-05", type: "عائلة", rating: 5 },
  { name: "ريم الشهري", visits: 2, points: 380, last: "2026-10-01", type: "زوجان", rating: 4 }
];

export default function OwnerVisitors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">الزوار</h1>
        <p className="text-muted-foreground text-sm">قائمة زوار مزرعتك</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="إجمالي الزوار" value="438" icon={<Users className="w-5 h-5" />} />
        <Stat label="زوار هذا الشهر" value="126" icon={<Users className="w-5 h-5" />} />
        <Stat label="زوار متكررون" value="64" icon={<Star className="w-5 h-5" />} />
        <Stat label="متوسط الزيارات" value="2.4" icon={<MapPin className="w-5 h-5" />} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VISITORS.map((v, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-lg">{v.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="font-bold">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.type} • آخر زيارة {v.last}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
              <div><span className="font-bold">{v.visits}</span> <span className="text-muted-foreground">زيارة</span></div>
              <div><span className="font-bold text-primary">{v.points}</span> <span className="text-muted-foreground">نقطة</span></div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-3.5 h-3.5 ${s < v.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-2">{icon}</div>
      <div className="text-2xl font-heading font-extrabold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}