import { dct2, dct2d, dct32d, quantize, dequantize } from './dct.js';
import { round, multiply, divide, transpose } from 'mathjs';
import getPixels from 'get-pixels';

const x = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
];
const N = x.length;

const X = dct2d(x);
console.table(round(X, 3));

const v = dct32d(X);
console.table(round(v, 3));

// getPixels('C:/Users/ssartell/Downloads/kian-rory-100.png', (err, pixels) => {
//   let res = [];
//   for(let x = 0; x < pixels.shape[0]; x++) {
//     for(let y = 0; y < pixels.shape[1]; y++) {
//       res.push(pixels.get(x, y, 0));
//     }
//   }
//   debugger;
// });





// const Mt = transpose(M);

// const X = multiply(multiply(M, x), Mt);
// console.table(round(X, 5));

// const X2 = quantize(X);
// // const X2 = X;
// console.table(round(X2, 5));

// const v = multiply(multiply(Mt, dequantize(X2)), M);
// // const v = multiply(multiply(Mt, X2), M);
// console.table(round(v, 3));