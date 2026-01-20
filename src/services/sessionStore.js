let sesKey = null;
let sesExpiry = 0;

export function saveSession(key, expiresIn) {
  sesKey = key;
  sesExpiry = Date.now() + expiresIn * 1000;
  
}

export function getSesKey() {
  return sesKey;
}

export function isSessionValid() {
  return sesKey && Date.now() < sesExpiry;
}
export function clearSession() {
  sesKey = null;
  sesExpiry = 0;
}
