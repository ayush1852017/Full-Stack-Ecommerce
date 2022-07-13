// let arr = [5, 3, 4];
// let n = 3;
// let k = 4;
// let sum = 0;
// let ans = [];
// for (let i = 0; i < n; i++) {
//     for(let j = 1; j < 2; j++) {
//     if(arr[i])
// }

function prefixGCD(arr, N) {
  arr.sort();
  arr = reverse(arr);
  let gcc = arr[0];
  let start = 0;

  while (start < N - 1) {
    let g = 0,
      s1 = 0;

    for (let i = start + 1; i < N; i++) {
      let gc = __gcd(gcc, arr[i]);

      if (gc > g) {
        g = gc;
        s1 = i;
      }
    }

    gcc = g;

    arr = swap(arr, s1, start + 1);

    start++;
  }

  for (let i = 0; i < N; i++) {
    console.log(arr[i] + " ");
  }
}

function __gcd(a, b) {
  return b == 0 ? a : __gcd(b, a % b);
}

function reverse(a) {
  let i,
    n = a.length,
    t;
  for (i = 0; i < n / 2; i++) {
    t = a[i];
    a[i] = a[n - i - 1];
    a[n - i - 1] = t;
  }
  return a;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

let arr = [1, 2, 3, 4];

let N = arr.length;

prefixGCD(arr, N);
