const expect = require('chai').expect;
const sinon = require("sinon");
const Math = require('./math')

describe('/math', () => {
    describe('/math/add', () => {
        describe('Given two positive integers are added', () => {
            const sum = Math.add(1, 2);
            it('it should equal their sum', () => {
                expect(sum).to.equal(3);
            })
        })
    })

    describe('/math/multiply', () => {
        describe('Given a non zero multiplicand and multiplier', () => {
            it('add should be called multiplier times', () => {
                const spy = sinon.spy(Math, 'add')
                Math.multiply(2, 3);
                expect(spy.callCount).to.equal(3);
                spy.restore();
            })
        })
    })
})