const BUSINESS = {
  name: "STTOR",
  legalName: "STTOR corporation",
  ruc: "10732133998",
  phone: "+51 956 692 971",
  whatsapp: "51956692971",
  address: "Av. San Martin 159, Ica, Peru",
  hours: "Lunes a sabado: 9:00 a.m. - 8:00 p.m.",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  maps: "https://maps.apple.com/?daddr=Av.%20San%20Martin%20159%2C%20Ica%2C%20Peru",
  appleMaps: "https://maps.apple.com/?q=Av.%20San%20Martin%20159%2C%20Ica%2C%20Peru",
  googleMaps: "https://www.google.com/maps/search/?api=1&query=Av.%20San%20Martin%20159%2C%20Ica%2C%20Peru",
  waze: "https://waze.com/ul?q=Av.%20San%20Martin%20159%2C%20Ica%2C%20Peru&navigate=yes"
};

const BRAND_LOGOS = {
  main: "assets/logo-sttor-transparent.png",
  light: "assets/logo-sttor-light.png",
  dark: "assets/logo-sttor-dark.png",
  service: "assets/logo-servicio-tecnico.png",
  icon: "assets/isotipo-logo-principal.png"
};

const LOGO_NONE = "__none__";
const TRANSPARENT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

const LOGO_SIZES = {
  main: 42,
  nav: 42,
  hero: 126,
  page: 260,
  service: 260,
  footer: 70,
  pageX: 82,
  pageY: 50
};

const NAV = [
  ["Inicio", "index.html", "home"],
  ["iPhone", "iphone.html", "iphone"],
  ["Mac", "mac.html", "mac"],
  ["iPad", "ipad.html", "ipad"],
  ["AirPods", "airpods.html", "airpods"],
  ["Apple Watch", "watch.html", "watch"],
  ["Accesorios", "accesorios.html", "accesorios"],
  ["Servicio Tecnico", "servicio-tecnico.html", "servicio"]
];

const CATEGORY_META = {
  iphone: {
    title: "iPhone",
    eyebrow: "Catalogo premium Apple",
    lede: "Modelos desde iPhone 13 hasta iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max y iPhone 17e. Comparativas claras, stock consultable y compra por WhatsApp.",
    icon: "iP",
    logo: "assets/logo-sttor-transparent.png"
  },
  mac: {
    title: "Mac",
    eyebrow: "Potencia para estudiar, crear y vender",
    lede: "MacBook Air, MacBook Pro, iMac y Mac mini en una experiencia sobria inspirada en Apple, con filtros por chip, uso y presupuesto.",
    icon: "Mac",
    logo: "assets/logo-sttor-transparent.png"
  },
  ipad: {
    title: "iPad",
    eyebrow: "Portabilidad con pantalla total",
    lede: "iPad, iPad Air, iPad Pro y iPad mini para productividad, universidad, dibujo, ventas y entretenimiento.",
    icon: "Pad",
    logo: "assets/logo-sttor-transparent.png"
  },
  airpods: {
    title: "AirPods",
    eyebrow: "Audio personal y cancelacion avanzada",
    lede: "AirPods 4, AirPods Pro 3 y AirPods Max con tarjetas interactivas y movimiento suave al pasar el cursor.",
    icon: "Air",
    logo: "assets/logo-sttor-transparent.png"
  },
  watch: {
    title: "Apple Watch",
    eyebrow: "Salud, deporte y conexion",
    lede: "Apple Watch SE 3, Series 11 y Ultra 3 con comparador visual para elegir por autonomia, material y uso.",
    icon: "W",
    logo: "assets/logo-sttor-transparent.png"
  },
  accesorios: {
    title: "Accesorios",
    eyebrow: "Energia, proteccion y conectividad",
    lede: "Cargadores, fundas, micas, cables, power banks y adaptadores listos para cotizacion inmediata.",
    icon: "Acc",
    logo: "assets/logo-sttor-transparent.png"
  }
};

const PRODUCTS = {
  iphone: [
    product("iPhone 17 Pro Max", "iPhone", "Titanio, A19 Pro, camaras Pro Fusion.", 5799, "Nuevo", "pro", "cosmic orange", "#ff7a2f", "#152033"),
    product("iPhone 17 Pro", "iPhone", "Potencia Pro en formato premium.", 5199, "Nuevo", "pro", "deep blue", "#183965", "#0a1020"),
    product("iPhone 17", "iPhone", "Pantalla ProMotion de 6.3 pulgadas y chip A19.", 3999, "Nuevo", "base", "lavanda", "#d8d0ff", "#5b71c8"),
    product("iPhone 17e", "iPhone", "Valor potente con Apple Intelligence.", 2899, "Nuevo", "base", "soft pink", "#f7b8cb", "#111111"),
    product("iPhone 16 Pro", "iPhone", "Camaras Pro, USB-C y rendimiento avanzado.", 4399, "Oferta", "pro", "black titanium", "#1a1b20", "#777b86"),
    product("iPhone 16", "iPhone", "A18, control de camara y gran bateria.", 3299, "Stock", "base", "ultramarine", "#2e59ff", "#d8f2ff"),
    product("iPhone 15", "iPhone", "Dynamic Island, USB-C y camara de 48 MP.", 2799, "Oferta", "base", "black", "#121212", "#87909f"),
    product("iPhone 14", "iPhone", "Confiable, veloz y listo para iOS 26.", 2299, "Stock", "base", "blue", "#b9d8ef", "#233752"),
    product("iPhone 13", "iPhone", "Entrada ideal al ecosistema Apple.", 1899, "Stock", "base", "green", "#586f66", "#d9eadf")
  ],
  mac: [
    product("MacBook Air M5 13", "MacBook Air", "Ligera, 512 GB base, Wi-Fi 7 y hasta 18 h.", 5799, "Nuevo", "air", "sky blue", "#b8d9ea", "#101827"),
    product("MacBook Air M5 15", "MacBook Air", "Mas pantalla, misma portabilidad premium.", 6599, "Nuevo", "air", "midnight", "#111827", "#4b5563"),
    product("MacBook Pro 14 M5 Pro", "MacBook Pro", "Para edicion, desarrollo y flujos Pro.", 8999, "Pro", "pro", "space black", "#050608", "#525866"),
    product("MacBook Pro 16 M5 Max", "MacBook Pro", "Maxima potencia movil para creadores.", 12999, "Pro", "max", "silver", "#d9dce3", "#6b7280"),
    product("iMac 24 M4", "iMac", "Todo en uno colorido para oficina y hogar.", 6999, "Stock", "desktop", "green", "#a7f3d0", "#111827"),
    product("Mac mini M4", "Mac mini", "Pequeno, rapido y perfecto para escritorio.", 3299, "Stock", "desktop", "silver", "#e5e7eb", "#9ca3af")
  ],
  ipad: [
    product("iPad Pro M4 13", "iPad Pro", "Pantalla Ultra Retina XDR y chip M4.", 6299, "Pro", "pro", "space black", "#0f1116", "#3f4653"),
    product("iPad Pro M4 11", "iPad Pro", "Pro, delgado y potente para creadores.", 5199, "Pro", "pro", "silver", "#e5e7eb", "#94a3b8"),
    product("iPad Air M4 13", "iPad Air", "Mas pantalla para estudiar y trabajar.", 3799, "Nuevo", "air", "blue", "#bdd7ff", "#64748b"),
    product("iPad Air M4 11", "iPad Air", "Ligero, moderno y compatible con Pencil.", 3199, "Nuevo", "air", "purple", "#d9ccff", "#5b55a5"),
    product("iPad 11 A16", "iPad", "El iPad esencial para todos los dias.", 1699, "Oferta", "base", "yellow", "#ffd866", "#ffffff"),
    product("iPad mini A17 Pro", "iPad mini", "Compacto, potente y listo para llevar.", 2799, "Stock", "mini", "starlight", "#f1eadf", "#8a8175")
  ],
  airpods: [
    product("AirPods Pro 3", "AirPods Pro", "Cancelacion activa avanzada y audio adaptativo.", 1199, "Nuevo", "pro", "white", "#ffffff", "#dbeafe", "audio"),
    product("AirPods 4 ANC", "AirPods", "Diseno iconico con cancelacion activa.", 799, "Nuevo", "base", "white", "#ffffff", "#e5e7eb", "audio"),
    product("AirPods 4", "AirPods", "Sonido espacial en formato ligero.", 599, "Stock", "base", "white", "#ffffff", "#d1d5db", "audio"),
    product("AirPods Max", "AirPods Max", "Audio circumaural, cinco colores y alta fidelidad.", 2499, "Pro", "max", "midnight", "#111827", "#6b7280", "audio")
  ],
  watch: [
    product("Apple Watch Ultra 3", "Ultra", "Titanio, aventura y hasta 42 h de bateria.", 3799, "Ultra", "ultra", "natural", "#c8b89b", "#ff7a18", "watch"),
    product("Apple Watch Series 11", "Series", "Salud avanzada y pantalla siempre activa.", 1899, "Nuevo", "series", "rose gold", "#e8c0ad", "#111827", "watch"),
    product("Apple Watch SE 3", "SE", "La entrada inteligente al Apple Watch.", 1199, "Stock", "se", "midnight", "#101827", "#64748b", "watch"),
    product("Apple Watch Hermetic Milanese", "Series", "Look ejecutivo con correa metalica.", 2499, "Premium", "series", "silver", "#d7dbe2", "#64748b", "watch")
  ],
  accesorios: [
    product("Cargador USB-C 20W", "Cargadores", "Carga rapida original para iPhone y iPad.", 119, "Stock", "carga", "white", "#ffffff", "#d1d5db", "accessory"),
    product("Adaptador dinamico 40W", "Cargadores", "Carga flexible con potencia maxima de 60 W.", 249, "Nuevo", "carga", "white", "#ffffff", "#cbd5e1", "accessory"),
    product("Cable USB-C trenzado", "Cables", "Resistente, rapido y compatible.", 89, "Stock", "conectividad", "white", "#e5e7eb", "#94a3b8", "accessory"),
    product("Funda MagSafe iPhone", "Fundas", "Proteccion premium con agarre magnetico.", 149, "Oferta", "proteccion", "pink", "#ff8fab", "#222", "accessory"),
    product("Mica Ceramic Shield", "Micas", "Proteccion de pantalla con acabado claro.", 69, "Stock", "proteccion", "clear", "#c7f0ff", "#e5e7eb", "accessory"),
    product("Power Bank MagSafe", "Power Banks", "Energia movil compacta para viajes.", 199, "Stock", "energia", "black", "#111827", "#374151", "accessory"),
    product("Hub USB-C Pro", "Adaptadores", "HDMI, USB-A, SD y carga pass-through.", 229, "Pro", "conectividad", "space", "#4b5563", "#111827", "accessory")
  ]
};

function product(name, family, desc, price, badge, tier, color, p1, p2, visual) {
  return { name, family, desc, price, badge, tier, color, p1, p2, visual };
}

const SERVICES = [
  service("Reparacion de iPhone", "Pantalla, bateria, camara, Face ID, carga y diagnostico especializado.", "iP", 49),
  service("Reparacion de Mac", "Diagnostico de placa, teclado, pantalla, bateria, puertos y software.", "Mac", 89),
  service("Cambio de bateria", "Evaluacion de ciclos, rendimiento y reemplazo con proceso seguro.", "Bat", 129),
  service("Cambio de pantalla", "Cristal, modulo completo, calibracion y pruebas finales.", "LCD", 199),
  service("Diagnostico express", "Revision tecnica, reporte claro y cotizacion transparente.", "DX", 39),
  service("Reparacion Face ID", "Evaluacion de sensores, camara TrueDepth y configuracion del sistema.", "ID", 149),
  service("Reparacion de placa", "Revision avanzada de placa, humedad, energia y fallas intermitentes.", "PCB", 249),
  service("Recuperacion de datos", "Evaluacion de software, respaldo y recuperacion cuando el estado del equipo lo permite.", "DATA", 99)
];

function service(title, copy, icon, price, image = "", active = true) {
  return {
    title,
    copy,
    icon,
    price,
    promoPrice: 0,
    priceFeatured: false,
    hidePrice: false,
    quoteLabel: "Cotizar por WhatsApp",
    image,
    gallery: [],
    active
  };
}

const BENEFITS = [
  ["Stock consultable", "Cotiza por WhatsApp y confirma disponibilidad antes de visitar tienda.", "ST"],
  ["Atencion especializada", "Equipo enfocado en Apple, con asesoramiento claro antes de comprar.", "SP"],
  ["Compra segura", "Datos comerciales visibles, ubicacion fisica en Ica y seguimiento directo.", "OK"],
  ["Servicio tecnico", "Diagnostico, reparacion y soluciones para iPhone, Mac, iPad y Watch.", "FX"]
];

const TESTIMONIALS = [
  testimonial("Me ayudaron a elegir un iPhone sin presion. Todo claro y rapido.", "Mariana G.", 4.8),
  testimonial("Deje mi Mac para diagnostico y me explicaron cada paso.", "Carlos R.", 4.7),
  testimonial("Compre AirPods y mica. Buena atencion y entrega el mismo dia.", "Lucia P.", 4.9)
];

function testimonial(copy, name, rating = 4.8) {
  return { copy, name, rating };
}

const HOME_CONTENT = {
  eyebrow: "Tienda Apple y soporte tecnico en Ica",
  title: "Compra Apple con asesoria clara y servicio local.",
  lede: "STTOR vende iPhone, Mac, iPad, AirPods, Apple Watch y accesorios, con soporte tecnico especializado y atencion directa en Av. San Martin 159."
};

const BANNERS = [
  { title: "Cotiza en menos de 30 segundos", copy: "Consulta stock, precio y disponibilidad directamente por WhatsApp.", active: true },
  { title: "Servicio tecnico especializado", copy: "Diagnostico para iPhone, Mac, iPad y Apple Watch con atencion local.", active: true }
];

const PROMOTIONS = [
  { title: "Promocion de accesorios", copy: "Pregunta por combos de mica, funda y cargador al comprar tu iPhone.", active: true }
];

const INFO_PAGES = {
  garantia: {
    eyebrow: "Compra segura",
    title: "Garantia y acompanamiento STTOR.",
    copy: "Te explicamos el estado del producto, condiciones de venta y soporte disponible antes de confirmar tu compra.",
    blocks: [
      ["Equipos sellados", "Productos nuevos segun stock disponible, con verificacion de modelo, color y capacidad antes de la entrega.", "✓"],
      ["Open Box iPhone", "Alternativa mas economica para iPhone seleccionados, revisada y explicada antes de pagar.", "OB"],
      ["Soporte por WhatsApp", "Acompanamiento directo para dudas de configuracion, accesorios, stock y recojo en tienda.", "W"],
      ["Servicio tecnico", "Diagnostico independiente para reparaciones, baterias, pantallas, software y liberaciones.", "ST"]
    ],
    cta: "Consultar garantia"
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Respuestas rapidas antes de comprar.",
    copy: "Informacion clara para que cualquier cliente pueda decidir rapido y sin dudas.",
    blocks: [
      ["¿Tienen tienda fisica?", `Si. Atendemos en ${BUSINESS.address}.`, "01"],
      ["¿Puedo consultar stock?", "Si. Puedes escribir por WhatsApp y pedir modelo, color, capacidad y precio actualizado.", "02"],
      ["¿Venden Open Box?", "Si, solo para iPhone seleccionados. El precio cambia segun estado, capacidad y disponibilidad.", "03"],
      ["¿Hacen servicio tecnico?", "Si. Revisamos iPhone, Mac, iPad, Apple Watch, baterias, pantallas, software y liberaciones.", "04"]
    ],
    cta: "Hacer una pregunta"
  },
  sobre: {
    eyebrow: "Quienes somos",
    title: "STTOR es una tienda Apple y servicio tecnico en Ica.",
    copy: "Trabajamos con una experiencia simple: productos claros, precios visibles, comunicacion directa y una ubicacion real para atenderte.",
    blocks: [
      ["Atencion local", "Estamos en Ica para que puedas consultar, recoger y recibir soporte presencial.", "IC"],
      ["Catalogo Apple", "iPhone, Mac, iPad, AirPods, Apple Watch y accesorios para completar tu compra.", "AP"],
      ["Servicio especializado", "Diagnostico documentado y comunicacion por WhatsApp durante el proceso.", "FX"],
      ["Datos visibles", `Nombre comercial: ${BUSINESS.legalName || "STTOR corporation"} · RUC: ${BUSINESS.ruc}`, "ID"]
    ],
    cta: "Contactar STTOR"
  }
};

