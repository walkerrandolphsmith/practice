/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    const len = arr.length;
    // store the elements that satisfy the predicate
    const results = []
    // consider each element in the array
    for (let i = 0; i < len; i++) {
        const currentElement = arr[i];
        // apply the predicate to the element and index
        const isPredicateSatisfied = fn(currentElement, i)
        // skip element that don't satisfy the predicate
        if (!isPredicateSatisfied) continue;
        // otherwise add the element to the results
        results.push(currentElement);
    }
    return results;
};