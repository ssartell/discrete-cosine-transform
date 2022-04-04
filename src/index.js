import { dct2, dct2d, dct32d, quantize, dequantize } from './dct.js';
import { round, multiply, divide, transpose } from 'mathjs';
import getPixels from 'get-pixels';

const test = [
  [-415, -33, -58, 35, 58, -51, -15, -12],
  [5, -34, 49, 18, 27, 1, -5, 3],
  [-46, 14, 80, -35, -50, 19, 7, -18],
  [-53, 21, 34, -20, 2, 34, 36, 12],
  [9, .2, 9, .5, -32, -15, 45, 37],
  [-8, 15, -16, 7, -8, 11, 4, 7],
  [19, -28, -2, -26, -2, 7, -44, -21],
  [18, 25, -12, -44, 35, 48, -37, -3]
];

console.table(dequantize(quantize(test)));

const x = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
];
// const N = x.length;

// const X = dct2d(x);
// console.table(round(X, 3));

// const v = dct32d(X);
// console.table(round(v, 3));

getPixels('C:/Users/ssartell/Downloads/kian-rory-96.png', (err, pixels) => {
  // let img = [];
  // for(let x = 0; x < pixels.shape[0]; x++) {
  //   let row = [];
  //   for(let y = 0; y < pixels.shape[1]; y++) {
  //     row.push(luma(pixels.get(x, y, 0), pixels.get(x, y, 1), pixels.get(x, y, 2)));
  //   }
  //   img.push(row);
  // }
  // let Xo = dct2d(img);
  // X = quantize(X);
  // debugger;

  // X = dequantize(X);

  // let Y = round(dct32d(X), 0);

  // let v = round(flatten(X), 0);
  // debugger;
  let res = [];
  for(let by = 0; by < pixels.shape[1] / 8; by++) {
    for(let bx = 0; bx < pixels.shape[0] / 8; bx++) {
      let block = [];
      for(let y = 0; y < 8; y++) {
        let row = [];
        let iy = by * 8 + y;
        for(let x = 0; x < 8; x++) {        
          let ix = bx * 8 + x;
          row.push(luma(pixels.get(ix, iy, 0), pixels.get(ix, iy, 1), pixels.get(ix, iy, 2)));
        }
        block.push(row);
      }
      let X = dct2d(block);
      X = dequantize(quantize(X));
      X = round(flatten(X));
      res = res.concat(X);
    }
  }
  console.log(res.length);
  debugger;
});

function flatten(M) {
  let flat = [];
  for (let y = 0; y < M.length; y++) {
    for (let x = 0; x < M[y].length; x++) {
      flat.push(M[y][x]);
    }
  }
  return flat;
}

function luma(r,g,b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}





// const Mt = transpose(M);

// const X = multiply(multiply(M, x), Mt);
// console.table(round(X, 5));

// const X2 = quantize(X);
// // const X2 = X;
// console.table(round(X2, 5));

// const v = multiply(multiply(Mt, dequantize(X2)), M);
// // const v = multiply(multiply(Mt, X2), M);
// console.table(round(v, 3));