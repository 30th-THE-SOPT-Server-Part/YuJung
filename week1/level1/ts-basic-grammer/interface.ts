// 새로운 타입 선언하기
interface Server {
    name: string;
    age: number;
    group: string;
    mbti: string[];
};

const serverPart: Server = {
    name: '허유정',
    age: 5,
    group: 'YB',
    mbti: ['????'],
};
// 프로퍼티가 빠지게 되면 오류가 납니다요

console.log(serverPart);


// 인터페이스를 배열로 만들 수도 있다
const serverMembers: Server[] = [
    {
        name: '허유정',
        age: 20,
        group: 'YB',
        mbti: ['????']
    },
    {
        name: '채정아',
        age: 19,
        group: 'OB',
        mbti: ['ENTP']
    },
]

console.log(serverMembers);


// 선택적 프로퍼티

interface Closet {
    name: string;
    shirt: number;
    pants: number;
    hat?: number;
    sunglasses?: number;
};
// ?를 붙이면 들어올 수도 있고, 아닐 수도 있는 선택적 프로퍼티가 됩니다.

const ohMyGirl: Closet[] = [
    {
        name: '효정',
        shirt: 3,
        pants: 4
    },
    {
        name: '아린',
        shirt: 5,
        pants: 1,
        hat: 3
    }
];
console.log(ohMyGirl);