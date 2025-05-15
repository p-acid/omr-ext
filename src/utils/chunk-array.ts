export const chunkArray = <E>(arr: E[], size: number) => {
  if (size <= 0) return [arr];
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};
