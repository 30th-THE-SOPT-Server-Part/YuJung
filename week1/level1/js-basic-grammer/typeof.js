// typeof
const name = "장서현";
console.log(typeof name);

let age = 20;
console.log(typeof age);

let server = true;
console.log(typeof server);

// 백틱
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age}살입니다.`);

// null과 undefined
console.log(`null: ${typeof null}`);
console.log(`undefined: ${typeof undefined}`);

let arr = ["안녕", 1, "나는", true];

// map() : 새로운 배열을 만들어서 리턴해줍니다.
let num = [1, 2, 3, 4];
const newNumArr = num.map(x => x * 2);
console.log(newNumArr);

newNumArr.map (x => {
    console.log(x);
});


for (const x of newNumArr) {
    console.log (x);
};