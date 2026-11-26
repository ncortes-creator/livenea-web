// Recibe inscripciones de la lista de espera.
// Si existe la variable de entorno WAITLIST_WEBHOOK_URL (por ejemplo, un Google Apps Script
// que escribe en una planilla, o un webhook de Zapier/Make), reenvía ahí cada inscripción.
// Siempre queda registrada en los logs de Vercel (Project > Logs).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }
  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const interest = String(body.interest || "general").slice(0, 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Correo inválido" });
  }
  const entry = { email, interest, at: new Date().toISOString() };
  console.log("waitlist", JSON.stringify(entry));

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } catch (err) {
      console.error("waitlist webhook error", err);
      return res.status(502).json({ error: "No se pudo guardar" });
    }
  }
  return res.status(200).json({ ok: true });
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
