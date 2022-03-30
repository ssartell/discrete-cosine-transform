const quantizationTable = [
  [3, 5, 7, 8, 11, 13, 15, 17],
  [5, 7, 9, 11, 13, 15, 17, 19],
  [7, 9, 11, 13, 15, 17, 19, 21],
  [9, 11, 13, 15, 17, 19, 21, 23],
  [11, 13, 15, 17, 19, 21, 23, 25],
  [13, 15, 17, 19, 21, 23, 25, 27],
  [15, 17, 19, 21, 23, 25, 27, 29],
  [17, 19, 21, 23, 25, 27, 29, 31]
];

export function dct2(N) {
  const matrix = [];
  for (let k = 0; k < N; k++) {
    let row = [];
    for(let n = 0; n < N; n++) {
      if (k == 0) {
        row.push(Math.sqrt(1 / N));
      } else {
        row.push(Math.sqrt(2 / N) * Math.cos(Math.PI / N * (n + 0.5) * k));
      }
    }
    matrix.push(row);
  }
  return matrix;
};

export function quantize(M) {
  return M.map((row, i) => row.map((x, j) => Math.round(x / quantizationTable[i][j])));
}

export function dequantize(M) {
  return M.map((row, i) => row.map((x, j) => x * quantizationTable[i][j]));
}

// export function dct3(N) {
//   const matrix = [];
//   for (let k = 0; k < N; k++) {
//     const row = [.5];
//     for(let n = 1; n < N; n++) {
//       row.push(Math.cos(Math.PI / N * (k + 0.5) * n));
//     }
//     matrix.push(row);
//   }
//   return multiply(matrix, 2 / N);
// }
