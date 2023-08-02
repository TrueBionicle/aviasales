export const setSelectedButton = (e) => {
  e.currentTarget.childNodes.forEach((item) => {
    item.className = "filter";
  });
  if (e.target.className === "filter") {
    e.target.className = "filter filter-selected";
  }
};
