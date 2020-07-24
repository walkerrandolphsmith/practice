const expect = require('chai').expect;
const multiply = require('./math').multiply;

describe('/math/multiply', () => {
    describe('Given one factor is 0', () => {
        it('then the product is 0', () => {
            expect(multiply(0, 100)).to.equal(0);
        })
    })
    describe('Given both factors are non-zero whole numbers', () => {
        it('then the product is equal to the repeated addition of the multiplicand, multiplier times', () => {
            expect(multiply(2, 3)).to.equal(6);
        })
    })
})