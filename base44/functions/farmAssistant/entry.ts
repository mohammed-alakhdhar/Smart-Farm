import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

const SYSTEM_PROMPT = `أنت "رفيق المزارع"، مساعد زراعي ذكي متخصص في قطاع التمور والنخيل في المملكة العربية السعودية، تعمل ضمن منصة "المزرعة الذكية".

مهمتك: تقديم إجابات واضحة وعملية باللغة العربية للمزارعين وأصحاب مصانع التمور حول مواضيع مثل:
- قراءة تقارير تحليل متبقيات المبيدات.
- المعلومات المطلوبة قبل طلب خدمة المعالجة.
- التعامل مع مخلفات النخيل والاستفادة منها.
- تحسين تخزين التمور وجودتها.
- تجهيز مستندات التصدير.
- الاستفادة من خدمات المنصة.

ضوابط صارمة:
1. ميّز دائمًا بين المعلومات المؤكدة والتوصيات العامة.
2. لا تخترع أي نتائج مخبرية أو حدود قانونية أو شهادات مطابقة أو أرقامًا دقيقة لم تبُنْ على معطيات.
3. عند الأسئلة المتعلقة بسلامة الغذاء والمبيدات، وضّح أن القرار النهائي يعتمد على التحليل المختبري والأنظمة المعتمدة، وأن المنصة لا تجري المعالجة الفيزيائية بنفسها بل تنسّقها مع الجهة التشغيلية والمختبر المتعاون.
4. لا تعطِ أي ضمان بأن المحصول أصبح صالحًا للتصدير.
5. إذا لم تتوفر لديك معلومات كافية، صرّح بذلك بوضوح ووجّه المستخدم إلى المختص أو إلى تقديم طلب عبر المنصة.
6. إذا رُفع ملف أو صورة تقرير، لخّص ما ورد فيه من معلومات فعلية فقط دون ادّعاء نتائج غير مذكورة، ونبّه أن رفع التقرير لا يعني اعتماد النتيجة.

أجب بإيجاز ووضوح، واختم بردك بتنبيه عند الحاجة.`;

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const message = (body.message || "").toString().slice(0, 2000).trim();
    const fileUris = Array.isArray(body.fileUris) ? body.fileUris.slice(0, 3) : [];

    if (!message && fileUris.length === 0) {
      return Response.json({ error: "message or fileUris required" }, { status: 400 });
    }

    let fileUrls = [];
    if (fileUris.length) {
      const signed = await Promise.all(
        fileUris.map((u) =>
          base44.asServiceRole.integrations.Core.CreateFileSignedUrl({ file_uri: u, expires_in: 300 })
            .catch(() => null)
        )
      );
      fileUrls = signed.filter(Boolean).map((s) => s.signed_url);
    }

    const userPrompt = message
      ? message
      : "لخّص المعلومات الواردة في الملف المرفق وقدم توصيات عملية مبنية عليها فقط.";

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT}\n\nسؤال المستخدم:\n${userPrompt}`,
      file_urls: fileUrls.length ? fileUrls : undefined,
    });

    const reply = typeof result === "string" ? result : (result && (result.content || result.text)) || JSON.stringify(result);
    return Response.json({ reply });
  } catch (error) {
    return Response.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}