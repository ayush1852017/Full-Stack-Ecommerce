function binarySearch(arr, k) {
  let s = 0,
    e = arr.length - 1;

  while (s <= e) {
    let mid = parseInt((s + e) / 2);

    if (arr[mid] === k) return mid;
    else if (arr[mid] < k) start = mid + 1;
    else end = mid - 1;
  }

  return -1;
}
function count(k, y, n, stack) {
  if (k == 0) return 0;

  if (k == 1) return stack[0];

  var idx = binarySearch(y, k);
  var ans;
  if (idx < 0) {
    idx = Math.abs(idx + 1);
    ans = y.length - idx;
  } else {
    while (idx < n && y[idx] == k) {
      idx++;
    }
    ans = y.length - idx;
  }
  ans += stack[0] + stack[1];

  if (k == 2) ans -= stack[3] + stack[4];

  if (k == 3) ans += stack[2];

  return ans;
}

function countPairs(k, y, m, n) {
  var stack = Array(5).fill(-1);
  for (var i = 0; i < n; i++) if (y[i] < 5) stack[y[i]]++;

  y.sort((a, b) => a - b);

  var total = 0;
  for (var i = 0; i < m; i++) total += count(k[i], y, n, stack);

  return total;
}
