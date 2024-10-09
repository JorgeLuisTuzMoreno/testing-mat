import { factorial } from './factorial';

describe('Factorial Function', () => {
  it('should return 0 if x is negative', () => {
    expect(factorial(-1)).toBe(0);
    expect(factorial(-10)).toBe(0);
  });

  it('should return 1 if x is 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 2 if x is 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return 6 if x is 3', () => {
    expect(factorial(3)).toBe(6);
  });

  it('should return 24 if x is 4', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return 120 if x is 5', () => {
    expect(factorial(5)).toBe(120);
  });

  it('should return 0 if x is greater than 15', () => {
    expect(factorial(16)).toBe(0);
    expect(factorial(20)).toBe(0);
  });
});
