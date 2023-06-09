export function noop() {
  //
}

export const range = (from: number, to: number, step = 1): number[] => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export function findAndDelete<T>(
  list: T[],
  cb: (item: T, index: number, list: T[]) => void,
): T[] {
  const index = list.findIndex(cb);
  return [...list.slice(0, index), ...list.slice(index + 1)];
}
