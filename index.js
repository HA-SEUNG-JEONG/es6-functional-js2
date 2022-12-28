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

// f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const { L, C } = window._;

function f2(limit, list) {
  let acc = 0;
  for (const a of L.take(
    limit,
    L.map(
      (a) => a * a,
      L.filter((a) => a % 2, list)
    )
  )) {
    //f1 함수에서는 모든 list를 다 돌지만 f2 함수에서는 L.filter로 홀수값만 순회한다.
    acc += a;
  }
  console.log(acc);
}

f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
