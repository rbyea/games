export function convectorTime(time) {
  const data = new Date(time);
  const day = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();

  return `${day + "." + ("0" + month).slice(-2) + "." + year}`;
}
