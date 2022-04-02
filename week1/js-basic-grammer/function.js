// 함수 선언문 : 함수 선언문이 정의되기도 전에 호출 가능
function sum (a, b) {
    return a + b;
};

// 함수 표현식 : 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성
let sum2 = (a, b) => {
    return a + b;
};

const result = sum2 (1,3);
console.log (result);

// 함수 표현식
const menu = (dinner) => {
    return (`오늘 메뉴는 ${dinner}입니다.`);
};


// 증감 연산자
let a = 2;
let b = a++; 

console.log (a); // a = 3
console.log (b); // b = 2

a ++;
b = a;
console.log(a); // a = 4
console.log(b); // b = 4


// 비교 연산자
let x = 2 + 3;
let y = 5;
let stry = "5";

if (x === y) {
    // 값과 타입 모두 비교
    console.log(`x === y`);
};

if (x == stry) {
    // 값만 비교
    console.log(`x == stry`);
};


// 나머지 %
console.log(`나머지 : ${x % y}`);


// 논리연산자 and or
if (y == 5 && stry == 5) {
    console.log('&& : and');
};

if (y === 5 || stry ===5) {
    console.log('|| : or');
};

const bool = typeof y === 'number';
console.log(bool);