export const getRandomIntervalInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min));
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const divmod = (target: number, divider: number): [number, number] => {
  const quotient = Math.floor(target / divider);
  const remainder = target % divider;
  return [quotient, remainder];
};

export const reverseDivmod = (
  quotient: number,
  remainder: number,
  divider: number,
): number => {
  return quotient * divider + remainder;
};
