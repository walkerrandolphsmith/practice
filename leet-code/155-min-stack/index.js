// Maintain two stacks that grow and shrink in concert
var MinStack = function() {
    // store the elements push onto the queue
    this.stack = []
    // store the minimum value of the stack for each element 
    this.minStack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    // add the elment to the stack
    this.stack.push(val)
    // find the global minimum given the new element
    let localMin = this.getMin()
    let globalMin = localMin !== null ? Math.min(localMin, val) : val
    // store the global minimum at the same index as the element in the stack
    this.min.push(globalMin)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // storage shrinks together
    this.stack.pop();
    this.min.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    // the last element in the array is the top of the stack
    const element = this.stack[this.stack.length - 1]
    return element === undefined ? null : element;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    // the minimum valu is the top of the minStack
    const min = this.minStack[this.minStack.length - 1]
    return min === undefined ? null : min;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */