import { isLowerThan, max } from './business';

export const add = (a, b) => {
  const result = a + b;
  if (result < 5) {
    isLowerThan(result, max);
  }
  return result;
};
