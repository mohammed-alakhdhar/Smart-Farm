import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, Upload, FileText, X, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SUGGESTIONS = [
  "كيف أقرأ تقرير تحليل متبقيات المبيدات؟",
  "ما المعلومات التي أحتاجها قبل طلب خدمة المعالجة؟",
  "كيف أتعامل مع مخلفات النخيل؟",
  "كيف أحسن تخزين التمور وجودتها؟",
  "ما الإجراءات التي تساعدني في تجهيز مستندات التصدير؟",
  "كيف أستفيد من خدمات المنصة؟"
];

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "مرحبًا بك! أنا رفيق المزارع، مساعدك الزراعي الذكي. اسألني أي سؤال حول التمور والنخيل وخدمات المنصة، أو ارفع ملف تقرير تحليل لألخّص لك ما ورد فيه." }
  ]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const onFiles = async (e) => {
    const list = Array.from(e.target.files || []).slice(0, 3);
    if (!list.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of list) {
        if (file.size > 10 * 1024 * 1024) continue;
        const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
        uploaded.push({ uri: file_uri, name: file.name });
      }
      setFiles((p) => [...p, ...uploaded]);
    } catch (err) {
      setError("تعذّر رفع الملف");
    } finally { setUploading(false); e.target.value = ""; }
  };

  const removeFile = (i) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const send = async (text) => {
    const message = (text ?? input).trim();
    if ((!message && files.length === 0) || sending) return;
    setInput("");
    setError("");
    const userMsg = { role: "user", content: message || "رفعت ملفًا للتلخيص.", files: files.map((f) => f.name) };
    const fileUris = files.map((f) => f.uri);
    setFiles([]);
    setMessages((m) => [...m, userMsg]);
    setSending(true);
    try {
      const res = await base44.functions.invoke("farmAssistant", { message, fileUris });
      if (res.data?.error) throw new Error(res.data.error);
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply || "عذرًا، لم أتمكن من الرد الآن." }]);
    } catch (err) {
      setError("تعذّر الحصول على رد: " + (err.message || ""));
      setMessages((m) => [...m, { role: "assistant", content: "تعذّر الاتصال بالمساعد حاليًا. يرجى المحاولة لاحقًا." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center"><Sparkles className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="font-heading text-2xl font-extrabold">رفيق المزارع</h1>
          <p className="text-sm text-muted-foreground">مساعدك الزراعي الذكي</p>
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden flex flex-col" style={{ height: "calc(100vh - 220px)", minHeight: "420px" }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                {m.content}
                {m.files && m.files.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.files.map((f, j) => <span key={j} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/15 text-xs"><FileText className="w-3 h-3" /> {f}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-end">
              <div className="bg-secondary rounded-2xl px-4 py-3"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            </div>
          )}
        </div>

        {error && <div className="px-4 pb-2 text-xs text-destructive">{error}</div>}

        {files.length > 0 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 bg-secondary rounded-lg px-2 py-1 text-xs">
                <FileText className="w-3 h-3 text-primary" /> {f.name}
                <button onClick={() => removeFile(i)} className="p-0.5 rounded hover:bg-destructive/10 text-destructive"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-border p-3">
          <div className="flex items-end gap-2">
            <label className="p-2.5 rounded-xl bg-secondary hover:bg-accent cursor-pointer shrink-0">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={onFiles} disabled={uploading} />
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="اكتب سؤالك هنا..."
              rows={1}
              className="flex-1 resize-none bg-secondary rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-primary max-h-32"
            />
            <button onClick={() => send()} disabled={sending || (!input.trim() && files.length === 0)} className="p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 hover:opacity-90 shrink-0">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} disabled={sending} className="px-3.5 py-1.5 rounded-full bg-secondary text-xs font-semibold text-foreground/80 hover:bg-accent disabled:opacity-50 text-right">
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-secondary/40 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">رفيق المزارع مدعوم بالذكاء الاصطناعي ويقدّم توصيات عامة. لا يُدّعى تقديم نتائج مخبرية أو شهادات مطابقة، والقرار النهائي لسلامة الغذاء يعتمد على التحليل المختبري والأنظمة المعتمدة. الملفات المرفوعة تُخزَّن بشكل خاص.</p>
      </div>
    </div>
  );
}