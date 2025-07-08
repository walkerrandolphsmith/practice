
var MyQueue = function() {
    // write queue
    this.input = []
    // read queue
    this.output = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    // add element to the input queue
    this.input.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    // prime the output queue
    this.peek();
    // get the next element
    return this.output.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    // If there aren't items pending in the output queue
    if (this.output.length <= 0) {
      // move the input to the output
        while (this.input.length > 0) {
            // in revese order
            this.output.push(this.input.pop())
        }
    }
    // otherwise get the next item from the output
    return this.output[this.output.length - 1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    // input and output are empty
    return this.input.length < 1 && this.output.length < 1
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */