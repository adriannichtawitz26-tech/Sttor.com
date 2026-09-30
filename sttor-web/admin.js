const Admin = {
  state: null,
  current: "overview",
  query: "",
  dirty: false,
  autosaveTimer: null,
  revision: 0,
  saving: false,
  saveQueued: false,
  localDraftDetected: false
};

const IMAGE_ACCEPT = ".webp,.jpg,.jpeg,.png,.svg,.avif,.gif,.bmp,.tif,.tiff,.ico,image/webp,image/jpeg,image/png,image/svg+xml,image/avif,image/gif,image/bmp,image/tiff,image/x-icon";
const VIDEO_ACCEPT = ".mp4,.webm,.mov,.m4v,.ogv,video/mp4,video/webm,video/quicktime,video/x-m4v,video/ogg";
const DECOR_ACCEPT = `${IMAGE_ACCEPT},${VIDEO_ACCEPT}`;
const ADMIN_LOCAL_MEDIA_DB = "sttor-local-media";
const ADMIN_LOCAL_MEDIA_STORE = "files";
const ADMIN_LOGO_NONE = "__none__";

function adminDefaults() {
  const defaults = window.STTOR_DEFAULTS;
  return JSON.parse(JSON.stringify({
    business: defaults.business,
    logos: defaults.logos,
    logoSizes: defaults.logoSizes,
    products: defaults.products,
    services: defaults.services,
    testimonials: defaults.testimonials,
    categories: defaults.categories,
    home: defaults.home,
    homeSlides: defaults.homeSlides || [],
    banners: defaults.banners,
    promotions: defaults.promotions,
    decorations: defaults.decorations,
    media: []
  }));
}

function loadAdminState() {
  const key = window.STTOR_DEFAULTS.storageKey;
  const defaults = adminDefaults();
  try {
    const local = JSON.parse(localStorage.getItem(key) || "{}");
    const hasLocal = local && Object.keys(local).length > 0;
    const hasRemote = Admin.remoteState && Object.keys(Admin.remoteState).length > 0;
    const localDiffers = hasLocal && hasRemote && stableAdminJson(local) !== stableAdminJson(Admin.remoteState);
    // A failed publish writes a recoverable draft to localStorage before the
    // request reaches Netlify. Prefer that draft on the next admin load.
    const saved = localDiffers ? local : (hasRemote ? Admin.remoteState : local);
    Admin.localDraftDetected = Boolean(localDiffers);
    Admin.dirty = Admin.localDraftDetected;
    Admin.state = {
      ...defaults,
      ...saved,
      business: { ...defaults.business, ...(saved.business || {}) },
      logos: { ...defaults.logos, ...(saved.logos || {}) },
      logoSizes: { ...defaults.logoSizes, ...(saved.logoSizes || {}) },
      products: { ...defaults.products, ...(saved.products || {}) },
      categories: { ...defaults.categories, ...(saved.categories || {}) },
      home: { ...defaults.home, ...(saved.home || {}) },
      homeSlides: saved.homeSlides || defaults.homeSlides || [],
      banners: saved.banners || defaults.banners,
      promotions: saved.promotions || defaults.promotions,
      decorations: saved.decorations || defaults.decorations,
      services: saved.services || defaults.services,
      testimonials: saved.testimonials || defaults.testimonials,
      media: saved.media || []
    };
  } catch {
    Admin.state = defaults;
  }
  ensureDecorationSlots();
  Object.values(Admin.state.products).flat().forEach((item, index) => {
    item.id ||= `p-${index}-${slug(item.name)}`;
    item.stock ??= 5;
    item.active ??= true;
    item.featured ??= false;
  });
  Admin.state.services = Admin.state.services.map((item, index) => normalizeService(item, index));
  Admin.state.testimonials = Admin.state.testimonials.map((item, index) => normalizeTestimonial(item, index));
  Admin.state.decorations = Admin.state.decorations.map((item) => normalizeDecoration(item));
  Admin.state.homeSlides = (Admin.state.homeSlides || []).map((item) => normalizeHomeSlide(item));
  restoreMissingPublishedMedia(defaults);
}

function restoreMissingPublishedMedia(defaults) {
  Object.keys(Admin.state.products || {}).forEach((category) => {
    const fallbackItems = defaults.products?.[category] || [];
    (Admin.state.products[category] || []).forEach((item, index) => {
      const fallback = fallbackItems.find((entry) => entry.id && entry.id === item.id)
        || fallbackItems.find((entry) => entry.name === item.name)
        || fallbackItems[index];
      if (fallback?.image && !item.image) item.image = fallback.image;
    });
  });

  (Admin.state.services || []).forEach((item, index) => {
    const fallback = (defaults.services || []).find((entry) => entry.title === item.title) || defaults.services?.[index];
    if (fallback?.image && !item.image) item.image = fallback.image;
    if (Array.isArray(fallback?.gallery) && fallback.gallery.length && !item.gallery?.length) {
      item.gallery = fallback.gallery;
    }
  });

  (Admin.state.decorations || []).forEach((item) => {
    const fallback = (defaults.decorations || []).find((entry) => entry.slot === item.slot);
    if (fallback?.image && !item.image) {
      item.image = fallback.image;
      item.mediaType = fallback.mediaType || inferMediaType(fallback.image);
    }
  });

  (Admin.state.homeSlides || []).forEach((item, index) => {
    const fallback = (defaults.homeSlides || []).find((entry) => entry.title === item.title || entry.productName === item.productName)
      || defaults.homeSlides?.[index];
    if (fallback?.image && !item.image) item.image = fallback.image;
  });

  Object.keys(defaults.logos || {}).forEach((key) => {
    if (defaults.logos[key] && !Admin.state.logos?.[key]) {
      Admin.state.logos ||= {};
      Admin.state.logos[key] = defaults.logos[key];
    }
  });
}

async function loadPublishedContentForAdmin() {
  if (typeof hydratePublishedContent === "function") {
    await hydratePublishedContent();
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      if (response.ok) Admin.remoteState = await response.json();
    } catch (error) {
      console.warn("No se pudo comparar el borrador local con la publicacion actual", error);
    }
    return;
  }
  if (typeof applyManagedContent === "function") {
    try {
      let response = await fetch("/api/content", { cache: "no-store" });
      if (!response.ok) response = await fetch("site-data.json", { cache: "no-store" });
      if (response.ok) {
        Admin.remoteState = await response.json();
        applyManagedContent(Admin.remoteState);
      }
    } catch (error) {
      console.warn("No se pudo cargar site-data.json para el admin", error);
    }
  }
}

function normalizeHomeSlide(item = {}) {
  return {
    productName: item.productName || "iPhone 17",
    eyebrow: item.eyebrow || "iPhone",
    title: item.title || "Titulo",
    subtitle: item.subtitle || "Texto corto",
    price: item.price || "S/0",
    cta: item.cta || "Ver producto",
    href: item.href || "iphone.html",
    accent: item.accent || "#ff801e",
    note: item.note || "",
    image: item.image || "",
    active: item.active !== false
  };
}

function ensureDecorationSlots() {
  const defaults = window.STTOR_DEFAULTS.decorations || [];
  Admin.state.decorations ||= [];
  defaults.forEach((item) => {
    if (!Admin.state.decorations.some((entry) => entry.slot === item.slot)) {
      Admin.state.decorations.push(JSON.parse(JSON.stringify(item)));
    }
  });
}

function normalizeDecoration(item) {
  return {
    slot: item.slot || "home-after-categories",
    title: item.title || "Decoracion",
    copy: item.copy || "",
    image: item.image || "",
    mediaType: item.mediaType || inferMediaType(item.image || ""),
    height: clampValue(item.height || 260, 40, 900),
    mediaWidth: clampValue(item.mediaWidth || 58, 35, 75),
    focusX: clampValue(item.focusX ?? 50, 0, 100),
    focusY: clampValue(item.focusY ?? 50, 0, 100),
    blockWidth: clampValue(item.blockWidth || 100, 10, 140),
    align: ["left", "center", "right"].includes(item.align) ? item.align : "center",
    textPosition: ["left", "right", "top", "bottom"].includes(item.textPosition) ? item.textPosition : "left",
    loopVideo: item.loopVideo === true,
    textOverlay: item.textOverlay !== false,
    textAlign: ["left", "center", "right"].includes(item.textAlign) ? item.textAlign : "center",
    textV: ["top", "center", "bottom"].includes(item.textV) ? item.textV : "top",
    fontStyle: ["apple", "system", "editorial"].includes(item.fontStyle) ? item.fontStyle : "apple",
    textSize: clampValue(item.textSize || 56, 22, 96),
    titleSize: clampValue(item.titleSize || item.textSize || 56, 12, 140),
    copySize: clampValue(item.copySize || 16, 8, 80),
    textBoxWidth: clampValue(item.textBoxWidth || 86, 10, 100),
    textColor: ["dark", "light"].includes(item.textColor) ? item.textColor : "dark",
    textX: clampValue(item.textX ?? 50, 0, 100),
    textY: clampValue(item.textY ?? 14, 0, 100),
    parallaxScroll: item.parallaxScroll === true,
    showText: item.showText !== false,
    active: item.active === true
  };
}

function normalizeTestimonial(item, index = 0) {
  if (Array.isArray(item)) {
    return {
      copy: item[0] || "Comentario del cliente.",
      name: item[1] || "Cliente",
      rating: Number(item[2] || 4.6 + (index % 4) / 10)
    };
  }
  return {
    copy: item.copy || "Comentario del cliente.",
    name: item.name || "Cliente",
    rating: Number(item.rating || 4.8)
  };
}

function normalizeService(item, index = 0) {
  if (Array.isArray(item)) {
    return {
      title: item[0] || "Servicio tecnico",
      copy: item[1] || "Descripcion del servicio.",
      icon: item[2] || "SV",
      price: Number(item[3] || 49 + index * 20),
      promoPrice: 0,
      priceFeatured: false,
      hidePrice: false,
      quoteLabel: "Cotizar por WhatsApp",
      image: item[4] || "",
      gallery: [],
      active: item[5] !== false
    };
  }
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
}

async function saveAdminState() {
  if (Admin.saving) {
    Admin.saveQueued = true;
    return;
  }
  Admin.saving = true;
  const revision = Admin.revision;
  try {
    await migrateEmbeddedMediaToLocal();
    compactMediaLibrary();
    localStorage.setItem(window.STTOR_DEFAULTS.storageKey, JSON.stringify(Admin.state));
    await publishAdminState(revision);
  } catch (error) {
    console.error(error);
    try {
      compactMediaLibrary();
      localStorage.setItem(window.STTOR_DEFAULTS.storageKey, JSON.stringify(Admin.state));
      const detail = error instanceof Error && error.message ? ` ${error.message}` : "";
      setStatus(`Guardado en este navegador; no se pudo publicar en la web.${detail}`, false);
    } catch (retryError) {
      console.error(retryError);
      setStatus("No se pudo guardar. Se intentara liberar espacio local y guardar de nuevo.", false);
    }
  } finally {
    Admin.saving = false;
    if (Admin.saveQueued) {
      Admin.saveQueued = false;
      await saveAdminState();
    }
  }
}

async function publishAdminState(revision) {
  let publishState = JSON.parse(JSON.stringify(Admin.state));
  let refs = collectAllIdbRefs(publishState);
  const blobs = await loadAllIdbBlobs(refs);

  const missingRefs = new Set([...refs].filter((ref) => {
    const id = String(ref).replace(/^idb:/, "");
    return !blobs[id];
  }));
  const recoveredMedia = { restored: 0, cleared: 0 };
  if (missingRefs.size) {
    publishState = restoreUnavailableLocalMedia(publishState, Admin.remoteState || {}, missingRefs, recoveredMedia);
    if (Array.isArray(publishState.media)) {
      publishState.media = publishState.media.filter((item) => item.src || item.url);
    }
  }

  refs = collectAllIdbRefs(publishState);
  const converted = convertIdbRefsToMediaPaths(publishState, blobs, (id, blob) => {
    if (!blob) throw new Error(`No se encontró el archivo local ${id}`);
    return `/api/media?key=${encodeURIComponent(id)}`;
  });

  for (const ref of refs) {
    const id = String(ref).replace(/^idb:/, "");
    const media = blobs[id];
    const upload = await fetch(`/api/media?key=${encodeURIComponent(id)}`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": media.type || media.blob.type || "application/octet-stream" },
      body: media.blob
    });
    if (!upload.ok) throw new Error(upload.status === 413 ? "La foto supera el tamaño permitido." : "No se pudo subir una imagen o video.");
  }

  const response = await fetch("/api/content", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(converted)
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("La sesión venció. Vuelve a entrar al administrador.");
    if (response.status === 503) throw new Error("Falta configurar la clave segura del administrador en Netlify.");
    throw new Error("Netlify no aceptó la publicación.");
  }

  Admin.remoteState = converted;
  if (Admin.revision === revision) {
    Admin.state = converted;
    localStorage.setItem(window.STTOR_DEFAULTS.storageKey, JSON.stringify(converted));
    Admin.dirty = false;
    const cleanupMessage = missingRefs.size
      ? ` No se encontró ${missingRefs.size} foto(s) local(es); se conservó la imagen publicada anterior cuando estuvo disponible. Vuelve a cargar la(s) foto(s) faltante(s) si quieres usarla(s).`
      : "";
    setStatus(`Publicado en la web.${cleanupMessage}`, true);
  } else {
    setStatus("Guardando los últimos cambios…", false);
  }
}

