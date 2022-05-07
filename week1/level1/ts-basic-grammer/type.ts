// 변수 선언 시 타입을 표시해주자

let tsname: string = "허유정";

let grade: number = 3;
let isDeleted: boolean = false;
const tssum = (x: number, y: number): number => {
    return x + y;
}


// 배열 타입 변수 선언

const ages: Array<number> = [1, 2, 3, 4];

const strArray: Array<string> = ["hi", "hello"];

const strArray2: string[] = ["hi", "hello"];

/*
 * Object vs object
 * Object: 모든 타입을 할당할 수 있다.
 * object: 원시 타입을 제외한 타입을 할당할 수 있다.
*/

// return값이 없는 경우 타입은 void
const f1 = (obj: object): void => {
    console.log(obj);
};

const f2 = (obj: Object): void => {
    console.log(obj);
};


// function

f1([1,2,3,4]);

const div = (x: number, y: number): string[] => {
    return ['hello']
};
// 리턴값이 문자열 배열


// null, undefined

let nulla: null = null;
// let nulla : null = 2; -> 오류나유~

let undefineda: undefined = undefined;
// let undefineda: undefined = 2; -> 역시 오류나유~


// angle-bracket 타입 단언
let name2: any = '허유정'; // any는 아무 타입이나 가능
let name2Length: number = (<string>name2).length;
console.log(name2Length);

// as 타입 단언
let name3: any = '서버';
let name3Length: number = (name3 as string).length;
console.log(name3Length);