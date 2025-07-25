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
 * @return {boolean}
 */
var isBalanced = function(root) {
    // store post-order traversal
    let stack = []
    // store the current node
    let current = root;
    // track the most recently processed node
    let lastVisited = null
    // map the hight of subtree by node
    let heights = new Map()
    // continue visiting nodes until we've exhasuted the tree or found unbalanced structure
    while (stack.length > 0 || current) {
        // Visit as far left as possible
        if (current) {
            stack.push(current)
            current = current.left
            continue;
        }
        // peek the top of stack
        const top = stack[stack.length-1]
        // visit the right subtree
        if (top.right && lastVisited !== top.right) {
            current = top.right
            continue
        }
        // We've visisted all children of top element
        stack.pop()
        // Get the height of the left and right subtree
        const leftH = heights.get(top.left) || 0
        const rightH = heights.get(top.right) || 0
        // short circuit if subtree is unbalanaced
        if (Math.abs(leftH - rightH) > 1) return false;
        // record the height of the current node's subtree
        heights.set(top, Math.max(leftH, rightH) + 1)
        // Mark top as the last one evaluated
        lastVisited = top;
    }
    // No subtrees were found to be unbalanaced
    return true;
};



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
 * @return {boolean}
 */
var isBalancedRecursive = function(root) {
    return maxDepth(root) >= 0;
};

var maxDepth = function(root) {
    if(root==null) return 0;

    let left= maxDepth(root.left);
    let right= maxDepth(root.right);

    if(left === -1 || right === -1) return -1;

    if(Math.abs(left-right)>1) return -1;

    return (Math.max(left,right) + 1);
};