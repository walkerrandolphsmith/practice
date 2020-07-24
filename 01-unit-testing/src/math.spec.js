const expect = requrie('chai').expect;

describe('Given two positive integers are added', () => {
    const sum = add(1, 2);
    it('it should equal their sum', () => {
        expect(sum).to.equal(3);
    })
})