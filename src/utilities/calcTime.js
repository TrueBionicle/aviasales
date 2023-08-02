export const getHours = (date) => new Date(date).getHours();

export const getMinutes = (date) => new Date(date).getMinutes();

export const getDurationHours = (date) => Math.floor(date / 60);

export const getDurationMinutes = (date) => date % 60;

export const getTime = (segment, hours, minutes) => {
  let resultHours = (getHours(segment.date) + hours) % 24;
  let resultMinutes = getMinutes(segment.date) + minutes;
  if (resultMinutes >= 60) {
    resultHours += 1;
  }
  return `${resultHours}:${resultMinutes % 60}`;
};
