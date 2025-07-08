/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    // maintain the segments of the path in a stack
    const stack = []
    // decompose the path into parts
    const segments = path.split('/')
    // process each segment
    for (let i = 0; i < length; i++) {
        const segment = segments[i]
        // empty segments are ignored
        if (segment === '.' || segment === '') continue;
        // remove the parent directory from the top of the stack
        if (segment === '..') stack.pop()
        // add the segement to the stack
        else stack.push(segment)
    }
    // join the segments back
    return `/${stack.join('/')}`
};