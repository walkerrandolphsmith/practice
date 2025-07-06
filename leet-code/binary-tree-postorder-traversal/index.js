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
 * @return {number[]}
 */
var resursivePostorderTraversal = function(root) {
    // stores the values of the nodes in the correct order
    let visited = [];

    /**
     * Helper function to perform the recursive traversal
     * @param {TreeNode} node - The current node being visited
     */
    function visit(node) {
        // Base case: short circuit if a node doesn't exist
        if (!node) return

        // Recursively visit the left subtree first
        if (node.left) visit(node.left)
        // Recurively visit the right subtree next
        if (node.right) visit(node.right)
        // finally visit the current node
        visited.push(node.val)
    }
    // start traversal at the root
    visit(root)

    // return the postorder traversal
    return visited;
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
 * @return {number[]}
 */
var iterativePostorderTraversal = function(root) {
    // short circuit if the root node doesn't exist
    if (!root) return []
    // stores the values of the nodes in the reverse order
    let visisted = []
    // Keep track of nodes to visit
    // We use this data strcuture instead of the 'call stack' from the recursive implementation
    let stack = [root]
    // continue until there are no more nodes to visit
    while (stack.length > 0) {
        // process the next node
        const node = stack.pop();
        // visit the current node
        visisted.push(node.val)
        // Add the left subtree to the stack to be visited later
        if (node.left) stack.push(node.left)
        // Add the right subtree to the stack to be visited later
        if (node.right) stack.push(node.right)
    }
    // reverse the list and return the postorder traversal 
    return visisted.reverse()
};