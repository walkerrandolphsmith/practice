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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    // assume the target sum is not present in the tree
    // recrsively visit each node looking for a root-to-leaf sum that matches the target
    function visit(node, accumulation) {
        // defensive check to not process undefined or null nodes
        if (!node) return false;
        // sum the current node with the accumlated path value
        accumulation += node.val
        // determine if the node is a leaf node
        const isLeaf = !node.left && !node.right
        // mark the targetSum as found
        if (isLeaf && accumulation === targetSum) { return true }
        // visis the left and right subtree until the target is found or the paths have been exhausted
        return visit(node.left, accumulation) || visit(node.right, accumulation)
    }
    // begin the search at the root of the tree
    return visit(root, 0)
};