export const STORAGE_KEYS = {
  IS_AUTHENTICATED: "is_authenticated",
  GITHUB_CSRF_TOKEN: "github_csrf_token",
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

const set = (key: StorageKey, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const get = (key: StorageKey): unknown => {
  const value = window.localStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value);
};

const remove = (key: StorageKey): void => {
  window.localStorage.removeItem(key);
};

export const storage = {
  set,
  get,
  remove,
};
