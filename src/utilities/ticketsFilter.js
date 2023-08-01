const compareDuration = (item) => {
  const firstDuration =
    item.segment1.durationHours * 60 + item.segment1.durationMinutes;
  const secondDuration =
    item.segment2.durationHours * 60 + item.segment2.durationMinutes;

  return Math.min(firstDuration, secondDuration);
};
const compareOptimal = (item) => {
  const result = item.price + compareDuration(item) * 20;
  return result;
};

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