async function exportPublishData() {
  try {
    setStatus("Preparando publicacion...", true);
    if (typeof JSZip === "undefined") {
      setStatus("No se pudo cargar el exportador ZIP. Recarga la pagina e intenta de nuevo.", false);
      return;
    }
    await saveAdminState();
    setStatus("Agregando archivos de la web...", true);
    const exportState = JSON.parse(JSON.stringify(Admin.state));
    delete exportState.media;

    const idbRefs = collectAllIdbRefs(exportState);
    const allBlobs = await loadAllIdbBlobs(idbRefs);

    const zip = new JSZip();
    const mediaFolder = zip.folder("assets/media");

    const converted = convertIdbRefsToMediaPaths(exportState, allBlobs, (id, blob, name) => {
      if (!blob || !mediaFolder) throw new Error(`No se encontró el archivo local ${name || id}`);
      const extByMime = {
        "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif",
        "image/svg+xml": "svg", "image/avif": "avif", "image/bmp": "bmp", "image/tiff": "tiff",
        "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov", "video/ogg": "ogv"
      };
      const nameExt = String(name || "").match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
      const ext = extByMime[String(blob.type || "").toLowerCase()] || (nameExt && /^[a-z0-9]{2,5}$/.test(nameExt) ? nameExt : "bin");
      const filename = `media-${id}.${ext}`;
      mediaFolder.file(filename, blob);
      return `assets/media/${filename}`;
    });

    await addStaticSiteFilesToZip(zip);
    await addReferencedAssetsToZip(zip, converted);
    zip.file("site-data.json", JSON.stringify(converted, null, 2));

    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
    if (!blob || blob.size < 1024 * 100) {
      setStatus("El archivo generado salio demasiado pequeno. Recarga el admin y exporta otra vez.", false);
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sttor-publicacion.zip";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Listo! Descarga sttor-publicacion.zip y subelo completo a Netlify.", true);
  } catch (error) {
    console.error(error);
    setStatus("Error al exportar. Recarga la pagina e intenta de nuevo.", false);
  }
}

async function addStaticSiteFilesToZip(zip) {
  const files = [
    "index.html",
    "iphone.html",
    "mac.html",
    "ipad.html",
    "airpods.html",
    "watch.html",
    "accesorios.html",
    "servicio-tecnico.html",
    "garantia.html",
    "preguntas-frecuentes.html",
    "sobre-sttor.html",
    "styles.css",
    "service-fixes.css",
    "app.js",
    "admin.html",
    "admin.css",
    "admin.js",
    "assets/vendor/jszip.min.js",
    "robots.txt",
    "sitemap.xml",
    "netlify.toml",
    "package.json",
    "netlify/functions/admin-session.mjs",
    "netlify/functions/content.mjs",
    "netlify/functions/media.mjs",
    "assets/isotipo-logo-principal.jpeg",
    "assets/isotipo-logo-principal.png",
    "assets/logo-principal-sttor.png",
    "assets/logo-servicio-tecnico-transparent.png",
    "assets/logo-servicio-tecnico.png",
    "assets/logo-sttor-dark.png",
    "assets/logo-sttor-light.png",
    "assets/logo-sttor-transparent.png"
  ];
  for (const file of files) await addFetchedFileToZip(zip, file);
}

async function addReferencedAssetsToZip(zip, data) {
  const paths = collectPublishedAssetPaths(data);
  for (const path of paths) await addFetchedFileToZip(zip, path);
}

function collectPublishedAssetPaths(value, paths = new Set()) {
  if (typeof value === "string") {
    const clean = value.split("#")[0].split("?")[0].replace(/^\/+/, "");
    if (/^assets\/.+/i.test(clean)) paths.add(clean);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectPublishedAssetPaths(item, paths));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectPublishedAssetPaths(item, paths));
  }
  return paths;
}

async function addFetchedFileToZip(zip, path) {
  try {
    const response = await fetch(new URL(String(path).replace(/^\/+/, ""), document.baseURI), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    zip.file(path, await response.blob());
  } catch (error) {
    throw new Error(`No se pudo agregar ${path} al ZIP: ${error.message}`);
  }
}

function collectAllIdbRefs(obj, refs = new Set()) {
  if (typeof obj === "string" && isLocalMediaRef(obj)) refs.add(obj);
  else if (Array.isArray(obj)) obj.forEach((item) => collectAllIdbRefs(item, refs));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((val) => collectAllIdbRefs(val, refs));
  return refs;
}

function restoreUnavailableLocalMedia(current, published, missingRefs, stats) {
  if (typeof current === "string" && missingRefs.has(current)) {
    const fallback = typeof published === "string" && !isLocalMediaRef(published) ? published : "";
    if (fallback) stats.restored += 1;
    else stats.cleared += 1;
    return fallback;
  }
  if (Array.isArray(current)) {
    const publishedByKey = new Map((Array.isArray(published) ? published : [])
      .map((item) => [mediaFallbackKey(item), item])
      .filter(([key]) => key));
    return current.map((item, index) => {
      const key = mediaFallbackKey(item);
      const previous = key ? publishedByKey.get(key) : published?.[index];
      return restoreUnavailableLocalMedia(item, previous, missingRefs, stats);
    });
  }
  if (current && typeof current === "object") {
    const result = {};
    for (const [key, value] of Object.entries(current)) {
      result[key] = restoreUnavailableLocalMedia(value, published?.[key], missingRefs, stats);
    }
    return result;
  }
  return current;
}

function mediaFallbackKey(item) {
  if (!item || typeof item !== "object") return "";
  return item.id || item.slot || item.title || item.productName || item.name || "";
}

async function loadAllIdbBlobs(idbRefs) {
  if (!idbRefs?.size) return {};
  const db = await openLocalMediaDb();
  const result = {};
  for (const ref of idbRefs) {
    const id = String(ref).replace(/^idb:/, "");
    const record = await new Promise((resolve) => {
      const tx = db.transaction(ADMIN_LOCAL_MEDIA_STORE, "readonly");
      tx.objectStore(ADMIN_LOCAL_MEDIA_STORE).get(id).onsuccess = () => resolve(tx.objectStore(ADMIN_LOCAL_MEDIA_STORE).result);
    });
    if (record?.blob) result[id] = { blob: record.blob, type: record.type, name: record.name };
  }
  db.close();
  return result;
}

function convertIdbRefsToMediaPaths(obj, blobs, onBlobFound) {
  if (typeof obj === "string") {
    if (!isLocalMediaRef(obj)) return obj;
    const id = String(obj).replace(/^idb:/, "");
    const info = blobs[id];
    return onBlobFound(id, info?.blob, info?.name) || obj;
  }
  if (Array.isArray(obj)) return obj.map((item) => convertIdbRefsToMediaPaths(item, blobs, onBlobFound));
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      result[key] = convertIdbRefsToMediaPaths(val, blobs, onBlobFound);
    }
    return result;
  }
  return obj;
}

function compactMediaLibrary() {
  Admin.state.media = (Admin.state.media || [])
    .filter((item) => item.type === "url" || isLocalMediaRef(item.src))
    .slice(0, 24);
}

async function migrateEmbeddedMediaToLocal() {
  const products = Object.values(Admin.state.products || {}).flat();
  for (const item of products) {
    item.image = await localizeInlineMedia(item.image, `${item.id || slug(item.name || "producto")}.webp`);
  }

  for (const service of Admin.state.services || []) {
    service.image = await localizeInlineMedia(service.image, `${slug(service.title || "servicio")}.webp`);
    service.gallery = await Promise.all((service.gallery || []).map((src, index) => localizeInlineMedia(src, `${slug(service.title || "servicio")}-galeria-${index}.webp`)));
  }

  for (const decoration of Admin.state.decorations || []) {
    const previous = decoration.image;
    decoration.image = await localizeInlineMedia(decoration.image, `${slug(decoration.slot || "decoracion")}`);
    if (decoration.image !== previous) decoration.mediaType = inferMediaType(previous);
  }

  for (const slide of Admin.state.homeSlides || []) {
    slide.image = await localizeInlineMedia(slide.image, `${slug(slide.title || "banner-inicio")}.webp`);
  }

  for (const key of Object.keys(Admin.state.logos || {})) {
    Admin.state.logos[key] = await localizeInlineMedia(Admin.state.logos[key], `logo-${key}.webp`);
  }
}

async function localizeInlineMedia(value, name) {
  if (!isInlineMedia(value) || isLocalMediaRef(value)) return value;
  const file = await dataUrlToFile(value, name);
  const stored = await storeLocalMedia(file);
  return stored.ref;
}

async function dataUrlToFile(dataUrl, name) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const extension = blob.type.split("/")[1] || "bin";
  const fileName = /\.[a-z0-9]+$/i.test(name) ? name : `${name}.${extension}`;
  return new File([blob], fileName, { type: blob.type || "application/octet-stream" });
}

function isInlineMedia(value) {
  return /^data:(image|video)\//i.test(String(value || ""));
}

function setDirty() {
  Admin.dirty = true;
  Admin.revision += 1;
  setStatus("Guardando cambios...", false);
  window.clearTimeout(Admin.autosaveTimer);
  Admin.autosaveTimer = window.setTimeout(saveAdminState, 450);
}

function setStatus(text, ok) {
  document.querySelector("[data-status]").textContent = text;
  document.querySelector("[data-status]").classList.toggle("ok", Boolean(ok));
}

function slug(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function money(value) {
  return `S/ ${Number(value || 0).toLocaleString("es-PE")}`;
}

function allProducts() {
  return Object.entries(Admin.state.products).flatMap(([category, items]) => items.map((item) => ({ ...item, category })));
}

function renderAdmin() {
  const root = document.querySelector("[data-admin-content]");
  applyLogoSizeVars(Admin.state.logoSizes);
  const views = {
    overview: renderOverview,
    products: renderProducts,
    home: renderHomeAdmin,
    media: renderMedia,
    services: renderServices,
    testimonials: renderTestimonials,
    settings: renderSettings
  };
  root.innerHTML = views[Admin.current]();
  bindView();
  hydrateLocalMediaPreviews();
}

function pageHead(title, copy, action = "") {
  return `<div class="admin-head"><div><h1>${title}</h1><p>${copy}</p></div>${action}</div>`;
}

function renderOverview() {
  const products = allProducts();
  const active = products.filter((item) => item.active !== false).length;
  const featured = products.filter((item) => item.featured).length;
  const value = products.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.stock || 0), 0);
  return `
    <section class="admin-page active">
      ${pageHead("Resumen", "Vista rapida para controlar catalogo, stock, destacados y contenido administrable.")}
      <div class="metric-grid">
        <div class="metric-card"><span>Productos activos</span><b>${active}</b></div>
        <div class="metric-card"><span>Destacados</span><b>${featured}</b></div>
        <div class="metric-card"><span>Servicios</span><b>${Admin.state.services.length}</b></div>
        <div class="metric-card"><span>Valor stock</span><b>${money(value)}</b></div>
      </div>
      <div class="admin-card">
        <h2>Tareas rapidas</h2>
        <div class="admin-toolbar">
          <button class="btn" data-go="products">Cambiar precios</button>
          <button class="btn" data-go="home">Editar banners</button>
          <button class="btn" data-go="media">Subir imagenes</button>
          <button class="btn" data-go="settings">Datos de contacto</button>
        </div>
      </div>
      <div class="admin-card">
        <h2>Productos con bajo stock</h2>
        <div class="admin-table-wrap">${miniTable(products.filter((item) => Number(item.stock || 0) <= 2).slice(0, 8))}</div>
      </div>
    </section>
  `;
}

function miniTable(items) {
  if (!items.length) return `<div class="admin-card"><p class="admin-muted">No hay productos con bajo stock.</p></div>`;
  return `<table class="admin-table"><thead><tr><th>Producto</th><th>Categoria</th><th>Precio</th><th>Stock</th></tr></thead><tbody>${items.map((item) => `
    <tr><td>${item.name}</td><td>${item.family}</td><td>${money(item.price)}</td><td>${item.stock}</td></tr>
  `).join("")}</tbody></table>`;
}

