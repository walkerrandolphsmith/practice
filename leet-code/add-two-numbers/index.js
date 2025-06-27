/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // Keep track of the carry-over value during addition, e.g. tens place
  let carry = 0;
  // Keep track of current nodes of each list so we can enumerate them
  let leftNode = l1
  let rightNode = l2;

  // Create a linked list with dummy head as output
  const result = new ListNode(0)
  // Keep track of the current node of the output linked list so we can add digits
  let outputNode = result;
  // Account for values from left, right or left over carry even if one or both lists are exhausted
  while (leftNode || rightNode || carry > 0) { 
    const leftOperand = leftNode ? leftNode.val : 0
    const rightOperand = rightNode ? rightNode.val : 0
    // Sum all parts
    const sum = leftOperand + rightOperand + carry;
    // Next digit in the output
    const remainder = sum % 10
    // carry over from current addition
    carry = Math.floor(sum / 10)
    // Add new digit to the output
    outputNode.next = new ListNode(remainder)
    
    // process next nodes
    outputNode = outputNode.next
    if (leftNode) leftNode = leftNode.next
    if (rightNode) rightNode = rightNode.next
  }

  // Drop the dummy head
  return result.next
}