const HOME_SLIDES = [
  { productName: "iPhone 17", eyebrow: "iPhone 17", title: "0% interes", subtitle: "24 cuotas desde", price: "S/174.96*", cta: "Recargalo aqui", href: "iphone.html", accent: "#ff801e", note: "Promocion referencial segun stock y evaluacion. Consulta disponibilidad por WhatsApp.", image: "", active: true },
  { productName: "MacBook Air M5 13", eyebrow: "MacBook Air", title: "Potencia ligera", subtitle: "Desde", price: "S/5,799", cta: "Ver Mac", href: "mac.html", accent: "#60b1ff", note: "Ideal para universidad, oficina y creacion de contenido.", image: "", active: true },
  { productName: "AirPods Pro 3", eyebrow: "AirPods Pro", title: "Audio premium", subtitle: "Cancelacion activa desde", price: "S/1,199", cta: "Ver audio", href: "airpods.html", accent: "#cfd6df", note: "Pregunta por combos con cargador, mica y funda.", image: "", active: true },
  { productName: "Cargador USB-C 20W", eyebrow: "Accesorios", title: "Completa tu compra", subtitle: "Combos desde", price: "S/69", cta: "Ver accesorios", href: "accesorios.html", accent: "#34c759", note: "Micas, fundas, cargadores y cables listos para entrega.", image: "", active: true }
];

const DECORATIONS = [
  decoration("home-after-categories", "Nuevo en STTOR", "Explora equipos y accesorios Apple con atencion directa en Ica.", "", true),
  decoration("home-after-iphone", "Completa tu compra", "Agrega accesorios, proteccion y carga rapida para tu equipo.", "", false),
  decoration("home-after-accessories", "Servicio tecnico Apple", "Diagnostico y soporte local para mantener tu equipo funcionando bien.", "", false),
  decoration("category-after-hero", "Elige con calma", "Compara modelos, precio y disponibilidad antes de comprar.", "", false),
  decoration("category-before-compare", "Asesoria STTOR", "Te ayudamos a elegir segun uso, presupuesto y stock.", "", false),
  decoration("service-after-hero", "Diagnostico especializado", "Servicio tecnico Apple con atencion clara y seguimiento por WhatsApp.", "", false),
  decoration("service-before-services", "Soluciones para tu equipo", "Reparacion de iPhone, Mac, bateria, pantalla, software y liberaciones.", "", false),
  decoration("service-before-contact", "Agenda tu revision", "Trae tu equipo a STTOR o coordina una evaluacion por WhatsApp.", "", false)
];

function decoration(slot, title, copy, image = "", active = false, mediaType = "", height = 260, mediaWidth = 58, showText = true, focusX = 50, focusY = 50, blockWidth = 100, align = "center", textPosition = "left", loopVideo = false, textOverlay = true, textAlign = "center", textV = "top", fontStyle = "apple", textSize = 56, textColor = "dark", textX = 50, textY = 14, titleSize = 56, copySize = 16, textBoxWidth = 86, parallaxScroll = false) {
  return { slot, title, copy, image, active, mediaType, height, mediaWidth, showText, focusX, focusY, blockWidth, align, textPosition, loopVideo, textOverlay, textAlign, textV, fontStyle, textSize, textColor, textX, textY, titleSize, copySize, textBoxWidth, parallaxScroll };
}

const STORAGE_KEY = "sttor-admin-content-v2";
const CART_KEY = "sttor-cart-v1";
const LOCAL_MEDIA_DB = "sttor-local-media";
const LOCAL_MEDIA_STORE = "files";
let CART = [];

function applyManagedContent(saved = {}) {
  if (saved.business) Object.assign(BUSINESS, saved.business);
  if (saved.logos) Object.assign(BRAND_LOGOS, saved.logos);
  if (saved.logoSizes) Object.assign(LOGO_SIZES, saved.logoSizes);
  if (saved.products) {
    Object.keys(PRODUCTS).forEach((key) => {
      if (Array.isArray(saved.products[key])) PRODUCTS[key] = saved.products[key];
    });
  }
  if (Array.isArray(saved.services)) {
    SERVICES.splice(0, SERVICES.length, ...saved.services);
  }
  if (Array.isArray(saved.testimonials)) {
    TESTIMONIALS.splice(0, TESTIMONIALS.length, ...saved.testimonials);
  }
  if (saved.categories) {
    Object.keys(CATEGORY_META).forEach((key) => {
      if (saved.categories[key]) Object.assign(CATEGORY_META[key], saved.categories[key]);
    });
  }
  if (saved.home) Object.assign(HOME_CONTENT, saved.home);
  if (Array.isArray(saved.banners)) BANNERS.splice(0, BANNERS.length, ...saved.banners);
  if (Array.isArray(saved.promotions)) PROMOTIONS.splice(0, PROMOTIONS.length, ...saved.promotions);
  if (Array.isArray(saved.homeSlides)) HOME_SLIDES.splice(0, HOME_SLIDES.length, ...saved.homeSlides);
  if (Array.isArray(saved.decorations)) DECORATIONS.splice(0, DECORATIONS.length, ...saved.decorations);
}

async function hydratePublishedContent() {
  try {
    let response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) response = await fetch("site-data.json", { cache: "no-store" });
    if (!response.ok) return;
    const published = await response.json();
    applyManagedContent(published);
    window.STTOR_PUBLISHED_CONTENT_LOADED = true;
  } catch {
    // site-data.json is optional in local previews.
  }
}

function hydrateUserContent() {
  if (window.STTOR_PUBLISHED_CONTENT_LOADED) {
    ensureDecorationSlots();
    normalizeServices();
    normalizeTestimonials();
    normalizeDecorations();
    return;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    applyManagedContent(saved);
    ensureDecorationSlots();
    normalizeServices();
    normalizeTestimonials();
    normalizeDecorations();
  } catch (error) {
    console.warn("No se pudo cargar contenido administrado", error);
  }
}

function ensureDecorationSlots() {
  [
    decoration("home-after-categories", "Nuevo en STTOR", "Explora equipos y accesorios Apple con atencion directa en Ica.", "", true),
    decoration("home-after-iphone", "Completa tu compra", "Agrega accesorios, proteccion y carga rapida para tu equipo.", "", false),
    decoration("home-after-accessories", "Servicio tecnico Apple", "Diagnostico y soporte local para mantener tu equipo funcionando bien.", "", false),
    decoration("category-after-hero", "Elige con calma", "Compara modelos, precio y disponibilidad antes de comprar.", "", false),
    decoration("category-before-compare", "Asesoria STTOR", "Te ayudamos a elegir segun uso, presupuesto y stock.", "", false),
    ...categoryDecorationSlots(),
    decoration("service-after-hero", "Diagnostico especializado", "Servicio tecnico Apple con atencion clara y seguimiento por WhatsApp.", "", false),
    decoration("service-before-services", "Soluciones para tu equipo", "Reparacion de iPhone, Mac, bateria, pantalla, software y liberaciones.", "", false),
    decoration("service-before-contact", "Agenda tu revision", "Trae tu equipo a STTOR o coordina una evaluacion por WhatsApp.", "", false)
  ].forEach((item) => {
    if (!DECORATIONS.some((entry) => entry.slot === item.slot)) DECORATIONS.push(item);
  });
}

function categoryDecorationSlots() {
  return Object.entries(CATEGORY_META).flatMap(([key, meta]) => [
    decoration(`${key}-after-hero`, `${meta.title} destacado`, `Agrega una imagen, GIF o video especial para ${meta.title}.`, "", false),
    decoration(`${key}-before-compare`, `Antes del comparador ${meta.title}`, `Refuerza la categoria ${meta.title} antes de la comparativa.`, "", false)
  ]);
}

function prepareProducts() {
  Object.entries(PRODUCTS).forEach(([category, items]) => {
    items.forEach((item, index) => {
      item.id ||= `${category}-${slug(`${item.name}-${index}`)}`;
      item.category ||= category;
      if (category === "iphone") {
        item.openBoxPrice ||= Math.max(1, Math.round(item.price * 0.88));
        item.sealedAvailable ??= true;
        item.openBoxAvailable ??= true;
        if (item.sealedAvailable === false && item.openBoxAvailable === false) item.sealedAvailable = true;
      } else {
        delete item.openBoxPrice;
        item.sealedAvailable ??= true;
        item.openBoxAvailable = false;
      }
    });
  });
}

function normalizeTestimonials() {
  TESTIMONIALS.splice(0, TESTIMONIALS.length, ...TESTIMONIALS.map((item, index) => {
    if (Array.isArray(item)) return testimonial(item[0] || "Comentario del cliente.", item[1] || "Cliente", item[2] ?? decimalRating(`${item[0]}${item[1]}`, index));
    return testimonial(item.copy || "Comentario del cliente.", item.name || "Cliente", item.rating ?? decimalRating(`${item.copy}${item.name}`, index));
  }));
}

