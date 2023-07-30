export function discountFunc(price, discount) {
  if (discount !== 0) return Math.round((price / 100) * discount);
  return price;
}
