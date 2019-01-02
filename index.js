const callFunction = require('./plugin/call-function')
const { readFileSync } = require('fs')
const { join } = require('path')
const { transform } = require('@babel/core')
const req = transform(readFileSync(join(__dirname, 'operators.js')))
module.exports = function({types}) {
    return {
        visitor: {
            Program(path) {
                if (!/babel-plugin-proto-ops/.test(process.cwd())){
                    path.node.body.unshift(
                        req.program.body[0]
                    )
                }
            },
            BinaryExpression(path) {
                callFunction(path, types)
            }
        }
    }
}