# BAD_Project_Gp1

let str = '素dadas'

let res_chinese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g.test(str);

let res_eng = /[a-zA-Z]/g.test(str);

console.log(res_chinese)
console.log(res_eng)