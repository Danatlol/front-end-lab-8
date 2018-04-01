let arg1 = process.argv[2];
let arg2 = process.argv[3];

import Math_Ext from './modules_default_export_math';
console.log(Math_Ext.PI);
console.log(Math_Ext.sqrt(+arg1));
console.log(Math_Ext.square(+arg2));