/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) { 
   if (!head || !head.next) return head;
    
    // Compute the length and find the tail of the list
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++
    }

    // Calculate the number of rotations
    let offsetFromHead = k % length;
    // when the new head is the old head n rotation is needed
    if (offsetFromHead === 0) return head;

    const newHeadIndex = length - offsetFromHead;
    let newTail = head;
    // stop at the node before the new head 
    for (let i = 0; i < newHeadIndex - 1; i++) {
        newTail = newTail.next
    }
    let newHead = newTail.next
    // break the link
    // [new head - tail] [head - newTail]
    newTail.next = null
    // connect them back together
    tail.next = head
   
   return newHead
};