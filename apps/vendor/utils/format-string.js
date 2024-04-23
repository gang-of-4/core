export function capitalize(str) {
  const lower = str?.toLowerCase();
  const words = lower?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalizedStr = capitalizedWords?.join(" ");
  return capitalizedStr;
}

export function getIndefiniteArticle(str) {
  const lower = str.toLowerCase();
  return /^a|e|i|o|u/i.test(lower[0]) ? "an" : "a";
}
