import React from "react";

export const PR_COLORS = {
  "طلب جديد": "bg-secondary text-foreground",
  "تحت المراجعة": "bg-blue-100 text-blue-700",
  "بانتظار استكمال البيانات": "bg-amber-100 text-amber-700",
  "بانتظار الفحص أو التقييم الفني": "bg-amber-100 text-amber-700",
  "مجدول للمعالجة": "bg-indigo-100 text-indigo-700",
  "قيد المعالجة": "bg-primary/15 text-primary",
  "بانتظار نتائج الفحص بعد المعالجة": "bg-amber-100 text-amber-700",
  "مكتمل": "bg-primary text-primary-foreground",
  "مرفوض": "bg-destructive/15 text-destructive"
};

export const WASTE_COLORS = {
  "مسجل": "bg-secondary text-foreground",
  "قيد المراجعة": "bg-amber-100 text-amber-700",
  "تم الربط": "bg-primary text-primary-foreground",
  "مغلق": "bg-muted text-muted-foreground"
};

export function StatusBadge({ status, map = PR_COLORS }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${map[status] || "bg-secondary text-foreground"}`}>
      {status}
    </span>
  );
}