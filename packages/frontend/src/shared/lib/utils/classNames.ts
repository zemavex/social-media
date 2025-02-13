export const classNames = (...args: unknown[]): string => {
  return args
    .map((arg) => {
      if (typeof arg === "string" && arg.trim().length > 0) return arg.trim();

      if (Array.isArray(arg)) {
        return arg
          .filter((element) => typeof element === "string")
          .map((str) => str.trim())
          .filter(Boolean)
          .join(" ");
      }

      if (typeof arg === "object" && arg !== null) {
        return Object.entries(arg)
          .filter(([cls, value]) => value && Boolean(cls.trim()))
          .map(([cls]) => cls)
          .join(" ");
      }
    })
    .join(" ");
};
