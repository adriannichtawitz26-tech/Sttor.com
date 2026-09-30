import { getStore } from "@netlify/blobs";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "sttor_admin_session";
const MAX_MEDIA_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp",
  "video/mp4", "video/ogg", "video/quicktime", "video/webm", "video/x-m4v"
]);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function validSession(request) {
  const password = process.env.STTOR_ADMIN_PASSWORD || "";
  if (!password) return false;
  const cookie = request.headers.get("cookie") || "";
  const value = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!/^\d+$/.test(expires || "") || Number(expires) * 1000 < Date.now() || !signature) return false;
  const expected = createHmac("sha256", password).update(expires).digest("base64url");
  const receivedBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  return receivedBytes.length === expectedBytes.length && timingSafeEqual(receivedBytes, expectedBytes);
}

function sameOrigin(request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function validKey(key) {
  return /^media-[a-zA-Z0-9_-]{1,120}$/.test(key || "");
}

export default async (request) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  if (!validKey(key)) return json({ error: "invalid_media_key" }, 400);

  const store = getStore({ name: "sttor-media", consistency: "strong" });

  if (request.method === "GET") {
    const entry = await store.getWithMetadata(key, { type: "blob" });
    if (!entry) return new Response("Media not found", { status: 404 });
    const contentType = entry.metadata?.contentType || entry.data?.type || "application/octet-stream";
    return new Response(entry.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox"
      }
    });
  }

  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, POST" } });
  if (!sameOrigin(request)) return json({ error: "origin_not_allowed" }, 403);
  if (!process.env.STTOR_ADMIN_PASSWORD) return json({ error: "admin_password_not_configured" }, 503);
  if (!validSession(request)) return json({ error: "authentication_required" }, 401);

  const contentType = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  if (!ALLOWED_TYPES.has(contentType)) return json({ error: "unsupported_media_type" }, 415);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_MEDIA_BYTES) return json({ error: "media_too_large" }, 413);
  const bytes = await request.arrayBuffer();
  if (!bytes.byteLength || bytes.byteLength > MAX_MEDIA_BYTES) return json({ error: "media_too_large" }, 413);

  await store.set(key, bytes, { metadata: { contentType } });
  return json({ saved: true });
};

export const config = { path: "/api/media" };
