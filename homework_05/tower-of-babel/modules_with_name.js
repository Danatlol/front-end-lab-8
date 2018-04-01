import { PI } from './modules_with_name_math';
import { sqrt } from './modules_with_name_math';
import { square } from './modules_with_name_math';

var arg1 = process.argv[2];
var arg2 = process.argv[3];

console.log(PI);
console.log(sqrt(+arg1));
console.log(square(+arg2));