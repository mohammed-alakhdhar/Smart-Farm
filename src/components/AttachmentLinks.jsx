import React, { useState } from "react";
import { FileText, ExternalLink, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export function AttachmentLinks({ items }) {
  const [loading, setLoading] = useState(null);
  if (!items || items.length === 0) return <span className="text-xs text-muted-foreground">لا توجد مرفقات</span>;

  const open = async (uri, i) => {
    setLoading(i);
    try {
      const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri: uri, expires_in: 300 });
      window.open(signed_url, "_blank");
    } catch (e) {
      alert("تعذّر فتح الملف");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((uri, i) => (
        <button key={i} onClick={() => open(uri, i)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs font-semibold hover:bg-accent">
          {loading === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
          مرفق {i + 1} <ExternalLink className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}