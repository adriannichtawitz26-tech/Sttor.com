import { getStore } from "@netlify/blobs";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "sttor_admin_session";

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

export default async (request) => {
  const store = getStore({ name: "sttor-content", consistency: "strong" });

  if (request.method === "GET") {
    const content = await store.get("site-data.json", { type: "json" });
    if (content) return json(content);
    const siteUrl = process.env.URL || new URL(request.url).origin;
    const fallback = await fetch(new URL("/site-data.json", siteUrl), { cache: "no-store" });
    return new Response(fallback.body, {
      status: fallback.status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, POST" } });
  if (!sameOrigin(request)) return json({ error: "origin_not_allowed" }, 403);
  if (!process.env.STTOR_ADMIN_PASSWORD) return json({ error: "admin_password_not_configured" }, 503);
  if (!validSession(request)) return json({ error: "authentication_required" }, 401);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 1024 * 1024) return json({ error: "content_too_large" }, 413);

  let content;
  try {
    content = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (!content || typeof content !== "object" || Array.isArray(content) || !content.products || typeof content.products !== "object") {
    return json({ error: "invalid_content" }, 400);
  }

  await store.setJSON("site-data.json", content);
  return json({ saved: true });
};

export const config = { path: "/api/content" };
