// Livénea Lab · interacciones del sitio (sin dependencias)
// Todas las imágenes son espacios en blanco con modelos ficticios y la medida de la foto final.

const PRODUCTS = [
  { id: "dia", cat: "dia", name: "Ritual Día", tag: "Colágeno, probióticos y vitaminas para empezar el día." },
  { id: "noche", cat: "noche", name: "Ritual Noche", tag: "Colágeno, magnesio, cacao y reishi para cerrar el día." },
  { id: "belleza", cat: "belleza", name: "Pelo · Uñas · Piel", tag: "Biotina, zinc, vitaminas y aminoácidos en cápsulas." },
  { id: "creatina", cat: "rendimiento", name: "Creatina", tag: "Monohidrato puro, micronizado.", soon: true },
  { id: "omega", cat: "rendimiento", name: "Omega 3", tag: "EPA y DHA de aceite de pescado purificado.", soon: true },
  { id: "electrolitos", cat: "rendimiento", name: "Electrolitos", tag: "Hidratación sin azúcar añadida.", soon: true },
];
const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

// Siluetas ficticias (sin fotos reales)
const FIG = {
  modelo: `<svg class="fig" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <path d="M98 128c-6-62 110-74 108 0 4 52-4 104-10 150H108c-6-46-14-98-10-150Z" fill="#D9D5CE"/>
    <rect x="133" y="176" width="34" height="56" rx="14" fill="#E4E1DB"/>
    <ellipse cx="150" cy="128" rx="44" ry="56" fill="#E4E1DB"/>
    <path d="M34 400c0-104 52-158 116-158s116 54 116 158Z" fill="#EAE7E2"/></svg>`,
  producto: `<svg class="fig fig-prod" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect x="104" y="118" width="92" height="34" rx="5" fill="#DCD8D1"/>
    <rect x="98" y="146" width="104" height="170" rx="8" fill="#E7E4DF"/>
    <rect x="122" y="214" width="56" height="4" rx="2" fill="#D6D2CB"/>
    <rect x="132" y="226" width="36" height="3" rx="1.5" fill="#D6D2CB"/>
    <ellipse cx="150" cy="330" rx="74" ry="7" fill="#E9E7E3"/></svg>`,
  conProducto: `<svg class="fig" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <path d="M98 128c-6-62 110-74 108 0 4 52-4 104-10 150H108c-6-46-14-98-10-150Z" fill="#D9D5CE"/>
    <rect x="133" y="176" width="34" height="56" rx="14" fill="#E4E1DB"/>
    <ellipse cx="150" cy="128" rx="44" ry="56" fill="#E4E1DB"/>
    <path d="M34 400c0-104 52-158 116-158s116 54 116 158Z" fill="#EAE7E2"/>
    <rect x="196" y="262" width="44" height="16" rx="3" fill="#D3CFC8"/>
    <rect x="192" y="274" width="52" height="80" rx="6" fill="#DFDBD5"/>
    <ellipse cx="218" cy="352" rx="34" ry="16" fill="#E4E1DB"/></svg>`,
};

// Espacio en blanco con silueta y medida de la imagen
function ph(kind, size, cls = "") {
  return `<div class="ph ${cls}">${FIG[kind]}${size ? `<span class="ph-label">${size}</span>` : ""}</div>`;
}
document.querySelectorAll("[data-ph]").forEach(el => {
  el.insertAdjacentHTML("afterbegin", ph(el.dataset.ph, el.dataset.size, el.dataset.phClass || ""));
});

// 5. Carrusel de productos con pestañas
const prodTrack = document.getElementById("prod-track");
prodTrack.innerHTML = PRODUCTS.map(p => `
  <article class="pcard" data-group="${p.soon ? "pronto" : "lanzamiento"}">
    <div class="pc-media">
      ${ph("producto", "Producto · 1200 × 1500 px · 4:5 · fondo neutro", "label-top")}
      <span class="pc-badge">${p.soon ? "Próximamente" : "Lanzamiento | Lista de espera"}</span>
      <a class="pc-add" href="#newsletter" data-interest="${p.cat}">Avísame</a>
    </div>
    <div class="pc-info">
      <h3 class="pc-name">${p.name}</h3>
      <p class="pc-tag">${p.tag}</p>
      <div class="pc-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <p class="pc-price">${p.soon ? "Muy pronto" : "Precio de lanzamiento: muy pronto"}</p>
    </div>
  </article>`).join("");

function setTab(tab) {
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
  prodTrack.querySelectorAll(".pcard").forEach(c => { c.hidden = tab !== "todos" && c.dataset.group !== tab; });
  prodTrack.scrollLeft = 0;
}
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));
document.querySelectorAll(".tile[data-tab]").forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

// Flechas de los carruseles
document.querySelectorAll(".arrows button").forEach(b => b.addEventListener("click", () => {
  const t = document.getElementById(b.dataset.target);
  const card = [...t.children].find(c => !c.hidden);
  const w = card ? card.getBoundingClientRect().width : 300;
  t.scrollBy({ left: w * Number(b.dataset.dir) });
}));

