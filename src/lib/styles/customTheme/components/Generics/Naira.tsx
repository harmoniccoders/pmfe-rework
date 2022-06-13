export default function naira(value: number) {
  return `₦${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
