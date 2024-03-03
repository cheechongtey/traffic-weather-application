export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks = Math.ceil(array.length / chunkSize);
  return [...Array(chunks)].map((_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize),
  );
};
