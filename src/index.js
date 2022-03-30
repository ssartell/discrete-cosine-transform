import { dct2, quantize, dequantize } from './dct.js';
import { round, multiply, divide, transpose } from 'mathjs';

const Q = [
  [3, 5, 7, 8, 11, 13, 15, 17],
  [5, 7, 9, 11, 13, 15, 17, 19],
  [7, 9, 11, 13, 15, 17, 19, 21],
  [9, 11, 13, 15, 17, 19, 21, 23],
  [11, 13, 15, 17, 19, 21, 23, 25],
  [13, 15, 17, 19, 21, 23, 25, 27],
  [15, 17, 19, 21, 23, 25, 27, 29],
  [17, 19, 21, 23, 25, 27, 29, 31]
];

const x = multiply([
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, .5, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
], 255);
const N = x.length;

const M = dct2(N);
const Mt = transpose(M);

const X = multiply(multiply(M, x), Mt);
console.table(round(X, 5));

const X2 = quantize(X);
// const X2 = X;
console.table(round(X2, 5));

const v = multiply(multiply(Mt, dequantize(X2)), M);
// const v = multiply(multiply(Mt, X2), M);
console.table(round(v, 3));