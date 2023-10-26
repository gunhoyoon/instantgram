const scores = [85, 90, 92, 78, 88, 87, 91, 89];

const res = scores.every((el) => el > 60);
console.log(res);

const total = scores.reduce((pre, cur) => pre + cur, 0);
console.log(total);

const score60 = scores.filter((el) => el > 60).length;
console.log(score60);
