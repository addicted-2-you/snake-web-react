export const getRandomIntervalInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min));
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
