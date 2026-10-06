import React, { useState } from "react";
import { Search, Check, Clock, X, Calendar } from "lucide-react";

const BOOKINGS = [
  { id: "BK48201", farm: "مزرعة نخيل المدينة", visitor: "عبدالله محمد", date: "2026-10-09", time: "5:00 م", people: 4, total: 504, status: "confirmed" },
  { id: "BK48198", farm: "مزرعة نخيل المدينة", visitor: "نورة سعد", date: "2026-10-10", time: "8:00 ص", people: 2, total: 252, status: "pending" },
  { id: "BK48190", farm: "مزرعة نخيل المدينة", visitor: "خالد العتيبي", date: "2026-10-08", time: "11:00 ص", people: 6, total: 756, status: "confirmed" },
  { id: "BK48185", farm: "مزرعة نخيل المدينة", visitor: "سارة الأحمدي", date: "2026-10-07", time: "5:00 م", people: 3, total: 378, status: "cancelled" },
  { id: "BK48180", farm: "مزرعة نخيل المدينة", visitor: "فهد القحطاني", date: "2026-10-06", time: "5:00 م", people: 5, total: 630, status: "confirmed" }
];

const statusMap = {
  confirmed: { label: "مؤكد", cls: "bg-primary/10 text-primary", icon: <Check className="w-3 h-3" /> },
  pending: { label: "قيد الانتظار", cls: "bg-amber-100 text-amber-700", icon: <Clock className="w-3 h-3" /> },
  cancelled: { label: "ملغي", cls: "bg-destructive/10 text-destructive", icon: <X className="w-3 h-3" /> }
};

export default function OwnerBookings() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = BOOKINGS.filter((b) => (filter === "all" || b.status === filter) && (!q || b.visitor.includes(q) || b.id.includes(q)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">الحجوزات</h1>
        <p className="text-muted-foreground text-sm">إدارة حجوزات مزرعتك</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث برقم الحجز أو اسم الزائر..." className="w-full bg-card border border-border rounded-xl pr-9 pl-3 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex gap-2">
          {[{ v: "all", l: "الكل" }, { v: "confirmed", l: "مؤكد" }, { v: "pending", l: "قيد الانتظار" }, { v: "cancelled", l: "ملغي" }].map((s) => (
            <button key={s.v} onClick={() => setFilter(s.v)} className={`px-3.5 py-2 rounded-full text-sm font-semibold ${filter === s.v ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{s.l}</button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-muted-foreground text-right">
              <tr>
                <th className="px-4 py-3 font-semibold">رقم الحجز</th>
                <th className="px-4 py-3 font-semibold">الزائر</th>
                <th className="px-4 py-3 font-semibold">التاريخ</th>
                <th className="px-4 py-3 font-semibold">الوقت</th>
                <th className="px-4 py-3 font-semibold">الزوار</th>
                <th className="px-4 py-3 font-semibold">الإجمالي</th>
                <th className="px-4 py-3 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-4 py-3 font-bold">{b.id}</td>
                  <td className="px-4 py-3">{b.visitor}</td>
                  <td className="px-4 py-3"><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {b.date}</span></td>
                  <td className="px-4 py-3">{b.time}</td>
                  <td className="px-4 py-3">{b.people}</td>
                  <td className="px-4 py-3 font-bold">{b.total} ريال</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusMap[b.status].cls}`}>{statusMap[b.status].icon} {statusMap[b.status].label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-10 text-center text-muted-foreground">لا توجد حجوزات مطابقة</div>}
      </div>
    </div>
  );
}