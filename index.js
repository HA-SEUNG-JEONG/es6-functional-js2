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

/* `// const add = (acc, cur) => acc + cur;` is defining a function called `add` that takes two
arguments `acc` and `cur` and returns their sum. This function is later used in the `f2` function to
calculate the sum of the squared odd numbers in a given list. */
// const add = (acc, cur) => acc + cur;

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

const join = _.curry((sep = "") => _.reduce((a, b) => `${a}${sep}${b}`));

// _.go(
//   L.range(1, 6),
//   L.map(L.range),
//   L.map(L.map((_) => "*")),
//   L.map(join()),
//   join("\n"),
//   console.log
// );

_.go(
  _.range(2, 10),
  _.map((a) =>
    _.go(
      _.range(1, 10),
      _.map((b) => `${a}x${b}=${a * b}`)
    )
  ),
  console.log
); // [2,3,4,5,6,7,8,9]

// _.go(
//   L.range(2, 10),
//   L.map((a) =>
//     _.go(
//       L.range(1, 10),
//       L.map((b) => `${a}x${b}=${a * b}`),
//       join("\n")
//     )
//   ),
//   join("\n\n"),
//   console.log
// );

// f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);\

console.clear();

const users = [
  { name: "AA", age: 35 },
  { name: "BB", age: 26 },
  { name: "CC", age: 28 },
  { name: "DD", age: 34 },
  { name: "EE", age: 23 },
];

// console.log(
//   _.reduce(
//     (total, u) => {
//       return total + u.age;
//     },
//     0,
//     users
//   )
// );

// 기존 위 reduce 개선
console.log(
  _.reduce(
    (a, b) => a + b,
    L.map((u) => u.age, users)
  )
);

// reduce 하나보다 map + filter + reduce

console.log(
  _.reduce((total, u) => (u.age < 30 ? total : total + u.age), 0, users)
);

const add = (a, b) => a + b;

// 개선

console.log(
  _.reduce(
    add,
    _.map(
      (u) => u.age,
      _.filter((u) => u.age < 30, users)
    )
  )
);

// query,queryToObject

const obj1 = {
  a: 1,
  b: undefined,
  c: "CC",
  d: "DD",
};

// a=1&c=CC&d=DD 출력해보기

function query1(obj) {
  let res = "";
  for (const key in obj) {
    const v = obj[key];
    if (v === undefined) continue;
    if (res !== "") res += "&";
    res += key + "=" + v;
  }
  return res;
}

console.log(query1(obj1));

function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return `${query}${i > 0 ? "&" : ""}${k}${v}`;
  }, "");
}

console.log(query2(obj1));

const joinQuery = _.curry((sep, iter) =>
  _.reduce((a, b) => `${a}${sep}${b}`, iter)
);

function query3(obj) {
  return joinQuery(
    "&",
    _.map(
      ([k, v]) => `${k}=${v}`,
      _.reject(([k, v]) => v === undefined, Object.entries(obj))
    )
  );
}

console.log("query3", query3(obj1));

const query4 = _.pipe(
  Object.entries,
  _.reject(([k, v]) => v === undefined),
  _.map(joinQuery("=")),
  joinQuery("&")
);

console.log("query4", query4(obj1));

// queryToObject

const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
  split("&"),
  _.map(split("=")),
  _.map(([k, v]) => ({ [k]: v })),
  _.reduce(Object.assign)
);

console.log(queryToObject("a=1&c=CC&d=DD"));

// 안전한 합성

const f = (x) => x + 10;
const g = (x) => x - 5;

const fg = (x) => f(g(x));

console.log(fg(10));

//만약 fg에 아무것도 없다면?
// console.log(fg()); // NaN

// 아무것도 없을 때도 오류 없이 처리 필요

_.go(10, fg, console.log);

_.go([], L.map(fg), _.each(console.log));

// find 대신 L.filter

const user1 = _.find((u) => u.name === "BB", users);

// 없는 객체를 찾으려고 하면 undefined
const user2 = _.find((u) => u.name === "BBD", users);

// L.filter 사용

_.each(
  console.log,
  L.take(
    1,
    L.filter((u) => u.name === "BB", users)
  )
);

_.go(
  users,
  L.filter((u) => u.name === "BB"),
  L.take(1),
  _.each(console.log)
);
