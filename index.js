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

const add = (acc, cur) => acc + cur;

function f2(limit, list) {
  // [...,,,]로 즉시 평가
  // console.log([
  //   ...L.take(
  //     limit,
  //     L.map(
  //       (a) => a * a,
  //       L.filter((a) => a % 2, list)
  //     )
  //   ),
  // ]);
  console.log(
    _.reduce(
      add,
      0,
      L.take(
        limit,
        L.map(
          (a) => a * a,
          L.filter((a) => a % 2, list)
        )
      )
    )
  );

  //_.go로 작성
  _.go(
    list,
    L.filter((a) => a % 2),
    L.map((a) => a * a),
    L.take(limit),
    _.reduce(add),
    console.log
  );
}

function f3(end) {
  let i = 0;
  while (i < end) {
    console.log(i);
    ++i;
  }
}
// f3(10);

function f4(end) {
  // _.each(console.log, L.range(1, end, 2)); // 홀수만 출력
  _.go(L.range(1, end, 2), _.each(console.log));

  // 함수를 실행했는데 전달한 인자와 같은 값이 입력과 출력값이 같다는 것은,
  // 함수를 실행하지 않은 것과 같기 때문에 효과를 일으킨다는게 명확하다

  // each라는 함수를 사용된다면 그 곳에는 반드시 부수 효과가 있음
}
f4(10);

// f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
