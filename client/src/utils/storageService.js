

/**
 * A thin wrapper – makes the file easy to unit‑test or migrate to
 * another storage mechanism in the future.
 */
const storage = window.localStorage;

/**
 * Persist authentication data.
 *
 * @param {string} access  JWT access token returned from the API.
 * @param {Object|null} user  User object (optional – may be null on the first
 *                            call, before we know who the user is).
 */
export function saveAuth(access, user) {
  console.log('[STORAGE] saveAuth → access:', access, 'user:', user);

  storage.setItem('access', access);

  if (user !== undefined && user !== null) {
    // Only store the user object when we actually have one – this avoids
    // writing the literal string "undefined" which later breaks JSON.parse.
    storage.setItem('user', JSON.stringify(user));
  } else {
    // Make sure no stale value is left behind.
    storage.removeItem('user');
  }
}

/**
 * Retrieve authentication data.
 *
 * @returns {null | { access: string, user: Object | null }}
 *          null     → nothing stored / not logged in
 *          {…}      → valid token (+ optionally a cached user object)
 */
export function getAuth() {
  const access   = storage.getItem('access');
  const userJson = storage.getItem('user');

  console.log('[STORAGE] getAuth → access:', access, 'userJson:', userJson);

  // If there is no access token, treat the user as logged‑out.
  if (!access) return null;

  try {
    // userJson is allowed to be null until we fetch /auth/me.
    const user = userJson ? JSON.parse(userJson) : null;
    return { access, user };
  } catch (err) {
    // Corrupted data – wipe it and force a clean login next time.
    console.warn('[STORAGE] getAuth → clearing invalid data', err);
    clearAuth();
    return null;
  }
}

/**
 * Remove all authentication data.
 * Call this when the token expires or the user explicitly logs out.
 */
export function clearAuth() {
  console.log('[STORAGE] clearAuth – removing access and user from localStorage');
  storage.removeItem('access');
  storage.removeItem('user');
}
