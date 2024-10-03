export default function comma(price) {
  let commaString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return commaString;
}
