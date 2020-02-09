export async function seconds(n: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, n * 1000));
}

export async function milliseconds(n: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, n));
}

export const ms = milliseconds;
export const s = seconds;
