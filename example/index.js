require('babel-plugin-proto-ops/operators')

class Vector {
    constructor(...args) {
        this.props = args
    }
    ["+"](other) {
        const result = this.props.map((cell, c) => cell + other.props[c])
        return new Vector(...result)
    }
    ["-"](other) {
        const result = this.props.map((cell, c) => cell - other.props[c])
        return new Vector(...result)
    }
}

const A = new Vector(1,2)
const B = new Vector(2,3)
const C = A + B
console.log(C.props)