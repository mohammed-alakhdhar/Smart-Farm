import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical, Upload, Check, Loader2, X, ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Field, TextInput, SelectInput, TextAreaInput, SectionCard } from "@/components/FormBits";

const VARIETIES = ["عجوة", "صفاوي", "عنبرة", "سكري", "خلاص", "مجدول", "أنواع أخرى"];
const PRICE_PER_TON = 1500;

export default function ProcessingRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    client_type: "مزرعة", facility_name: "", applicant_name: "", phone: "", city: "", region: "",
    date_variety: "عجوة", quantity: "", quantity_unit: "طن", total_weight: "", batch_number: "",
    harvest_date: "", current_status_text: "", notes: "",
    lab_name: "", analysis_date: "", pesticide_name: "", analysis_result: "", analysis_unit: ""
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFiles = async (e) => {
    const list = Array.from(e.target.files || []).slice(0, 5);
    if (!list.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of list) {
        if (file.size > 10 * 1024 * 1024) { setError(`الملف ${file.name} يتجاوز 10 ميجابايت`); continue; }
        const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
        uploaded.push({ uri: file_uri, name: file.name });
      }
      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError("تعذّر رفع الملف: " + (err.message || ""));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    setError("");
    if (!form.facility_name || !form.applicant_name || !form.phone || !form.date_variety || !form.quantity) {
      setError("يرجى تعبئة الحقول المطلوبة (اسم المنشأة، مقدم الطلب، رقم التواصل، نوع التمر، الكمية).");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!consent) {
      setError("يجب الإقرار بصحة البيانات للمتابعة.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    try {
      const qty = parseFloat(form.quantity) || 0;
      const tons = form.quantity_unit === "طن" ? qty : qty / 1000;
      const estimated_cost = Math.round(tons * PRICE_PER_TON);
      const request_number = "PR-" + Date.now().toString().slice(-6);
      const payload = {
        ...form,
        quantity: qty,
        total_weight: form.total_weight ? parseFloat(form.total_weight) : undefined,
        consent,
        attachments: files.map((f) => f.uri),
        request_number,
        estimated_cost
      };
      await base44.entities.ProcessingRequest.create(payload);
      setSuccess({ request_number, estimated_cost });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("تعذّر إرسال الطلب: " + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-card rounded-3xl border border-border shadow-lift p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-5"><Check className="w-9 h-9 text-primary" /></div>
          <h2 className="font-heading text-2xl font-extrabold mb-2">تم استلام طلبك بنجاح</h2>
          <p className="text-muted-foreground mb-5">سيقوم فريق الإدارة بمراجعة طلبك والتواصل معك لإكمال الإجراءات.</p>
          <div className="bg-secondary/60 rounded-2xl p-5 mb-5">
            <div className="text-xs text-muted-foreground mb-1">رقم الطلب</div>
            <div className="font-heading text-2xl font-extrabold text-primary tracking-wider">{success.request_number}</div>
            <div className="text-sm text-muted-foreground mt-3">التكلفة التقديرية: <span className="font-bold text-foreground">{success.estimated_cost.toLocaleString("ar-EG")} ريال</span> (استرشادي)</div>
          </div>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">احتفظ برقم الطلب لمتابعة حالته. التكلفة تقديرية وتُؤكد بعد المراجعة. رفع التقرير لا يعني اعتماد النتيجة أو ضمان قبول التمور للتصدير.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/dashboard")} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90">متابعة الطلب من لوحة التحكم</button>
            <button onClick={() => { setSuccess(null); setFiles([]); setConsent(false); setForm((f) => ({ ...f, facility_name: "", applicant_name: "", phone: "", quantity: "", notes: "", batch_number: "" })); }} className="px-6 py-3 rounded-full bg-secondary text-foreground font-bold hover:bg-accent">تقديم طلب جديد</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-1">طلب خدمة معالجة متبقيات المبيدات</h1>
        <p className="text-muted-foreground text-sm">املأ النموذج بدقة. الحقول المطلوبة مشار إليها بعلامة <span className="text-destructive">*</span>.</p>
      </div>

      {error && <div className="bg-destructive/10 text-destructive rounded-2xl p-4 text-sm font-medium">{error}</div>}

      {/* Client data */}
      <SectionCard title="بيانات العميل" icon={<span className="text-primary">👤</span>}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="نوع العميل" required>
            <SelectInput value={form.client_type} onChange={set("client_type")}>
              <option value="مزرعة">مزرعة</option>
              <option value="مصنع">مصنع</option>
            </SelectInput>
          </Field>
          <Field label="اسم المزرعة أو المصنع" required>
            <TextInput value={form.facility_name} onChange={set("facility_name")} placeholder="اسم المنشأة" />
          </Field>
          <Field label="اسم مقدم الطلب" required>
            <TextInput value={form.applicant_name} onChange={set("applicant_name")} placeholder="الاسم الكامل" />
          </Field>
          <Field label="رقم التواصل" required>
            <TextInput value={form.phone} onChange={set("phone")} placeholder="05xxxxxxxx" inputMode="tel" />
          </Field>
          <Field label="المدينة">
            <TextInput value={form.city} onChange={set("city")} placeholder="المدينة" />
          </Field>
          <Field label="المنطقة">
            <TextInput value={form.region} onChange={set("region")} placeholder="المنطقة" />
          </Field>
        </div>
      </SectionCard>

      {/* Dates data */}
      <SectionCard title="بيانات التمور" icon={<span className="text-primary">🌴</span>}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="نوع التمر" required>
            <SelectInput value={form.date_variety} onChange={set("date_variety")}>
              {VARIETIES.map((v) => <option key={v} value={v}>{v}</option>)}
            </SelectInput>
          </Field>
          <Field label="الكمية" required>
            <div className="flex gap-2">
              <TextInput type="number" min="0" step="0.01" value={form.quantity} onChange={set("quantity")} placeholder="الكمية" />
              <SelectInput value={form.quantity_unit} onChange={set("quantity_unit")} className="w-28">
                <option value="طن">طن</option>
                <option value="كيلوغرام">كيلوغرام</option>
              </SelectInput>
            </div>
          </Field>
          <Field label="الوزن الإجمالي المطلوب معالجته">
            <TextInput type="number" min="0" step="0.01" value={form.total_weight} onChange={set("total_weight")} placeholder="الوزن" />
          </Field>
          <Field label="رقم التشغيلة أو الدفعة">
            <TextInput value={form.batch_number} onChange={set("batch_number")} placeholder="إن وجد" />
          </Field>
          <Field label="تاريخ الحصاد أو الإنتاج">
            <TextInput type="date" value={form.harvest_date} onChange={set("harvest_date")} />
          </Field>
          <Field label="حالة التمور الحالية">
            <TextInput value={form.current_status_text} onChange={set("current_status_text")} placeholder="مثال: محفوظة بدرجة حرارة معتدلة" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="ملاحظات إضافية">
              <TextAreaInput value={form.notes} onChange={set("notes")} placeholder="أي معلومات تود إضافتها" />
            </Field>
          </div>
        </div>
      </SectionCard>

      {/* Previous analysis */}
      <SectionCard title="بيانات التحاليل السابقة" icon={<span className="text-primary">🧪</span>}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="اسم المختبر الذي أصدر التقرير">
            <TextInput value={form.lab_name} onChange={set("lab_name")} placeholder="اسم المختبر" />
          </Field>
          <Field label="تاريخ التحليل">
            <TextInput type="date" value={form.analysis_date} onChange={set("analysis_date")} />
          </Field>
          <Field label="اسم المبيد أو المادة الفعالة">
            <TextInput value={form.pesticide_name} onChange={set("pesticide_name")} placeholder="إن كان معلومًا" />
          </Field>
          <Field label="نتيجة التحليل ووحدة القياس">
            <div className="flex gap-2">
              <TextInput value={form.analysis_result} onChange={set("analysis_result")} placeholder="النتيجة" />
              <TextInput value={form.analysis_unit} onChange={set("analysis_unit")} placeholder="الوحدة" />
            </div>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="إرفاق تقرير التحليل المخبري السابق" hint="PDF أو JPG أو PNG — حتى 10 ميجابايت لكل ملف. يمكن إرفاق أكثر من تقرير. المرفقات تُخزَّن بشكل خاص.">
            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer text-sm font-semibold text-muted-foreground">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "جارٍ الرفع..." : "اختر الملفات لرفعها"}
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={onFiles} disabled={uploading} />
            </label>
          </Field>
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-secondary/60 rounded-xl px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 truncate"><FileText className="w-4 h-4 text-primary shrink-0" /> {f.name}</span>
                  <button onClick={() => removeFile(i)} className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Consent */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-5 h-5 rounded accent-primary" />
          <span className="text-sm leading-relaxed">أُقرّ بصحة البيانات المقدمة، وأعلم أن رفع تقرير التحليل لا يعني اعتماد النتيجة أو ضمان قبول التمور للتصدير، وأن القرار النهائي يعتمد على التحليل المختبري الموثق والأنظمة المعتمدة.</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pb-8">
        <button onClick={submit} disabled={submitting || uploading} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-extrabold disabled:opacity-50 hover:opacity-90">
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FlaskConical className="w-5 h-5" />}
          {submitting ? "جارٍ الإرسال..." : "إرسال الطلب"}
        </button>
        <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-secondary text-foreground font-bold hover:bg-accent text-sm">
          <ArrowLeft className="w-4 h-4" /> إلغاء
        </button>
      </div>

      <div className="bg-secondary/40 rounded-2xl p-4 flex items-start gap-3 pb-8">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">المنصة تستقبل الطلبات وتديرها وتنسّق الخدمة مع الجهة التشغيلية والمختبر المتعاون، ولا تنفذ المعالجة الفيزيائية بنفسها.</p>
      </div>
    </div>
  );
}