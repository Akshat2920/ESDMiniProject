export function sortData(data) {
  return [...data].sort((a, b) => {
    // Handle null specialization
    if (a.specialization === null) return 1; // Move null specialization to the end
    if (b.specialization === null) return -1; // Move non-null specialization above null

    // Sort by rollNo (ascending)
    return a.rollNo.localeCompare(b.rollNo); // Assumes rollNo is a string
  });
}