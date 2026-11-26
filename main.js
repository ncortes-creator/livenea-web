// Livénea Lab · interacciones del sitio (sin dependencias)

const PRODUCTS = [
  { id: "dia", cat: "dia", name: "Ritual Día", tag: "Colágeno, probióticos y vitaminas para empezar el día.", badge: "Lanzamiento",
    detail: "Polvo para disolver en agua · 5 g de colágeno · probióticos de 14 cepas · vitamina C y complejo B",
    pack: { kind: "tin", body: ["#8E7A5C", "#D6C3A0", "#A8916C", "#7A6648"], ink: "#2B2D2B", label: "RITUAL DÍA", sub: "Polvo · 30 porciones" } },
  { id: "noche", cat: "noche", name: "Ritual Noche", tag: "Colágeno, magnesio, cacao y reishi para cerrar el día.", badge: "Lanzamiento",
    detail: "Polvo sabor cacao · 5 g de colágeno · magnesio bisglicinato · reishi · sin azúcar añadida",
    pack: { kind: "tin", body: ["#1F2120", "#4A4D4B", "#333634", "#1B1D1C"], ink: "#E6E2DA", label: "RITUAL NOCHE", sub: "Polvo · 30 porciones" } },
  { id: "belleza", cat: "belleza", name: "Pelo · Uñas · Piel", tag: "Biotina, zinc, vitaminas y aminoácidos en cápsulas.", badge: "Lanzamiento",
    detail: "Cápsulas diarias · biotina · zinc bisglicinato · L-cisteína y L-metionina · vitaminas C, E y D3",
    pack: { kind: "bottle", body: ["#E2D9CA", "#FBF8F2", "#EDE6DA", "#DCD2C2"], ink: "#2B2D2B", label: "PELO · UÑAS · PIEL", sub: "60 cápsulas" } },
  { id: "creatina", cat: "rendimiento", name: "Creatina", tag: "Monohidrato puro, micronizado.", badge: "Próximamente", soon: true,
    detail: "Monohidrato de creatina · 300 g · 60 porciones",
    pack: { kind: "tin", tall: true, body: ["#1F2120", "#4A4D4B", "#333634", "#1B1D1C"], ink: "#C9CCCA", label: "CREATINA", sub: "300 g" } },
  { id: "omega", cat: "rendimiento", name: "Omega 3", tag: "EPA y DHA de aceite de pescado purificado.", badge: "Próximamente", soon: true,
    detail: "Cápsulas blandas · EPA · DHA",
    pack: { kind: "tin", body: ["#1D2730", "#3E4D5A", "#2B3742", "#18212A"], ink: "#D7DEE3", label: "OMEGA 3", sub: "60 cápsulas" } },
  { id: "electrolitos", cat: "rendimiento", name: "Electrolitos", tag: "Hidratación sin azúcar añadida.", badge: "Próximamente", soon: true,
    detail: "Polvo para disolver · sabor natural · 30 porciones",
    pack: { kind: "tin", body: ["#3A453C", "#6F7E70", "#55635A", "#333D35"], ink: "#E3E9E0", label: "ELECTROLITOS", sub: "30 porciones" } },
];

const ARCO = `<g>
  <path d="M18 112 V50 A32 32 0 0 1 82 50 V112" fill="none" stroke="currentColor" stroke-width="4"/>
  <path d="M10 112 H90" stroke="currentColor" stroke-width="4"/>
  <path d="M50 106 V44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <g fill="currentColor"><ellipse cx="50" cy="35" rx="3.4" ry="9"/>
  <ellipse cx="42.5" cy="52" rx="3.2" ry="8.5" transform="rotate(-30 42.5 52)"/><ellipse cx="57.5" cy="52" rx="3.2" ry="8.5" transform="rotate(30 57.5 52)"/>
  <ellipse cx="42.5" cy="68" rx="3.2" ry="8.5" transform="rotate(-30 42.5 68)"/><ellipse cx="57.5" cy="68" rx="3.2" ry="8.5" transform="rotate(30 57.5 68)"/>
  <ellipse cx="42.5" cy="84" rx="3.2" ry="8.5" transform="rotate(-30 42.5 84)"/><ellipse cx="57.5" cy="84" rx="3.2" ry="8.5" transform="rotate(30 57.5 84)"/></g></g>`;

