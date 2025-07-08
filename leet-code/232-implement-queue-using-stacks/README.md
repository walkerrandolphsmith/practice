# 232-implement-queue-using-stacks

implement a first in first out (fifo) queue using only two stacks. the implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

implement the myqueue class:

- `void push(int x)` pushes element x to the back of the queue.
- `int pop()` removes the element from the front of the queue and returns it.
- `int peek()` returns the element at the front of the queue.
- `boolean empty()` returns true if the queue is empty, false otherwise.

## notes

you must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.  
depending on your language, the stack may not be supported natively. you may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

## example 1

**input**  
["myqueue", "push", "push", "peek", "pop", "empty"]  
[[], [1], [2], [], [], []]

**output**  
[null, null, null, 1, 1, false]

**explanation**  
myqueue myqueue = new myqueue();
myqueue.push(1); // queue is: [1]
myqueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myqueue.peek(); // return 1
myqueue.pop(); // return 1, queue is [2]
myqueue.empty(); // return false

## constraints

- `1 <= x <= 9`
- at most `100` calls will be made to push, pop, peek, and empty.
- all the calls to pop and peek are valid.
