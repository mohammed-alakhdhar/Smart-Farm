import React, { useEffect, useState } from "react";
import { Recycle, Loader2, Check, X, Upload, FileText, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Field, TextInput, SelectInput, TextAreaInput, SectionCard } from "@/components/FormBits";
import { StatusBadge, WASTE_COLORS } from "@/components/StatusBadge";

const WASTE_TYPES = ["سعف النخيل", "جريد النخيل", "ليف النخيل", "نوى التمر", "تمور غير صالحة للاستخدام الغذائي", "مخلفات زراعية أخرى"];

const OPPORTUNITIES = {
  "سعف النخيل": ["تسميد عضي", "صناعة سلال وأواني وحرف يدوية", "أعلاف بعد التحقق من السلامة", "ألياف ومواد صناعية"],
  "جريد النخيل": ["بناء وتأثيث ريفي", "أسوار ودعامات زراعية", "حرف يدوية"],
  "ليف النخيل": ["ألياف طبيعية", "صناعة الحبال والفرش", "مواد عزل"],
  "نوى التمر": ["أعلاف الحيوانات بعد التحقق من السلامة", "وقود حيوي", "تسميد عضي"],
  "تمور غير صالحة للاستخدام الغذائي": ["تخمّر وتسميد عضي", "وقود حيوي", "أعلاف بعد التحقق من عدم وجود متبقيات خطرة"],
  "مخلفات زراعية أخرى": ["تسميد عضي", "وقود حيوي", "مواد زراعية"]
};

