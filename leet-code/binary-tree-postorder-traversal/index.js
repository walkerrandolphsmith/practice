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
var postorderTraversal = function(root) {
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