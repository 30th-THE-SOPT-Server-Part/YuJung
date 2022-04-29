let name = "허유정";
const age = 20;
var part = "server";

function foo () {
    if (true) {
        var name = '허유정';
        console.log('if - block - ', name);
    }
    console.log('function - block - ', name);
};
// foo();

// console.log('global - ', name);