export function factorial(x: number): number {
    if (x < 0 || x > 15) return 0;
    if (x === 0) return 1;
    return x * factorial(x - 1);
  }
  