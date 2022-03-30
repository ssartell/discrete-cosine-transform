import { multiply } from 'mathjs';

export function dct2(N) {
  const matrix = [];
  for (let k = 0; k < N; k++) {
    const row = [];
    for(let n = 0; n < N; n++) {
      row.push(Math.cos(Math.PI / N * (n + 0.5) * k));
    }
    matrix.push(row);
  }
  return matrix;
};

export function dct3(N) {
  const matrix = [];
  for (let k = 0; k < N; k++) {
    const row = [.5];
    for(let n = 1; n < N; n++) {
      row.push(Math.cos(Math.PI / N * (k + 0.5) * n));
    }
    matrix.push(row);
  }
  return multiply(matrix, 2 / N);
}
