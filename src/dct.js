import { sum } from "mathjs";

const quantizationTable = [
  [16, 11, 10, 16, 24, 40, 51, 61],
  [12, 12, 14, 19, 26, 58, 60, 55],
  [14, 13, 16, 24, 40, 57, 69, 56],
  [14, 17, 22, 29, 51, 87, 80, 62],
  [18, 22, 37, 56, 68, 109, 103, 77],
  [24, 35, 55, 64, 81, 104, 113, 92],
  [49, 64, 78, 87, 103, 121, 120, 101],
  [72, 92, 95, 98, 112, 100, 103, 99],
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
  const N = M.length;
  const matrix = [];
  const f = 8 / N;
  for (let y = 0; y < N; y++) {
    let row = [];
    for (let x = 0; x < N; x++) {    
      row.push(Math.round(M[y][x] / quantizationTable[Math.floor(y * f)][Math.floor(x * f)]));
    }
    matrix.push(row);
  }
  return matrix;
}

export function dequantize(M) {
  const N = M.length;
  const matrix = [];
  const f = 8 / 50;
  for (let x = 0; x < N; x++) {
    let row = [];
    for (let y = 0; y < N; y++) {
      row.push(M[x][y] * quantizationTable[Math.floor(x * f)][Math.floor(y * f)]);
    }
    matrix.push(row);
  }
  return matrix;
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