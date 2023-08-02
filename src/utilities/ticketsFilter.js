import { getDurationHours, getDurationMinutes } from "./calcTime";

const compareDuration = (item) => {
  const firstDuration =
    getDurationHours(item.segments[0].duration) * 60 +
    getDurationMinutes(item.segments[0].duration);
  const secondDuration =
    getDurationHours(item.segments[1].duration) * 60 +
    getDurationMinutes(item.segments[1].duration);

  return Math.min(firstDuration, secondDuration);
};
const compareOptimal = (item) => item.price + compareDuration(item) * 20;

const filter = (state, action) => {
  switch (action) {
    case "MIN_PRICE":
      return state.toSorted((a, b) => {
        return a.price - b.price;
      });
    case "FASTEST":
      return state.toSorted((a, b) => {
        return compareDuration(a) - compareDuration(b);
      });
    case "OPTIMAL":
      return state.toSorted((a, b) => {
        return compareOptimal(a) - compareOptimal(b);
      });
    default:
      return state;
  }
};
export default filter;
