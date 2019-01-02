const { writeFileSync } = require('fs');const { resolve } = require('path')
const file = resolve(__dirname, '..','..', 'operators.js')
const operators = [ '+','-','/','%','*','**','&','|','>>','>>>','<<','^','==','===','!=','!==','in','instanceof','>','<','>=','<=' ]
const defs = operators.reduce((str, o) => str.concat(`"${o}":{value(_){return this.valueOf() ${o} _.valueOf()}},`),"")
writeFileSync(file, `Object.defineProperties(Object.prototype, {${defs}})`)
