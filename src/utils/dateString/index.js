export default function dateString(date) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, dateOptions);
}
