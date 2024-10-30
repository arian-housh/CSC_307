// module.test.js
import mut from './module.js'; // MUT = Module Under Test


describe('sum()', () => {
    test('adds 12 + 18 to equal 30', () => {
      expect(mut.sum(12, 18)).toBe(30);
    });
    
    test('adds -5 + -5 to equal -10', () => {
      expect(mut.sum(-5, -5)).toBe(-10);
    });
  
    test('adds 1000 + -1000 to equal 0', () => {
      expect(mut.sum(1000, -1000)).toBe(0);
    });
  
    test('adds 0 + 5 to equal 5', () => {
      expect(mut.sum(0, 5)).toBe(5);
    });
  
    test('adds large numbers', () => {
      expect(mut.sum(1000000000, 2000000000)).toBe(3000000000);
    });
  });
  

  describe('div()', () => {
    test('divides 6 / 3 to equal 2', () => {
      expect(mut.div(6, 3)).toBe(2);
    });
  
    test('divides 10 / -5 to equal -2', () => {
      expect(mut.div(10, -5)).toBe(-2);
    });
  
    test('throws an error when dividing by 0', () => {
      expect(() => mut.div(6, 0)).toThrow('Cannot divide by zero');
    });
  
    test('divides large numbers', () => {
      expect(mut.div(1000000000, 1000000)).toBe(1000);
    });
  
    test('divides small numbers', () => {
      expect(mut.div(0.00001, 0.001)).toBe(0.01);
    });
  });
  


  describe('containsNumber()', () => {
    test('returns true if number is in the array', () => {
      expect(mut.containsNumber([1, 2, 3], 2)).toBe(true);
    });
  
    test('returns false if number is not in the array', () => {
      expect(mut.containsNumber([1, 2, 3], 4)).toBe(false);
    });
  
    // Edge cases
    test('correctly handles the first element', () => {
      expect(mut.containsNumber([1, 2, 3], 1)).toBe(true);
    });
  
    test('correctly handles the last element', () => {
      expect(mut.containsNumber([1, 2, 3], 3)).toBe(true);
    });
  
    test('correctly handles a one-element array', () => {
      expect(mut.containsNumber([5], 5)).toBe(true);
    });
  
    test('returns false for an empty array', () => {
      expect(mut.containsNumber([], 1)).toBe(false);
    });
  });
  