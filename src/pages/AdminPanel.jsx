import React, { useEffect, useState } from "react";
import { ShieldCheck, Loader2, FlaskConical, Recycle, Building2, Save, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { SelectInput, TextAreaInput, TextInput } from "@/components/FormBits";
import { StatusBadge, PR_COLORS } from "@/components/StatusBadge";
import { AttachmentLinks } from "@/components/AttachmentLinks";

const PR_STATUSES = ["طلب جديد", "تحت المراجعة", "بانتظار استكمال البيانات", "بانتظار الفحص أو التقييم الفني", "مجدول للمعالجة", "قيد المعالجة", "بانتظار نتائج الفحص بعد المعالجة", "مكتمل", "مرفوض"];

export default function AdminPanel() {
  const { user } = useAuth();
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const [reqs, ws, facs] = await Promise.all([
        base44.entities.ProcessingRequest.filter({}, { sort: "-created_date", limit: 100 }).then((r) => r.items).catch(() => []),
        base44.entities.WasteRecord.filter({}, { sort: "-created_date", limit: 100 }).then((r) => r.items).catch(() => []),
        base44.entities.Facility.filter({}, { sort: "-created_date", limit: 100 }).then((r) => r.items).catch(() => [])
      ]);
      setRequests(reqs);
      setWastes(ws);
      setFacilities(facs);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-heading text-xl font-extrabold mb-2">غير مصرح</h2>
        <p className="text-muted-foreground text-sm">لوحة الإدارة مخصصة للمشرفين فقط.</p>
      </div>
    );
  }

  const openRequest = (r) => { setSelected(r); setEdit({ status: r.status, rejection_reason: r.rejection_reason || "", assigned_lab: r.assigned_lab || "", test_result_documented: r.test_result_documented || "", admin_notes: r.admin_notes || "" }); };

  const saveRequest = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await base44.entities.ProcessingRequest.update(selected.id, edit);
      setRequests((rs) => rs.map((r) => (r.id === selected.id ? updated : r)));
      setSelected(updated);
    } catch (e) {
      alert("تعذّر الحفظ: " + (e.message || ""));
    } finally { setSaving(false); }
  };

  const updateWasteStatus = async (w, status) => {
    try {
      const updated = await base44.entities.WasteRecord.update(w.id, { status });
      setWastes((ws) => ws.map((x) => (x.id === w.id ? updated : x)));
    } catch (e) { alert("تعذّر التحديث"); }
  };

  const totalRevenue = requests.reduce((s, r) => s + (r.estimated_cost || 0), 0);
  const completed = requests.filter((r) => r.status === "مكتمل").length;
  const pending = requests.filter((r) => !["مكتمل", "مرفوض"].includes(r.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-1">لوحة الإدارة</h1>
        <p className="text-muted-foreground text-sm">إدارة الطلبات والمنشآت والمخلفات</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={<FlaskConical className="w-5 h-5" />} label="إجمالي الطلبات" value={requests.length} tone="primary" />
        <Kpi icon={<Loader2 className="w-5 h-5" />} label="قيد المتابعة" value={pending} tone="amber" />
        <Kpi icon={<ShieldCheck className="w-5 h-5" />} label="مكتملة" value={completed} tone="olive" />
        <Kpi icon={<TrendingUp className="w-5 h-5" />} label="الإيرادات التقديرية" value={totalRevenue.toLocaleString("ar-EG") + " ريال"} tone="earth" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <TabBtn active={tab === "requests"} onClick={() => setTab("requests")} icon={<FlaskConical className="w-4 h-4" />} label="طلبات المعالجة" count={requests.length} />
        <TabBtn active={tab === "waste"} onClick={() => setTab("waste")} icon={<Recycle className="w-4 h-4" />} label="المخلفات" count={wastes.length} />
        <TabBtn active={tab === "facilities"} onClick={() => setTab("facilities")} icon={<Building2 className="w-4 h-4" />} label="المنشآت" count={facilities.length} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : tab === "requests" ? (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-3">
            {requests.length === 0 ? <Empty msg="لا توجد طلبات" /> : requests.map((r) => (
              <button key={r.id} onClick={() => openRequest(r)} className={`w-full text-right bg-card rounded-2xl border shadow-card p-4 transition-colors ${selected?.id === r.id ? "border-primary" : "border-border hover:border-primary/40"}`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold">{r.request_number} · {r.facility_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.date_variety} · {r.quantity} {r.quantity_unit} · {r.client_type}</div>
                  </div>
                  <StatusBadge status={r.status} map={PR_COLORS} />
                </div>
              </button>
            ))}
          </div>
          <div className="lg:sticky lg:top-20 self-start">
            {selected ? (
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 space-y-4">
                <div>
                  <div className="font-heading font-extrabold text-lg">{selected.request_number}</div>
                  <div className="text-sm text-muted-foreground">{selected.facility_name} · {selected.applicant_name} · {selected.phone}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Info k="نوع العميل" v={selected.client_type} />
                  <Info k="نوع التمر" v={selected.date_variety} />
                  <Info k="الكمية" v={`${selected.quantity} ${selected.quantity_unit}`} />
                  <Info k="الدفعة" v={selected.batch_number || "-"} />
                  <Info k="المختبر" v={selected.lab_name || "-"} />
                  <Info k="نتيجة التحليل" v={selected.analysis_result ? `${selected.analysis_result} ${selected.analysis_unit || ""}` : "-"} />
                  <Info k="التكلفة التقديرية" v={selected.estimated_cost ? selected.estimated_cost.toLocaleString("ar-EG") + " ريال" : "-"} />
                  <Info k="تاريخ الإنشاء" v={new Date(selected.created_date).toLocaleDateString("ar-EG")} />
                </div>
                {selected.notes && <Info k="ملاحظات العميل" v={selected.notes} />}
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5">المرفقات</div>
                  <AttachmentLinks items={selected.attachments} />
                </div>
                <hr className="border-border" />
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">حالة الطلب</label>
                    <SelectInput value={edit.status} onChange={(e) => setEdit((x) => ({ ...x, status: e.target.value }))}>
                      {PR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </SelectInput>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">المختبر / الجهة التشغيلية المعينة</label>
                    <TextInput value={edit.assigned_lab} onChange={(e) => setEdit((x) => ({ ...x, assigned_lab: e.target.value }))} placeholder="اسم الجهة" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">نتيجة الفحص الموثقة بعد المعالجة</label>
                    <TextAreaInput value={edit.test_result_documented} onChange={(e) => setEdit((x) => ({ ...x, test_result_documented: e.target.value }))} placeholder="تُسجَّل فقط بعد توفر نتيجة فحص موثقة" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">سبب الرفض (إن وُجد)</label>
                    <TextInput value={edit.rejection_reason} onChange={(e) => setEdit((x) => ({ ...x, rejection_reason: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">ملاحظات الإدارة</label>
                    <TextAreaInput value={edit.admin_notes} onChange={(e) => setEdit((x) => ({ ...x, admin_notes: e.target.value }))} />
                  </div>
                  <button onClick={saveRequest} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} حفظ التحديث
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t border-border">لا تُعرض حالة "مطابق للتصدير" إلا بعد تسجيل نتيجة فحص موثقة والتحقق من متطلبات السوق المستهدف.</p>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border shadow-card p-8 text-center text-muted-foreground text-sm">اختر طلبًا لمراجعته وتحديث حالته.</div>
            )}
          </div>
        </div>
      ) : tab === "waste" ? (
        <div className="space-y-3">
          {wastes.length === 0 ? <Empty msg="لا توجد سجلات مخلفات" /> : wastes.map((w) => (
            <div key={w.id} className="bg-card rounded-2xl border border-border shadow-card p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-bold">{w.waste_type}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{w.quantity} {w.quantity_unit} · {w.location} · {w.intent}</div>
                {w.opportunities && <div className="text-xs text-muted-foreground mt-1">فرص: {w.opportunities}</div>}
              </div>
              <div className="flex items-center gap-2">
                <SelectInput value={w.status} onChange={(e) => updateWasteStatus(w, e.target.value)} className="w-36 text-sm">
                  {["مسجل", "قيد المراجعة", "تم الربط", "مغلق"].map((s) => <option key={s} value={s}>{s}</option>)}
                </SelectInput>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {facilities.length === 0 ? <Empty msg="لا توجد منشآت مسجلة" /> : facilities.map((f) => (
            <div key={f.id} className="bg-card rounded-2xl border border-border shadow-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center text-2xl">{f.facility_type === "مزرعة" ? "🌾" : "🏭"}</div>
              <div>
                <div className="font-bold">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.facility_type} · {f.owner_name} · {f.phone} · {f.city || ""}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Kpi({ icon, label, value, tone }) {
  const tones = { primary: "bg-primary/10 text-primary", amber: "bg-amber-100 text-amber-700", olive: "bg-olive/15 text-olive", earth: "bg-earth/10 text-earth" };
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-4">
      <div className={`w-10 h-10 rounded-xl grid place-items-center mb-2 ${tones[tone]}`}>{icon}</div>
      <div className="text-xl font-heading font-extrabold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label, count }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-accent"}`}>
      {icon} {label} <span className={`px-2 py-0.5 rounded-full text-xs ${active ? "bg-white/20" : "bg-background"}`}>{count}</span>
    </button>
  );
}

function Info({ k, v }) {
  return <div><div className="text-xs text-muted-foreground">{k}</div><div className="font-semibold">{v || "-"}</div></div>;
}

function Empty({ msg }) {
  return <div className="bg-card rounded-2xl border border-border shadow-card p-8 text-center text-muted-foreground text-sm">{msg}</div>;
}