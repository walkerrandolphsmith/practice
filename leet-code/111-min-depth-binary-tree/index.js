/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  const isNullTree = root === null
  if (isNullTree) return 0
  const isTrivialTree = root.left === null && root.right === null
  if (isTrivialTree) return 1;
  // explore the subtree that contains leaves
  if (root.left === null) return 1 + minDepth(root.right)
    // explore the subtree that contains leaves
  if (root.right === null) return 1 + minDepth(root.left)
  // return the smaller of two depths
  return 1 + Math.min(minDepth(root.left), minDepth(root.right))
};