function normalizeDecorations() {
  DECORATIONS.splice(0, DECORATIONS.length, ...DECORATIONS.map((item) => decoration(
    item.slot || "home-after-categories",
    item.title || "Decoracion",
    item.copy || "Texto breve de apoyo visual.",
    item.image || "",
    item.active === true,
    item.mediaType || inferMediaType(item.image || ""),
    clampNumber(item.height, 40, 900, 260),
    clampNumber(item.mediaWidth, 35, 75, 58),
    item.showText !== false,
    clampNumber(item.focusX, 0, 100, 50),
    clampNumber(item.focusY, 0, 100, 50),
    clampNumber(item.blockWidth, 10, 140, 100),
    ["left", "center", "right"].includes(item.align) ? item.align : "center",
    ["left", "right", "top", "bottom"].includes(item.textPosition) ? item.textPosition : "left",
    item.loopVideo === true,
    item.textOverlay !== false,
    ["left", "center", "right"].includes(item.textAlign) ? item.textAlign : "center",
    ["top", "center", "bottom"].includes(item.textV) ? item.textV : "top",
    ["apple", "system", "editorial"].includes(item.fontStyle) ? item.fontStyle : "apple",
    clampNumber(item.textSize, 22, 96, 56),
    ["dark", "light"].includes(item.textColor) ? item.textColor : "dark",
    clampNumber(item.textX, 0, 100, 50),
    clampNumber(item.textY, 0, 100, 14),
    clampNumber(item.titleSize || item.textSize, 12, 140, 56),
    clampNumber(item.copySize, 8, 80, 16),
    clampNumber(item.textBoxWidth, 10, 100, 86),
    item.parallaxScroll === true
  )));
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function normalizeServices() {
  SERVICES.splice(0, SERVICES.length, ...SERVICES.map((item, index) => {
    if (Array.isArray(item)) return service(item[0], item[1], item[2], item[3] || 49 + index * 20, item[4] || "", item[5] !== false);
    return {
      title: item.title || "Servicio tecnico",
      copy: item.copy || item.desc || "Descripcion del servicio.",
      icon: item.icon || "SV",
      price: Number(item.price || 0),
      promoPrice: Number(item.promoPrice || 0),
      priceFeatured: Boolean(item.priceFeatured),
      hidePrice: Boolean(item.hidePrice),
      quoteLabel: item.quoteLabel || "Cotizar por WhatsApp",
      image: item.image || "",
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      active: item.active !== false
    };
  }));
}

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatPrice(value) {
  return `S/ ${value.toLocaleString("es-PE")}`;
}

function whatsappUrl(message) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

function currentPageUrl() {
  return window.location.href.split("#")[0];
}

function renderNav(active) {
  const links = NAV.map(([label, href, key]) => (
    `<a class="nav-link ${active === key ? "active" : ""}" href="${href}" data-nav-key="${key}">${label}</a>`
  )).join("");
  const navLinks = qs("[data-nav-links]");
  if (navLinks?.children.length) {
    qsa(".nav-link", navLinks).forEach((link) => {
      const key = link.dataset.navKey || NAV.find(([, href]) => href === link.getAttribute("href"))?.[2];
      link.classList.toggle("active", key === active);
    });
  } else if (navLinks) {
    navLinks.innerHTML = links;
  }
  qs("[data-mobile-panel]").innerHTML = `
    <div class="mobile-panel-head">
      <strong>Menu</strong>
      <button class="mobile-close" type="button" data-mobile-close aria-label="Cerrar menu">×</button>
    </div>
    ${links}
  `;
  renderGlobalSearch();
  renderMegaMenu();
  initMegaMenu();

  const panel = qs("[data-mobile-panel]");
  const toggle = qs("[data-mobile-toggle]");
  toggle?.setAttribute("aria-controls", "mobile-menu");
  panel?.setAttribute("id", "mobile-menu");
  const closeMenu = () => {
    panel?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  const openMenu = () => {
    panel?.classList.add("open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };
  const toggleMenu = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    panel?.classList.contains("open") ? closeMenu() : openMenu();
  };

  if (toggle) {
    toggle.onclick = toggleMenu;
    toggle.ontouchend = toggleMenu;
  }
  const closeButton = qs("[data-mobile-close]");
  if (closeButton) {
    closeButton.onclick = closeMenu;
    closeButton.ontouchend = (event) => {
      event.preventDefault();
      closeMenu();
    };
  }
  if (!document.documentElement.dataset.mobileMenuGuard) {
    document.documentElement.dataset.mobileMenuGuard = "true";
    document.addEventListener("click", (event) => {
      const currentPanel = qs("[data-mobile-panel]");
      if (!currentPanel?.classList.contains("open")) return;
      if (event.target.closest("[data-mobile-panel], [data-mobile-toggle]")) return;
      closeMenu();
    });
  }

  qsa("a[href$='.html']").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function renderMegaMenu() {
  if (qs("[data-mega-menu]")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="mega-menu" data-mega-menu aria-hidden="true">
      <div class="mega-menu-inner" data-mega-menu-inner></div>
    </div>
  `);
}

function initMegaMenu() {
  const panel = qs("[data-mega-menu]");
  const inner = qs("[data-mega-menu-inner]");
  const navLinks = qsa(".nav-links .nav-link");
  if (!panel || !inner || panel.dataset.ready) return;
  panel.dataset.ready = "true";
  let closeTimer;

  const open = (key) => {
    const html = renderMegaMenuContent(key);
    if (!html) return close();
    window.clearTimeout(closeTimer);
    inner.innerHTML = html;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("mega-open");
    hydrateLocalMediaElements();
  };

  const close = () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mega-open");
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(close, 190);
  };

  navLinks.forEach((link) => {
    link.addEventListener("pointerenter", () => open(link.dataset.navKey));
    link.addEventListener("pointerleave", scheduleClose);
    link.addEventListener("mouseenter", () => open(link.dataset.navKey));
    link.addEventListener("focus", () => open(link.dataset.navKey));
    link.addEventListener("mouseleave", scheduleClose);
  });

  panel.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  panel.addEventListener("mouseleave", scheduleClose);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  window.addEventListener("resize", close);
}

function renderMegaMenuContent(key) {
  if (key === "home") return "";
  if (key === "servicio") {
    const items = SERVICES.filter((item) => item.active !== false).slice(0, 7);
    return `
      <div class="mega-col mega-feature">
        <span>Soporte especializado</span>
        <a class="mega-title" href="servicio-tecnico.html">Servicio tecnico Apple</a>
        ${items.slice(0, 5).map((item) => `<a href="servicio-tecnico.html">${item.title}</a>`).join("")}
      </div>
      <div class="mega-col">
        <span>Soluciones rapidas</span>
        <a href="servicio-tecnico.html#contacto">Agendar diagnostico</a>
        <a href="${whatsappUrl("Hola STTOR, necesito soporte tecnico Apple.")}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        <a href="servicio-tecnico.html">Ver todos los servicios</a>
      </div>
    `;
  }
  const meta = CATEGORY_META[key];
  const items = (PRODUCTS[key] || []).filter((item) => item.active !== false);
  if (!meta || !items.length) return "";
  const href = `${key === "watch" ? "watch" : key}.html`;
  const productLinks = items.slice(0, 7).map((item, index) => `
    <a class="${index < 5 ? "mega-product-name" : ""}" href="${href}" data-product-options="${item.id}">
      ${item.name}
    </a>
  `).join("");
  const featured = items.slice(0, 3).map((item) => `
    <button class="mega-product-card" type="button" data-product-options="${item.id}">
      <span class="mega-product-thumb">${item.image ? renderLocalAwareImage(item.image, item.name) : `<span class="product-visual ${item.visual || inferVisual(item.family)}" style="--p1:${item.p1};--p2:${item.p2}" aria-hidden="true"></span>`}</span>
      <span class="mega-product-info">
        <strong>${item.name}</strong>
        <small>${formatPrice(productDisplayPrice(item))}</small>
      </span>
    </button>
  `).join("");
  return `
    <div class="mega-col mega-feature">
      <span>Conoce ${meta.title}</span>
      <a class="mega-title" href="${href}">Ver todos los modelos de ${meta.title}</a>
      ${productLinks}
    </div>
    <div class="mega-col">
      <span>Comprar ${meta.title}</span>
      <a href="${href}">Comparar modelos</a>
      <a href="${href}">Consultar stock</a>
      <a href="${whatsappUrl(`Hola STTOR, quiero cotizar ${meta.title}.`)}" target="_blank" rel="noopener">Cotizar por WhatsApp</a>
    </div>
    <div class="mega-col mega-cards">
      <span>Destacados</span>
      <div class="mega-card-grid">${featured}</div>
    </div>
  `;
}

// Re-escribe og:url / og:image / twitter:url / twitter:image para que apunten
// al dominio actual donde está desplegada la web. Sin esto, si la web vive en
// netlify.app pero los meta tags dicen sttor.pe, WhatsApp no puede generar la
// preview card con imagen al recibir el link del primer producto.
function syncOpenGraphToCurrentOrigin() {
  const here = window.location.origin;
  const path = window.location.pathname;
  const absolute = (rel) => {
    if (!rel) return "";
    if (/^https?:\/\//i.test(rel)) return rel;
    if (rel.startsWith("/")) return here + rel;
    return here + "/" + rel.replace(/^\.\//, "");
  };
  const setMeta = (selector, value) => {
    if (!value) return;
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute("content", value);
  };
  setMeta('meta[property="og:url"]', here + path);
  setMeta('meta[name="twitter:url"]', here + path);
  const ogImage = document.head.querySelector('meta[property="og:image"]')?.getAttribute("content");
  const twImage = document.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content");
  setMeta('meta[property="og:image"]', absolute(ogImage));
  setMeta('meta[name="twitter:image"]', absolute(twImage));
}

function boot() {
  syncOpenGraphToCurrentOrigin();
  const page = document.body.dataset.page || "home";
  if (page === "admin") {
    return;
  }
  renderNav(page);
  applyLogoSizes();
  applyBrandLogos();
  initWhatsApp();
  if (page === "home") renderHome();
  if (CATEGORY_META[page]) renderCatalog(page);
  if (page === "servicio") renderService();
  if (INFO_PAGES[page]) renderInfoPage(page);
  initForms();
  initMap();
  renderFooter();
  hydrateLocalDecorMedia();
  hydrateLocalMediaElements();
  initReveal();
  initScrollDecorations();
  initHomeHero();
  initCarousels();
  initCommerce();
  initGlobalSearch();
  initCompare();
}

function renderGlobalSearch() {
  const actions = qs(".nav-actions");
  if (!actions || qs("[data-global-search]", actions)) return;
  actions.insertAdjacentHTML("afterbegin", `
    <div class="global-search" data-global-search>
      <span class="search-icon" aria-hidden="true"></span>
      <input type="search" data-global-search-input placeholder="Buscar productos" aria-label="Buscar productos">
      <div class="global-search-results" data-global-search-results hidden></div>
    </div>
  `);
}

function layoutShell(content) {
  qs("[data-content]").innerHTML = content;
}

function renderHome() {
  const activeProducts = Object.values(PRODUCTS).flat().filter((item) => item.active !== false);
  const featured = activeProducts
    .filter((item) => item.featured || ["iPhone 17 Pro Max", "MacBook Air M5 13", "iPad Air M4 13", "AirPods Pro 3", "Apple Watch Ultra 3", "Adaptador dinamico 40W"].includes(item.name))
    .slice(0, 6)
    .map(renderProductCard)
    .join("");
  const iphoneShowcase = renderExpandableProducts((PRODUCTS.iphone || []).filter((item) => item.active !== false), "home-iphone");
  const accessoryShowcase = renderExpandableProducts((PRODUCTS.accesorios || []).filter((item) => item.active !== false), "home-accesorios");

  const activeServices = SERVICES.filter((item) => item.active !== false);
  const serviceHighlights = activeServices.slice(0, 3).map(renderServiceCard).join("");
  const banners = BANNERS.filter((banner) => banner.active !== false).map((banner) => `
    <article class="promo-card reveal"><h3>${banner.title}</h3><p>${banner.copy}</p></article>
  `).join("");
  const promotions = PROMOTIONS.filter((promo) => promo.active !== false).map((promo) => `
    <div class="promo-strip reveal"><strong>${promo.title}</strong><span>${promo.copy}</span><a class="btn" target="_blank" rel="noopener" href="${whatsappUrl(`Hola STTOR, quiero consultar: ${promo.title}`)}">Consultar</a></div>
  `).join("");

  layoutShell(`
    ${renderHomeStoreHero()}

    <section class="section">
      <div class="section-head reveal">
        <div>
          <h2 class="section-title">Ver todos los productos Apple.</h2>
        </div>
      </div>
      ${renderHomeCategoryStrip()}
    </section>

    ${promotions ? `<section class="section compact-section home-minimal-promos">${promotions}</section>` : ""}

    ${renderDecoration("home-after-categories")}

    <section class="section home-catalog-section">
      <div class="section-head reveal">
        <div>
          <span class="eyebrow">iPhone</span>
          <h2 class="section-title">Todos los iPhone.</h2>
        </div>
        <a class="btn" href="iphone.html">Ver pagina iPhone</a>
      </div>
      ${iphoneShowcase}
    </section>

    ${renderDecoration("home-after-iphone")}

    <section class="section home-catalog-section wide-band">
      <div class="section-head reveal">
        <div>
          <span class="eyebrow">Accesorios</span>
          <h2 class="section-title">Accesorios esenciales.</h2>
        </div>
        <a class="btn" href="accesorios.html">Ver accesorios</a>
      </div>
      ${accessoryShowcase}
    </section>

    ${renderDecoration("home-after-accessories")}

    <section class="section home-feature-section">
      <div class="section-head reveal">
        <div>
          <h2 class="section-title">Productos destacados.</h2>
          <p class="section-copy">Modelos seleccionados para comprar con asesoria directa y stock consultable por WhatsApp.</p>
        </div>
        <a class="btn" href="iphone.html">Explorar catalogo</a>
      </div>
      ${renderCarousel(featured, "Productos destacados", true)}
    </section>

    <section class="section home-confidence">
      <div class="home-confidence-panel reveal">
        <div>
          <span class="eyebrow">Compra segura</span>
          <h2 class="section-title">Atencion clara antes y despues de comprar.</h2>
          <p class="section-copy">Productos Apple, accesorios y soporte tecnico en un solo lugar, con contacto directo y tienda fisica en Ica.</p>
        </div>
        <div class="benefit-grid compact-benefits">${BENEFITS.slice(0, 3).map(([title, copy, icon]) => `
          <article class="benefit-card"><div class="icon">${icon}</div><h3>${title}</h3><p>${copy}</p></article>
        `).join("")}</div>
      </div>
    </section>

    <section class="section home-service-editorial">
      <div class="home-service-panel reveal">
        <div>
          <span class="eyebrow">Servicio tecnico</span>
          <h2 class="section-title">Diagnostico Apple con comunicacion directa.</h2>
          <p class="section-copy">Revisamos tu equipo, cotizamos antes de intervenir y te mantenemos informado por WhatsApp.</p>
          <div class="cta-row">
            <a class="btn primary" href="servicio-tecnico.html">Ver servicio tecnico</a>
            <a class="btn" target="_blank" rel="noopener" href="${whatsappUrl("Hola STTOR, necesito diagnostico para mi equipo Apple.")}">Agendar</a>
          </div>
        </div>
        <div class="service-grid home-service-list">${serviceHighlights}</div>
      </div>
    </section>

    <section class="section trust-section">
      <div class="trust-card reveal">
        <div>
          <span class="eyebrow">Confianza comercial</span>
          <h2 class="section-title">Una tienda real, con contacto visible y atencion local.</h2>
        </div>
        <div class="trust-points">
          <p><strong>Direccion:</strong> ${BUSINESS.address}</p>
          <p><strong>WhatsApp:</strong> ${BUSINESS.phone}</p>
          <p><strong>Horario:</strong> ${BUSINESS.hours}</p>
        </div>
      </div>
    </section>

    <section class="section wide-band">
      <div class="section-head reveal">
        <div>
          <h2 class="section-title">Clientes que vuelven.</h2>
        </div>
      </div>
      <div class="testimonial-grid">${[...TESTIMONIALS].reverse().slice(0, 5).map((item) => `
        <article class="testimonial reveal">
          ${renderReviewRating(item)}
          <p>"${item.copy}"</p>
          <h3>${item.name}</h3>
        </article>
      `).join("")}
        <article class="testimonial review-cta reveal">
          <div class="review-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <h3>Deja tu reseña</h3>
          <p>Comparte tu experiencia con STTOR y ayuda a otros clientes a comprar con confianza.</p>
          <div class="cta-row">
            <a class="btn primary" href="${BUSINESS.googleMaps}" target="_blank" rel="noopener">Dejar reseña</a>
            <a class="btn" href="${whatsappUrl("Hola STTOR, quiero dejar una reseña sobre mi experiencia.")}" target="_blank" rel="noopener">Enviar reseña por WhatsApp</a>
          </div>
        </article>
      </div>
    </section>

    ${renderHomeHelpSection()}
    ${renderHomeFaqSection()}
    ${renderLocationSection()}
  `);
}

function renderHomeHelpSection() {
  const items = [
    ["Cotiza stock", "Pide modelo, color y capacidad por WhatsApp antes de venir.", "iphone.html"],
    ["Compara equipos", "Revisa diferencias de pantalla, bateria, chip y camaras por categoria.", "iphone.html#comparar"],
    ["Servicio tecnico", "Agenda diagnostico para iPhone, Mac, iPad, Watch, bateria o pantalla.", "servicio-tecnico.html"],
    ["Garantia y datos", "Consulta condiciones, informacion comercial y ubicacion de tienda.", "garantia.html"]
  ];
  return `
    <section class="section home-guidance-section">
      <div class="section-head reveal">
        <div>
          <span class="eyebrow">Rapido y claro</span>
          <h2 class="section-title">Todo lo importante en pocos pasos.</h2>
        </div>
      </div>
      <div class="home-guidance-grid">
        ${items.map(([title, copy, href], index) => `
          <a class="guidance-card reveal" href="${href}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function renderHomeFaqSection() {
  const faqs = INFO_PAGES.faq.blocks.slice(0, 3);
  return `
    <section class="section home-faq-preview">
      <div class="faq-preview-panel reveal">
        <div>
          <span class="eyebrow">Antes de comprar</span>
          <h2 class="section-title">Dudas frecuentes, respuestas simples.</h2>
          <p class="section-copy">Pensado para que puedas decidir rapido si compras, separas stock o agendas servicio.</p>
          <a class="btn" href="preguntas-frecuentes.html">Ver preguntas frecuentes</a>
        </div>
        <div class="faq-preview-list">
          ${faqs.map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderInfoPage(key) {
  const page = INFO_PAGES[key];
  layoutShell(`
    <section class="section info-hero-page">
      <div class="info-hero-panel reveal">
        <span class="eyebrow">${page.eyebrow}</span>
        <h1>${page.title}</h1>
        <p>${page.copy}</p>
        <div class="cta-row">
          <a class="btn primary" href="${whatsappUrl(`Hola STTOR, quiero informacion sobre ${page.eyebrow}.`)}" target="_blank" rel="noopener">${page.cta}</a>
          <a class="btn" href="index.html">Volver al inicio</a>
        </div>
      </div>
    </section>
    <section class="section info-grid-section">
      <div class="info-card-grid">
        ${page.blocks.map(([title, copy, icon]) => `
          <article class="info-card reveal">
            <span>${icon}</span>
            <h2>${title}</h2>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
    </section>
    ${renderLocationSection()}
  `);
}

function renderHomeStoreHero() {
  const slides = HOME_SLIDES
    .filter((slide) => slide.active !== false)
    .map((slide) => ({ ...slide, product: findProductByName(slide.productName) || PRODUCTS.iphone?.[0] }))
    .filter((slide) => slide.product || slide.image);

  return `
    <section class="home-store-hero reveal" data-home-hero aria-label="Promociones destacadas STTOR">
      <div class="home-store-track" data-home-hero-track>
        ${slides.map((slide, index) => renderHomeStoreSlide(slide, index)).join("")}
      </div>
      <div class="home-hero-dots" role="tablist" aria-label="Cambiar promocion">
        ${slides.map((_, index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-home-hero-dot="${index}" aria-label="Ver banner ${index + 1}"></button>`).join("")}
      </div>
    </section>
  `;
}

function renderHomeStoreSlide(slide, index) {
  const item = slide.product;
  const visual = slide.image
    ? renderLocalAwareImage(slide.image, slide.eyebrow || item?.name || "Banner STTOR", "home-banner-image")
    : item?.image
    ? renderLocalAwareImage(item.image, item.name, "home-banner-image")
    : `<div class="product-visual ${item?.visual || inferVisual(item?.family || "")}" style="--p1:${item?.p1 || "#e5e7eb"};--p2:${item?.p2 || "#9ca3af"}" aria-hidden="true"></div>`;
  return `
    <article class="home-store-slide ${index === 0 ? "active" : ""}" data-home-hero-slide style="--banner-accent:${slide.accent}">
      <div class="home-banner-product">
        <div class="home-banner-device">${visual}</div>
        <strong>${slide.eyebrow}</strong>
      </div>
      <div class="home-banner-offer">
        <span class="home-banner-bolt" aria-hidden="true">&#9889;</span>
        <h1>${slide.title}</h1>
        <p>${slide.subtitle}</p>
        <b>${slide.price}</b>
        <a class="home-banner-cta" href="${slide.href}">${slide.cta}</a>
        <small>${slide.note}</small>
      </div>
    </article>
  `;
}

function findProductByName(name) {
  return Object.values(PRODUCTS).flat().find((item) => item.name === name);
}

function renderHomeCategoryStrip() {
  const categories = [
    ["mac", "Mac", PRODUCTS.mac?.[0]],
    ["iphone", "iPhone", PRODUCTS.iphone?.[0]],
    ["ipad", "iPad", PRODUCTS.ipad?.[0]],
    ["watch", "Apple Watch", PRODUCTS.watch?.[0]],
    ["airpods", "Audio", PRODUCTS.airpods?.[0]],
    ["accesorios", "Accesorios", PRODUCTS.accesorios?.[0]]
  ].filter(([, , product]) => product);

  return `
    <div class="home-category-strip reveal">
      ${categories.map(([key, label, item]) => {
        const href = `${key === "watch" ? "watch" : key}.html`;
        const visual = item.image
          ? renderLocalAwareImage(item.image, label, "home-category-image")
          : `<div class="product-visual ${item.visual || inferVisual(item.family)}" style="--p1:${item.p1};--p2:${item.p2}" aria-hidden="true"></div>`;
        return `
          <a class="home-category-item" href="${href}">
            <span>${visual}</span>
            <strong>${label}</strong>
            <small>Desde ${formatPrice(item.price)}</small>
          </a>
        `;
      }).join("")}
      <a class="home-category-item home-category-service" href="servicio-tecnico.html">
        <span>${renderLocalAwareImage(logo("service"), "Servicio tecnico STTOR", "home-category-image")}</span>
        <strong>Servicio Tecnico</strong>
        <small>Diagnostico Apple</small>
      </a>
    </div>
  `;
}

function categoryStart(key) {
  const first = PRODUCTS[key]?.[0];
  return first ? `Desde ${formatPrice(Math.min(...PRODUCTS[key].map((p) => p.price)))}` : "Cotiza hoy";
}

function renderDecoration(slot) {
  const item = DECORATIONS.find((entry) => entry.slot === slot && entry.active !== false);
  if (!item || !item.image) return "";
  const isVideo = (item.mediaType || inferMediaType(item.image)) === "video";
  const isLocal = isLocalMediaRef(item.image);
  const height = clampNumber(item.height, 40, 900, 260);
  const mediaWidth = clampNumber(item.mediaWidth, 35, 75, 58);
  const showText = item.showText !== false;
  const focusX = clampNumber(item.focusX, 0, 100, 50);
  const focusY = clampNumber(item.focusY, 0, 100, 50);
  const blockWidth = clampNumber(item.blockWidth, 10, 140, 100);
  const align = ["left", "center", "right"].includes(item.align) ? item.align : "center";
  const textPosition = ["left", "right", "top", "bottom"].includes(item.textPosition) ? item.textPosition : "left";
  const textOverlay = item.textOverlay !== false;
  const textAlign = ["left", "center", "right"].includes(item.textAlign) ? item.textAlign : "center";
  const textV = ["top", "center", "bottom"].includes(item.textV) ? item.textV : "top";
  const fontStyle = ["apple", "system", "editorial"].includes(item.fontStyle) ? item.fontStyle : "apple";
  const textSize = clampNumber(item.textSize, 22, 96, 56);
  const titleSize = clampNumber(item.titleSize || textSize, 12, 140, textSize);
  const copySize = clampNumber(item.copySize, 8, 80, 16);
  const textBoxWidth = clampNumber(item.textBoxWidth, 10, 100, 86);
  const textColor = ["dark", "light"].includes(item.textColor) ? item.textColor : "dark";
  const textX = clampNumber(item.textX, 0, 100, 50);
  const textY = clampNumber(item.textY, 0, 100, 14);
  const parallaxScroll = item.parallaxScroll === true;
  const loop = item.loopVideo === true && !parallaxScroll ? " loop" : "";
  const videoAttrs = parallaxScroll ? `muted playsinline preload="auto" data-scroll-video` : `muted autoplay${loop} playsinline preload="metadata"`;
  const copyHtml = showText ? `<div class="decor-copy decor-align-text-${textAlign} decor-v-${textV} decor-font-${fontStyle} decor-color-${textColor}" style="--decor-title-size:${titleSize}px;--decor-copy-size:${copySize}px;--decor-text-width:${textBoxWidth}%;--decor-text-x:${textX}%;--decor-text-y:${textY}%;">
    ${item.title ? `<h2>${item.title}</h2>` : ""}
    ${item.copy ? `<p>${item.copy}</p>` : ""}
  </div>` : "";
  return `
    <section class="section decor-section decor-align-${align} decor-text-${textPosition} ${textOverlay ? "decor-overlay" : "decor-split"} ${showText ? "" : "decor-no-text"} ${parallaxScroll ? "decor-scroll-mode" : ""}" data-decor-slot="${slot}" ${parallaxScroll ? "data-scroll-decor" : ""} style="--decor-height:${height}px;--decor-media:${mediaWidth}fr;--decor-copy:${100 - mediaWidth}fr;--decor-focus-x:${focusX}%;--decor-focus-y:${focusY}%;--decor-width:${blockWidth}%;">
      <div class="decor-card">
        ${!textOverlay ? copyHtml : ""}
        <div class="decor-media">
          ${isLocal
            ? `<div class="decor-local-placeholder" data-local-decor="${item.image}" data-local-decor-type="${isVideo ? "video" : "image"}" data-local-decor-loop="${item.loopVideo === true && !parallaxScroll ? "true" : "false"}" data-local-decor-scroll="${parallaxScroll ? "true" : "false"}">Cargando decoracion...</div>`
            : isVideo
            ? `<video src="${item.image}" ${videoAttrs} aria-label="${item.title || "Decoracion STTOR"}"></video>`
            : `<img src="${item.image}" alt="${item.title || "Decoracion STTOR"}" loading="lazy" ${parallaxScroll ? "data-scroll-image" : ""}>`
          }
          ${textOverlay ? copyHtml : ""}
        </div>
      </div>
    </section>
  `;
}

function renderCategoryDecoration(key, position) {
  return renderDecoration(`${key}-${position}`) || renderDecoration(`category-${position}`);
}

function inferMediaType(src) {
  const clean = String(src || "").split("#")[0].split("?")[0];
  if (/^data:video\//i.test(clean) || /\.(mp4|webm|mov|m4v|ogv)$/i.test(clean)) return "video";
  return "image";
}

function isLocalMediaRef(value) {
  return String(value || "").startsWith("idb:");
}

function isPublishedMediaPath(value) {
  return /^(assets\/media\/|media\/)/i.test(String(value || ""));
}

function resolveMediaSrc(src) {
  if (!src) return "";
  if (isLocalMediaRef(src)) return src;
  if (isPublishedMediaPath(src)) return src;
  return src;
}

function renderLocalAwareImage(src, alt = "", className = "") {
  const eager = /\b(page-logo|brand-mark|footer-logo|hero-logo)\b/.test(className);
  const attrs = eager
    ? `loading="eager" decoding="sync" fetchpriority="high"`
    : `loading="lazy" decoding="async"`;
  if (isLocalMediaRef(src)) {
    return `<img class="${className}" data-local-media-src="${src}" alt="${alt}" ${attrs}>`;
  }
  if (isPublishedMediaPath(src)) {
    return `<img class="${className}" data-published-media-src="${src}" alt="${alt}" ${attrs}>`;
  }
  return `<img class="${className}" src="${src}" alt="${alt}" ${attrs}>`;
}

async function setImageSource(img, src) {
  if (!img || !src) return;
  const srcStr = String(src || "");
  if (srcStr.startsWith("media/") || srcStr.startsWith("assets/media/")) {
    try {
      const response = await fetch(new URL(srcStr.replace(/^\/+/, ""), document.baseURI));
      if (!response.ok) return;
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (img.src !== url) img.src = url;
      return;
    } catch {
      return;
    }
  }
  if (isLocalMediaRef(src)) {
    const url = await getLocalMediaUrl(src);
    if (url && img.src !== url) img.src = url;
    return;
  }
  const current = img.getAttribute("src") || "";
  if (current === src || img.src.endsWith(src)) return;
  img.src = src;
}

function openLocalMediaDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_MEDIA_DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(LOCAL_MEDIA_STORE)) db.createObjectStore(LOCAL_MEDIA_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getLocalMediaUrl(ref) {
  const refStr = String(ref || "");
  // Si es una ruta de archivo media/ o assets/media/ (del deploy), usar fetch
  if (refStr.startsWith("media/") || refStr.startsWith("assets/media/")) {
    try {
      const response = await fetch(new URL(refStr.replace(/^\/+/, ""), document.baseURI));
      if (!response.ok) return "";
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch {
      return "";
    }
  }
  // Si es referencia local (idb:), usar IndexedDB
  const id = refStr.replace(/^idb:/, "");
  const db = await openLocalMediaDb();
  const record = await new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_MEDIA_STORE, "readonly");
    const request = tx.objectStore(LOCAL_MEDIA_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return record?.blob ? URL.createObjectURL(record.blob) : "";
}

function hydrateLocalDecorMedia() {
  qsa("[data-local-decor]").forEach(async (node) => {
    const url = await getLocalMediaUrl(node.dataset.localDecor);
    if (!url) {
      node.textContent = "Decoracion local no encontrada";
      return;
    }
    const scrollMode = node.dataset.localDecorScroll === "true";
    const videoAttrs = scrollMode
      ? `muted playsinline preload="auto" data-scroll-video`
      : `muted autoplay${node.dataset.localDecorLoop === "true" ? " loop" : ""} playsinline preload="metadata"`;
    node.outerHTML = node.dataset.localDecorType === "video"
      ? `<video src="${url}" ${videoAttrs} aria-label="Decoracion STTOR"></video>`
      : `<img src="${url}" alt="Decoracion STTOR" loading="lazy"${scrollMode ? " data-scroll-image" : ""}>`;
    initScrollDecorations();
  });
}

function hydrateLocalMediaElements() {
  qsa("[data-local-media-src]").forEach(async (node) => {
    const url = await getLocalMediaUrl(node.dataset.localMediaSrc);
    if (url) node.src = url;
  });
  qsa("[data-published-media-src]").forEach(async (node) => {
    const url = await getLocalMediaUrl(node.dataset.publishedMediaSrc);
    if (url) node.src = url;
  });
}

function renderCatalog(key) {
  const meta = CATEGORY_META[key];
  const categoryLogo = renderCategoryLogo();
  layoutShell(`
    <section class="section page-hero">
      <div class="page-hero-inner">
        <div>
          <span class="eyebrow reveal">${meta.eyebrow}</span>
          <h1 class="reveal">${meta.title} <span class="gradient-text">STTOR</span></h1>
          <p class="page-lede reveal">${meta.lede}</p>
          <div class="cta-row reveal">
            <a class="btn primary" target="_blank" rel="noopener" href="${whatsappUrl(`Hola STTOR, quiero consultar stock de ${meta.title}.`)}">Consultar stock</a>
            <a class="btn" href="#catalogo">Ver modelos</a>
          </div>
        </div>
        ${categoryLogo}
      </div>
    </section>

    ${renderCategoryDecoration(key, "after-hero")}

    <section class="section" id="catalogo">
      <div class="toolbar reveal">
        <div class="field"><input data-search placeholder="Buscar modelo, familia o color"></div>
        <div class="field"><select data-filter></select></div>
        <div class="field"><select data-sort>
          <option value="featured">Orden destacado</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="name">Nombre A-Z</option>
        </select></div>
      </div>
      <div data-product-grid></div>
    </section>

    ${renderCategoryDecoration(key, "before-compare")}

    <section class="section wide-band">
      <div class="section-head reveal">
        <div>
          <h2 class="section-title">Compara modelos.</h2>
          <p class="section-copy">Elige dos productos de esta categoria y revisa precio, pantalla, bateria, chip y detalles clave antes de comprar.</p>
        </div>
      </div>
      ${renderComparisons(key)}
    </section>
  `);

  initCatalogControls(key);
  initProductComparator(key);
}

function renderCategoryLogo() {
  if (BRAND_LOGOS.main === LOGO_NONE || !BRAND_LOGOS.main) return "";
  return renderLocalAwareImage(logo("main"), "Identidad STTOR", "page-logo");
}

function initCatalogControls(key) {
  const items = PRODUCTS[key].filter((item) => item.active !== false);
  const families = ["Todos", ...new Set(items.map((item) => item.family))];
  const filter = qs("[data-filter]");
  filter.innerHTML = families.map((family) => `<option value="${family}">${family}</option>`).join("");

  const render = () => {
    const query = qs("[data-search]").value.trim().toLowerCase();
    const family = filter.value;
    const sort = qs("[data-sort]").value;
    let visible = items.filter((item) => {
      const haystack = `${item.name} ${item.family} ${item.desc} ${item.color}`.toLowerCase();
      return (!query || haystack.includes(query)) && (family === "Todos" || item.family === family);
    });

    if (sort === "price-asc") visible = visible.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") visible = visible.sort((a, b) => b.price - a.price);
    if (sort === "name") visible = visible.sort((a, b) => a.name.localeCompare(b.name));

    qs("[data-product-grid]").innerHTML = visible.length ? renderExpandableProducts(visible, `catalog-${key}`) : `
      <article class="product-card"><h3>Sin resultados</h3><p>Prueba con otra busqueda o consulta stock directo por WhatsApp.</p></article>
    `;
    hydrateLocalMediaElements();
    initReveal();
    initCarousels();
  };

  qsa("[data-search], [data-filter], [data-sort]").forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });
  render();
}

function renderExpandableProducts(items, key) {
  const needsMore = items.length > 8;
  const carouselItems = items.map(renderProductCarouselCard).join("");
  const allItems = items.map((item) => renderProductCard(item, needsMore ? "is-hidden-product" : "")).join("");
  return `
    <div class="catalog-product-showcase" data-expandable-products="${key}">
      ${renderCarousel(carouselItems, "Productos destacados", true, "catalog-carousel", 6200)}
      <div class="show-more-row">
        <button class="btn" type="button" data-show-more="${key}">Ver mas productos</button>
      </div>
      <div class="product-grid home-product-grid expandable-products is-collapsed" data-all-products="${key}">
        ${allItems}
      </div>
    </div>
  `;
}

function renderProductCarouselCard(item) {
  const visual = item.visual || inferVisual(item.family);
  const media = item.image
    ? renderLocalAwareImage(item.image, item.name, "product-image")
    : `<div class="product-visual ${visual}" style="--p1:${item.p1};--p2:${item.p2}" aria-hidden="true"></div>`;
  return `
    <article class="apple-product-card" data-product-card="${item.id}">
      <div class="apple-product-media">${media}</div>
      <div class="apple-product-copy">
        <span>${item.badge || "Disponible"}</span>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="apple-product-actions">
          <button class="btn primary" type="button" data-product-options="${item.id}">Mas informacion</button>
          <button class="link-button" type="button" data-buy-now="${item.id}">Comprar ›</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductCard(item, extraClass = "") {
  const visual = item.visual || inferVisual(item.family);
  const media = item.image
    ? renderLocalAwareImage(item.image, item.name, "product-image")
    : `<div class="product-visual ${visual}" style="--p1:${item.p1};--p2:${item.p2}" aria-hidden="true"></div>`;
  const rating = productRating(item.name);
  const sealedAvailable = item.category !== "iphone" || item.sealedAvailable !== false;
  const openBoxAvailable = item.category === "iphone" && item.openBoxAvailable !== false;
  const cardPrice = productDisplayPrice(item);
  const beforePrice = sealedAvailable ? (item.beforePrice || previousPrice(item.price)) : previousPrice(cardPrice);
  const isComparing = typeof window !== "undefined" && window.__comparingProducts?.has(item.id);
  const openBoxNote = sealedAvailable && openBoxAvailable ? `<span class="open-box-note">Open Box: ${formatPrice(item.openBoxPrice || Math.round(item.price * 0.88))}</span>` : "";
  return `
    <article class="product-card reveal ${extraClass}" data-product-card="${item.id}">
      <button class="compare-toggle ${isComparing ? "active" : ""}" type="button" data-compare-toggle="${item.id}" aria-label="Agregar ${item.name} a comparador" title="Comparar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
      </button>
      <div class="product-media">
        ${media}
      </div>
      <span class="badge">${item.badge || "Disponible"}</span>
      <h3>${item.name}</h3>
      <div class="rating-row" aria-label="Calificacion ${rating.score} de 5">
        <span class="stars" aria-hidden="true">${renderStars(rating.score)}</span>
        <strong>${rating.score}</strong>
        <span>(${rating.reviews})</span>
      </div>
      <p>${item.desc}</p>
      <div class="price-row">
        <span>
          <span class="old-price">${formatPrice(beforePrice)}</span>
          <span class="price">${formatPrice(cardPrice)}</span>
        </span>
        <span class="mini-meta">${item.color}</span>
      </div>
      ${openBoxNote}
      <div class="cta-row">
        <button class="btn primary" type="button" data-product-options="${item.id}">Ver producto</button>
        <button class="btn whats-btn" type="button" data-buy-now="${item.id}">Comprar</button>
      </div>
    </article>
  `;
}

function productRating(name) {
  const seed = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return {
    score: (4.6 + (seed % 4) / 10).toFixed(1),
    reviews: 80 + (seed % 420)
  };
}

function previousPrice(price) {
  return Math.round(Number(price || 0) * 1.12 / 10) * 10;
}

function productDisplayPrice(item) {
  if (item?.category === "iphone" && item.sealedAvailable === false && item.openBoxAvailable !== false) {
    return Number(item.openBoxPrice || Math.round(Number(item.price || 0) * 0.88));
  }
  return Number(item?.price || 0);
}

function renderReviewRating(item) {
  const score = Number(item.rating || 4.8);
  const width = Math.max(0, Math.min(100, (score / 5) * 100));
  return `
    <div class="review-rating" aria-label="Reseña con calificación ${score.toFixed(1)} de 5">
      <span class="review-stars meter" style="--rating-width:${width}%" aria-hidden="true">
        <span class="stars-empty">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span class="stars-fill">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      </span>
      <strong>${formatDecimal(score)}</strong>
    </div>
  `;
}

function renderStars(score) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(score) || 0)));
  return Array.from({ length: 5 }, (_, index) => (
    `<span class="star ${index < filled ? "filled" : "empty"}">&#9733;</span>`
  )).join("");
}

function decimalRating(seedValue, index = 0) {
  const seed = [...String(seedValue || index)].reduce((total, char) => total + char.charCodeAt(0), 0);
  return Number((4.5 + (seed % 6) / 10).toFixed(1));
}

function formatDecimal(value) {
  return Number(value).toFixed(1).replace(".", ",");
}

function logo(key) {
  const value = BRAND_LOGOS[key];
  if (value === LOGO_NONE || value === "") return TRANSPARENT_IMAGE;
  if (value) return value;
  return BRAND_LOGOS.main === LOGO_NONE || !BRAND_LOGOS.main ? TRANSPARENT_IMAGE : BRAND_LOGOS.main;
}

function applyBrandLogos() {
  qsa(".brand-mark").forEach((img) => setImageSource(img, logo("main")));
}

function applyLogoSizes() {
  const root = document.documentElement;
  const main = clampLogoSize(LOGO_SIZES.main, 28, 180);
  root.style.setProperty("--logo-main-size", `${main}px`);
  root.style.setProperty("--logo-nav-size", `${clampLogoSize(LOGO_SIZES.nav || main, 28, 180)}px`);
  root.style.setProperty("--logo-hero-size", `${clampLogoSize(LOGO_SIZES.hero, 72, 260)}px`);
  root.style.setProperty("--logo-page-size", `${clampLogoSize(LOGO_SIZES.page, 120, 420)}px`);
  root.style.setProperty("--logo-service-size", `${clampLogoSize(LOGO_SIZES.service, 120, 420)}px`);
  root.style.setProperty("--logo-footer-size", `${clampLogoSize(LOGO_SIZES.footer, 44, 180)}px`);
  root.style.setProperty("--logo-page-x", `${clampLogoSize(LOGO_SIZES.pageX, 0, 100)}%`);
  root.style.setProperty("--logo-page-y", `${clampLogoSize(LOGO_SIZES.pageY, 0, 100)}%`);
}

function clampLogoSize(value, min, max) {
  const size = Number(value);
  if (!Number.isFinite(size)) return min;
  return Math.max(min, Math.min(max, size));
}

function renderCarousel(itemsHtml, label, autoplay = false, extraClass = "", delay = 3600) {
  const controls = autoplay ? `
    <div class="carousel-progress-control" data-carousel-progress-control>
      <button class="carousel-play-toggle" type="button" data-carousel-toggle aria-label="Pausar carrusel" aria-pressed="false">
        <span class="pause-icon" aria-hidden="true"></span>
      </button>
      <div class="carousel-progress-shell" data-carousel-indicators aria-label="Control del carrusel"></div>
    </div>
  ` : "";
  return `
    <div class="carousel reveal ${extraClass} ${autoplay ? "carousel-auto" : ""}" data-carousel ${autoplay ? 'data-carousel-auto="true"' : ""} data-carousel-delay="${delay}" aria-label="${label}">
      <button class="carousel-btn prev" type="button" data-carousel-prev aria-label="Ver productos anteriores">‹</button>
      <div class="carousel-track" data-carousel-track>${itemsHtml}</div>
      <button class="carousel-btn next" type="button" data-carousel-next aria-label="Ver mas productos">›</button>
      ${controls}
    </div>
  `;
}

function inferVisual(family) {
  const low = family.toLowerCase();
  if (low.includes("mac") || low.includes("imac")) return "mac";
  if (low.includes("ipad")) return "ipad";
  if (low.includes("airpods")) return "audio";
  if (low.includes("watch") || low.includes("ultra") || low.includes("series")) return "watch";
  if (low.includes("carg") || low.includes("cable") || low.includes("funda") || low.includes("adapt")) return "accessory";
  return "";
}

function renderComparisons(key) {
  const items = (PRODUCTS[key] || []).filter((item) => item.active !== false);
  if (!items.length) return "";
  const first = items[0]?.id || "";
  const second = items[1]?.id || first;
  const third = items[2]?.id || second || first;
  const options = items.map((item) => `<option value="${item.id}">${item.name}</option>`).join("");

  return `
    <div class="product-compare reveal" data-product-compare="${key}">
      <div class="compare-controls">
        <label>
          <span>Producto 1</span>
          <select data-compare-select="left">${options}</select>
        </label>
        <label>
          <span>Producto 2</span>
          <select data-compare-select="right">${options}</select>
        </label>
        <label data-compare-extra hidden>
          <span>Producto 3</span>
          <select data-compare-select="third">${options}</select>
        </label>
        <button class="compare-add-product" type="button" data-compare-add>Agregar otro equipo</button>
      </div>
      <div class="compare-selected" data-compare-selected></div>
    </div>
    <script type="application/json" data-compare-defaults>${JSON.stringify({ left: first, right: second, third })}</script>
  `;
}

function initProductComparator(key) {
  const root = qs(`[data-product-compare="${key}"]`);
  if (!root) return;
  const defaults = JSON.parse(qs("[data-compare-defaults]")?.textContent || "{}");
  const left = qs('[data-compare-select="left"]', root);
  const right = qs('[data-compare-select="right"]', root);
  const third = qs('[data-compare-select="third"]', root);
  const extraField = qs("[data-compare-extra]", root);
  const addButton = qs("[data-compare-add]", root);
  const controls = qs(".compare-controls", root);
  left.value = defaults.left || left.options[0]?.value || "";
  right.value = defaults.right || right.options[1]?.value || left.value;
  third.value = defaults.third || third.options[2]?.value || right.value || left.value;
  let hasThird = false;

  const render = () => {
    const ids = hasThird ? [left.value, right.value, third.value] : [left.value, right.value];
    const products = ids.map(findProductById).filter(Boolean);
    qs("[data-compare-selected]", root).innerHTML = renderCompareSelection(products);
    root.dataset.compareCount = String(products.length);
    controls?.classList.toggle("is-three", hasThird);
    hydrateLocalMediaElements();
  };

  left.addEventListener("change", render);
  right.addEventListener("change", render);
  third.addEventListener("change", render);
  addButton?.addEventListener("click", () => {
    hasThird = !hasThird;
    if (extraField) extraField.hidden = !hasThird;
    if (addButton) addButton.textContent = hasThird ? "Quitar tercer equipo" : "Agregar otro equipo";
    render();
  });
  render();
}

function renderCompareSelection(products) {
  return `
    <div class="compare-columns" data-compare-count="${products.length}">
      ${products.map(renderCompareColumn).join("")}
    </div>
  `;
}

function renderCompareColumn(product) {
  return `
    <div class="compare-column">
      ${renderCompareProduct(product)}
      <div class="compare-column-specs" aria-label="Caracteristicas de ${product.name}">
        ${compareRows([product]).map((row) => `
          <div class="compare-column-spec">
            ${compareIcon(row.icon)}
            <span>${row.label}</span>
            <strong>${row.values[0]}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function compareIcon(icon) {
  const paths = {
    model: '<rect x="7" y="3" width="10" height="18" rx="2"></rect><path d="M11 18h2"></path>',
    family: '<path d="M4 7h16"></path><path d="M7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7"></path><path d="M9 7V5a3 3 0 0 1 6 0v2"></path>',
    screen: '<rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path>',
    resolution: '<path d="M4 8V5a1 1 0 0 1 1-1h3"></path><path d="M16 4h3a1 1 0 0 1 1 1v3"></path><path d="M20 16v3a1 1 0 0 1-1 1h-3"></path><path d="M8 20H5a1 1 0 0 1-1-1v-3"></path><path d="M9 12h6"></path>',
    chip: '<rect x="7" y="7" width="10" height="10" rx="2"></rect><path d="M9 1v3"></path><path d="M15 1v3"></path><path d="M9 20v3"></path><path d="M15 20v3"></path><path d="M20 9h3"></path><path d="M20 15h3"></path><path d="M1 9h3"></path><path d="M1 15h3"></path>',
    battery: '<rect x="3" y="7" width="16" height="10" rx="2"></rect><path d="M21 11v2"></path><path d="M7 11h6"></path>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3"></circle>',
    storage: '<ellipse cx="12" cy="5" rx="7" ry="3"></ellipse><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"></path>',
    connect: '<path d="M6 9a6 6 0 0 1 12 0"></path><path d="M9 12a3 3 0 0 1 6 0"></path><path d="M12 16h.01"></path><path d="M4 19h16"></path>',
    material: '<path d="M12 3 3 8l9 5 9-5-9-5z"></path><path d="m3 14 9 5 9-5"></path>',
    compat: '<path d="M20 6 9 17l-5-5"></path>',
    target: '<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3"></path><path d="M12 19v3"></path><path d="M2 12h3"></path><path d="M19 12h3"></path>',
    color: '<circle cx="12" cy="12" r="8"></circle><path d="M12 4v16"></path><path d="M4 12h16"></path>',
    price: '<path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"></path>',
    openbox: '<path d="M21 8 12 3 3 8l9 5 9-5z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path>'
  };
  return `<i class="spec-icon spec-icon-${icon}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[icon] || paths.model}</svg></i>`;
}

function renderCompareProduct(product) {
  const media = product.image
    ? renderCompareImage(product.image, product.name)
    : `<div class="product-visual ${product.visual || inferVisual(product.family)}" style="--p1:${product.p1};--p2:${product.p2}" aria-hidden="true"></div>`;
  return `
    <article class="compare-product-card">
      <div class="compare-product-media">${media}</div>
      <div class="compare-product-copy">
        <span class="badge">${product.badge}</span>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="compare-price-line"></div>
        <strong class="price">Desde ${formatPrice(product.price)}</strong>
        <button class="btn primary" type="button" data-product-options="${product.id}">Comprar</button>
        <button class="compare-link" type="button" data-product-options="${product.id}">Mas informacion ›</button>
      </div>
    </article>
  `;
}

function compareSwatches(product) {
  const text = `${product.name} ${product.color || ""}`.toLowerCase();
  if (text.includes("ultra") || text.includes("titanio")) return ["#c9b49a", "#2f3437", "#f4f4f2"];
  if (text.includes("pro") || text.includes("max")) return ["#f5822a", "#f5f5f0", "#2b3145", "#050505"];
  if (text.includes("air") || text.includes("ipad")) return ["#d8c8e8", "#a8b9d6", "#f5f5f0", "#2f3437"];
  if (text.includes("watch")) return ["#d8c8e8", "#aebc85", "#92a9c9", "#f5f5f0", "#2f3437"];
  if (text.includes("mac")) return ["#e3e4e6", "#f5f1e8", "#2f3437"];
  if (text.includes("airpods")) return ["#f7f7f5", "#2f3437"];
  return ["#f5f5f0", "#2f3437", "#9fb6d8"];
}

function renderCompareSummary(products) {
  const summaryRows = [
    ["screen", "Pantalla", (item) => productSpecs(item).display],
    ["chip", "Rendimiento", (item) => productSpecs(item).chip],
    ["camera", "Camara y audio", (item) => productSpecs(item).camera],
    ["battery", "Bateria", (item) => productSpecs(item).battery],
    ["material", "Material", (item) => productSpecs(item).material],
    ["storage", "Capacidad", (item) => productSpecs(item).storage],
    ["connect", "Conexion", (item) => productSpecs(item).connectivity],
    ["target", "Ideal para", (item) => productSpecs(item).ideal],
    ["openbox", "Open Box", (item) => item.category === "iphone" ? (item.openBoxAvailable === false ? "No disponible" : formatPrice(item.openBoxPrice || Math.round(item.price * 0.88))) : "No aplica"]
  ];

  return `
    <section class="compare-summary" aria-label="Resumen de comparacion">
      <h3>Resumen</h3>
      <div class="compare-summary-columns">
        ${products.map((product) => `
          <article class="compare-summary-column">
            ${summaryRows.map(([icon, label, getter], index) => `
              <div class="compare-summary-feature ${index === 0 ? "is-large" : ""}">
                <i class="spec-icon spec-icon-${icon}" aria-hidden="true"></i>
                <strong>${getter(product) || "Consultar"}</strong>
                <span>${label}</span>
              </div>
            `).join("")}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCompareImage(src, alt = "") {
  const style = "width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;object-position:center center;display:block;padding:0;border-radius:0;";
  if (isLocalMediaRef(src)) {
    return `<img class="compare-image" data-local-media-src="${src}" alt="${alt}" loading="lazy" style="${style}">`;
  }
  if (isPublishedMediaPath(src)) {
    return `<img class="compare-image" data-published-media-src="${src}" alt="${alt}" loading="lazy" style="${style}">`;
  }
  return `<img class="compare-image" src="${src}" alt="${alt}" loading="lazy" style="${style}">`;
}

function compareRows(products) {
  const labels = [
    ["model", "Modelo exacto", (item) => item.name],
    ["family", "Familia", (item) => item.family],
    ["screen", "Pantalla / formato", (item) => productSpecs(item).display],
    ["resolution", "Resolucion", (item) => productSpecs(item).resolution],
    ["chip", "Chip / rendimiento", (item) => productSpecs(item).chip],
    ["battery", "Bateria / autonomia", (item) => productSpecs(item).battery],
    ["camera", "Camara / audio", (item) => productSpecs(item).camera],
    ["storage", "Almacenamiento", (item) => productSpecs(item).storage],
    ["connect", "Conectividad", (item) => productSpecs(item).connectivity],
    ["material", "Material / acabado", (item) => productSpecs(item).material],
    ["compat", "Compatibilidad", (item) => productSpecs(item).compatibility],
    ["target", "Ideal para", (item) => productSpecs(item).ideal],
    ["color", "Color", (item) => item.color || "Consultar"],
    ["price", "Precio sellado", (item) => item.category === "iphone" && item.sealedAvailable === false ? "No disponible" : formatPrice(item.price)],
    ["openbox", "Open box", (item) => item.category === "iphone" ? (item.openBoxAvailable === false ? "No disponible" : formatPrice(item.openBoxPrice || Math.round(item.price * 0.88))) : "No aplica"]
  ];
  return labels.map(([icon, label, getter]) => ({
    icon,
    label,
    values: products.map((item) => getter(item) || "Consultar")
  }));
}

function productSpecs(item) {
  if (item.specs) return item.specs;
  const name = item.name.toLowerCase();
  const category = item.category;
  const family = item.family.toLowerCase();

  if (category === "iphone") {
    const proMax = name.includes("pro max");
    const pro = family.includes("pro");
    const model = Number((name.match(/iphone\s+(\d+)/) || [])[1]) || 16;
    return {
      display: `${proMax ? "6.9" : pro ? "6.3" : model >= 16 ? "6.1" : "6.1"} pulgadas OLED`,
      resolution: proMax ? "Super Retina XDR, alta resolucion" : "Super Retina XDR",
      chip: pro ? `A${model || 17} Pro` : `A${model || 17}`,
      battery: proMax ? "Hasta 29 h de video" : pro ? "Hasta 27 h de video" : "Hasta 22 h de video",
      camera: pro ? "Sistema Pro con teleobjetivo" : "Camara principal 48 MP",
      storage: pro ? "256 GB o mas" : "128 GB o mas",
      connectivity: "5G, Wi-Fi, Bluetooth, USB-C",
      material: pro ? "Titanio / vidrio texturizado" : "Aluminio / vidrio",
      compatibility: "MagSafe, iOS, AirPods, Watch",
      ideal: pro ? "Foto, video y alto rendimiento" : "Uso diario, estudio y redes"
    };
  }

  if (category === "mac") {
    const pro = family.includes("pro") || name.includes("pro");
    const desktop = family.includes("imac") || family.includes("mini") || name.includes("imac") || name.includes("mini");
    return {
      display: desktop ? (name.includes("imac") ? "24 pulgadas Retina" : "Escritorio sin pantalla") : name.includes("16") ? "16 pulgadas Liquid Retina" : "13-14 pulgadas Liquid Retina",
      resolution: desktop ? (name.includes("mini") ? "Depende del monitor" : "Retina 4.5K") : "Liquid Retina de alta resolucion",
      chip: name.includes("max") ? "Apple M5 Max" : name.includes("pro") ? "Apple M5 Pro" : name.includes("m4") ? "Apple M4" : "Apple M5",
      battery: desktop ? "Conectado a corriente" : pro ? "Hasta 22 h" : "Hasta 18 h",
      camera: "Camara y audio integrados",
      storage: pro ? "512 GB / 1 TB sugerido" : "256 GB / 512 GB sugerido",
      connectivity: desktop ? "Thunderbolt, USB-C, Wi-Fi" : "Thunderbolt / USB-C, Wi-Fi",
      material: desktop ? "Aluminio de escritorio" : "Aluminio unibody",
      compatibility: "macOS, iCloud, iPhone, iPad",
      ideal: pro ? "Edicion, diseno y desarrollo" : desktop ? "Oficina, POS y escritorio" : "Estudio, oficina y movilidad"
    };
  }

  if (category === "ipad") {
    const pro = family.includes("pro");
    const air = family.includes("air");
    return {
      display: name.includes("13") ? "13 pulgadas" : "11 pulgadas",
      resolution: pro ? "Ultra Retina XDR" : "Liquid Retina",
      chip: pro || air ? "Apple M4" : name.includes("mini") ? "A17 Pro" : "A16",
      battery: "Hasta 10 h",
      camera: "Camara 12 MP y videollamadas",
      storage: pro ? "256 GB o mas" : "128 GB sugerido",
      connectivity: "Wi-Fi, USB-C, opcion Cellular",
      material: "Aluminio",
      compatibility: "Apple Pencil, teclado y iPadOS",
      ideal: pro ? "Diseno, video y productividad Pro" : air ? "Trabajo, clases y creatividad" : "Clases, hogar y consumo"
    };
  }

  if (category === "airpods") {
    const max = name.includes("max");
    const pro = family.includes("pro");
    return {
      display: max ? "Audifono over-ear" : "Audifono in-ear",
      resolution: max ? "Audio circumaural" : "Audio in-ear",
      chip: "Audio espacial",
      battery: max ? "Hasta 20 h" : "Hasta 30 h con estuche",
      camera: pro ? "Cancelacion activa avanzada" : max ? "Alta fidelidad y ANC" : "Sonido espacial",
      storage: "Estuche de carga",
      connectivity: "Bluetooth, cambio automatico Apple",
      material: max ? "Aluminio y malla tejida" : "Policarbonato blanco",
      compatibility: "iPhone, iPad, Mac, Watch",
      ideal: pro ? "Viajes, oficina y llamadas" : max ? "Audio premium" : "Uso diario"
    };
  }

  if (category === "watch") {
    const ultra = family.includes("ultra");
    const se = family.includes("se");
    return {
      display: ultra ? "49 mm, titanio" : se ? "40/44 mm Retina" : "42/46 mm siempre activa",
      resolution: ultra ? "Retina brillante para exterior" : "Retina OLED",
      chip: ultra ? "Chip S avanzado" : "Chip S de ultima generacion",
      battery: ultra ? "Hasta 42 h" : "Hasta 18 h",
      camera: "Salud, ritmo cardiaco y entrenos",
      storage: "GPS / Cellular segun version",
      connectivity: "Bluetooth, Wi-Fi, GPS",
      material: ultra ? "Titanio" : "Aluminio",
      compatibility: "iPhone, Fitness, Apple Pay",
      ideal: ultra ? "Deporte y aventura" : se ? "Primer Apple Watch" : "Salud y uso diario"
    };
  }

  return {
    display: family,
    resolution: "No aplica",
    chip: "Compatible Apple",
    battery: "Segun uso",
    camera: item.desc,
    storage: "Consultar",
    connectivity: "USB-C / MagSafe segun accesorio",
    material: "Segun producto",
    compatibility: "Equipos Apple compatibles",
    ideal: "Complementar tu equipo Apple"
  };
}

function renderService() {
  layoutShell(`
    <section class="section page-hero service-hero">
      <div class="page-hero-inner">
        <div>
          <span class="eyebrow reveal">Especialistas Apple en Ica</span>
          <h1 class="reveal">Servicio tecnico con diagnostico claro y atencion profesional.</h1>
          <p class="page-lede reveal">Reparacion de iPhone, Mac, bateria, pantalla, liberaciones y recuperacion de software con procesos ordenados y comunicacion directa.</p>
          <div class="cta-row reveal">
            <a class="btn primary" target="_blank" rel="noopener" href="${whatsappUrl("Hola STTOR, necesito servicio tecnico para mi equipo Apple.")}">Agendar diagnostico</a>
            <a class="btn" href="#contacto">Formulario</a>
          </div>
          <div class="service-proof reveal">
            <span>Diagnostico documentado</span>
            <span>Pruebas finales</span>
            <span>Seguimiento por WhatsApp</span>
          </div>
        </div>
        <div class="service-hero-visual reveal">
          <div class="service-logo-card">
            ${renderLocalAwareImage(logo("service"), "Logo re:STTOR servicio tecnico", "page-logo")}
          </div>
          <div class="service-status-card">
            <span>Flujo tecnico</span>
            <strong>Revision + cotizacion antes de reparar</strong>
          </div>
          <div class="service-mini-grid">
            <span>iPhone</span>
            <span>Mac</span>
            <span>Software</span>
          </div>
        </div>
      </div>
    </section>

    ${renderDecoration("service-after-hero")}

    <section class="section">
      <div class="section-head reveal">
        <div>
          <h2 class="section-title">Servicios especializados.</h2>
          <p class="section-copy">Procesos claros, comunicacion por WhatsApp y evaluacion antes de cada reparacion.</p>
        </div>
      </div>
      <div class="service-grid">${SERVICES.filter((item) => item.active !== false).map(renderServiceCard).join("")}</div>
    </section>

    ${renderDecoration("service-before-services")}

    <section class="section service-process">
      <div class="service-process-card reveal">
        <div>
          <span class="eyebrow">Proceso STTOR</span>
          <h2 class="section-title">Atencion ordenada, sin vueltas.</h2>
        </div>
        <div class="service-steps">
          <article><span>01</span><strong>Evaluacion</strong><p>Revisamos la falla y confirmamos el estado real del equipo.</p></article>
          <article><span>02</span><strong>Cotizacion</strong><p>Te indicamos precio, tiempo y opciones antes de intervenir.</p></article>
          <article><span>03</span><strong>Reparacion</strong><p>Realizamos el servicio aprobado y mantenemos comunicacion por WhatsApp.</p></article>
          <article><span>04</span><strong>Entrega</strong><p>Validamos funcionamiento y pruebas finales antes de entregar.</p></article>
        </div>
      </div>
    </section>

    <section class="section service-editorial">
      <div class="service-editorial-panel reveal">
        <div>
          <span class="eyebrow">Criterio tecnico</span>
          <h2 class="section-title">Reparamos solo despues de explicar el diagnostico.</h2>
          <p class="section-copy">La prioridad es que entiendas que falla, cuanto cuesta y que resultado esperar antes de aprobar cualquier servicio.</p>
        </div>
        <div class="service-editorial-list">
          <article><span>01</span><strong>Revision antes de reparar</strong><p>Se confirma el diagnostico y la cotizacion antes de intervenir el equipo.</p></article>
          <article><span>02</span><strong>Control de calidad</strong><p>Pruebas de carga, pantalla, camaras, audio y sistema segun el servicio realizado.</p></article>
          <article><span>03</span><strong>Comunicacion directa</strong><p>Estado del servicio y aprobaciones por WhatsApp, sin pasos confusos.</p></article>
        </div>
      </div>
    </section>

    ${renderDecoration("service-before-contact")}

    <section class="section wide-band" id="contacto">
      <div class="split">
        <div class="form-card reveal">
          <h2 class="section-title">Solicita evaluacion.</h2>
          <p class="section-copy">El formulario prepara un mensaje para WhatsApp con el detalle de tu caso.</p>
          <form class="form-grid" data-service-form>
            <div class="field"><input name="name" placeholder="Nombre completo" required></div>
            <div class="field"><input name="phone" placeholder="Telefono o WhatsApp" required></div>
            <div class="field"><select name="device" required>
              <option value="">Equipo</option>
              <option>iPhone</option><option>Mac</option><option>iPad</option><option>Apple Watch</option><option>AirPods</option>
            </select></div>
            <div class="field"><textarea name="issue" placeholder="Describe la falla o solucion que necesitas" required></textarea></div>
            <button class="btn primary" type="submit">Enviar por WhatsApp</button>
            <div class="form-status" data-form-status></div>
          </form>
        </div>
        ${renderLocationSection(true)}
      </div>
    </section>
  `);
}

function renderServiceCard(item) {
  const image = item.image ? renderLocalAwareImage(item.image, item.title, "service-image") : "";
  const gallery = Array.isArray(item.gallery) ? item.gallery.filter(Boolean).slice(0, 3) : [];
  const galleryHtml = gallery.length ? `<div class="service-gallery">${gallery.map((src) => renderLocalAwareImage(src, item.title)).join("")}</div>` : "";
  const priceHtml = item.hidePrice
    ? `<a class="service-price quote" href="${whatsappUrl(`Hola STTOR, quiero cotizar ${item.title}.`)}" target="_blank" rel="noopener">${item.quoteLabel || "Cotizar por WhatsApp"}</a>`
    : `<div class="service-price${item.priceFeatured ? " featured" : ""}">${item.promoPrice ? `<span>${formatPrice(Number(item.price || 0))}</span>` : ""}<strong>Desde ${formatPrice(Number(item.promoPrice || item.price || 0))}</strong></div>`;
  return `
    <article class="service-card reveal">
      ${image}
      ${galleryHtml}
      <div class="service-card-head">
        <div class="icon">${item.icon}</div>
        <span>Servicio tecnico</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
      ${priceHtml}
    </article>
  `;
}

function renderLocationSection(innerOnly = false) {
  const embed = mapEmbedUrl();
  const content = `
    <div class="section-head reveal">
      <div>
        <h2 class="section-title">Ubicacion en Ica.</h2>
        <p class="section-copy">${BUSINESS.address}. Mapa interactivo, ruta rapida y datos visibles para llegar sin friccion.</p>
      </div>
      <div class="cta-row compact">
        <a class="btn primary" href="${BUSINESS.maps}" target="_blank" rel="noopener">Como llegar</a>
        <a class="btn" href="${BUSINESS.appleMaps || BUSINESS.maps}" target="_blank" rel="noopener">Abrir en Apple Maps</a>
      </div>
    </div>
    <div class="map-card reveal">
      <iframe class="google-map" src="${embed}" title="Mapa interactivo de STTOR en Ica" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      <div class="map-pin-card map-overlay">
        ${renderLocalAwareImage(logo("main"), "STTOR marker")}
        <h3>${BUSINESS.name}</h3>
        <p>${BUSINESS.address}</p>
        <p>${BUSINESS.hours}</p>
        <div class="map-actions">
          <a class="btn primary" href="${BUSINESS.maps}" target="_blank" rel="noopener">Como llegar</a>
          <a class="btn" href="${BUSINESS.appleMaps || BUSINESS.maps}" target="_blank" rel="noopener">Apple Maps</a>
          <a class="btn" href="${BUSINESS.waze}" target="_blank" rel="noopener">Waze</a>
        </div>
      </div>
    </div>
  `;

  return innerOnly ? `<div>${content}</div>` : `<section class="section">${content}</section>`;
}

function mapEmbedUrl() {
  const query = encodeURIComponent(BUSINESS.address || "Av. San Martin 159, Ica, Peru");
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function initForms() {
  qs("[data-service-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = [
      "Hola STTOR, deseo una evaluacion tecnica.",
      `Nombre: ${data.get("name")}`,
      `Telefono: ${data.get("phone")}`,
      `Equipo: ${data.get("device")}`,
      `Detalle: ${data.get("issue")}`
    ].join("\n");
    qs("[data-form-status]").textContent = "Abriendo WhatsApp con tu solicitud...";
    window.open(whatsappUrl(message), "_blank", "noopener");
  });
}

function initMap() {
  return true;
}

function initReveal() {
  const items = qsa(".reveal:not([data-observed])");
  if (!("IntersectionObserver" in window)) {
    items.forEach((node) => {
      node.dataset.observed = "true";
      node.classList.add("in-view");
    });
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
  items.forEach((node, index) => {
    node.dataset.observed = "true";
    node.style.setProperty("--reveal-delay", `${Math.min(index * 18, 90)}ms`);
    observer.observe(node);
  });
}

let scrollDecorTicking = false;
let scrollDecorBound = false;

function initScrollDecorations() {
  const blocks = qsa("[data-scroll-decor]");
  if (!blocks.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  blocks.forEach((block) => {
    if (block.dataset.scrollReady) return;
    block.dataset.scrollReady = "true";
    const video = qs("[data-scroll-video]", block);
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.addEventListener("loadedmetadata", requestScrollDecorUpdate, { once: true });
    }
  });
  if (!scrollDecorBound) {
    scrollDecorBound = true;
    window.addEventListener("scroll", requestScrollDecorUpdate, { passive: true });
    window.addEventListener("resize", requestScrollDecorUpdate);
  }
  requestScrollDecorUpdate();
}

function requestScrollDecorUpdate() {
  if (scrollDecorTicking) return;
  scrollDecorTicking = true;
  window.requestAnimationFrame(() => {
    scrollDecorTicking = false;
    updateScrollDecorations();
  });
}

function updateScrollDecorations() {
  qsa("[data-scroll-decor]").forEach((block) => {
    const rect = block.getBoundingClientRect();
    const total = window.innerHeight + rect.height;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
    const video = qs("[data-scroll-video]", block);
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      try {
        video.pause();
        video.currentTime = Math.min(video.duration - 0.04, Math.max(0, progress * video.duration));
      } catch (error) {
        // Mobile browsers can delay seeking until metadata is fully available.
      }
    }
    const image = qs("[data-scroll-image]", block);
    if (image) {
      image.style.transform = `translate3d(0, ${(0.5 - progress) * 28}px, 0) scale(1.035)`;
    }
  });
}

function initWhatsApp() {
  const link = qs("[data-wa-float]");
  if (link) {
    link.href = whatsappUrl("Hola STTOR, deseo consultar stock y recibir una cotizacion.");
  }
}

function initGlobalSearch() {
  const root = qs("[data-global-search]");
  const input = qs("[data-global-search-input]");
  const results = qs("[data-global-search-results]");
  if (!root || !input || !results || input.dataset.ready) return;
  input.dataset.ready = "true";
  const render = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }
    const matches = allCatalogProducts()
      .filter((item) => `${item.name} ${item.family} ${item.desc} ${item.color} ${item.categoryLabel}`.toLowerCase().includes(query))
      .slice(0, 8);
    results.hidden = false;
    results.innerHTML = matches.length ? matches.map((item) => `
      <button class="global-result" type="button" data-product-options="${item.id}">
        <span>${renderCartItemMedia(item)}</span>
        <strong>${item.name}</strong>
        <small>${item.categoryLabel} · ${formatPrice(item.price)}</small>
      </button>
    `).join("") : `<div class="global-no-result">Sin resultados. Prueba con otra palabra.</div>`;
    hydrateLocalMediaElements();
  };
  root.addEventListener("click", () => {
    root.classList.add("is-open");
    input.focus();
  });
  input.addEventListener("input", render);
  input.addEventListener("focus", () => {
    root.classList.add("is-open");
    render();
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-global-search]")) return;
    root.classList.remove("is-open");
    results.hidden = true;
    input.value = "";
  });
}

function initHomeHero() {
  const root = qs("[data-home-hero]");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "true";
  const slides = qsa("[data-home-hero-slide]", root);
  const dots = qsa("[data-home-hero-dot]", root);
  if (slides.length <= 1) return;
  let index = 0;
  let paused = false;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => show(Number(dot.dataset.homeHeroDot || 0)));
  });

  root.addEventListener("mouseenter", () => { paused = true; });
  root.addEventListener("mouseleave", () => { paused = false; });
  root.addEventListener("focusin", () => { paused = true; });
  root.addEventListener("focusout", () => { paused = false; });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      if (!paused) show(index + 1);
    }, 4200);
  }
}

function allCatalogProducts() {
  return Object.entries(PRODUCTS).flatMap(([category, items]) => {
    const categoryLabel = CATEGORY_META[category]?.title || category;
    return items.filter((item) => item.active !== false).map((item) => ({ ...item, category, categoryLabel }));
  });
}

function initCarousels() {
  qsa("[data-carousel]:not([data-ready])").forEach((carousel) => {
    carousel.dataset.ready = "true";
    const track = qs("[data-carousel-track]", carousel);
    const prev = qs("[data-carousel-prev]", carousel);
    const next = qs("[data-carousel-next]", carousel);
    const indicators = qs("[data-carousel-indicators]", carousel);
    const toggle = qs("[data-carousel-toggle]", carousel);
    let activeIndex = 0;
    let elapsed = 0;
    let ended = false;
    let ignoreScrollSyncUntil = 0;
    const getItems = () => [...track.children];
    const getPerPage = () => {
      const items = getItems();
      if (!items.length) return 1;
      const first = items[0];
      const second = items[1];
      const step = second ? Math.max(1, second.offsetLeft - first.offsetLeft) : Math.max(1, first.clientWidth);
      return Math.max(1, Math.round(track.clientWidth / step));
    };
    const getPageCount = () => Math.max(1, Math.ceil(getItems().length / getPerPage()));
    const getTargetLeft = (pageIndex) => {
      const items = getItems();
      const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const itemIndex = Math.max(0, Math.min(items.length - 1, pageIndex * getPerPage()));
      const item = items[itemIndex];
      return item ? Math.round(Math.min(item.offsetLeft, maxLeft)) : 0;
    };
    const goTo = (index, behavior = "smooth") => {
      const pageCount = getPageCount();
      activeIndex = Math.max(0, Math.min(pageCount - 1, index));
      ignoreScrollSyncUntil = Date.now() + 1400;
      track.scrollTo({ left: getTargetLeft(activeIndex), behavior });
      renderCarouselIndicators();
    };
    const move = (direction) => {
      const pageCount = getPageCount();
      const current = Array.from({ length: pageCount }, (_, index) => index).reduce((best, index) => {
        const distance = Math.abs(getTargetLeft(index) - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity }).index;
      goTo(current + direction);
    };
    const renderCarouselIndicators = () => {
      if (!indicators) return;
      const count = getPageCount();
      if (!count) return;
      const normalizedIndex = activeIndex % count;
      indicators.innerHTML = Array.from({ length: count }, (_, index) => (
        index === normalizedIndex
          ? `<button class="carousel-progress-track" type="button" data-carousel-jump="${index}" aria-label="Ver grupo ${index + 1}"><span data-carousel-progress style="--carousel-progress:${Math.min(1, elapsed / Math.max(3600, Number(carousel.dataset.carouselDelay || 3600)))}"></span></button>`
          : `<button class="carousel-dot" type="button" data-carousel-jump="${index}" aria-label="Ver grupo ${index + 1}"></button>`
      )).join("");
    };
    prev?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    if (carousel.dataset.carouselAuto === "true" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let paused = false;
      let lastTime = 0;
      const setEnded = (value) => {
        ended = value;
        carousel.classList.toggle("is-ended", ended);
        if (ended) {
          paused = true;
          carousel.classList.remove("is-paused");
          toggle?.setAttribute("aria-label", "Repetir carrusel");
          toggle?.setAttribute("aria-pressed", "true");
        }
      };
      const step = () => {
        if (track.scrollWidth <= track.clientWidth) return;
        if (activeIndex >= getPageCount() - 1) {
          elapsed = Math.max(3600, Number(carousel.dataset.carouselDelay || 3600));
          const progress = qs("[data-carousel-progress]", carousel);
          if (progress) progress.style.setProperty("--carousel-progress", 1);
          setEnded(true);
          return;
        }
        goTo(activeIndex + 1);
        elapsed = 0;
      };
      const delay = Math.max(3600, Number(carousel.dataset.carouselDelay || 3600));
      const setPaused = (value) => {
        if (ended) return;
        paused = value;
        carousel.classList.toggle("is-paused", paused);
        toggle?.setAttribute("aria-label", paused ? "Reproducir carrusel" : "Pausar carrusel");
        toggle?.setAttribute("aria-pressed", paused ? "true" : "false");
      };
      const tick = (time) => {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;
        lastTime = time;
        if (!paused && !ended && track.scrollWidth > track.clientWidth) {
          elapsed += delta;
          const ratio = Math.min(1, elapsed / delay);
          const progress = qs("[data-carousel-progress]", carousel);
          if (progress) progress.style.setProperty("--carousel-progress", ratio);
          if (elapsed >= delay) step();
        }
        window.requestAnimationFrame(tick);
      };
      toggle?.addEventListener("click", () => {
        if (ended) {
          elapsed = 0;
          setEnded(false);
          goTo(0);
          setPaused(false);
          return;
        }
        setPaused(!paused);
      });
      indicators?.addEventListener("click", (event) => {
        const jump = event.target.closest("[data-carousel-jump]");
        if (!jump) return;
        elapsed = 0;
        setEnded(false);
        goTo(Number(jump.dataset.carouselJump || 0));
        setPaused(false);
      });
      renderCarouselIndicators();
      track.addEventListener("scroll", () => {
        if (Date.now() < ignoreScrollSyncUntil) return;
        const items = getItems();
        if (!items.length) return;
        const pageCount = getPageCount();
        const current = Array.from({ length: pageCount }, (_, index) => index).reduce((best, index) => {
          const distance = Math.abs(getTargetLeft(index) - track.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        }, { index: 0, distance: Infinity }).index;
        if (current !== activeIndex) {
          activeIndex = current;
          elapsed = 0;
          if (ended && current < pageCount - 1) setEnded(false);
          renderCarouselIndicators();
        }
      }, { passive: true });
      window.addEventListener("resize", () => {
        activeIndex = Math.min(activeIndex, Math.max(0, getPageCount() - 1));
        renderCarouselIndicators();
      });
      window.requestAnimationFrame(tick);
    }
  });
}

function initCommerce() {
  CART = loadCart();
  renderCartButton();
  renderCommerceShell();
  updateCartUI();
  if (document.body.dataset.commerceReady) return;
  document.body.dataset.commerceReady = "true";
  document.addEventListener("click", handleCommerceClick);
  document.addEventListener("change", handleOptionChange);
}

function renderCartButton() {
  const actions = qs(".nav-actions");
  if (!actions || qs("[data-cart-open]", actions)) return;
  actions.insertAdjacentHTML("afterbegin", `
    <button class="cart-button icon-cart-button" type="button" data-cart-open aria-label="Abrir carrito">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.2 7.2h15l-1.5 8.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.7L5.7 4.8H3.4"/>
        <circle cx="9.6" cy="20" r="1.2"/>
        <circle cx="17.4" cy="20" r="1.2"/>
      </svg>
      <span data-cart-count>0</span>
    </button>
  `);
}

function renderCommerceShell() {
  if (qs("[data-product-modal]")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="commerce-modal" data-product-modal hidden>
      <div class="commerce-backdrop" data-close-commerce></div>
      <section class="product-dialog" role="dialog" aria-modal="true" aria-label="Opciones de producto" data-product-dialog></section>
    </div>
    <aside class="cart-drawer" data-cart-drawer hidden aria-label="Carrito STTOR">
      <div class="cart-panel">
        <div class="cart-head">
          <div>
            <strong>Carrito</strong>
            <span data-cart-summary>0 productos</span>
          </div>
          <button class="icon-close" type="button" data-cart-close aria-label="Cerrar carrito">×</button>
        </div>
        <div class="cart-items" data-cart-items></div>
        <div class="cart-total">
          <span>Total</span>
          <strong data-cart-total>S/ 0</strong>
        </div>
        <button class="btn primary cart-checkout" type="button" data-cart-checkout>Comprar por WhatsApp</button>
      </div>
    </aside>
  `);
}

function handleCommerceClick(event) {
  const showMore = event.target.closest("[data-show-more]");
  if (showMore) {
    expandProducts(showMore.dataset.showMore);
    return;
  }

  const optionsButton = event.target.closest("[data-product-options]");
  if (optionsButton) {
    event.preventDefault();
    openProductModal(optionsButton.dataset.productOptions);
    return;
  }

  const buyNowButton = event.target.closest("[data-buy-now]");
  if (buyNowButton) {
    event.preventDefault();
    buyProductNow(buyNowButton.dataset.buyNow);
    return;
  }

  const productCard = event.target.closest("[data-product-card]");
  if (productCard && !event.target.closest("a, button, input, select, textarea")) {
    openProductModal(productCard.dataset.productCard);
    return;
  }

  if (event.target.closest("[data-close-commerce]")) closeProductModal();
  if (event.target.closest("[data-cart-open]")) openCart();
  if (event.target.closest("[data-cart-close]")) closeCart();
  if (event.target.matches("[data-cart-drawer]")) closeCart();

  const addButton = event.target.closest("[data-add-to-cart]");
  if (addButton?.hasAttribute("data-open-checkout")) {
    const product = findProductById(addButton.dataset.addToCart);
    const dialog = qs("[data-product-dialog]");
    const selected = qs("[name='product-condition']:checked", dialog);
    const qty = Math.max(1, Number(qs("[data-product-qty]", dialog)?.value || 1));
    if (product && selected) quickBuy(product, selected.value, Number(selected.dataset.price), qty);
  } else if (addButton) addCurrentProductToCart(addButton.dataset.addToCart);

  const removeButton = event.target.closest("[data-remove-cart]");
  if (removeButton) removeCartItem(Number(removeButton.dataset.removeCart));

  if (event.target.closest("[data-cart-checkout]")) checkoutCart();
}

function expandProducts(key) {
  const root = qs(`[data-expandable-products="${key}"]`);
  if (!root) return;
  const grid = qs(`[data-all-products="${key}"]`, root);
  if (!grid) return;
  grid.classList.toggle("is-collapsed");
  const expanded = !grid.classList.contains("is-collapsed");
  qsa(".is-hidden-product", grid).forEach((card) => {
    card.classList.remove("is-hidden-product");
  });
  const button = qs(`[data-show-more="${key}"]`, root);
  if (button) button.textContent = expanded ? "Ocultar productos" : "Ver mas productos";
  if (expanded) grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleOptionChange(event) {
  if (!event.target.matches("[name='product-condition'], [data-product-qty]")) return;
  updateModalPrice();
}

function findProductById(id) {
  return Object.values(PRODUCTS).flat().find((item) => item.id === id);
}

function openProductModal(id) {
  const product = findProductById(id);
  if (!product) return;
  const modal = qs("[data-product-modal]");
  const dialog = qs("[data-product-dialog]");
  const canSeal = product.category !== "iphone" || product.sealedAvailable !== false;
  const canOpenBox = product.category === "iphone" && product.openBoxAvailable !== false;
  if (!canSeal && !canOpenBox) return;
  const openBox = canOpenBox ? product.openBoxPrice || Math.round(product.price * 0.88) : 0;
  const beforePrice = product.beforePrice || previousPrice(product.price);
  const openBoxBefore = previousPrice(openBox || product.price);
  const defaultPrice = canSeal ? product.price : openBox;
  dialog.innerHTML = `
    <button class="icon-close modal-close" type="button" data-close-commerce aria-label="Cerrar">×</button>
    <div class="product-dialog-grid">
      <div class="product-dialog-media">
        ${product.image ? renderLocalAwareImage(product.image, product.name) : `<div class="product-visual ${product.visual || inferVisual(product.family)}" style="--p1:${product.p1};--p2:${product.p2}" aria-hidden="true"></div>`}
      </div>
      <div>
        <span class="badge">${product.badge}</span>
        <h2>${product.name}</h2>
        <p>${product.desc}</p>
        <div class="feature-list">
          <span>Familia: <strong>${product.family}</strong></span>
          <span>Color: <strong>${product.color}</strong></span>
          <span>Estado: <strong>Stock consultable</strong></span>
        </div>
        <div class="condition-grid ${canSeal && canOpenBox ? "" : "single"}" data-condition-grid>
          ${canSeal ? `<label class="condition-card active">
            <input type="radio" name="product-condition" value="Sellado" data-price="${product.price}" checked>
            <span>Equipo sellado</span>
            <em>${formatPrice(beforePrice)}</em>
            <strong>${formatPrice(product.price)}</strong>
          </label>` : ""}
          ${canOpenBox ? `
          <label class="condition-card ${canSeal ? "" : "active"}">
            <input type="radio" name="product-condition" value="Open box" data-price="${openBox}" ${canSeal ? "" : "checked"}>
            <span>Open box</span>
            <em>${formatPrice(openBoxBefore)}</em>
            <strong>${formatPrice(openBox)}</strong>
          </label>
          ` : ""}
        </div>
        <div class="qty-row">
          <label>Cantidad</label>
          <input type="number" min="1" value="1" data-product-qty>
        </div>
        <div class="modal-total"><span>Total</span><strong data-modal-total>${formatPrice(defaultPrice)}</strong></div>
        <button class="btn primary" type="button" data-add-to-cart="${product.id}">Agregar al carrito</button>
        <button class="btn checkout-now" type="button" data-add-to-cart="${product.id}" data-open-checkout>Comprar ahora</button>
      </div>
    </div>
  `;
  modal.hidden = false;
  updateModalPrice();
  hydrateLocalMediaElements();
}

function closeProductModal() {
  const modal = qs("[data-product-modal]");
  if (modal) modal.hidden = true;
}

function updateModalPrice() {
  const dialog = qs("[data-product-dialog]");
  if (!dialog || qs("[data-product-modal]")?.hidden) return;
  qsa(".condition-card", dialog).forEach((card) => {
    card.classList.toggle("active", card.querySelector("input").checked);
  });
  const selected = qs("[name='product-condition']:checked", dialog);
  const qty = Math.max(1, Number(qs("[data-product-qty]", dialog)?.value || 1));
  const total = Number(selected?.dataset.price || 0) * qty;
  qs("[data-modal-total]", dialog).textContent = formatPrice(total);
}

function addCurrentProductToCart(id) {
  const product = findProductById(id);
  const dialog = qs("[data-product-dialog]");
  const selected = qs("[name='product-condition']:checked", dialog);
  const qty = Math.max(1, Number(qs("[data-product-qty]", dialog)?.value || 1));
  if (!product || !selected) return;
  const item = {
    id: `${product.id}-${selected.value}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    condition: selected.value,
    price: Number(selected.dataset.price),
    qty,
    image: product.image || "",
    visual: product.visual || inferVisual(product.family),
    p1: product.p1,
    p2: product.p2,
    color: product.color
  };
  CART.push(item);
  saveCart();
  updateCartUI();
  closeProductModal();
  openCart();
}

function buyProductNow(id) {
  const product = findProductById(id);
  if (!product) return;
  if (product.category === "iphone" && product.sealedAvailable === false && product.openBoxAvailable !== false) {
    quickBuy(product, "Open box", Number(product.openBoxPrice || Math.round(product.price * 0.88)), 1);
    return;
  }
  quickBuy(product, "Sellado", Number(product.price), 1);
}

function quickBuy(product, condition, price, qty) {
  const origin = currentPageUrl();
  const category = product.category || "";
  const productUrl = category ? `${origin.replace(/\/[^/]*$/, "")}/${category}.html#${product.id}` : origin;
  const message = [
    `Hola STTOR 👋, quiero comprar ${qty > 1 ? `${qty} × ` : ""}*${product.name}*.`,
    `Estado: ${condition || "Sellado"}`,
    product.color ? `Color: ${product.color}` : null,
    `Precio referencial: ${formatPrice(price * qty)}`,
    productUrl ? `Ficha: ${productUrl}` : null,
    "Por favor confírmame stock y cómo finalizar la compra."
  ].filter(Boolean).join("\n");
  closeProductModal();
  window.open(whatsappUrl(message), "_blank", "noopener");
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(CART));
}

function removeCartItem(index) {
  CART.splice(index, 1);
  saveCart();
  updateCartUI();
}

function cartTotal() {
  return CART.reduce((total, item) => total + item.price * item.qty, 0);
}

function updateCartUI() {
  const count = CART.reduce((total, item) => total + item.qty, 0);
  qsa("[data-cart-count]").forEach((node) => {
    node.textContent = count;
    node.hidden = count === 0;
  });
  qs("[data-cart-summary]") && (qs("[data-cart-summary]").textContent = `${CART.length} producto${CART.length === 1 ? "" : "s"}`);
  qs("[data-cart-total]") && (qs("[data-cart-total]").textContent = formatPrice(cartTotal()));
  const list = qs("[data-cart-items]");
  if (!list) return;
  list.innerHTML = CART.length ? CART.map((item, index) => `
    <article class="cart-item">
      <div class="cart-item-media">
        ${renderCartItemMedia(item)}
      </div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.condition} · ${item.color || "Color consultable"}</span>
        <small>${item.qty} x ${formatPrice(item.price)}</small>
      </div>
      <div class="cart-item-price">
        <b>${formatPrice(item.price * item.qty)}</b>
        <button type="button" data-remove-cart="${index}">Eliminar</button>
      </div>
    </article>
  `).join("") : `<p class="cart-empty">Agrega productos para generar tu proforma.</p>`;
  hydrateLocalMediaElements();
}

function renderCartItemMedia(item) {
  const product = findProductById(item.productId);
  const image = item.image || product?.image;
  if (image) return renderLocalAwareImage(image, item.name);
  const visual = item.visual || product?.visual || inferVisual(product?.family || "");
  const p1 = item.p1 || product?.p1 || "#e5e7eb";
  const p2 = item.p2 || product?.p2 || "#9ca3af";
  return `<div class="product-visual cart-visual ${visual}" style="--p1:${p1};--p2:${p2}" aria-hidden="true"></div>`;
}

function openCart() {
  const drawer = qs("[data-cart-drawer]");
  if (!drawer) return;
  const button = qs("[data-cart-open]");
  if (button) {
    const rect = button.getBoundingClientRect();
    drawer.style.setProperty("--cart-origin-x", `${rect.left + rect.width / 2}px`);
    drawer.style.setProperty("--cart-origin-y", `${rect.top + rect.height / 2}px`);
    drawer.style.setProperty("--cart-panel-top", `${Math.max(12, rect.bottom + 12)}px`);
    drawer.style.setProperty("--cart-panel-right", `${Math.max(12, window.innerWidth - rect.right)}px`);
  }
  drawer.hidden = false;
  requestAnimationFrame(() => drawer.classList.add("open"));
}

function closeCart() {
  const drawer = qs("[data-cart-drawer]");
  if (!drawer) return;
  drawer.classList.remove("open");
  window.setTimeout(() => {
    if (!drawer.classList.contains("open")) drawer.hidden = true;
  }, 360);
}

function checkoutCart() {
  if (!CART.length) return;
  const origin = currentPageUrl();
  const lines = CART.map((item, index) => {
    const product = findProductById(item.productId);
    const category = product?.category || item.category || "";
    const productUrl = category && item.productId
      ? `${origin.replace(/\/[^/]*$/, "")}/${category}.html#${item.productId}`
      : origin;
    const subtotal = formatPrice(item.price * item.qty);
    const productLine = `*${item.qty}\u00d7 ${item.name}*`;
    const detailLines = [
      `   \u2022 Estado: ${item.condition || "Consultar"}`,
      item.color ? `   \u2022 Color: ${item.color}` : null,
      `   \u2022 Cantidad: ${item.qty}`,
      `   \u2022 Precio: ${subtotal}`
    ].filter(Boolean);
    if (productUrl) detailLines.push(`   \u2022 Ficha: ${productUrl}`);
    return [`${index + 1}. ${productLine}`, ...detailLines].join("\n");
  });
  const message = [
    "Hola STTOR \ud83d\udc4b, deseo comprar estos productos:",
    "",
    ...lines,
    "",
    `*Total referencial:* ${formatPrice(cartTotal())}`,
    "",
    `\ud83d\udecd Lo vi en: ${origin}`,
    "",
    "Por favor conf\u00edrmame stock, costo de env\u00edo y pasos para finalizar la compra. \ud83d\ude4f"
  ].filter(Boolean).join("\n");
  window.open(whatsappUrl(message), "_blank", "noopener");
}

function renderFooter() {
  const footer = qs("[data-footer]");
  if (!footer) return;
  const embed = mapEmbedUrl();
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        ${renderLocalAwareImage(logo("main"), "STTOR", "footer-logo")}
        <p>Venta de iPhone, MacBook, iPad, Apple Watch, AirPods y accesorios Apple en Ica, con cotizaciones por WhatsApp para Ica y Lima.</p>
        <p><strong>Nombre comercial completo:</strong> ${BUSINESS.legalName || "STTOR corporation"}</p>
        <p><strong>RUC:</strong> ${BUSINESS.ruc}</p>
      </div>
      <div>
        <h3>Contáctanos</h3>
        <a href="${whatsappUrl("Hola STTOR, deseo informacion.")}" target="_blank" rel="noopener">WhatsApp ${BUSINESS.phone}</a>
        <span>${BUSINESS.hours}</span>
        <span>${BUSINESS.address}</span>
      </div>
      <div>
        <h3>Información</h3>
        <a href="iphone.html">iPhone</a>
        <a href="mac.html">Mac</a>
        <a href="ipad.html">iPad</a>
        <a href="accesorios.html">Accesorios</a>
      </div>
      <div>
        <h3>Quiénes Somos</h3>
        <a href="sobre-sttor.html">Sobre STTOR</a>
        <span>Tienda especializada en tecnologia Apple en Ica.</span>
        <span>Atencion presencial en Av. San Martin 159, Ica.</span>
        <span>Asesoria antes y despues de la compra para clientes de Ica y Lima.</span>
      </div>
      <div>
        <h3>Ayuda</h3>
        <a href="servicio-tecnico.html">Servicio tecnico</a>
        <a href="garantia.html">Garantia y condiciones</a>
        <a href="preguntas-frecuentes.html">Preguntas frecuentes</a>
        <a href="${BUSINESS.maps}" target="_blank" rel="noopener">Como llegar</a>
        <a href="${BUSINESS.appleMaps || BUSINESS.maps}" target="_blank" rel="noopener">Apple Maps</a>
        <a href="${BUSINESS.waze}" target="_blank" rel="noopener">Abrir Waze</a>
      </div>
      <div>
        <h3>Más Información</h3>
        <a href="${BUSINESS.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a href="${BUSINESS.facebook}" target="_blank" rel="noopener">Facebook</a>
        <span>Atencion personalizada en tienda y por WhatsApp para compra, stock y servicio tecnico Apple.</span>
      </div>
      <div class="footer-map">
        <h3>Ubicación</h3>
        <iframe src="${embed}" title="Ubicacion STTOR en mapa interactivo" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  `;
}

function initCompare() {
  window.__comparingProducts = new Set(JSON.parse(sessionStorage.getItem("sttor-compare") || "[]"));
  if (qs("[data-compare-banner]")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="compare-banner" data-compare-banner hidden>
      <span>Comparar: <strong data-compare-names></strong></span>
      <a class="btn primary" data-compare-go>Comparar ahora</a>
      <button class="compare-banner-close" type="button" data-compare-clear aria-label="Limpiar seleccion">×</button>
    </div>
  `);
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-compare-toggle]");
    if (toggle) {
      const id = toggle.dataset.compareToggle;
      if (window.__comparingProducts.has(id)) {
        window.__comparingProducts.delete(id);
        toggle.classList.remove("active");
      } else {
        if (window.__comparingProducts.size >= 2) {
          const first = [...window.__comparingProducts][0];
          window.__comparingProducts.delete(first);
          qsa("[data-compare-toggle].active").forEach((btn) => {
            if (!window.__comparingProducts.has(btn.dataset.compareToggle)) btn.classList.remove("active");
          });
        }
        window.__comparingProducts.add(id);
        toggle.classList.add("active");
      }
      sessionStorage.setItem("sttor-compare", JSON.stringify([...window.__comparingProducts]));
      updateCompareBanner();
    }
    if (event.target.closest("[data-compare-clear]")) {
      window.__comparingProducts.clear();
      sessionStorage.removeItem("sttor-compare");
      qsa("[data-compare-toggle].active").forEach((btn) => btn.classList.remove("active"));
      updateCompareBanner();
    }
    if (event.target.closest("[data-compare-go]")) {
      const ids = [...window.__comparingProducts];
      const page = document.body.dataset.page;
      if (ids.length === 2 && CATEGORY_META[page]) {
        window.location.hash = "#comparar";
        initProductComparator(page);
      }
    }
  });
  updateCompareBanner();
}

