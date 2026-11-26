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
function packSVG(p, cls = "tin") {
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

// Carrusel de productos
const carousel = document.getElementById("carousel");
carousel.innerHTML = PRODUCTS.map(p => `
  <article class="card" data-cat="${p.cat}">
    <div class="card-media">
      <span class="badge${p.soon ? " soon" : ""}">${p.badge}</span>
      ${packSVG(p.pack)}
      <div class="alt" style="background:${p.pack.body[3]}"><p><b>${p.name}</b>${p.detail}</p></div>
    </div>
    <h3>${p.name}</h3>
    <p class="tag">${p.tag}</p>
    <p class="price">${p.soon ? "Muy pronto" : "Precio: muy pronto"}</p>
    <a class="btn ${p.soon ? "btn-line" : "btn-solid"}" href="#lista" data-interest="${p.cat}">Avísame</a>
  </article>`).join("");

document.querySelectorAll("[data-scroll]").forEach(b => b.addEventListener("click", () => {
  const card = carousel.querySelector(".card");
  const step = card ? card.getBoundingClientRect().width + 20 : 300;
  carousel.scrollBy({ left: step * Number(b.dataset.scroll), behavior: "smooth" });
}));

// Bloque destacado: Día + Noche
document.querySelector(".tins-duo").innerHTML = packSVG(PRODUCTS[0].pack, "") + packSVG(PRODUCTS[1].pack, "");

// Píldoras por momento: resaltan los productos de esa categoría
document.querySelectorAll(".pills a").forEach(a => a.addEventListener("click", () => {
  const f = a.dataset.filter;
  const on = !a.classList.contains("on");
  document.querySelectorAll(".pills a").forEach(x => x.classList.remove("on"));
  if (on) a.classList.add("on");
  carousel.querySelectorAll(".card").forEach(c => c.classList.toggle("dim", on && c.dataset.cat !== f));
  const first = carousel.querySelector(`.card[data-cat="${f}"]`);
  if (on && first) setTimeout(() => carousel.scrollTo({ left: first.offsetLeft - carousel.offsetLeft - 16, behavior: "smooth" }), 400);
}));

// Botones "Avísame" preseleccionan el interés en el formulario
const interest = document.getElementById("wl-interest");
document.addEventListener("click", e => {
  const t = e.target.closest("[data-interest]");
  if (t && interest) interest.value = t.dataset.interest;
});

// Barra de anuncios rotativa
const slides = [...document.querySelectorAll(".announce-track p")];
let cur = 0, timer;
function show(i) {
  slides[cur].classList.remove("is-active");
  cur = (i + slides.length) % slides.length;
  slides[cur].classList.add("is-active");
}
function auto() { clearInterval(timer); timer = setInterval(() => show(cur + 1), 5000); }
document.querySelectorAll(".announce-btn").forEach(b => b.addEventListener("click", () => { show(cur + Number(b.dataset.dir)); auto(); }));
auto();

// Menú móvil
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

// Lista de espera
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
