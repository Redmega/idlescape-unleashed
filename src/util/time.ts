export async function seconds(n: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, n * 1000));
}
