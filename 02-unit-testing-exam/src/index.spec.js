const expect = require("chai").expect;
const Stack = require("./");

describe("src/Stack", () => {
  describe("Give a new stack", () => {
    const stack = new Stack();
    it("it should be empty", () => {
      expect(stack.isEmpty()).to.equal(true);
    });
  });
  describe("Give an empty stack", () => {
    let stack;
    beforeEach(() => {
      stack = new Stack();
    });
    describe("When peeking at the top element", () => {
      it("it should be empty", () => {
        expect(stack.peek()).to.equal(undefined);
      });
    });
    describe("When popping the top element", () => {
      it("it should be empty", () => {
        expect(stack.pop()).to.equal(undefined);
      });
    });
    describe("When pushing a new element it should no longer be empty", () => {
      beforeEach(() => stack.push(1));
      it("it should be empty", () => {
        expect(stack.isEmpty()).to.equal(false);
      });
    });
  });
  describe("Give a stack with only one element", () => {
    let stack;
    let element = 1;
    let top = null;
    beforeEach(() => {
      stack = new Stack();
      stack.push(element);
    });
    describe("When peeking at the top element", () => {
      beforeEach(() => (top = stack.peek()));
      it("it should return the element without removing it from the stack", () => {
        expect(top).to.equal(element);
        expect(stack.isEmpty()).to.equal(false);
      });
    });
    describe("When popping the top element", () => {
      beforeEach(() => (top = stack.pop()));
      it("it should return the element, removing it from the stack", () => {
        expect(top).to.equal(element);
        expect(stack.isEmpty()).to.equal(true);
      });
    });
    describe("When pushing a new element", () => {
      beforeEach(() => stack.push(1));
      it("it should be empty", () => {
        expect(stack.isEmpty()).to.equal(false);
      });
    });
  });
  describe("Give a populated stack", () => {
    let stack;
    let first = 1;
    let second = 2;
    let top = null;
    beforeEach(() => {
      stack = new Stack();
      stack.push(first);
      stack.push(second);
    });
    describe("When peeking at the top element", () => {
      beforeEach(() => (top = stack.peek()));
      it("it should return the second element without removing it from the stack", () => {
        expect(top).to.equal(second);
        expect(stack.isEmpty()).to.equal(false);
      });
    });
    describe("When popping the top element", () => {
      beforeEach(() => (top = stack.pop()));
      it("it should return the second element, removing it from the stack", () => {
        expect(top).to.equal(second);
        expect(stack.isEmpty()).to.equal(false);
        expect(stack.peek()).to.equal(first);
      });
    });
  });
});
