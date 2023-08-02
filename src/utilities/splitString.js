export const splitString = (price) => {
  const result = String(price).split("");
  result.splice(-3, 0, " ").join();
  return result;
};
