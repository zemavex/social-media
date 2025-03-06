export type NonNullishObj<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};
