//명령형
function f1(limit, list) {
  let acc = 0;
  for (const item of list) {
    if (item % 2) {
      const square = item * item;
      acc += square;
      if (--limit === 0) break;
    }
  }
  console.log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function f2(limit, list) {
  let acc = 0;
  for (const item of L.filter((a) => a % 2, list)) {
    //f1 함수에서는 모든 list를 다 돌지만 f2 함수에서는 L.filter로 홀수값만 순회한다.
    if (item % 2) {
      const square = item * item;
      acc += square;
      if (--limit === 0) break;
    }
  }
  console.log("acc1", acc);
}

f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