let uid = 0;
// Dibuja un envase (lata de aluminio o frasco marfil) en SVG
function packSVG(p, cls = "pack") {
  const id = "g" + (uid++);
  const [a, b, c, d] = p.body;
  const grad = `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".42" stop-color="${b}"/><stop offset=".6" stop-color="${c}"/><stop offset="1" stop-color="${d}"/></linearGradient>
    <linearGradient id="${id}l" x1="0" x2="1"><stop offset="0" stop-color="#9C9993"/><stop offset=".4" stop-color="#EEEDEA"/><stop offset=".6" stop-color="#D6D4CF"/><stop offset="1" stop-color="#9C9993"/></linearGradient>`;
  const fs = p.label.length > 12 ? 8.4 : 11;
  if (p.kind === "bottle") {
    return `<svg class="${cls}" viewBox="0 0 160 260" aria-hidden="true"><defs>${grad}</defs>
      <rect x="44" y="18" width="72" height="40" rx="5" fill="url(#${id}l)"/>
      <rect x="20" y="54" width="120" height="196" rx="22" fill="url(#${id})"/>
      <g color="#4E5B4F"><svg x="66" y="88" width="28" height="34" viewBox="0 0 100 120">${ARCO}</svg></g>
      <text x="80" y="142" text-anchor="middle" font-family="Marcellus, Georgia, serif" font-size="11" letter-spacing="3" fill="${p.ink}">LIVÉNEA LAB</text>
      <line x1="62" y1="152" x2="98" y2="152" stroke="#4E5B4F" stroke-width=".7"/>
      <text x="80" y="172" text-anchor="middle" font-family="Jost, sans-serif" font-weight="500" font-size="${fs}" letter-spacing="1.6" fill="${p.ink}">${p.label}</text>
      <text x="80" y="226" text-anchor="middle" font-family="Jost, sans-serif" font-size="7" letter-spacing="1.4" fill="${p.ink}" opacity=".7">${p.sub.toUpperCase()}</text>
    </svg>`;
  }
  const h = p.tall ? 236 : 200, top = 260 - h - 8;
  return `<svg class="${cls}" viewBox="0 0 160 260" aria-hidden="true"><defs>${grad}</defs>
    <rect x="16" y="${top + 26}" width="128" height="${h - 26}" rx="6" fill="url(#${id})"/>
    <rect x="13" y="${top}" width="134" height="36" rx="6" fill="url(#${id})"/>
    <rect x="16" y="${top + 34}" width="128" height="1.4" fill="#000" opacity=".4"/>
    <g color="${p.ink}" opacity=".85"><svg x="65" y="${top + 62}" width="30" height="36" viewBox="0 0 100 120">${ARCO}</svg></g>
    <text x="80" y="${top + 120}" text-anchor="middle" font-family="Marcellus, Georgia, serif" font-size="11" letter-spacing="3" fill="${p.ink}">LIVÉNEA LAB</text>
    <line x1="62" y1="${top + 130}" x2="98" y2="${top + 130}" stroke="${p.ink}" stroke-width=".6" opacity=".6"/>
    <text x="80" y="${top + 150}" text-anchor="middle" font-family="Jost, sans-serif" font-weight="500" font-size="${fs}" letter-spacing="2" fill="${p.ink}">${p.label}</text>
    <text x="80" y="${top + h - 16}" text-anchor="middle" font-family="Jost, sans-serif" font-size="7" letter-spacing="1.4" fill="${p.ink}" opacity=".7">${p.sub.toUpperCase()}</text>
  </svg>`;
}


const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const icon = id => `<svg><use href="#${id}"/></svg>`;

// 5. Carrusel de productos con pestañas
const prodTrack = document.getElementById("prod-track");
prodTrack.innerHTML = PRODUCTS.map(p => `
  <article class="pcard" data-group="${p.soon ? "pronto" : "lanzamiento"}">
    <div class="pc-media">
      <span class="pc-badge">${p.soon ? "Próximamente" : "Lanzamiento | Lista de espera"}</span>
      ${packSVG(p.pack)}
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

// 7. Historias verticales con producto
const STORIES = [
  { img: "r-electro.jpg", cap: "La recarga llega en papel", prod: "electrolitos" },
  { img: "r-creatina.jpg", cap: "Una lata para siempre", prod: "creatina" },
  { img: "r-linea.jpg", cap: "Mañana, tarde y noche", prod: "dia", feat: true },
  { img: "r-omega.jpg", cap: "Sobre el velador", prod: "omega" },
  { img: "r-scoops.jpg", cap: "La medida justa", prod: "noche" },
];
document.getElementById("stories-track").innerHTML = STORIES.map(s => {
  const p = byId[s.prod];
  return `<article class="story${s.feat ? " feat" : ""}">
    <div class="story-media"><img src="/assets/${s.img}" alt="" loading="lazy"><p class="cap">${s.cap}</p></div>
    <a class="chip" href="#newsletter" data-interest="${p.cat}">
      <span class="chip-img">${packSVG(p.pack, "")}</span>
      <span><b>${p.name}</b><span>${p.soon ? "Muy pronto" : "Lista de espera"}</span></span>
      <svg class="chev"><use href="#i-prev"/></svg>
    </a>
  </article>`;
}).join("");
const st = document.getElementById("stories-track");
requestAnimationFrame(() => { const f = st.querySelector(".feat"); if (f) st.scrollLeft = f.offsetLeft - (st.clientWidth - f.clientWidth) / 2; });

// 8. Arte de los tiles
document.querySelectorAll(".tile-art").forEach(t => { t.innerHTML = packSVG(byId[t.dataset.pack].pack, ""); });

// 10. Journal
const POSTS = [
  { img: "r-creatina.jpg", min: 6, t: "Colágeno: qué dice la ciencia y qué no", ex: "Cuánto tomar, qué tipo elegir y cuánto tiempo esperar para notar cambios en la piel." },
  { img: "r-omega.jpg", min: 5, t: "Magnesio y descanso: la guía corta", ex: "Las formas de magnesio no son iguales. Por qué elegimos bisglicinato para el Ritual Noche." },
  { img: "r-electro.jpg", min: 7, t: "Tu microbiota también envejece", ex: "Fibra, probióticos y comida real: lo que sí cuenta para el largo plazo." },
  { img: "linea-aluminio.jpg", min: 4, t: "Por qué elegimos aluminio rellenable", ex: "Un envase que dura años y recargas de papel: menos residuos en cada compra." },
];
document.getElementById("journal-track").innerHTML = POSTS.map(p => `
  <article class="jcard">
    <div class="j-img"><img src="/assets/${p.img}" alt="" loading="lazy"></div>
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
