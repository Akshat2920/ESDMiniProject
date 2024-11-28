export function sortData(data) {
  return [...data].sort((a, b) => {
    if (a.specialization === null && b.specialization !== null) return 1;
    if (b.specialization === null && a.specialization !== null) return -1;

    // Sort by rollNo primarily
    const rollNoComparison = a.rollNo.localeCompare(b.rollNo);
    if (rollNoComparison !== 0) return rollNoComparison;

    // Secondary sort by lastName (null values treated as empty strings)
    const lastNameA = a.lastName || "";
    const lastNameB = b.lastName || "";
    return lastNameA.localeCompare(lastNameB);
  });
}