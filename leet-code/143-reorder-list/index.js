/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    // store the nodes so they can be indexed by position
    let nodes = []
    let current = head;
    while (current) {
        nodes.push(current)
        current = current.next
    }
    current = head;
    // Reorder half of the elements
    const length = Math.ceil(nodes.length / 2)
    for (var i = 1 ; i < length; i++) {
        const temp = current.next
        // Get the tail from the nodes
        const tail = nodes.pop()
        // Remove tail's original parent
        nodes[nodes.length - 1].next= null
        // tail is next element
        current.next = tail
        // tail's next becomes it's parent's original next
        current.next.next = temp;
        // skip the newly added tail
        current = current.next.next
    }
};