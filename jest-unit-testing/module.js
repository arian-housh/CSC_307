
const sum = (a, b) => a + b;

const div = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};

const containsNumber = (arr, num) => {
    return arr.includes(num);
};

export default { sum, div, containsNumber };
