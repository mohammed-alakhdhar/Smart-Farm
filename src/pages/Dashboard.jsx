import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Recycle, Sparkles, Building2, Loader2, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Field, TextInput, SelectInput, TextAreaInput, SectionCard } from "@/components/FormBits";
import { StatusBadge, PR_COLORS, WASTE_COLORS } from "@/components/StatusBadge";

export default function Dashboard() {
  const [facility, setFacility] = useState(null);
  const [showFacilityForm, setShowFacilityForm] = useState(false);
  const [fForm, setFForm] = useState({ facility_type: "مزرعة", name: "", owner_name: "", phone: "", city: "", region: "", description: "" });
  const [savingFacility, setSavingFacility] = useState(false);
  const [requests, setRequests] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [fac, reqs, ws] = await Promise.all([
        base44.entities.Facility.filter({}, { sort: "-created_date", limit: 1 }).then((r) => r.items).catch(() => []),
        base44.entities.ProcessingRequest.filter({}, { sort: "-created_date", limit: 50 }).then((r) => r.items).catch(() => []),
        base44.entities.WasteRecord.filter({}, { sort: "-created_date", limit: 50 }).then((r) => r.items).catch(() => [])
      ]);
      setFacility(fac[0] || null);
      setRequests(reqs);
      setWastes(ws);
      if (!fac[0]) setShowFacilityForm(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const pending = localStorage.getItem("pendingFacilityType");
      if (pending) { setFForm((f) => ({ ...f, facility_type: pending })); localStorage.removeItem("pendingFacilityType"); }
    } catch (e) {}
    load();
  }, []);

  const setF = (k) => (e) => setFForm((f) => ({ ...f, [k]: e.target.value }));

  const saveFacility = async () => {
    if (!fForm.name || !fForm.owner_name || !fForm.phone) return;
    setSavingFacility(true);
    try {
      if (facility) {
        const updated = await base44.entities.Facility.update(facility.id, fForm);
        setFacility(updated);
      } else {
        const created = await base44.entities.Facility.create(fForm);
        setFacility(created);
      }
      setShowFacilityForm(false);
    } catch (e) {
      alert("تعذّر الحفظ: " + (e.message || ""));
    } finally {
      setSavingFacility(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const pendingCount = requests.filter((r) => !["مكتمل", "مرفوض"].includes(r.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-1">لوحة التحكم</h1>
        <p className="text-muted-foreground text-sm">إدارة منشأتك وطلباتك وخدماتك</p>
      </div>

      {/* Facility */}
      {facility && !showFacilityForm ? (
        <div className="bg-card rounded-2xl border border-border shadow-card p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-2xl">{facility.facility_type === "مزرعة" ? "🌾" : "🏭"}</div>
            <div>
              <div className="font-heading font-extrabold text-lg">{facility.name}</div>
              <div className="text-sm text-muted-foreground">{facility.facility_type} · {facility.owner_name} · {facility.phone}</div>
              <div className="text-xs text-muted-foreground">{facility.city} {facility.region ? "· " + facility.region : ""}</div>
            </div>
          </div>
          <button onClick={() => { setFForm({ facility_type: facility.facility_type, name: facility.name, owner_name: facility.owner_name, phone: facility.phone, city: facility.city || "", region: facility.region || "", description: facility.description || "" }); setShowFacilityForm(true); }} className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-bold hover:bg-accent">تعديل البيانات</button>
        </div>
      ) : (
        <SectionCard title={facility ? "تعديل بيانات المنشأة" : "أكمل بيانات منشأتك"} icon={<Building2 className="w-5 h-5 text-primary" />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="نوع المنشأة" required>
              <SelectInput value={fForm.facility_type} onChange={setF("facility_type")}>
                <option value="مزرعة">مزرعة</option>
                <option value="مصنع">مصنع</option>
              </SelectInput>
            </Field>
            <Field label="اسم المنشأة" required>
              <TextInput value={fForm.name} onChange={setF("name")} placeholder="اسم المزرعة أو المصنع" />
            </Field>
            <Field label="اسم المسؤول" required>
              <TextInput value={fForm.owner_name} onChange={setF("owner_name")} placeholder="الاسم" />
            </Field>
            <Field label="رقم التواصل" required>
              <TextInput value={fForm.phone} onChange={setF("phone")} placeholder="05xxxxxxxx" inputMode="tel" />
            </Field>
            <Field label="المدينة">
              <TextInput value={fForm.city} onChange={setF("city")} />
            </Field>
            <Field label="المنطقة">
              <TextInput value={fForm.region} onChange={setF("region")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="وصف المنشأة">
                <TextAreaInput value={fForm.description} onChange={setF("description")} placeholder="نبذة عن المنشأة" />
              </Field>
            </div>
          </div>
          <button onClick={saveFacility} disabled={savingFacility} className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold disabled:opacity-50">
            {savingFacility ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} حفظ البيانات
          </button>
        </SectionCard>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={<FlaskConical className="w-5 h-5" />} label="طلبات المعالجة" value={requests.length} tone="primary" />
        <Kpi icon={<Loader2 className="w-5 h-5" />} label="طلبات قيد المتابعة" value={pendingCount} tone="amber" />
        <Kpi icon={<Recycle className="w-5 h-5" />} label="سجلات المخلفات" value={wastes.length} tone="olive" />
        <Kpi icon={<Sparkles className="w-5 h-5" />} label="رفيق المزارع" value="جاهز" tone="earth" />
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/request-processing" className="bg-primary text-primary-foreground rounded-2xl p-5 hover:opacity-90 transition-opacity">
          <FlaskConical className="w-6 h-6 mb-2" />
          <div className="font-bold">طلب معالجة جديد</div>
          <div className="text-sm opacity-85">قدّم طلب معالجة متبقيات المبيدات</div>
        </Link>
        <Link to="/waste" className="bg-olive text-white rounded-2xl p-5 hover:opacity-90 transition-opacity">
          <Recycle className="w-6 h-6 mb-2" />
          <div className="font-bold">سجّل مخلفاتك</div>
          <div className="text-sm opacity-85">حوّل مخلفاتك الزراعية إلى قيمة</div>
        </Link>
        <Link to="/assistant" className="bg-card border border-border shadow-card rounded-2xl p-5 hover:shadow-lift transition-shadow">
          <Sparkles className="w-6 h-6 mb-2 text-primary" />
          <div className="font-bold">رفيق المزارع</div>
          <div className="text-sm text-muted-foreground">اسأل المساعد الذكي</div>
        </Link>
      </div>

      {/* Requests */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2"><FlaskConical className="w-5 h-5 text-primary" /> طلبات المعالجة</h2>
          <Link to="/request-processing" className="text-sm font-bold text-primary hover:underline">طلب جديد</Link>
        </div>
        {requests.length === 0 ? (
          <Empty msg="لا توجد طلبات بعد" />
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-secondary/50 rounded-2xl p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold">{r.request_number} · {r.facility_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.date_variety} · {r.quantity} {r.quantity_unit} · {r.client_type}</div>
                  </div>
                  <StatusBadge status={r.status} map={PR_COLORS} />
                </div>
                {r.estimated_cost ? <div className="text-xs text-muted-foreground mt-2">التكلفة التقديرية: {r.estimated_cost.toLocaleString("ar-EG")} ريال</div> : null}
                {r.rejection_reason && <div className="text-xs text-destructive mt-2">سبب الرفض: {r.rejection_reason}</div>}
                {r.test_result_documented && <div className="text-xs text-primary mt-2">نتيجة الفحص الموثقة: {r.test_result_documented}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Waste */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2"><Recycle className="w-5 h-5 text-olive" /> سجلات المخلفات الزراعية</h2>
          <Link to="/waste" className="text-sm font-bold text-primary hover:underline">سجل جديد</Link>
        </div>
        {wastes.length === 0 ? (
          <Empty msg="لا توجد سجلات بعد" />
        ) : (
          <div className="space-y-3">
            {wastes.map((w) => (
              <div key={w.id} className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-bold">{w.waste_type}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{w.quantity} {w.quantity_unit} · {w.location} · {w.intent}</div>
                </div>
                <StatusBadge status={w.status} map={WASTE_COLORS} />
              </div>
            ))}
          </div>
        )}
      </div>
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

function Empty({ msg }) {
  return <div className="text-sm text-muted-foreground py-6 text-center">{msg}</div>;
}