import { dct2, dct3 } from './dct-1d.js';
import { matrix, multiply } from 'mathjs';

const x = [0, 1, 0, 3, 4];
const N = x.length;

const M = dct2(N);
console.table(M);

const X = multiply(M, x);
console.table(X);

const Y = dct3(N);
console.table(Y);

const v = multiply(Y, X);
console.table(v);