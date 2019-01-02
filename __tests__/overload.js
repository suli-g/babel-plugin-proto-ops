const { transform } = require('@babel/core')
const plugin = require('../')

const tests = [
    '1 + 1',
    'x + 1',
    '{} + 1',
    '1 + {}',
    '1 + x',
    'this + 1',
    'this.valueOf() + 1',
    'this.valueOf() + x',
    'this.valueOf() + x.valueOf()',
    '{a: 1} + {b: 2}',
    'a + {b: 2}',
    `function x() {
        return this.valueOf() + x.valueOf()
    }`
]

it('works', () => {
    for (const test of tests) {
        const { code } = transform(test, { plugins: [plugin]})
        expect(code).toMatchSnapshot()
    }
})