import React from "react";
import { Users, FlaskConical, Bug, Check, Clock, MapPin } from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function OwnerOrders() {
  const { state } = useApp();
  const { laborRequests, pesticideResults, weevilAnalyses, serviceSubs } = state;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">طلبات الخدمات</h1>
        <p className="text-muted-foreground text-sm">متابعة طلبات العمالة ونتائج الفحوصات والتحليلات</p>
      </div>

      <Section icon={<Users className="w-4 h-4" />} title="طلبات العمالة" count={laborRequests.length}>
        {laborRequests.length === 0 ? <Empty msg="لا توجد طلبات عمالة بعد" /> : (
          <div className="space-y-3">
            {laborRequests.map((r) => (
              <div key={r.id} className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="font-bold">{r.workers} عمال — {r.skill}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1"><Clock className="w-3.5 h-3.5" /> {r.date} · {r.hours} ساعة · <MapPin className="w-3.5 h-3.5" /> {r.location}</div>
                </div>
                <div className="text-left">
                  <div className="font-heading font-extrabold text-primary">{r.cost.toLocaleString("ar-EG")} ريال</div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mt-1"><Check className="w-3 h-3" /> متاح</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<FlaskConical className="w-4 h-4" />} title="نتائج فحوصات المبيدات" count={pesticideResults.length}>
        {pesticideResults.length === 0 ? <Empty msg="لم يتم إدخال نتائج فحوصات بعد" /> : (
          <div className="space-y-3">
            {pesticideResults.map((r) => (
              <div key={r.id} className="bg-secondary/50 rounded-2xl p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="font-bold">{r.pesticide}</div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${r.level.includes("آمنة") ? "bg-primary/10 text-primary" : r.level.includes("متوسطة") ? "bg-amber-100 text-amber-700" : "bg-destructive/10 text-destructive"}`}>{r.level}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">القيمة: {r.value} (الحد {r.limit})</div>
                <div className="text-sm mt-2">{r.recommendation}</div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<Bug className="w-4 h-4" />} title="تحليلات سوسة النخيل" count={weevilAnalyses.length}>
        {weevilAnalyses.length === 0 ? <Empty msg="لم يتم رفع صور للتحليل بعد" /> : (
          <div className="space-y-3">
            {weevilAnalyses.map((a) => (
              <div key={a.id} className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold">احتمالية الإصابة: {a.level}</div>
                  <div className="text-sm text-muted-foreground mt-1">{a.recommendation}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${a.level === "مرتفعة" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>{a.level}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<Check className="w-4 h-4" />} title="الخدمات المشتركة" count={serviceSubs.length}>
        {serviceSubs.length === 0 ? <Empty msg="لم تشترك في أي خدمة بعد" /> : (
          <div className="flex flex-wrap gap-2">
            {serviceSubs.map((id) => {
              const map = { pesticide: "متبقيات المبيدات", weevil: "سوسة النخيل" };
              return <span key={id} className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">{map[id]}</span>;
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ icon, title, count, children }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5">
      <h3 className="font-bold mb-4 flex items-center gap-2">{icon} {title} <span className="text-xs text-muted-foreground font-medium">({count})</span></h3>
      {children}
    </div>
  );
}
function Empty({ msg }) {
  return <div className="text-sm text-muted-foreground py-4 text-center">{msg}</div>;
}