function updateCompareBanner() {
  const banner = qs("[data-compare-banner]");
  const namesEl = qs("[data-compare-names]");
  if (!banner || !namesEl) return;
  const ids = [...window.__comparingProducts];
  if (ids.length !== 2) {
    banner.hidden = true;
    return;
  }
  const allItems = Object.values(PRODUCTS).flat();
  const names = ids.map((id) => allItems.find((p) => p.id === id)?.name || "Producto").join(" y ");
  namesEl.textContent = names;
  banner.hidden = false;
}

function findAllProduct(id) {
  return Object.values(PRODUCTS).flat().find((p) => p.id === id);
}

window.STTOR_DEFAULTS = {
  storageKey: STORAGE_KEY,
  business: BUSINESS,
  logos: BRAND_LOGOS,
  logoSizes: LOGO_SIZES,
  products: PRODUCTS,
  services: SERVICES,
  testimonials: TESTIMONIALS,
  categories: CATEGORY_META,
  home: HOME_CONTENT,
  homeSlides: HOME_SLIDES,
  banners: BANNERS,
  promotions: PROMOTIONS,
  infoPages: INFO_PAGES,
  decorations: DECORATIONS
};

document.addEventListener("DOMContentLoaded", async () => {
  await hydratePublishedContent();
  hydrateUserContent();
  prepareProducts();
  boot();
});
