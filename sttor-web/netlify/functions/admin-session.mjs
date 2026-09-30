import { createHmac, createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "sttor_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
  });
}

function secret() {
  return process.env.STTOR_ADMIN_PASSWORD || "";
}

function validSession(request) {
  const password = secret();
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
  if (!secret()) return json({ error: "admin_password_not_configured" }, 503);

  if (request.method === "GET") {
    return validSession(request) ? json({ authenticated: true }) : json({ authenticated: false }, 401);
  }

  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, POST" } });
  if (!sameOrigin(request)) return json({ error: "origin_not_allowed" }, 403);

  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password || "");
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const candidate = createHash("sha256").update(password).digest();
  const expected = createHash("sha256").update(secret()).digest();
  if (!timingSafeEqual(candidate, expected)) return json({ error: "invalid_password" }, 401);

  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  const signature = createHmac("sha256", secret()).update(expires).digest("base64url");
  return json({ authenticated: true }, 200, {
    "Set-Cookie": `${COOKIE_NAME}=${expires}.${signature}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`
  });
};

export const config = { path: "/api/admin-session" };
