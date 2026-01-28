import { getSesKey, isSessionValid, saveSession } from "./sessionStore";

const API_BASE_URL = "https://aicountly.org/api"; // ✅ static domain

let isRefreshing = false;
let refreshPromise = null;

export async function apiFetch(url, options = {}) {
  // ✅ session invalid → refresh (and WAIT)
  if (!isSessionValid()) {
    await refreshSesKey();
  }

  const sesKey = getSesKey();

  // ✅  null  → refresh fail
  if (!sesKey) {
    console.error("ses_key missing ❌");
    throw new Error("Unauthorized");
  }

  // ✅ base url auto attach
  const finalUrl = url.startsWith("http")
    ? url
    : `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;

  const res = await fetch(finalUrl, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${sesKey}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    console.error("API 401 even after seskey refresh ❌");
    throw new Error("Unauthorized");
  }

  return res.json();
}

async function refreshSesKey() {
  // ✅ single-flight: 
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    if (isRefreshing) return;
    isRefreshing = true;

    try {
      const res = await fetch(`${API_BASE_URL}/seskey`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("SESKEY refresh failed ❌");
        return;
      }

      const data = await res.json();

      // ✅ safe: token key name mismatch handle
      const newKey =
        data?.ses_key || data?.sesKey || data?.token || data?.access_token;

      const expires = data?.expires_in || data?.expiresIn || 3600;

      if (!newKey) {
        console.error("ses_key missing in response ❌", data);
        return;
      }

      saveSession(newKey, expires);
      console.log("SESKEY refreshed silently ✅");
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
