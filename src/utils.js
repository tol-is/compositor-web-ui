export const rand = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const uuid = (prefix = '') =>
  `${prefix}-${Math.random()
    .toString(36)
    .substring(2) + Date.now().toString(36)}`;