function renderProducts() {
  const categories = Object.keys(Admin.state.products);
  const products = allProducts().filter((item) => {
    const q = Admin.query.toLowerCase();
    return !q || `${item.name} ${item.family} ${item.desc} ${item.category}`.toLowerCase().includes(q);
  });
  return `
    <section class="admin-page active">
      ${pageHead("Productos", "Edita precios, stock, nombres, descripciones, destacados e imagenes desde una sola tabla.", `<button class="btn primary" data-add-product>Nuevo producto</button>`)}
      <div class="admin-card">
        <div class="admin-toolbar">
          <select class="admin-select" data-bulk-category>${categories.map((key) => `<option value="${key}">${Admin.state.categories[key]?.title || key}</option>`).join("")}</select>
          <input class="admin-input" data-bulk-price type="number" placeholder="Nuevo precio masivo">
          <input class="admin-input" data-bulk-stock type="number" placeholder="Nuevo stock masivo">
          <button class="tiny-btn" data-bulk-apply>Aplicar a categoria</button>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Imagen</th><th>Producto</th><th>Categoria</th><th>Precio</th><th>Stock</th><th>Condiciones disponibles</th><th>Destacado</th><th>Activo</th><th>Acciones</th></tr></thead>
            <tbody>${products.map(renderProductRow).join("")}</tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderProductRow(item) {
  return `
    <tr data-product-id="${item.id}" data-category="${item.category}">
      <td>
        <label class="dropzone" data-product-drop="${item.id}">
          ${item.image ? renderAdminMediaThumb(item.image, "image", item.name) : `<span>Soltar imagen</span>`}
          <input hidden type="file" accept="${IMAGE_ACCEPT}" data-product-image="${item.id}">
        </label>
      </td>
      <td>
        <input class="admin-input" value="${escapeAttr(item.name)}" data-product-field="name">
        <textarea class="admin-textarea" data-product-field="desc">${escapeHtml(item.desc)}</textarea>
      </td>
      <td><select class="admin-select" data-product-field="category">${Object.keys(Admin.state.products).map((key) => `<option value="${key}" ${key === item.category ? "selected" : ""}>${Admin.state.categories[key]?.title || key}</option>`).join("")}</select></td>
      <td><input class="admin-input" type="number" value="${item.price}" data-product-field="price"></td>
      <td><input class="admin-input" type="number" value="${item.stock || 0}" data-product-field="stock"></td>
      <td>${item.category === "iphone" ? `
        <div class="product-condition-admin" aria-label="Condiciones disponibles para ${escapeAttr(item.name)}">
          <label class="toggle"><input type="checkbox" ${item.sealedAvailable !== false ? "checked" : ""} data-product-field="sealedAvailable"> Sellado</label>
          <label class="toggle"><input type="checkbox" ${item.openBoxAvailable !== false ? "checked" : ""} data-product-field="openBoxAvailable"> Open Box</label>
        </div>` : `<span class="admin-muted">Estándar</span>`}</td>
      <td><label class="toggle"><input type="checkbox" ${item.featured ? "checked" : ""} data-product-field="featured"> Destacar</label></td>
      <td><label class="toggle"><input type="checkbox" ${item.active !== false ? "checked" : ""} data-product-field="active"> Visible</label></td>
      <td><button class="tiny-btn" data-duplicate="${item.id}">Duplicar</button> <button class="tiny-btn danger" data-delete="${item.id}">Eliminar</button></td>
    </tr>
  `;
}

function renderHomeAdmin() {
  return `
    <section class="admin-page active">
      ${pageHead("Inicio", "Edita el hero, banners, promociones y orden visual del Home sin tocar codigo.")}
      <div class="admin-card admin-help-card">
        <div class="admin-head">
          <div>
            <h2>Guia rapida</h2>
            <p class="admin-muted">Los cambios mas usados estan aqui para que cualquier persona pueda actualizar la web rapido.</p>
          </div>
        </div>
        <div class="admin-quick-grid">
          <button class="quick-admin-step" type="button" data-admin-tab-jump="products"><strong>1</strong><span>Productos, precios, stock e imagenes</span></button>
          <button class="quick-admin-step" type="button" data-admin-tab-jump="home"><strong>2</strong><span>Banner principal, promociones y decoraciones</span></button>
          <button class="quick-admin-step" type="button" data-admin-tab-jump="services"><strong>3</strong><span>Servicios tecnicos, precios y textos</span></button>
          <button class="quick-admin-step" type="button" data-admin-tab-jump="settings"><strong>4</strong><span>WhatsApp, direccion, redes y logos</span></button>
        </div>
      </div>
      <div class="admin-card">
        <h2>Hero principal</h2>
        <div class="form-grid-admin">
          <label>Etiqueta<input class="admin-input" data-home-field="eyebrow" value="${escapeAttr(Admin.state.home.eyebrow)}"></label>
          <label>Titulo<input class="admin-input" data-home-field="title" value="${escapeAttr(Admin.state.home.title)}"></label>
          <label class="full">Descripcion<textarea class="admin-textarea" data-home-field="lede">${escapeHtml(Admin.state.home.lede)}</textarea></label>
        </div>
      </div>
      ${renderHomeSlidesAdmin()}
      ${listEditor("Banners", "banners", Admin.state.banners)}
      ${listEditor("Promociones", "promotions", Admin.state.promotions)}
      ${renderDecorationsAdmin()}
      <div class="admin-card">
        <h2>Orden de secciones</h2>
        <div class="section-builder" data-builder>
          ${["Hero", "Promociones", "Categorias", "Productos destacados", "Beneficios", "Servicios", "Testimonios", "Mapa"].map((name) => `
            <div class="builder-row" draggable="true"><span>::</span><strong>${name}</strong><label class="toggle"><input type="checkbox" checked> Activa</label></div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHomeSlidesAdmin() {
  const productOptions = allProducts().map((item) => `<option value="${escapeAttr(item.name)}">${escapeHtml(item.name)}</option>`).join("");
  return `
    <div class="admin-card home-slide-admin">
      <div class="admin-head">
        <div>
          <h2>Banner principal automatico</h2>
          <p class="admin-muted">Edita los banners grandes del inicio. Puedes cambiar imagen, texto, precio, boton y producto sin tocar codigo.</p>
        </div>
        <button class="tiny-btn" data-add-home-slide>Agregar banner</button>
      </div>
      <div class="home-slide-list">
        ${Admin.state.homeSlides.map((slide, index) => `
          <article class="home-slide-editor" data-home-slide="${index}">
            <label class="dropzone banner-dropzone" data-home-slide-drop="${index}">
              ${slide.image ? renderAdminMediaThumb(slide.image, "image", slide.title) : `<span>Arrastra imagen del banner</span>`}
              <input hidden type="file" accept="${IMAGE_ACCEPT}" data-home-slide-image="${index}">
            </label>
            <div class="form-grid-admin">
              <label>Producto visual<select class="admin-select" data-home-slide-field="productName">
                ${productOptions.replace(`value="${escapeAttr(slide.productName)}"`, `value="${escapeAttr(slide.productName)}" selected`)}
              </select></label>
              <label>Color de acento<input class="admin-input" type="color" value="${escapeAttr(slide.accent)}" data-home-slide-field="accent"></label>
              <label>Nombre superior<input class="admin-input" value="${escapeAttr(slide.eyebrow)}" data-home-slide-field="eyebrow"></label>
              <label>Titulo principal<input class="admin-input" value="${escapeAttr(slide.title)}" data-home-slide-field="title"></label>
              <label>Texto corto<input class="admin-input" value="${escapeAttr(slide.subtitle)}" data-home-slide-field="subtitle"></label>
              <label>Precio / oferta<input class="admin-input" value="${escapeAttr(slide.price)}" data-home-slide-field="price"></label>
              <label>Texto del boton<input class="admin-input" value="${escapeAttr(slide.cta)}" data-home-slide-field="cta"></label>
              <label>Enlace del boton<input class="admin-input" value="${escapeAttr(slide.href)}" data-home-slide-field="href"></label>
              <label class="full">Nota pequena<textarea class="admin-textarea" data-home-slide-field="note">${escapeHtml(slide.note)}</textarea></label>
              <div class="admin-inline-actions full">
                <label class="toggle"><input type="checkbox" ${slide.active !== false ? "checked" : ""} data-home-slide-field="active"> Visible</label>
                <button class="tiny-btn" type="button" data-clear-home-slide-image="${index}">Quitar imagen</button>
                <button class="tiny-btn danger" type="button" data-delete-home-slide="${index}">Eliminar banner</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderDecorationsAdmin() {
  const labels = {
    "home-after-categories": "Home: entre Categorias principales y Todos los iPhone",
    "home-after-iphone": "Home: entre iPhone y Accesorios",
    "home-after-accessories": "Home: entre Accesorios y Destacados",
    "category-after-hero": "Todas las categorias: despues del hero",
    "category-before-compare": "Todas las categorias: antes del comparador",
    "iphone-after-hero": "iPhone: despues del hero",
    "iphone-before-compare": "iPhone: antes del comparador",
    "mac-after-hero": "Mac: despues del hero",
    "mac-before-compare": "Mac: antes del comparador",
    "ipad-after-hero": "iPad: despues del hero",
    "ipad-before-compare": "iPad: antes del comparador",
    "airpods-after-hero": "AirPods: despues del hero",
    "airpods-before-compare": "AirPods: antes del comparador",
    "watch-after-hero": "Apple Watch: despues del hero",
    "watch-before-compare": "Apple Watch: antes del comparador",
    "accesorios-after-hero": "Accesorios: despues del hero",
    "accesorios-before-compare": "Accesorios: antes del comparador",
    "service-after-hero": "Servicio tecnico: despues del hero",
    "service-before-services": "Servicio tecnico: antes de servicios",
    "service-before-contact": "Servicio tecnico: antes del formulario"
  };
  return `
    <div class="admin-card">
      <div class="admin-head"><h2>Decoraciones visuales</h2><button class="tiny-btn" data-add-decoration>Agregar bloque</button></div>
      <p class="admin-muted">Crea bloques tipo Apple: sube una imagen o video, escribe un titulo y arrastra el texto donde quieras verlo.</p>
      <div class="section-builder">${Admin.state.decorations.map((item, index) => `
        <div class="builder-row decor-admin-row" data-decoration="${index}">
          <label class="dropzone decor-dropzone" data-decoration-drop="${index}">
            ${item.image ? renderAdminMediaThumb(item.image, item.mediaType, item.title) : `<span>Imagen, GIF o video</span>`}
            <input hidden type="file" accept="${DECOR_ACCEPT}" data-decoration-image="${index}">
          </label>
          <div class="form-grid-admin">
            <label>Donde aparece<select class="admin-select" data-decoration-field="slot">
              ${Object.entries(labels).map(([slot, label]) => `<option value="${slot}" ${slot === item.slot ? "selected" : ""}>${label}</option>`).join("")}
            </select></label>
            <div class="decor-slot-picker full">
              ${Object.entries(labels).map(([slot, label]) => `<button class="slot-chip ${slot === item.slot ? "active" : ""}" type="button" data-decoration-slot="${slot}">${label}</button>`).join("")}
            </div>
            <label>Titulo visible<input class="admin-input" value="${escapeAttr(item.title)}" data-decoration-field="title"></label>
            <label class="full">Texto corto<textarea class="admin-textarea" data-decoration-field="copy">${escapeHtml(item.copy)}</textarea></label>
            <label class="full">Archivo o enlace<input class="admin-input" value="${escapeAttr(item.image)}" data-decoration-field="image"></label>
            <label>Alto del bloque
              <input class="admin-input" type="number" min="40" max="900" value="${Number(item.height || 260)}" data-decoration-field="height">
            </label>
            <label>Ancho del medio
              <input class="admin-input" type="number" min="35" max="75" value="${Number(item.mediaWidth || 58)}" data-decoration-field="mediaWidth">
            </label>
            <label>Ancho total
              <input class="admin-input" type="number" min="10" max="140" value="${Number(item.blockWidth || 100)}" data-decoration-field="blockWidth">
            </label>
            <label>Alineacion del bloque
              <select class="admin-select" data-decoration-field="align">
                <option value="left" ${item.align === "left" ? "selected" : ""}>Izquierda</option>
                <option value="center" ${item.align !== "left" && item.align !== "right" ? "selected" : ""}>Centro</option>
                <option value="right" ${item.align === "right" ? "selected" : ""}>Derecha</option>
              </select>
            </label>
            <label>Texto separado
              <select class="admin-select" data-decoration-field="textPosition">
                <option value="left" ${item.textPosition !== "right" && item.textPosition !== "top" && item.textPosition !== "bottom" ? "selected" : ""}>Izquierda</option>
                <option value="right" ${item.textPosition === "right" ? "selected" : ""}>Derecha</option>
                <option value="top" ${item.textPosition === "top" ? "selected" : ""}>Arriba</option>
                <option value="bottom" ${item.textPosition === "bottom" ? "selected" : ""}>Abajo</option>
              </select>
            </label>
            <label>Modo de texto
              <select class="admin-select" data-decoration-field="textOverlay">
                <option value="true" ${item.textOverlay !== false ? "selected" : ""}>Encima de imagen/video</option>
                <option value="false" ${item.textOverlay === false ? "selected" : ""}>Separado</option>
              </select>
            </label>
            <label>Posicion rapida
              <select class="admin-select" data-decoration-field="textV">
                <option value="top" ${item.textV !== "center" && item.textV !== "bottom" ? "selected" : ""}>Arriba</option>
                <option value="center" ${item.textV === "center" ? "selected" : ""}>Centro</option>
                <option value="bottom" ${item.textV === "bottom" ? "selected" : ""}>Abajo</option>
              </select>
            </label>
            <label>Alineacion rapida
              <select class="admin-select" data-decoration-field="textAlign">
                <option value="left" ${item.textAlign === "left" ? "selected" : ""}>Izquierda</option>
                <option value="center" ${item.textAlign !== "left" && item.textAlign !== "right" ? "selected" : ""}>Centro</option>
                <option value="right" ${item.textAlign === "right" ? "selected" : ""}>Derecha</option>
              </select>
            </label>
            <label>Tipografia
              <select class="admin-select" data-decoration-field="fontStyle">
                <option value="apple" ${item.fontStyle !== "system" && item.fontStyle !== "editorial" ? "selected" : ""}>Apple simple</option>
                <option value="system" ${item.fontStyle === "system" ? "selected" : ""}>Sistema limpia</option>
                <option value="editorial" ${item.fontStyle === "editorial" ? "selected" : ""}>Editorial</option>
              </select>
            </label>
            <label>Tamano titulo
              <input class="admin-input" type="number" min="12" max="140" value="${Number(item.titleSize || item.textSize || 56)}" data-decoration-field="titleSize">
            </label>
            <label>Tamano descripcion
              <input class="admin-input" type="number" min="8" max="80" value="${Number(item.copySize || 16)}" data-decoration-field="copySize">
            </label>
            <label>Ancho caja texto
              <input class="admin-input" type="number" min="10" max="100" value="${Number(item.textBoxWidth || 86)}" data-decoration-field="textBoxWidth">
            </label>
            <label>Texto X
              <input class="admin-input" type="number" min="0" max="100" value="${Number(item.textX ?? 50)}" data-decoration-field="textX">
            </label>
            <label>Texto Y
              <input class="admin-input" type="number" min="0" max="100" value="${Number(item.textY ?? 14)}" data-decoration-field="textY">
            </label>
            <label>Color del texto
              <select class="admin-select" data-decoration-field="textColor">
                <option value="dark" ${item.textColor !== "light" ? "selected" : ""}>Negro</option>
                <option value="light" ${item.textColor === "light" ? "selected" : ""}>Blanco</option>
              </select>
            </label>
            <div class="decor-size-panel full">
              <div class="decor-size-head">
                <strong>Tamano rapido</strong>
                <span>${Number(item.height || 260)}px alto · ${Number(item.blockWidth || 100)}% ancho</span>
              </div>
              <label>Alto <input type="range" min="40" max="900" step="5" value="${Number(item.height || 260)}" data-decoration-height-range></label>
              <label>Ancho <input type="range" min="10" max="140" step="1" value="${Number(item.blockWidth || 100)}" data-decoration-width-range></label>
              <div class="decor-size-presets">
                <button type="button" data-decoration-size="80:30">Pequeno</button>
                <button type="button" data-decoration-size="180:65">Mediano</button>
                <button type="button" data-decoration-size="320:100">Grande</button>
                <button type="button" data-decoration-size="560:140">Pantalla completa</button>
              </div>
            </div>
            <label class="toggle"><input type="checkbox" ${item.showText !== false ? "checked" : ""} data-decoration-field="showText"> Mostrar texto</label>
            <label class="toggle"><input type="checkbox" ${item.loopVideo === true ? "checked" : ""} data-decoration-field="loopVideo"> Video en bucle</label>
            <label class="toggle"><input type="checkbox" ${item.parallaxScroll === true ? "checked" : ""} data-decoration-field="parallaxScroll"> Animar con scroll estilo Apple</label>
            <label class="toggle"><input type="checkbox" ${item.active ? "checked" : ""} data-decoration-field="active"> Mostrar decoracion</label>
            ${renderDecorationVisualEditor(item, index)}
          </div>
          <div class="row-actions">
            <button class="tiny-btn" data-clear-decoration-image="${index}">Quitar imagen</button>
            <button class="tiny-btn danger" data-delete-decoration="${index}">Eliminar</button>
          </div>
        </div>
      `).join("")}</div>
    </div>
  `;
}

function renderDecorationVisualEditor(item, index) {
  const height = clampValue(item.height || 260, 40, 900);
  const mediaWidth = clampValue(item.mediaWidth || 58, 35, 75);
  const focusX = clampValue(item.focusX ?? 50, 0, 100);
  const focusY = clampValue(item.focusY ?? 50, 0, 100);
  const blockWidth = clampValue(item.blockWidth || 100, 10, 140);
  const align = ["left", "center", "right"].includes(item.align) ? item.align : "center";
  const textPosition = ["left", "right", "top", "bottom"].includes(item.textPosition) ? item.textPosition : "left";
  const overlay = item.textOverlay !== false;
  const textAlign = ["left", "center", "right"].includes(item.textAlign) ? item.textAlign : "center";
  const textV = ["top", "center", "bottom"].includes(item.textV) ? item.textV : "top";
  const fontStyle = ["apple", "system", "editorial"].includes(item.fontStyle) ? item.fontStyle : "apple";
  const textSize = clampValue(item.textSize || 56, 22, 96);
  const titleSize = clampValue(item.titleSize || textSize, 12, 140);
  const copySize = clampValue(item.copySize || 16, 8, 80);
  const textBoxWidth = clampValue(item.textBoxWidth || 86, 10, 100);
  const textColor = ["dark", "light"].includes(item.textColor) ? item.textColor : "dark";
  const textX = clampValue(item.textX ?? 50, 0, 100);
  const textY = clampValue(item.textY ?? 14, 0, 100);
  const isVideo = (item.mediaType || inferMediaType(item.image)) === "video";
  const media = item.image
    ? (isLocalMediaRef(item.image)
      ? `<span class="local-media-preview" data-local-media="${escapeAttr(item.image)}" data-local-media-type="${escapeAttr(item.mediaType || "image")}">Guardado local</span>`
      : isVideo
        ? `<video src="${item.image}" muted playsinline preload="metadata"></video>`
        : `<img src="${item.image}" alt="${escapeAttr(item.title || "Decoracion")}">`)
    : `<span class="decor-editor-empty">Sube una imagen o video</span>`;
  return `
      <div class="decor-editor-wrap full">
        <div class="decor-editor-title">
          <strong>Editor visual</strong>
        <span>Arrastra el bloque de texto libremente sobre la imagen o video. Puedes ajustar fino con Texto X/Y.</span>
        </div>
      <div class="decor-visual-editor align-${align} text-${textPosition} ${overlay ? "overlay-text" : "split-text"} text-align-${textAlign} text-v-${textV} font-${fontStyle} text-color-${textColor} ${item.showText === false ? "no-text" : ""}" data-decor-editor="${index}" style="--editor-height:${height}px;--editor-media:${mediaWidth}%;--editor-focus-x:${focusX}%;--editor-focus-y:${focusY}%;--editor-block-width:${blockWidth}%;--editor-title-size:${titleSize}px;--editor-copy-size:${copySize}px;--editor-text-width:${textBoxWidth}%;--editor-text-x:${textX}%;--editor-text-y:${textY}%;">
        ${item.showText === false || overlay ? "" : `<div class="decor-editor-copy"><strong>${escapeHtml(item.title || "Titulo")}</strong><span>${escapeHtml(item.copy || "Texto de apoyo")}</span></div>`}
        <div class="decor-editor-media" data-decor-pan="${index}">
          ${media}
          ${item.showText === false || !overlay ? "" : `<div class="decor-editor-copy" data-decor-text-pan="${index}"><strong>${escapeHtml(item.title || "Titulo")}</strong><span>${escapeHtml(item.copy || "Texto de apoyo")}</span><button class="decor-text-resize" type="button" data-decor-text-resize="${index}" aria-label="Cambiar tamano del texto">↘</button></div>`}
        </div>
        <button class="decor-resize-handle" type="button" data-decor-resize="${index}" aria-label="Cambiar tamano">↘</button>
      </div>
    </div>
  `;
}

function listEditor(title, key, items) {
  return `<div class="admin-card"><div class="admin-head"><h2>${title}</h2><button class="tiny-btn" data-add-list="${key}">Agregar</button></div>
    <div class="section-builder">${items.map((item, index) => `
      <div class="builder-row" data-list="${key}" data-index="${index}">
        <span>Item ${index + 1}</span>
        <div class="form-grid-admin">
          <input class="admin-input" value="${escapeAttr(item.title)}" data-list-field="title">
          <input class="admin-input" value="${escapeAttr(item.copy)}" data-list-field="copy">
        </div>
        <label class="toggle"><input type="checkbox" ${item.active !== false ? "checked" : ""} data-list-field="active"> Activo</label>
      </div>
    `).join("")}</div></div>`;
}

function renderMedia() {
  return `
    <section class="admin-page active">
      ${pageHead("Biblioteca multimedia", "Sube imagenes, revisa vista previa y utiliza la compresion automatica para mantener buen rendimiento.")}
      <div class="admin-card">
        <label class="dropzone" data-media-drop>
          <span>Arrastra imagenes aqui o haz clic para subir. Se guardan en tu biblioteca local.</span>
          <input hidden type="file" accept="${IMAGE_ACCEPT}" multiple data-media-input>
        </label>
      </div>
      <div class="media-grid">${Admin.state.media.map((item, index) => `
        <div class="media-item">${renderAdminMediaThumb(item.thumb || item.src, item.type, item.name)}<p class="admin-muted">${item.name}</p><button class="tiny-btn danger" data-media-delete="${index}">Eliminar</button></div>
      `).join("")}</div>
    </section>
  `;
}

function renderServices() {
  return `
    <section class="admin-page active">
      ${pageHead("Servicio tecnico", "Gestiona nombres, descripciones, precios, iconos, imagenes y estado visible de cada servicio.", `<button class="btn primary" data-add-service>Nuevo servicio</button>`)}
      <div class="admin-card">
        <h2>Servicios y precios</h2>
        <div class="section-builder">${Admin.state.services.map((item, index) => `
          <div class="builder-row service-admin-row" data-service="${index}">
            <div class="reorder-actions" aria-label="Orden del servicio">
              <button class="tiny-btn" data-move-service="${index}" data-direction="-1" ${index === 0 ? "disabled" : ""}>Subir</button>
              <button class="tiny-btn" data-move-service="${index}" data-direction="1" ${index === Admin.state.services.length - 1 ? "disabled" : ""}>Bajar</button>
            </div>
            <label class="dropzone service-dropzone" data-service-drop="${index}">
              ${item.image ? renderAdminMediaThumb(item.image, item.mediaType || "image", item.title) : `<span>Imagen</span>`}
              <input hidden type="file" accept="${IMAGE_ACCEPT}" data-service-image="${index}">
            </label>
            <div class="form-grid-admin">
              <label>Icono<input class="admin-input" value="${escapeAttr(item.icon)}" data-service-field="icon"></label>
              <label>Nombre<input class="admin-input" value="${escapeAttr(item.title)}" data-service-field="title"></label>
              <label>Precio desde<input class="admin-input" type="number" min="0" value="${Number(item.price || 0)}" data-service-field="price"></label>
              <label>Precio promocional<input class="admin-input" type="number" min="0" value="${Number(item.promoPrice || 0)}" data-service-field="promoPrice"></label>
              <label>Texto de cotizacion<input class="admin-input" value="${escapeAttr(item.quoteLabel || "Cotizar por WhatsApp")}" data-service-field="quoteLabel"></label>
              <label class="toggle"><input type="checkbox" ${item.priceFeatured ? "checked" : ""} data-service-field="priceFeatured"> Destacar precio</label>
              <label class="toggle"><input type="checkbox" ${item.hidePrice ? "checked" : ""} data-service-field="hidePrice"> Ocultar precio</label>
              <label class="toggle"><input type="checkbox" ${item.active !== false ? "checked" : ""} data-service-field="active"> Activo</label>
              <label class="full">Descripcion<textarea class="admin-textarea" data-service-field="copy">${escapeHtml(item.copy)}</textarea></label>
              <label class="dropzone service-gallery-drop full" data-service-gallery-drop="${index}">
                <span>Agregar imagenes a la galeria</span>
                <input hidden type="file" accept="${IMAGE_ACCEPT}" multiple data-service-gallery="${index}">
              </label>
              <div class="service-gallery-admin full">
                ${(item.gallery || []).map((src, galleryIndex) => `
                  <div class="media-item compact">${renderAdminMediaThumb(src, "image", item.title)}<button class="tiny-btn danger" data-delete-service-gallery="${index}:${galleryIndex}">Eliminar</button></div>
                `).join("")}
              </div>
            </div>
            <div class="row-actions"><button class="tiny-btn danger" data-delete-service="${index}">Eliminar</button></div>
          </div>
        `).join("")}</div>
      </div>
      <div class="admin-card">
        <h2>Imagenes de Servicio Tecnico</h2>
        <p class="admin-muted">Arrastra una imagen sobre cualquier servicio para reemplazarla. Se guarda en la biblioteca local del dashboard.</p>
        <div class="media-grid">${Admin.state.services.map((item, index) => ({ item, index })).filter(({ item }) => item.image).map(({ item, index }) => `
          <div class="media-item">${renderAdminMediaThumb(item.image, item.mediaType || "image", item.title)}<p class="admin-muted">${escapeHtml(item.title)}</p><button class="tiny-btn danger" data-clear-service-image="${index}">Eliminar imagen</button></div>
        `).join("")}</div>
      </div>
    </section>
  `;
}

function renderTestimonials() {
  return `
    <section class="admin-page active">
      ${pageHead("Testimonios", "Administra comentarios cortos para reforzar confianza en el Home.", `<button class="btn primary" data-add-testimonial>Nuevo testimonio</button>`)}
      <div class="admin-card"><div class="section-builder">${Admin.state.testimonials.map((item, index) => `
        <div class="builder-row" data-testimonial="${index}">
          <span>${index + 1}</span>
          <div class="form-grid-admin">
            <label>Cliente<input class="admin-input" value="${escapeAttr(item.name)}" data-testimonial-field="name"></label>
            <label>Calificacion<input class="admin-input" type="number" min="1" max="5" step="0.1" value="${Number(item.rating || 4.8).toFixed(1)}" data-testimonial-field="rating"></label>
            <label class="full">Reseña<textarea class="admin-textarea" data-testimonial-field="copy">${escapeHtml(item.copy)}</textarea></label>
          </div>
          <button class="tiny-btn danger" data-delete-testimonial="${index}">Eliminar</button>
        </div>
      `).join("")}</div></div>
    </section>
  `;
}

function renderSettings() {
  const b = Admin.state.business;
  const logos = Admin.state.logos || {};
  const logoSizes = Admin.state.logoSizes || {};
  const logoLabels = {
    main: "Logo principal",
    light: "Logo modo claro",
    dark: "Logo modo oscuro",
    service: "Logo servicio tecnico",
    icon: "Isotipo / favicon"
  };
  const logoSizeLabels = {
    main: ["Tamano principal", 28, 180],
    nav: ["Logo del menu", 28, 180],
    hero: ["Logo del inicio", 72, 260],
    page: ["Logo de categorias", 60, 620],
    service: ["Logo servicio tecnico", 120, 420],
    footer: ["Logo del footer", 44, 180]
  };
  return `
    <section class="admin-page active">
      ${pageHead("Configuracion", "Datos comerciales, contacto y redes sociales visibles para empleados y clientes.")}
      <div class="admin-card">
        <h2>Empresa y contacto</h2>
        <div class="form-grid-admin">
          ${["name", "ruc", "phone", "whatsapp", "address", "maps", "appleMaps", "googleMaps"].map((field) => `
            <label>${field}<input class="admin-input" value="${escapeAttr(b[field] || "")}" data-business-field="${field}"></label>
          `).join("")}
          <label>Instagram<input class="admin-input" value="${escapeAttr(b.instagram || "")}" data-business-field="instagram"></label>
          <label>Facebook<input class="admin-input" value="${escapeAttr(b.facebook || "")}" data-business-field="facebook"></label>
        </div>
      </div>
      <div class="admin-card">
        <h2>Logotipos</h2>
        <p class="admin-muted">Sube, reemplaza o elimina logos. Se aceptan PNG, JPG, WEBP, SVG, AVIF, GIF, BMP, TIFF e ICO.</p>
        <div class="logo-admin-grid">
          ${Object.entries(logoLabels).map(([key, label]) => `
            <label class="dropzone logo-dropzone" data-logo-drop="${key}">
              ${logos[key] && logos[key] !== ADMIN_LOGO_NONE ? renderAdminMediaThumb(logos[key], "image", label) : `<span>${logos[key] === ADMIN_LOGO_NONE ? "Sin logo" : label}</span>`}
              <input hidden type="file" accept="${IMAGE_ACCEPT}" data-logo-input="${key}">
            </label>
            <div class="logo-admin-meta">
              <strong>${label}</strong>
              <input class="admin-input" value="${escapeAttr(logos[key] === ADMIN_LOGO_NONE ? "" : logos[key] || "")}" data-logo-field="${key}" placeholder="Ruta o imagen subida">
              <button class="tiny-btn danger" type="button" data-clear-logo="${key}">Eliminar</button>
            </div>
          `).join("")}
        </div>
        <div class="logo-size-panel">
          <h3>Tamano de logos</h3>
          <p class="admin-muted">Ajusta el tamano visible en pixeles. Los cambios se guardan automaticamente.</p>
          <div class="logo-position-editor" data-logo-position-editor>
            <div>
              <strong>Logo en categorias</strong>
              <span>Arrastra el logo para ubicarlo en el area principal de las categorias.</span>
            </div>
            <div class="logo-position-stage">
              <span class="logo-position-title">Vista previa categoria</span>
              <div class="logo-position-copy"></div>
              <div class="logo-position-dot" data-logo-position-dot style="--admin-logo-page-x:${Number(logoSizes.pageX ?? 82)}%;--admin-logo-page-y:${Number(logoSizes.pageY ?? 50)}%;--admin-logo-page-size:${Number(logoSizes.page || window.STTOR_DEFAULTS.logoSizes.page || 260)}px;">
                ${logos.main === ADMIN_LOGO_NONE ? `<span class="logo-none-preview">Sin logo</span>` : renderAdminMediaThumb(logos.main || window.STTOR_DEFAULTS.logos.main, "image", "Logo de categorias")}
              </div>
            </div>
            <div class="logo-position-fields">
              <label>X<input class="admin-input" type="number" min="0" max="100" value="${Number(logoSizes.pageX ?? 82)}" data-logo-position="pageX"></label>
              <label>Y<input class="admin-input" type="number" min="0" max="100" value="${Number(logoSizes.pageY ?? 50)}" data-logo-position="pageY"></label>
            </div>
          </div>
          ${Object.entries(logoSizeLabels).map(([key, config]) => {
            const [label, min, max] = config;
            const value = Number(logoSizes[key] || window.STTOR_DEFAULTS.logoSizes[key] || min);
            return `
              <label class="logo-size-control">
                <span>${label}</span>
                <input type="range" min="${min}" max="${max}" step="1" value="${value}" data-logo-size-range="${key}">
                <input class="admin-input logo-size-number" type="number" min="${min}" max="${max}" step="1" value="${value}" data-logo-size="${key}">
                <em>px</em>
              </label>
            `;
          }).join("")}
        </div>
      </div>
      <div class="admin-card">
        <h2>Categorias</h2>
        <div class="section-builder">${Object.entries(Admin.state.categories).map(([key, meta]) => `
          <div class="builder-row" data-category-key="${key}">
            <strong>${key}</strong>
            <div class="form-grid-admin"><input class="admin-input" value="${escapeAttr(meta.title)}" data-category-field="title"><input class="admin-input" value="${escapeAttr(meta.eyebrow)}" data-category-field="eyebrow"></div>
            <button class="tiny-btn" data-create-category>Crear categoria</button>
          </div>
        `).join("")}</div>
      </div>
    </section>
  `;
}

function bindView() {
  document.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => switchTab(btn.dataset.go)));
  document.querySelectorAll("[data-admin-tab-jump]").forEach((btn) => btn.addEventListener("click", () => switchTab(btn.dataset.adminTabJump)));
  document.querySelectorAll("[data-product-field]").forEach((input) => input.addEventListener("input", updateProduct));
  document.querySelectorAll("[data-product-field][type='checkbox']").forEach((input) => input.addEventListener("change", updateProduct));
  document.querySelectorAll("[data-product-image]").forEach((input) => input.addEventListener("change", (event) => uploadProductImage(event.target.dataset.productImage, event.target.files[0])));
  document.querySelectorAll("[data-product-drop]").forEach(bindDropzone);
  document.querySelectorAll("[data-duplicate]").forEach((btn) => btn.addEventListener("click", () => duplicateProduct(btn.dataset.duplicate)));
  document.querySelectorAll("[data-delete]").forEach((btn) => btn.addEventListener("click", () => deleteProduct(btn.dataset.delete)));
  document.querySelector("[data-add-product]")?.addEventListener("click", addProduct);
  document.querySelector("[data-bulk-apply]")?.addEventListener("click", applyBulk);
  document.querySelectorAll("[data-home-field]").forEach((input) => input.addEventListener("input", () => { Admin.state.home[input.dataset.homeField] = input.value; setDirty(); }));
  document.querySelectorAll("[data-home-slide-field]").forEach((input) => input.addEventListener("input", updateHomeSlide));
  document.querySelectorAll("[data-home-slide-field][type='checkbox']").forEach((input) => input.addEventListener("change", updateHomeSlide));
  document.querySelectorAll("select[data-home-slide-field]").forEach((input) => input.addEventListener("change", updateHomeSlide));
  document.querySelector("[data-add-home-slide]")?.addEventListener("click", () => { Admin.state.homeSlides.push(normalizeHomeSlide({ title: "Nuevo banner", subtitle: "Texto corto", price: "S/0", cta: "Ver producto" })); setDirty(); renderAdmin(); });
  document.querySelectorAll("[data-home-slide-image]").forEach((input) => input.addEventListener("change", (event) => uploadHomeSlideImage(Number(event.target.dataset.homeSlideImage), event.target.files[0])));
  document.querySelectorAll("[data-home-slide-drop]").forEach(bindHomeSlideDropzone);
  document.querySelectorAll("[data-clear-home-slide-image]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.homeSlides[Number(btn.dataset.clearHomeSlideImage)].image = ""; setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-delete-home-slide]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.homeSlides.splice(Number(btn.dataset.deleteHomeSlide), 1); setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-list-field]").forEach((input) => input.addEventListener("input", updateListItem));
  document.querySelectorAll("[data-list-field][type='checkbox']").forEach((input) => input.addEventListener("change", updateListItem));
  document.querySelectorAll("[data-add-list]").forEach((btn) => btn.addEventListener("click", () => { Admin.state[btn.dataset.addList].push({ title: "Nuevo item", copy: "Descripcion breve", active: true }); setDirty(); renderAdmin(); }));
  document.querySelector("[data-add-decoration]")?.addEventListener("click", () => { Admin.state.decorations.push(normalizeDecoration({ title: "Nueva decoracion", copy: "", slot: "home-after-categories", image: "", active: true })); setDirty(); renderAdmin(); });
  document.querySelectorAll("[data-decoration-field]").forEach((input) => input.addEventListener("input", updateDecoration));
  document.querySelectorAll("[data-decoration-field][type='checkbox']").forEach((input) => input.addEventListener("change", updateDecoration));
  document.querySelectorAll("select[data-decoration-field]").forEach((input) => input.addEventListener("change", updateDecoration));
  document.querySelectorAll("[data-decoration-slot]").forEach((btn) => btn.addEventListener("click", updateDecorationSlot));
  document.querySelectorAll("[data-decoration-height-range]").forEach((input) => input.addEventListener("input", updateDecorationHeightControl));
  document.querySelectorAll("[data-decoration-width-range]").forEach((input) => input.addEventListener("input", updateDecorationWidthControl));
  document.querySelectorAll("[data-decoration-size]").forEach((btn) => btn.addEventListener("click", applyDecorationSizePreset));
  document.querySelectorAll("[data-decor-pan]").forEach(bindDecorationPan);
  document.querySelectorAll("[data-decor-text-pan]").forEach(bindDecorationTextPan);
  document.querySelectorAll("[data-decor-text-resize]").forEach(bindDecorationTextResize);
  document.querySelectorAll("[data-decor-resize]").forEach(bindDecorationResize);
  document.querySelectorAll("[data-decoration-image]").forEach((input) => input.addEventListener("change", (event) => uploadDecorationImage(Number(event.target.dataset.decorationImage), event.target.files[0])));
  document.querySelectorAll("[data-decoration-drop]").forEach(bindDecorationDropzone);
  document.querySelectorAll("[data-clear-decoration-image]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.decorations[Number(btn.dataset.clearDecorationImage)].image = ""; setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-delete-decoration]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.decorations.splice(Number(btn.dataset.deleteDecoration), 1); setDirty(); renderAdmin(); }));
  document.querySelector("[data-media-input]")?.addEventListener("change", (event) => uploadMedia([...event.target.files]));
  document.querySelector("[data-media-drop]") && bindMediaDrop(document.querySelector("[data-media-drop]"));
  document.querySelectorAll("[data-media-delete]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.media.splice(Number(btn.dataset.mediaDelete), 1); setDirty(); renderAdmin(); }));
  document.querySelector("[data-add-service]")?.addEventListener("click", () => { Admin.state.services.push(normalizeService({ title: "Nuevo servicio", copy: "Descripcion clara del servicio.", icon: "SV", price: 0, active: true })); setDirty(); renderAdmin(); });
  document.querySelectorAll("[data-service-field]").forEach((input) => input.addEventListener("input", updateService));
  document.querySelectorAll("[data-service-field][type='checkbox']").forEach((input) => input.addEventListener("change", updateService));
  document.querySelectorAll("[data-service-image]").forEach((input) => input.addEventListener("change", (event) => uploadServiceImage(Number(event.target.dataset.serviceImage), event.target.files[0])));
  document.querySelectorAll("[data-service-gallery]").forEach((input) => input.addEventListener("change", (event) => uploadServiceGallery(Number(event.target.dataset.serviceGallery), [...event.target.files])));
  document.querySelectorAll("[data-service-drop]").forEach(bindServiceDropzone);
  document.querySelectorAll("[data-service-gallery-drop]").forEach(bindServiceGalleryDropzone);
  document.querySelectorAll("[data-move-service]").forEach((btn) => btn.addEventListener("click", () => moveService(Number(btn.dataset.moveService), Number(btn.dataset.direction))));
  document.querySelectorAll("[data-clear-service-image]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.services[Number(btn.dataset.clearServiceImage)].image = ""; setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-delete-service-gallery]").forEach((btn) => btn.addEventListener("click", () => deleteServiceGalleryImage(btn.dataset.deleteServiceGallery)));
  document.querySelectorAll("[data-delete-service]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.services.splice(Number(btn.dataset.deleteService), 1); setDirty(); renderAdmin(); }));
  document.querySelector("[data-add-testimonial]")?.addEventListener("click", () => { Admin.state.testimonials.push(normalizeTestimonial({ copy: "Comentario del cliente.", name: "Cliente", rating: 4.8 })); setDirty(); renderAdmin(); });
  document.querySelectorAll("[data-testimonial-field]").forEach((input) => input.addEventListener("input", updateTestimonial));
  document.querySelectorAll("[data-delete-testimonial]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.testimonials.splice(Number(btn.dataset.deleteTestimonial), 1); setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-business-field]").forEach((input) => input.addEventListener("input", () => { Admin.state.business[input.dataset.businessField] = input.value; setDirty(); }));
  document.querySelectorAll("[data-logo-field]").forEach((input) => input.addEventListener("input", updateLogoField));
  document.querySelectorAll("[data-logo-size]").forEach((input) => input.addEventListener("input", updateLogoSize));
  document.querySelectorAll("[data-logo-size-range]").forEach((input) => input.addEventListener("input", updateLogoSize));
  document.querySelectorAll("[data-logo-position]").forEach((input) => input.addEventListener("input", updateLogoPosition));
  document.querySelector("[data-logo-position-dot]") && bindLogoPositionDrag(document.querySelector("[data-logo-position-dot]"));
  document.querySelectorAll("[data-logo-input]").forEach((input) => input.addEventListener("change", (event) => uploadLogo(event.target.dataset.logoInput, event.target.files[0])));
  document.querySelectorAll("[data-logo-drop]").forEach(bindLogoDropzone);
  document.querySelectorAll("[data-clear-logo]").forEach((btn) => btn.addEventListener("click", () => { Admin.state.logos[btn.dataset.clearLogo] = ADMIN_LOGO_NONE; setDirty(); renderAdmin(); }));
  document.querySelectorAll("[data-category-field]").forEach((input) => input.addEventListener("input", updateCategory));
  document.querySelectorAll("[data-create-category]").forEach((btn) => btn.addEventListener("click", createCategory));
}

function switchTab(tab) {
  Admin.current = tab;
  document.querySelectorAll("[data-admin-tab]").forEach((btn) => btn.classList.toggle("active", btn.dataset.adminTab === tab));
  renderAdmin();
}

function updateProduct(event) {
  const row = event.target.closest("[data-product-id]");
  const item = findProduct(row.dataset.productId);
  const field = event.target.dataset.productField;
  if (field === "category") moveProduct(item, row.dataset.category, event.target.value);
  else if (event.target.type === "checkbox") {
    if (item.category === "iphone" && ["sealedAvailable", "openBoxAvailable"].includes(field) && !event.target.checked) {
      const otherField = field === "sealedAvailable" ? "openBoxAvailable" : "sealedAvailable";
      if (item[otherField] === false) {
        event.target.checked = true;
        setStatus("Deja al menos una condicion disponible para este iPhone.", false);
        return;
      }
    }
    item[field] = event.target.checked;
  }
  else if (field === "price" || field === "stock") item[field] = Number(event.target.value);
  else item[field] = event.target.value;
  setDirty();
}

function findProduct(id) {
  return Object.values(Admin.state.products).flat().find((item) => item.id === id);
}

function moveProduct(item, oldCategory, newCategory) {
  if (oldCategory === newCategory) return;
  Admin.state.products[oldCategory] = Admin.state.products[oldCategory].filter((p) => p.id !== item.id);
  if (newCategory === "iphone") {
    item.sealedAvailable ??= true;
    item.openBoxAvailable ??= true;
  }
  Admin.state.products[newCategory].push(item);
  renderAdmin();
}

function addProduct() {
  const category = Object.keys(Admin.state.products)[0];
  Admin.state.products[category].unshift({
    id: `p-${Date.now()}`,
    name: "Nuevo producto",
    family: Admin.state.categories[category]?.title || category,
    desc: "Descripcion breve del producto.",
    price: 0,
    badge: "Nuevo",
    tier: "base",
    color: "color",
    p1: "#e5e7eb",
    p2: "#9ca3af",
    stock: 1,
    active: true,
    featured: false
  });
  setDirty();
  renderAdmin();
}

function duplicateProduct(id) {
  const source = findProduct(id);
  const category = Object.entries(Admin.state.products).find(([, items]) => items.some((item) => item.id === id))[0];
  Admin.state.products[category].unshift({ ...source, id: `p-${Date.now()}`, name: `${source.name} copia` });
  setDirty();
  renderAdmin();
}

function deleteProduct(id) {
  Object.keys(Admin.state.products).forEach((key) => {
    Admin.state.products[key] = Admin.state.products[key].filter((item) => item.id !== id);
  });
  setDirty();
  renderAdmin();
}

function applyBulk() {
  const category = document.querySelector("[data-bulk-category]").value;
  const price = document.querySelector("[data-bulk-price]").value;
  const stock = document.querySelector("[data-bulk-stock]").value;
  Admin.state.products[category].forEach((item) => {
    if (price !== "") item.price = Number(price);
    if (stock !== "") item.stock = Number(stock);
  });
  setDirty();
  renderAdmin();
}

function updateListItem(event) {
  const row = event.target.closest("[data-list]");
  const item = Admin.state[row.dataset.list][Number(row.dataset.index)];
  item[event.target.dataset.listField] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
  setDirty();
}

function updateHomeSlide(event) {
  const row = event.target.closest("[data-home-slide]");
  const item = Admin.state.homeSlides[Number(row.dataset.homeSlide)];
  const field = event.target.dataset.homeSlideField;
  item[field] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
  setDirty();
}

function updateService(event) {
  const row = event.target.closest("[data-service]");
  const index = Number(row.dataset.service);
  const field = event.target.dataset.serviceField;
  if (event.target.type === "checkbox") Admin.state.services[index][field] = event.target.checked;
  else if (field === "price" || field === "promoPrice") Admin.state.services[index][field] = Math.max(0, Number(event.target.value || 0));
  else Admin.state.services[index][field] = event.target.value;
  setDirty();
}

function moveService(index, direction) {
  const next = index + direction;
  if (next < 0 || next >= Admin.state.services.length) return;
  const [item] = Admin.state.services.splice(index, 1);
  Admin.state.services.splice(next, 0, item);
  setDirty();
  renderAdmin();
}

function deleteServiceGalleryImage(value) {
  const [serviceIndex, galleryIndex] = value.split(":").map(Number);
  Admin.state.services[serviceIndex].gallery.splice(galleryIndex, 1);
  setDirty();
  renderAdmin();
}

function updateTestimonial(event) {
  const row = event.target.closest("[data-testimonial]");
  const index = Number(row.dataset.testimonial);
  const field = event.target.dataset.testimonialField;
  Admin.state.testimonials[index][field] = field === "rating" ? Math.max(1, Math.min(5, Number(event.target.value || 1))) : event.target.value;
  setDirty();
}

function updateDecoration(event) {
  const row = event.target.closest("[data-decoration]");
  const item = Admin.state.decorations[Number(row.dataset.decoration)];
  const field = event.target.dataset.decorationField;
  if (event.target.type === "checkbox") item[field] = event.target.checked;
  else if (field === "height") {
    item[field] = clampValue(event.target.value, 40, 900);
    syncDecorationHeight(row, item[field]);
  }
  else if (field === "blockWidth") {
    item[field] = clampValue(event.target.value, 10, 140);
    syncDecorationWidth(row, item[field]);
  }
  else if (field === "mediaWidth") item[field] = clampValue(event.target.value, 35, 75);
  else if (field === "textSize") item[field] = clampValue(event.target.value, 22, 96);
  else if (field === "titleSize") {
    item[field] = clampValue(event.target.value, 12, 140);
    syncDecorationTextSize(row, item);
  }
  else if (field === "copySize") {
    item[field] = clampValue(event.target.value, 8, 80);
    syncDecorationTextSize(row, item);
  }
  else if (field === "textBoxWidth") {
    item[field] = clampValue(event.target.value, 10, 100);
    syncDecorationTextSize(row, item);
  }
  else if (field === "textX") {
    item[field] = clampValue(event.target.value, 0, 100);
    syncDecorationTextCoords(row, item.textX, item.textY);
  }
  else if (field === "textY") {
    item[field] = clampValue(event.target.value, 0, 100);
    syncDecorationTextCoords(row, item.textX, item.textY);
  }
  else if (field === "textOverlay") {
    item[field] = event.target.value === "true";
    setDirty();
    renderAdmin();
    return;
  }
  else {
    item[field] = event.target.value;
    if (field === "image") item.mediaType = inferMediaType(event.target.value);
    if (field === "align") syncDecorationAlign(row, item[field]);
    if (field === "textPosition") syncDecorationTextPosition(row, item[field]);
  }
  setDirty();
}

function updateDecorationHeightControl(event) {
  const row = event.target.closest("[data-decoration]");
  const item = Admin.state.decorations[Number(row.dataset.decoration)];
  item.height = clampValue(event.target.value, 40, 900);
  syncDecorationHeight(row, item.height);
  setDirty();
}

function applyDecorationSizePreset(event) {
  const row = event.target.closest("[data-decoration]");
  const item = Admin.state.decorations[Number(row.dataset.decoration)];
  const [height, width] = event.target.dataset.decorationSize.split(":").map(Number);
  item.height = clampValue(height, 40, 900);
  item.blockWidth = clampValue(width, 10, 140);
  syncDecorationHeight(row, item.height);
  syncDecorationWidth(row, item.blockWidth);
  setDirty();
}

function updateDecorationWidthControl(event) {
  const row = event.target.closest("[data-decoration]");
  const item = Admin.state.decorations[Number(row.dataset.decoration)];
  item.blockWidth = clampValue(event.target.value, 10, 140);
  syncDecorationWidth(row, item.blockWidth);
  setDirty();
}

function syncDecorationHeight(row, height) {
  row.querySelector('[data-decoration-field="height"]').value = height;
  row.querySelector("[data-decoration-height-range]").value = height;
  row.querySelector("[data-decor-editor]")?.style.setProperty("--editor-height", `${height}px`);
  const label = row.querySelector(".decor-size-head span");
  if (label) label.textContent = `${height}px alto · ${Admin.state.decorations[Number(row.dataset.decoration)].blockWidth || 100}% ancho`;
}

function syncDecorationWidth(row, width) {
  row.querySelector('[data-decoration-field="blockWidth"]').value = width;
  row.querySelector("[data-decoration-width-range]").value = width;
  row.querySelector("[data-decor-editor]")?.style.setProperty("--editor-block-width", `${width}%`);
  const item = Admin.state.decorations[Number(row.dataset.decoration)];
  const label = row.querySelector(".decor-size-head span");
  if (label) label.textContent = `${item.height || 260}px alto · ${width}% ancho`;
}

function syncDecorationAlign(row, align) {
  const editor = row.querySelector("[data-decor-editor]");
  if (!editor) return;
  editor.classList.remove("align-left", "align-center", "align-right");
  editor.classList.add(`align-${align || "center"}`);
}

function syncDecorationTextPosition(row, position) {
  const editor = row.querySelector("[data-decor-editor]");
  if (!editor) return;
  editor.classList.remove("text-left", "text-right", "text-top", "text-bottom");
  editor.classList.add(`text-${position || "left"}`);
}

function syncDecorationTextCoords(row, x, y) {
  const nextX = Math.round(clampValue(x ?? 50, 0, 100));
  const nextY = Math.round(clampValue(y ?? 14, 0, 100));
  const editor = row.querySelector("[data-decor-editor]");
  editor?.style.setProperty("--editor-text-x", `${nextX}%`);
  editor?.style.setProperty("--editor-text-y", `${nextY}%`);
  const inputX = row.querySelector('[data-decoration-field="textX"]');
  const inputY = row.querySelector('[data-decoration-field="textY"]');
  if (inputX) inputX.value = nextX;
  if (inputY) inputY.value = nextY;
}

function syncDecorationTextSize(row, item) {
  const editor = row.querySelector("[data-decor-editor]");
  const titleSize = Math.round(clampValue(item.titleSize || item.textSize || 56, 12, 140));
  const copySize = Math.round(clampValue(item.copySize || 16, 8, 80));
  const textBoxWidth = Math.round(clampValue(item.textBoxWidth || 86, 10, 100));
  item.titleSize = titleSize;
  item.copySize = copySize;
  item.textBoxWidth = textBoxWidth;
  editor?.style.setProperty("--editor-title-size", `${titleSize}px`);
  editor?.style.setProperty("--editor-copy-size", `${copySize}px`);
  editor?.style.setProperty("--editor-text-width", `${textBoxWidth}%`);
  const titleInput = row.querySelector('[data-decoration-field="titleSize"]');
  const copyInput = row.querySelector('[data-decoration-field="copySize"]');
  const widthInput = row.querySelector('[data-decoration-field="textBoxWidth"]');
  if (titleInput) titleInput.value = titleSize;
  if (copyInput) copyInput.value = copySize;
  if (widthInput) widthInput.value = textBoxWidth;
}

function updateDecorationSlot(event) {
  const row = event.target.closest("[data-decoration]");
  const index = Number(row.dataset.decoration);
  Admin.state.decorations[index].slot = event.target.dataset.decorationSlot;
  setDirty();
  renderAdmin();
}

function bindDecorationPan(media) {
  media.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-decor-resize], [data-decor-text-pan]")) return;
    const row = media.closest("[data-decoration]");
    const editor = media.closest("[data-decor-editor]");
    const item = Admin.state.decorations[Number(row.dataset.decoration)];
    const update = (moveEvent) => {
      const rect = media.getBoundingClientRect();
      const x = clampValue(((moveEvent.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clampValue(((moveEvent.clientY - rect.top) / rect.height) * 100, 0, 100);
      item.focusX = Math.round(x);
      item.focusY = Math.round(y);
      editor.style.setProperty("--editor-focus-x", `${item.focusX}%`);
      editor.style.setProperty("--editor-focus-y", `${item.focusY}%`);
    };
    update(event);
    const stop = () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerup", stop);
      setDirty();
    };
    window.addEventListener("pointermove", update);
    window.addEventListener("pointerup", stop);
  });
}

function bindDecorationTextPan(copy) {
  copy.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-decor-text-resize]")) return;
    event.preventDefault();
    event.stopPropagation();
    const row = copy.closest("[data-decoration]");
    const editor = copy.closest("[data-decor-editor]");
    const media = editor;
    const item = Admin.state.decorations[Number(row.dataset.decoration)];
    const update = (moveEvent) => {
      const rect = media.getBoundingClientRect();
      item.textX = Math.round(clampValue(((moveEvent.clientX - rect.left) / rect.width) * 100, 0, 100));
      item.textY = Math.round(clampValue(((moveEvent.clientY - rect.top) / rect.height) * 100, 0, 100));
      syncDecorationTextCoords(row, item.textX, item.textY);
    };
    update(event);
    const stop = () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerup", stop);
      setDirty();
    };
    window.addEventListener("pointermove", update);
    window.addEventListener("pointerup", stop);
  });
}

function bindDecorationTextResize(handle) {
  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const row = handle.closest("[data-decoration]");
    const editor = handle.closest("[data-decor-editor]");
    const item = Admin.state.decorations[Number(row.dataset.decoration)];
    const startX = event.clientX;
    const startY = event.clientY;
    const startTitle = Number(item.titleSize || item.textSize || 56);
    const startCopy = Number(item.copySize || 16);
    const startWidth = Number(item.textBoxWidth || 86);
    const editorWidth = Math.max(1, editor.clientWidth);
    const update = (moveEvent) => {
      const delta = Math.max(moveEvent.clientX - startX, moveEvent.clientY - startY);
      item.titleSize = clampValue(startTitle + delta * 0.16, 12, 140);
      item.copySize = clampValue(startCopy + delta * 0.06, 8, 80);
      item.textBoxWidth = clampValue(startWidth + ((moveEvent.clientX - startX) / editorWidth) * 100, 10, 100);
      syncDecorationTextSize(row, item);
    };
    const stop = () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerup", stop);
      setDirty();
    };
    window.addEventListener("pointermove", update);
    window.addEventListener("pointerup", stop);
  });
}

function bindDecorationResize(handle) {
  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const row = handle.closest("[data-decoration]");
    const editor = handle.closest("[data-decor-editor]");
    const item = Admin.state.decorations[Number(row.dataset.decoration)];
    const startX = event.clientX;
    const startY = event.clientY;
    const startHeight = Number(item.height || 260);
    const startWidth = Number(item.blockWidth || 100);
    const editorWidth = Math.max(1, editor.clientWidth);
    const update = (moveEvent) => {
      const nextHeight = clampValue(startHeight + moveEvent.clientY - startY, 40, 900);
      const nextWidth = clampValue(startWidth + ((moveEvent.clientX - startX) / editorWidth) * 100, 10, 140);
      item.height = Math.round(nextHeight);
      item.blockWidth = Math.round(nextWidth);
      editor.style.setProperty("--editor-height", `${item.height}px`);
      editor.style.setProperty("--editor-block-width", `${item.blockWidth}%`);
      syncDecorationHeight(row, item.height);
      syncDecorationWidth(row, item.blockWidth);
    };
    const stop = () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerup", stop);
      setDirty();
    };
    window.addEventListener("pointermove", update);
    window.addEventListener("pointerup", stop);
  });
}

function updateCategory(event) {
  const row = event.target.closest("[data-category-key]");
  Admin.state.categories[row.dataset.categoryKey][event.target.dataset.categoryField] = event.target.value;
  setDirty();
}

function updateLogoSize(event) {
  const key = event.target.dataset.logoSize || event.target.dataset.logoSizeRange;
  const value = Math.max(Number(event.target.min || 1), Math.min(Number(event.target.max || 500), Number(event.target.value || 0)));
  Admin.state.logoSizes ||= { ...window.STTOR_DEFAULTS.logoSizes };
  Admin.state.logoSizes[key] = value;
  if (key === "main") {
    Admin.state.logoSizes.nav = value;
    document.querySelectorAll('[data-logo-size="nav"], [data-logo-size-range="nav"]').forEach((input) => { input.value = value; });
  }
  document.querySelectorAll(`[data-logo-size="${key}"], [data-logo-size-range="${key}"]`).forEach((input) => {
    if (input !== event.target) input.value = value;
  });
  applyLogoSizeVars(Admin.state.logoSizes);
  if (key === "page") syncLogoPositionPreview();
  setDirty();
}

function updateLogoField(event) {
  const key = event.target.dataset.logoField;
  const value = event.target.value.trim();
  Admin.state.logos[key] = value || ADMIN_LOGO_NONE;
  setDirty();
}

function applyLogoSizeVars(sizes = {}) {
  const root = document.documentElement;
  const main = clampValue(sizes.main || sizes.nav || window.STTOR_DEFAULTS.logoSizes.main || 42, 28, 180);
  root.style.setProperty("--logo-main-size", `${main}px`);
  root.style.setProperty("--logo-nav-size", `${clampValue(sizes.nav || main, 28, 180)}px`);
  root.style.setProperty("--logo-hero-size", `${clampValue(sizes.hero || window.STTOR_DEFAULTS.logoSizes.hero, 72, 260)}px`);
  root.style.setProperty("--logo-page-size", `${clampValue(sizes.page || window.STTOR_DEFAULTS.logoSizes.page, 60, 620)}px`);
  root.style.setProperty("--logo-service-size", `${clampValue(sizes.service || window.STTOR_DEFAULTS.logoSizes.service, 120, 420)}px`);
  root.style.setProperty("--logo-footer-size", `${clampValue(sizes.footer || window.STTOR_DEFAULTS.logoSizes.footer, 44, 180)}px`);
  root.style.setProperty("--logo-page-x", `${clampValue(sizes.pageX ?? window.STTOR_DEFAULTS.logoSizes.pageX ?? 82, 0, 100)}%`);
  root.style.setProperty("--logo-page-y", `${clampValue(sizes.pageY ?? window.STTOR_DEFAULTS.logoSizes.pageY ?? 50, 0, 100)}%`);
}

function updateLogoPosition(event) {
  const key = event.target.dataset.logoPosition;
  const value = clampValue(event.target.value, 0, 100);
  Admin.state.logoSizes ||= { ...window.STTOR_DEFAULTS.logoSizes };
  Admin.state.logoSizes[key] = value;
  syncLogoPositionPreview();
  applyLogoSizeVars(Admin.state.logoSizes);
  setDirty();
}

function bindLogoPositionDrag(dot) {
  dot.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const stage = dot.closest(".logo-position-stage");
    const update = (moveEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = Math.round(clampValue(((moveEvent.clientX - rect.left) / rect.width) * 100, 0, 100));
      const y = Math.round(clampValue(((moveEvent.clientY - rect.top) / rect.height) * 100, 0, 100));
      Admin.state.logoSizes ||= { ...window.STTOR_DEFAULTS.logoSizes };
      Admin.state.logoSizes.pageX = x;
      Admin.state.logoSizes.pageY = y;
      syncLogoPositionPreview();
      applyLogoSizeVars(Admin.state.logoSizes);
    };
    update(event);
    const stop = () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerup", stop);
      setDirty();
    };
    window.addEventListener("pointermove", update);
    window.addEventListener("pointerup", stop);
  });
}

function syncLogoPositionPreview() {
  const sizes = Admin.state.logoSizes || {};
  const x = Math.round(clampValue(sizes.pageX ?? 82, 0, 100));
  const y = Math.round(clampValue(sizes.pageY ?? 50, 0, 100));
  const dot = document.querySelector("[data-logo-position-dot]");
  dot?.style.setProperty("--admin-logo-page-x", `${x}%`);
  dot?.style.setProperty("--admin-logo-page-y", `${y}%`);
  dot?.style.setProperty("--admin-logo-page-size", `${clampValue(sizes.page || window.STTOR_DEFAULTS.logoSizes.page || 260, 60, 620)}px`);
  document.querySelector('[data-logo-position="pageX"]')?.setAttribute("value", x);
  document.querySelector('[data-logo-position="pageY"]')?.setAttribute("value", y);
  const inputX = document.querySelector('[data-logo-position="pageX"]');
  const inputY = document.querySelector('[data-logo-position="pageY"]');
  if (inputX) inputX.value = x;
  if (inputY) inputY.value = y;
}

function clampValue(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function createCategory() {
  const key = `categoria-${Object.keys(Admin.state.categories).length + 1}`;
  Admin.state.categories[key] = { title: "Nueva categoria", eyebrow: "Categoria personalizada", lede: "Descripcion de categoria.", icon: "N", logo: "assets/logo-sttor-transparent.png" };
  Admin.state.products[key] = [];
  setDirty();
  renderAdmin();
}

async function uploadProductImage(id, file) {
  if (!file) return;
  if (!isSupportedImage(file)) {
    setStatus("El archivo no es una imagen compatible. Usa JPG, PNG, WEBP, GIF o AVIF.", false);
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setStatus("La imagen supera el limite de 5 MB. Reduce su tamaño y vuelve a subirla.", false);
    return;
  }

  const item = findProduct(id);
  if (!item) return;
  const key = `media-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  setStatus("Subiendo imagen a Netlify…", true);
  try {
    const upload = await fetch(`/api/media?key=${encodeURIComponent(key)}`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file
    });
    if (!upload.ok) {
      if (upload.status === 401) throw new Error("La sesion del administrador vencio. Vuelve a entrar.");
      if (upload.status === 413) throw new Error("La imagen supera el limite de 5 MB.");
      if (upload.status === 415) throw new Error("Netlify no reconoce el formato de esta imagen. Prueba JPG o PNG.");
      if (upload.status === 503) throw new Error("Falta activar STTOR_ADMIN_PASSWORD en Netlify.");
      throw new Error("Netlify no pudo recibir la imagen. Revisa tu conexion e intenta otra vez.");
    }
    item.image = `/api/media?key=${encodeURIComponent(key)}`;
    item.mediaType = "image";
    setDirty();
    renderAdmin();
  } catch (error) {
    console.error(error);
    setStatus(error instanceof Error && error.message ? error.message : "No se pudo subir la imagen a Netlify.", false);
  }
}

async function uploadHomeSlideImage(index, file) {
  if (!file || !isSupportedImage(file)) return;
  const stored = await storeLocalMedia(file);
  Admin.state.homeSlides[index].image = stored.ref;
  setDirty();
  renderAdmin();
}

function bindHomeSlideDropzone(label) {
  const index = Number(label.dataset.homeSlideDrop);
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    if (dropped.file) uploadHomeSlideImage(index, dropped.file);
    else if (dropped.url) setHomeSlideImageUrl(index, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function setHomeSlideImageUrl(index, url) {
  const resolved = await resolveRemoteImage(url, { storeLocal: true });
  Admin.state.homeSlides[index].image = resolved.ref || resolved.src;
  setDirty();
  renderAdmin();
}

function bindDropzone(label) {
  const id = label.dataset.productDrop;
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    if (dropped.file) uploadProductImage(id, dropped.file);
    else if (dropped.url) setProductImageUrl(id, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

function bindServiceDropzone(label) {
  const index = Number(label.dataset.serviceDrop);
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    if (dropped.file) uploadServiceImage(index, dropped.file);
    else if (dropped.url) setServiceImageUrl(index, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function uploadServiceImage(index, file) {
  if (!file) return;
  const stored = await storeLocalMedia(file);
  Admin.state.services[index].image = stored.ref;
  Admin.state.services[index].mediaType = stored.mediaType;
  setDirty();
  renderAdmin();
}

function bindServiceGalleryDropzone(label) {
  const index = Number(label.dataset.serviceGalleryDrop);
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    const files = [...event.dataTransfer.files];
    if (files.length) uploadServiceGallery(index, files);
    else if (dropped.url) setServiceGalleryUrl(index, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function uploadServiceGallery(index, files) {
  const images = files.filter(isSupportedImage);
  Admin.state.services[index].gallery ||= [];
  for (const file of images) {
    const stored = await storeLocalMedia(file);
    Admin.state.services[index].gallery.push(stored.ref);
  }
  setDirty();
  renderAdmin();
}

function bindMediaDrop(label) {
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", async (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    const files = [...event.dataTransfer.files];
    if (files.length) uploadMedia(files);
    else if (dropped.url) {
      const resolved = await resolveRemoteImage(dropped.url, { storeLocal: true });
      addMediaUrl("Imagen arrastrada", resolved.ref || resolved.src);
      setDirty();
      renderAdmin();
    } else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function uploadMedia(files) {
  const images = files.filter(isSupportedImage);
  for (const file of images) {
    const stored = await storeLocalMedia(file);
    Admin.state.media.unshift({ name: file.name, src: stored.ref, thumb: stored.ref, type: stored.mediaType });
  }
  setDirty();
  renderAdmin();
}

function bindDecorationDropzone(label) {
  const index = Number(label.dataset.decorationDrop);
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedMedia(event);
    if (dropped.file) uploadDecorationImage(index, dropped.file);
    else if (dropped.url) setDecorationImageUrl(index, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function uploadDecorationImage(index, file) {
  if (!file || !isSupportedDecorationFile(file)) return;
  const stored = await storeLocalMedia(file);
  Admin.state.decorations[index].image = stored.ref;
  Admin.state.decorations[index].mediaType = stored.mediaType;
  Admin.state.decorations[index].active = true;
  setDirty();
  renderAdmin();
}

function bindLogoDropzone(label) {
  const key = label.dataset.logoDrop;
  label.addEventListener("dragover", (event) => { event.preventDefault(); label.classList.add("dragging"); });
  label.addEventListener("dragleave", () => label.classList.remove("dragging"));
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    label.classList.remove("dragging");
    const dropped = getDroppedImage(event);
    if (dropped.file) uploadLogo(key, dropped.file);
    else if (dropped.url) setLogoUrl(key, dropped.url);
    else setStatus("Arrastra directamente la imagen, no el enlace de la pagina.", false);
  });
}

async function uploadLogo(key, file) {
  if (!file || !isSupportedImage(file)) return;
  const stored = await storeLocalMedia(file);
  Admin.state.logos[key] = stored.ref;
  setDirty();
  renderAdmin();
}

function getDroppedImage(event) {
  const file = [...(event.dataTransfer.files || [])].find((item) => isSupportedImage(item));
  return { file, url: extractDroppedImageUrl(event.dataTransfer) };
}

function getDroppedMedia(event) {
  const file = [...(event.dataTransfer.files || [])].find((item) => isSupportedDecorationFile(item));
  return { file, url: extractDroppedMediaUrl(event.dataTransfer) };
}

function extractDroppedImageUrl(dataTransfer) {
  const html = dataTransfer.getData("text/html");
  const htmlUrl = extractImageFromHtml(html);
  if (htmlUrl) return htmlUrl;
  const direct = dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain");
  return isImageLikeUrl(direct) ? direct.trim() : "";
}

function extractDroppedMediaUrl(dataTransfer) {
  const html = dataTransfer.getData("text/html");
  const mediaUrl = extractMediaFromHtml(html);
  if (mediaUrl) return mediaUrl;
  const direct = dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain");
  return isMediaLikeUrl(direct) ? direct.trim() : "";
}

function extractImageFromHtml(html) {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    const candidate = img?.currentSrc || img?.src || img?.getAttribute("src") || "";
    return isUsableImageSource(candidate) ? candidate.trim() : "";
  } catch {
    const match = html.match(/<img[^>]+(?:currentSrc|src)=["']([^"']+)["']/i);
    return match && isUsableImageSource(match[1]) ? match[1].trim() : "";
  }
}

function extractMediaFromHtml(html) {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const video = doc.querySelector("video, source[type^='video/']");
    const videoCandidate = video?.currentSrc || video?.src || video?.getAttribute("src") || "";
    if (isUsableVideoSource(videoCandidate)) return videoCandidate.trim();
    return extractImageFromHtml(html);
  } catch {
    const match = html.match(/<(?:video|source)[^>]+src=["']([^"']+)["']/i);
    if (match && isUsableVideoSource(match[1])) return match[1].trim();
    return extractImageFromHtml(html);
  }
}

function isImageUrl(value) {
  const text = String(value || "").trim();
  return isUsableImageSource(text);
}

function isUsableImageSource(value) {
  const text = String(value || "").trim();
  return /^data:image\//i.test(text) || /^https?:\/\//i.test(text) || isImageLikeUrl(text);
}

function isImageLikeUrl(value) {
  const text = String(value || "").trim().split("#")[0].split("?")[0];
  return /^https?:\/\//i.test(text) && /\.(webp|jpe?g|png|gif|svg|avif|bmp|tiff?|ico)$/i.test(text);
}

function isUsableVideoSource(value) {
  const text = String(value || "").trim();
  return /^data:video\//i.test(text) || /^https?:\/\//i.test(text) || isVideoLikeUrl(text);
}

function isVideoLikeUrl(value) {
  const text = String(value || "").trim().split("#")[0].split("?")[0];
  return /^https?:\/\//i.test(text) && /\.(mp4|webm|mov|m4v|ogv)$/i.test(text);
}

function isMediaLikeUrl(value) {
  return isImageLikeUrl(value) || isVideoLikeUrl(value) || /^data:(image|video)\//i.test(String(value || "").trim());
}

function addMediaUrl(name, url) {
  Admin.state.media.unshift({ name, src: url, thumb: url, type: "url" });
}

async function resolveRemoteImage(url, options = {}) {
  if (/^data:image\//i.test(url)) return { src: url, thumb: url, type: "data" };
  try {
    const response = await fetch(url, { mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error("No se pudo descargar la imagen");
    const blob = await response.blob();
    if (!blob.type.startsWith("image/")) throw new Error("El enlace no es una imagen");
    const extension = blob.type.split("/")[1] || "jpg";
    const file = new File([blob], `imagen-arrastrada.${extension}`, { type: blob.type });
    if (options.storeLocal === true) return storeLocalMedia(file);
    return optimizeImage(file, options);
  } catch (error) {
    console.warn("No se pudo convertir la imagen remota. Se usara la URL original.", error);
    return { src: url, thumb: url, type: "url" };
  }
}

async function setProductImageUrl(id, url) {
  const item = findProduct(id);
  if (!item || !url) return;
  const resolved = await resolveRemoteImage(url, { storeLocal: true });
  item.image = resolved.src;
  if (resolved.ref) item.image = resolved.ref;
  item.mediaType = "image";
  addMediaUrl(item.name || "Imagen arrastrada", item.image);
  setDirty();
  renderAdmin();
}

async function setServiceImageUrl(index, url) {
  if (!Admin.state.services[index] || !url) return;
  const resolved = await resolveRemoteImage(url, { storeLocal: true });
  Admin.state.services[index].image = resolved.ref || resolved.src;
  Admin.state.services[index].mediaType = "image";
  addMediaUrl(Admin.state.services[index].title || "Servicio", Admin.state.services[index].image);
  setDirty();
  renderAdmin();
}

async function setServiceGalleryUrl(index, url) {
  if (!Admin.state.services[index] || !url) return;
  const resolved = await resolveRemoteImage(url, { storeLocal: true });
  Admin.state.services[index].gallery ||= [];
  Admin.state.services[index].gallery.push(resolved.ref || resolved.src);
  addMediaUrl(`${Admin.state.services[index].title || "Servicio"} galeria`, resolved.ref || resolved.src);
  setDirty();
  renderAdmin();
}

async function setDecorationImageUrl(index, url) {
  if (!Admin.state.decorations[index] || !url) return;
  if (inferMediaType(url) === "video") {
    Admin.state.decorations[index].image = url;
    Admin.state.decorations[index].mediaType = "video";
    Admin.state.decorations[index].active = true;
    setDirty();
    renderAdmin();
    return;
  }
  const resolved = await resolveRemoteImage(url, {
    storeLocal: true
  });
  Admin.state.decorations[index].image = resolved.ref || resolved.src;
  Admin.state.decorations[index].mediaType = "image";
  Admin.state.decorations[index].active = true;
  setDirty();
  renderAdmin();
}

async function setLogoUrl(key, url) {
  if (!key || !url) return;
  const resolved = await resolveRemoteImage(url, { storeLocal: true });
  Admin.state.logos[key] = resolved.ref || resolved.src;
  addMediaUrl(`Logo ${key}`, Admin.state.logos[key]);
  setDirty();
  renderAdmin();
}

async function compressImage(file) {
  return (await optimizeImage(file)).src;
}

function isSupportedImage(file) {
  return /\.(webp|jpe?g|png|svg|avif|gif|bmp|tiff?|ico)$/i.test(file.name) || ["image/webp", "image/jpeg", "image/png", "image/svg+xml", "image/avif", "image/gif", "image/bmp", "image/tiff", "image/x-icon"].includes(file.type);
}

function isSupportedVideo(file) {
  return /\.(mp4|webm|mov|m4v|ogv)$/i.test(file.name) || ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v", "video/ogg"].includes(file.type);
}

function isSupportedDecorationFile(file) {
  return isSupportedImage(file) || isSupportedVideo(file);
}

function inferMediaType(src) {
  const clean = String(src || "").split("#")[0].split("?")[0];
  if (/^data:video\//i.test(clean) || /\.(mp4|webm|mov|m4v|ogv)$/i.test(clean)) return "video";
  return "image";
}

function renderAdminMediaThumb(src, mediaType = "", title = "Decoracion") {
  if (isLocalMediaRef(src)) {
    return `<span class="local-media-preview" data-local-media="${escapeAttr(src)}" data-local-media-type="${escapeAttr(mediaType || "image")}">Guardado local</span>`;
  }
  return (mediaType || inferMediaType(src)) === "video"
    ? `<video class="thumb" src="${src}" muted playsinline preload="metadata" aria-label="${escapeAttr(title)}"></video>`
    : `<img class="thumb" src="${src}" alt="${escapeAttr(title)}">`;
}

async function storeLocalMedia(file) {
  const id = `media-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const mediaType = isSupportedVideo(file) ? "video" : "image";
  const db = await openLocalMediaDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(ADMIN_LOCAL_MEDIA_STORE, "readwrite");
    tx.objectStore(ADMIN_LOCAL_MEDIA_STORE).put({ id, blob: file, type: file.type, name: file.name, mediaType, createdAt: Date.now() });
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  return { ref: `idb:${id}`, mediaType };
}

function openLocalMediaDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(ADMIN_LOCAL_MEDIA_DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ADMIN_LOCAL_MEDIA_STORE)) db.createObjectStore(ADMIN_LOCAL_MEDIA_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function isLocalMediaRef(value) {
  return String(value || "").startsWith("idb:");
}

async function getLocalMediaUrl(ref) {
  const id = String(ref || "").replace(/^idb:/, "");
  const db = await openLocalMediaDb();
  const record = await new Promise((resolve, reject) => {
    const tx = db.transaction(ADMIN_LOCAL_MEDIA_STORE, "readonly");
    const request = tx.objectStore(ADMIN_LOCAL_MEDIA_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return record?.blob ? URL.createObjectURL(record.blob) : "";
}

function hydrateLocalMediaPreviews() {
  document.querySelectorAll("[data-local-media]").forEach(async (node) => {
    const url = await getLocalMediaUrl(node.dataset.localMedia);
    if (!url) {
      node.textContent = "Archivo local no encontrado";
      return;
    }
    const isVideo = node.dataset.localMediaType === "video";
    if (isVideo) {
      const video = document.createElement("video");
      video.className = "thumb local-video-preview";
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", "Preview de video local");
      video.addEventListener("loadedmetadata", () => {
        try {
          video.currentTime = Math.min(0.15, Math.max(0, (video.duration || 1) / 10));
        } catch {}
      }, { once: true });
      video.addEventListener("error", () => {
        video.replaceWith(videoFallbackPreview());
      }, { once: true });
      node.replaceWith(video);
      return;
    }
    node.outerHTML = `<img class="thumb" src="${url}" alt="Decoracion local">`;
  });
}

function videoFallbackPreview() {
  const fallback = document.createElement("span");
  fallback.className = "local-media-preview is-video";
  fallback.textContent = "Video";
  return fallback;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function optimizeImage(file, options = {}) {
  const max = options.max || 900;
  const quality = options.quality || 0.82;
  const thumbMax = options.thumbMax || 220;
  const thumbQuality = options.thumbQuality || 0.74;
  const preserveOriginalTypes = options.preserveOriginalTypes !== false;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (preserveOriginalTypes && (file.type === "image/svg+xml" || /\.(svg|gif|ico)$/i.test(file.name))) {
        resolve({ src: reader.result, thumb: reader.result, type: file.type || "image" });
        return;
      }
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        const thumbCanvas = document.createElement("canvas");
        const thumbScale = Math.min(1, thumbMax / Math.max(img.width, img.height));
        thumbCanvas.width = Math.round(img.width * thumbScale);
        thumbCanvas.height = Math.round(img.height * thumbScale);
        thumbCanvas.getContext("2d").drawImage(img, 0, 0, thumbCanvas.width, thumbCanvas.height);
        let src = canvas.toDataURL("image/webp", quality);
        let thumb = thumbCanvas.toDataURL("image/webp", thumbQuality);
        if (!src.startsWith("data:image/webp")) {
          src = canvas.toDataURL("image/png");
          thumb = thumbCanvas.toDataURL("image/png");
        }
        resolve({ src, thumb, type: src.slice(5, src.indexOf(";")) });
      };
      img.onerror = () => resolve({ src: reader.result, thumb: reader.result, type: file.type || "image" });
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}

async function hasAdminAccess() {
  try {
    const response = await fetch("/api/admin-session", { cache: "no-store", credentials: "same-origin" });
    Admin.authSetupMissing = response.status === 503;
    return response.ok;
  } catch {
    Admin.authSetupMissing = false;
    return false;
  }
}

function renderAdminAccess() {
  const root = document.querySelector("[data-admin-content]");
  if (!root) return;
  root.innerHTML = `
    <section class="admin-access">
      <div class="admin-access-card">
        <img src="assets/logo-sttor-transparent.png" alt="STTOR">
        <h1>Acceso administrativo</h1>
        <p>Ingresa tu clave privada para administrar productos, imágenes y contenido.</p>
        <label>Clave del administrador<input class="admin-input" type="password" data-admin-access-code autocomplete="current-password" placeholder="Tu clave"></label>
        <button class="btn primary" type="button" data-admin-access-submit>Entrar</button>
        <span class="admin-access-error" data-admin-access-error></span>
      </div>
    </section>
  `;
  document.querySelector(".admin-sidebar")?.setAttribute("hidden", "");
  document.querySelector(".admin-topbar")?.setAttribute("hidden", "");
  document.querySelector(".save-bar")?.setAttribute("hidden", "");
  document.querySelector(".admin-app")?.classList.add("locked");
  if (Admin.authSetupMissing) {
    const error = document.querySelector("[data-admin-access-error]");
    if (error) error.textContent = "Una sola vez: configura STTOR_ADMIN_PASSWORD en las variables de entorno de Netlify.";
  }
  const submit = () => {
    const input = document.querySelector("[data-admin-access-code]");
    const error = document.querySelector("[data-admin-access-error]");
    fetch("/api/admin-session", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: (input?.value || "").trim() })
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else if (error) {
        error.textContent = response.status === 503
          ? "Falta activar la clave segura del administrador en Netlify."
          : "Clave incorrecta.";
      }
    }).catch(() => {
      if (error) error.textContent = "No se pudo conectar con Netlify. Intenta de nuevo.";
    });
  };
  document.querySelector("[data-admin-access-submit]")?.addEventListener("click", submit);
  document.querySelector("[data-admin-access-code]")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!await hasAdminAccess()) {
    renderAdminAccess();
    return;
  }
  await loadPublishedContentForAdmin();
  loadAdminState();
  renderAdmin();
  if (Admin.localDraftDetected) {
    setStatus("Hay cambios guardados en este navegador que aún no se publicaron. Pulsa Guardar para intentarlo de nuevo.", false);
  }
  document.querySelectorAll("[data-admin-tab]").forEach((btn) => btn.addEventListener("click", () => switchTab(btn.dataset.adminTab)));
  document.querySelectorAll("[data-save]").forEach((btn) => btn.addEventListener("click", saveAdminState));
  document.querySelectorAll("[data-export-publish]").forEach((btn) => btn.addEventListener("click", exportPublishData));
  document.querySelector("[data-global-search]")?.addEventListener("input", (event) => {
    Admin.query = event.target.value;
    if (Admin.current !== "products") switchTab("products");
    else renderAdmin();
  });
});

function stableAdminJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableAdminJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableAdminJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}
