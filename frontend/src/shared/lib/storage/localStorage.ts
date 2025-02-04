const set = (key: string, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const get = (key: string): unknown => {
  const value = window.localStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value);
};

const remove = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const storage = {
  set,
  get,
  remove,
};
