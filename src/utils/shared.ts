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
