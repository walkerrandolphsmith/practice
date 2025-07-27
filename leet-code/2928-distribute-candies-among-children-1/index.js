/**
 * @param {number} n
 * @param {number} limit
 * @description |A ∪ B ∪ C| = |A| + |B| + |C|
             - |A ∩ B| - |A ∩ C| - |B ∩ C|
             + |A ∩ B ∩ C|
 * @return {number}
 */
var distributeCandies = function(n, limit) {
    const numberOfAllCombinations = nChooseK(n + 2, 2)
    const numberOfDistinctChildren = 3
    const numberOfCombinationsSuchThatOneChildExceedsLimit = n - limit + 1 >= 0
        ? numberOfDistinctChildren * nChooseK(n - limit + 1, 2)
        : 0
    const numberOfDistinctPairsOfChildren = 3
    const numberOfCombinationsSuchThatTwoChildrenExceedsLimit = n - limit *2 >= 0
        ? numberOfDistinctPairsOfChildren * nChooseK(n - limit * 2, 2)
        : 0
    const numberOfCombinationsSuchThatThreeChildrenExceedsLimit = n - limit * 3 -1 >= 0
        ? nChooseK(n - limit * 3 - 1, 2)
        : 0

    return numberOfAllCombinations
        - numberOfCombinationsSuchThatOneChildExceedsLimit
        + numberOfCombinationsSuchThatTwoChildrenExceedsLimit
        - numberOfCombinationsSuchThatThreeChildrenExceedsLimit
};

function nChooseK(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= n--;
    result /= i;
  }
  return result;
}