export default function WasteService() {
  const [form, setForm] = useState({ waste_type: "سعف النخيل", quantity: "", quantity_unit: "طن", location: "", storage_condition: "", intent: "استفادة", notes: "" });
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const load = async () => {
    setLoading(true);
    try {
      const { items } = await base44.entities.WasteRecord.filter({}, { sort: "-created_date", limit: 50 });
      setRecords(items);
    } catch (e) {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onPhotos = async (e) => {
    const list = Array.from(e.target.files || []).slice(0, 4);
    if (!list.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of list) {
        if (file.size > 10 * 1024 * 1024) continue;
        const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
        uploaded.push({ uri: file_uri, name: file.name });
      }
      setPhotos((p) => [...p, ...uploaded]);
    } catch (err) {
      setError("تعذّر رفع الصورة");
    } finally { setUploading(false); e.target.value = ""; }
  };

  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const submit = async () => {
    setError("");
    if (!form.quantity || !form.location) { setError("يرجى تعبئة الكمية والموقع."); return; }
    setSubmitting(true);
    try {
      const opportunities = (OPPORTUNITIES[form.waste_type] || []).join("، ");
      await base44.entities.WasteRecord.create({
        ...form,
        quantity: parseFloat(form.quantity) || 0,
        photos: photos.map((p) => p.uri),
        opportunities
      });
      setSuccess(form.waste_type);
      setForm({ waste_type: "سعف النخيل", quantity: "", quantity_unit: "طن", location: "", storage_condition: "", intent: "استفادة", notes: "" });
      setPhotos([]);
      load();
    } catch (err) {
      setError("تعذّر الحفظ: " + (err.message || ""));
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-1">حوّل مخلفاتك الزراعية إلى قيمة</h1>
        <p className="text-muted-foreground text-sm">اكتشف فرص الاستفادة من مخلفات النخيل والتمور بدلًا من التخلص منها دون استفادة.</p>
      </div>

      {success && (
        <div className="bg-primary/10 text-primary rounded-2xl p-4 flex items-center gap-3">
          <Check className="w-5 h-5" />
          <span className="text-sm font-bold">تم تسجيل مخلفاتك بنجاح. سيقوم فريق المنصة بمراجعتها والربط المحتمل مع الجهات المستفيدة.</span>
          <button onClick={() => setSuccess(null)} className="mr-auto p-1 rounded-lg hover:bg-primary/20"><X className="w-4 h-4" /></button>
        </div>
      )}

      {error && <div className="bg-destructive/10 text-destructive rounded-2xl p-4 text-sm font-medium">{error}</div>}

      <SectionCard title="سجّل مخلفاتك" icon={<Recycle className="w-5 h-5 text-olive" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="نوع المخلفات" required>
            <SelectInput value={form.waste_type} onChange={set("waste_type")}>
              {WASTE_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
            </SelectInput>
          </Field>
          <Field label="الكمية المتوفرة" required>
            <div className="flex gap-2">
              <TextInput type="number" min="0" step="0.01" value={form.quantity} onChange={set("quantity")} placeholder="الكمية" />
              <SelectInput value={form.quantity_unit} onChange={set("quantity_unit")} className="w-28">
                <option value="طن">طن</option>
                <option value="كيلوغرام">كيلوغرام</option>
                <option value="متر مكعب">متر مكعب</option>
              </SelectInput>
            </div>
          </Field>
          <Field label="الموقع" required>
            <TextInput value={form.location} onChange={set("location")} placeholder="الموقع" />
          </Field>
          <Field label="حالة المخلفات وطريقة التخزين">
            <TextInput value={form.storage_condition} onChange={set("storage_condition")} placeholder="مثال: مكشوفة، مغطاة، جافة" />
          </Field>
          <Field label="الرغبة">
            <SelectInput value={form.intent} onChange={set("intent")}>
              <option value="بيع">بيع</option>
              <option value="نقل">نقل</option>
              <option value="استفادة">استفادة</option>
            </SelectInput>
          </Field>
          <div className="sm:col-span-2">
            <Field label="ملاحظات">
              <TextAreaInput value={form.notes} onChange={set("notes")} placeholder="معلومات إضافية" />
            </Field>
          </div>
        </div>

        <div className="mt-4">
          <Field label="صور المخلفات" hint="JPG أو PNG — حتى 10 ميجابايت.">
            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer text-sm font-semibold text-muted-foreground">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "جارٍ الرفع..." : "اختر الصور"}
              <input type="file" multiple accept=".jpg,.jpeg,.png" className="hidden" onChange={onPhotos} disabled={uploading} />
            </label>
          </Field>
          {photos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {photos.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" /> {p.name}
                  <button onClick={() => removePhoto(i)} className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={submit} disabled={submitting || uploading} className="mt-5 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-olive text-white font-extrabold disabled:opacity-50">
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Recycle className="w-5 h-5" />} سجّل مخلفاتك
        </button>
      </SectionCard>

      {/* Opportunities */}
      <SectionCard title="فرص الاستفادة المحتملة" icon={<span className="text-olive">💡</span>}>
        <ul className="space-y-2">
          {(OPPORTUNITIES[form.waste_type] || []).map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm"><span className="text-olive mt-0.5">✓</span>{o}</li>
          ))}
        </ul>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">لا تُستخدم التمور الملوثة أو المخلفات المحتوية على متبقيات خطرة في الأعلاف أو المنتجات الغذائية دون تقييم سلامتها والتحقق من الأنظمة ذات الصلة. المنصة في هذه المرحلة تسجّل المخلفات وتربطها محتملًا مع الجهات المستفيدة دون الادّعاء بمعالجتها فعليًا.</p>
        </div>
      </SectionCard>

      {/* Records */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <h2 className="font-heading font-bold text-lg mb-4">سجلاتي السابقة</h2>
        {loading ? <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          : records.length === 0 ? <div className="text-sm text-muted-foreground py-6 text-center">لا توجد سجلات بعد</div>
          : (
            <div className="space-y-3">
              {records.map((w) => (
                <div key={w.id} className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold">{w.waste_type}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{w.quantity} {w.quantity_unit} · {w.location} · {w.intent}</div>
                    {w.opportunities && <div className="text-xs text-muted-foreground mt-1">فرص: {w.opportunities}</div>}
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