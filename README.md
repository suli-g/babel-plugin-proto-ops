<style>table { width: 100% }</style>
# babel-plugin-proto-ops
A simple babel plugin to allow operator overloading on Object prototypes.

## Definitions:
| symbol | meaning |
| :---: | :---: |
| `⊙` | Any valid operator |
| `_`  | (underscore) any variable |
| `a --> b`  | `a` transpiles to `b` |
| `-x-`: `fn`  | `fn` does not transpile |
## How it works
### This plugin does 2 things:
#### 1. Calls `Object.defineProperties` on `Object.prototype` to define operator methods on the Object prototype.
#### 2. Transpiles all operator functionality in code to call their relevent methods instead.
  - `a ⊙ b --> a['⊙'](b)`
  - <span id="exception">Exception:</span>
    * `-x-` : `return this.valueOf() ⊙ _.valueOf()`
    * `-x-` : `return _.valueOf() ⊙ this.valueOf()`
> This plugin is **not** recommended for client-side scripts as it transpiles **all** operators into functions - which has a **massive** performance impact.

## Usage
This plugin's powers can be made use of in the following ways:
### 1. Operator overloading
To overload an operator ⊙ for any object type simply change the function logic for the method "⊙" of its prototype.

#### Example:
```[javascript]
String.prototype["*"] = function(x) {
    return this.repeat(x) //repeat "this" string x times
}

const [oh, oros] = "oh-.oros".split('.')
console.log(oh * 4 + oros)
```

### 2. Class method definitions
To define specific operator logic for members of any class, simply define the method in the class using ***computed string keys***.

#### Example:
```[javascript]
class Vector {
    constructor(...cells) {
        this.cells = cells
    }
    ["+"](other) {
        const result = this.cells.map((cell, c) => cell + other.cells[c])
        return new Vector(...result)
    }
    ["-"](other) {
        const result = this.cells.map((cell, c) => cell - other.cells[c])
        return new Vector(...result)
    }
}

const A = new Vector(1,2)
const B = new Vector(2,3)
console.log(A + B) // --> A['+'](B)
```