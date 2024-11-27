export function sortData(data) {
    return [...data].sort((a, b) => {
      if (a.Specialization === null) return 1; // Move null to the end
      if (b.Specialization === null) return -1; // Move non-null above null
      return 0; // Maintain order for non-null values
    });
  }