// 7. Historias verticales (video o foto 9:16) con producto
const STORIES = [
  { kind: "conProducto", cap: "Mi ritual de la mañana", prod: "dia" },
  { kind: "modelo", cap: "Antes de dormir", prod: "noche" },
  { kind: "conProducto", cap: "Lo que llevo en la cartera", prod: "belleza", feat: true },
  { kind: "modelo", cap: "Después de entrenar", prod: "creatina" },
  { kind: "conProducto", cap: "En la consulta", prod: "dia" },
];
document.getElementById("stories-track").innerHTML = STORIES.map(s => {
  const p = byId[s.prod];
  return `<article class="story${s.feat ? " feat" : ""}">
    <div class="story-media">${ph(s.kind, "Video o foto vertical · 1080 × 1920 px · 9:16")}<p class="cap">${s.cap}</p></div>
    <a class="chip" href="#newsletter" data-interest="${p.cat}">
      <span class="chip-img">${FIG.producto}</span>
      <span><b>${p.name}</b><span>${p.soon ? "Muy pronto" : "Lista de espera"}</span></span>
      <svg class="chev"><use href="#i-prev"/></svg>
    </a>
  </article>`;
}).join("");
const st = document.getElementById("stories-track");
requestAnimationFrame(() => { const f = st.querySelector(".feat"); if (f) st.scrollLeft = f.offsetLeft - (st.clientWidth - f.clientWidth) / 2; });

// 10. Journal
const POSTS = [
  { kind: "modelo", min: 6, t: "Colágeno: qué dice la ciencia y qué no", ex: "Cuánto tomar, qué tipo elegir y cuánto tiempo esperar para notar cambios en la piel." },
  { kind: "conProducto", min: 5, t: "Magnesio y descanso: la guía corta", ex: "Las formas de magnesio no son iguales. Por qué elegimos bisglicinato para el Ritual Noche." },
  { kind: "modelo", min: 7, t: "Tu microbiota también envejece", ex: "Fibra, probióticos y comida real: lo que sí cuenta para el largo plazo." },
  { kind: "producto", min: 4, t: "Por qué elegimos aluminio rellenable", ex: "Un envase que dura años y recargas de papel: menos residuos en cada compra." },
];
document.getElementById("journal-track").innerHTML = POSTS.map(p => `
  <article class="jcard">
    <div class="j-img">${ph(p.kind, "Journal · 1200 × 1500 px · 4:5")}</div>
    <div class="j-body">
      <p class="j-meta">${p.min} min de lectura · Muy pronto</p>
      <h3 class="j-title">${p.t}</h3>
      <p class="j-ex">${p.ex}</p>
      <a class="link-under" href="#newsletter">Leer más</a>
    </div>
  </article>`).join("");

// Botones "Avísame" guardan el interés para la lista de espera
const interest = document.getElementById("wl-interest");
document.addEventListener("click", e => {
  const t = e.target.closest("[data-interest]");
  if (t && interest) interest.value = t.dataset.interest;
});

// 1. Anuncios rotativos
const ann = [...document.querySelectorAll(".ann-track p")];
let ai = 0, at;
const showAnn = i => { ann[ai].classList.remove("on"); ai = (i + ann.length) % ann.length; ann[ai].classList.add("on"); };
const autoAnn = () => { clearInterval(at); at = setInterval(() => showAnn(ai + 1), 5000); };
document.querySelectorAll(".ann-btn").forEach(b => b.addEventListener("click", () => { showAnn(ai + Number(b.dataset.dir)); autoAnn(); }));
autoAnn();

// 3. Slideshow del hero
const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dots button")];
let si = 0, stimer;
const showSlide = i => {
  slides[si].classList.remove("on"); dots[si].classList.remove("on");
  si = (i + slides.length) % slides.length;
  slides[si].classList.add("on"); dots[si].classList.add("on");
};
const autoSlide = () => { clearInterval(stimer); stimer = setInterval(() => showSlide(si + 1), 6500); };
dots.forEach((d, i) => d.addEventListener("click", () => { showSlide(i); autoSlide(); }));
autoSlide();

// Menú móvil
const menuBtn = document.getElementById("menu-btn");
const drawer = document.getElementById("drawer");
menuBtn.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { drawer.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }));

// Lista de espera (footer)
const form = document.getElementById("waitlist-form");
const msg = document.getElementById("wl-msg");
form.addEventListener("submit", async e => {
  e.preventDefault();
  const email = form.email.value.trim();
  msg.className = "form-msg";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Revisa tu correo, parece que falta algo.";
    msg.classList.add("err");
    return;
  }
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const r = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, interest: form.interest.value }),
    });
    if (!r.ok) throw new Error(String(r.status));
    form.reset();
    msg.textContent = "Listo, ya estás en la lista. Te escribiremos antes del lanzamiento.";
    msg.classList.add("ok");
  } catch {
    msg.textContent = "No pudimos guardar tu correo. Inténtalo de nuevo en un momento.";
    msg.classList.add("err");
  } finally {
    btn.disabled = false;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
