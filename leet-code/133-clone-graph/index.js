/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    // handle edge case
    if (node === null) return node
    // keep track of the node to return
    const start = new Node(node.val)
    // manage cycle detection by keeping track of which nodes have been visited
    const map= new Map();
    // seed the map with the start node
    map.set(node, start)
    // keep track of nodes to visit
    const stack = [node];
    // exhaust the stack
    while (stack.length > 0) {
        const next = stack.pop();
        // consider each neighbor
        for (const neighbor of next.neighbors) {
            // identify nodes that have never been visited
            if (!map.has(neighbor)) {
                // record the node as visited
                map.set(neighbor, new Node(neighbor.val))
                // schedule the node to be visited
                stack.push(neighbor)
            }
            // update the cloned node's neighbors
            map.get(next).neighbors.push(map.get(neighbor))
        }
    }
    return start;
};