export const omg = "yes";

let reg = /([6-9]|1[0-2])/;
let num1 = "36";

let a = num1.match(reg);
console.log(a);

let b = reg.test(num1);
console.log(b);
