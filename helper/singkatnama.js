function singkatnama(name) {
  const nameParts = name.split(" ");
  if (nameParts.length < 3) {
    return name; // Return the original name if it's less than 3 parts
  }

  // The first two names (first and middle names)
  const firstName = nameParts[0];
  const middleName = nameParts[1];

  // Abbreviate all remaining names
  const initials = nameParts
    .slice(2)
    .map((name) => name.charAt(0))
    .join(".");

  return `${firstName} ${middleName} ${initials}.`;
}
export default singkatnama;
