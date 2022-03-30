import { sum } from "mathjs";

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
        row.push(1);
      } else {
        row.push(Math.cos(Math.PI / N * (n + 0.5) * k));
      }
    }
    matrix.push(row);
  }
  return matrix;
};

export function dct2d(x) {
  const N = x.length;
  const matrix = [];
  for (let k1 = 0; k1 < N; k1++) {
    let row = [];
    for (let k2 = 0; k2 < N; k2++) {
      let sum1 = 0;
      for(let n1 = 0; n1 < N; n1++) {
        let sum2 = 0;
        for(let n2 = 0; n2 < N; n2++) {
          sum2 += x[n1][n2] * Math.cos(Math.PI / N * (n2 + 0.5) * k2);
        }
        sum1 += sum2 * Math.cos(Math.PI / N * (n1 + 0.5) * k1);
      }
      row.push(sum1);
    }
    matrix.push(row);
  }
  return matrix;
};

export function dct2ortho(N) {
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

export function dct3(N) {
  const matrix = [];
  for (let k = 0; k < N; k++) {
    const row = [.5];
    for(let n = 1; n < N; n++) {
      row.push((4 / (N * N)) * Math.cos(Math.PI / N * (k + 0.5) * n));
    }
    matrix.push(row);
  }
  return matrix;
}

export function dct32d(x) {
  const N = x.length;
  const matrix = [];
  for (let k1 = 0; k1 < N; k1++) {
    let row = [];
    for (let k2 = 0; k2 < N; k2++) {
      let sum1 = 0;
      for(let n1 = 0; n1 < N; n1++) {
        let sum2 = 0;
        for(let n2 = 0; n2 < N; n2++) {
          sum2 += x[n1][n2] * (n2 == 0 ? .5 : Math.cos(Math.PI / N * (k2 + 0.5) * n2));
        }
        sum1 += sum2 * (n1 == 0 ? .5 : Math.cos(Math.PI / N * (k1 + 0.5) * n1));
      }
      row.push((4 / (N * N)) * sum1);
    }
    matrix.push(row);
  }
  return matrix;
}