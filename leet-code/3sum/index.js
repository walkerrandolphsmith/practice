/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // two pointer approach where the third element is fixed at ith element
    let left;
    let right;
    
    // sort to determine which pointer to move
    nums = nums.sort((a, b) => a - b)

    let groups = []

    // Requeires at least three elements 
    const max = nums.length - 2

    for (var i = 0; i < max; i++) {
        // After the first iteration, if the element is the same as the previous we would only get duplicates 
        const permutationsWithFixedMemberAlreadyConsidered = i > 0 && nums[i] === nums[i-1]
        if (permutationsWithFixedMemberAlreadyConsidered) continue;

        // All elements after ith element are greater in a sorted list
        const allRemainingElementsGreaterThanZero = nums[i] > 0
        // positive integers require some negatve integers to sum to zero 
        if (allRemainingElementsGreaterThanZero) break;

        // start at either end of the range between the remaining elements
        left = i + 1;
        right = nums.length - 1;
        // continue until the pointers meet
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            // try a smaller value to get closer to zero
            if (sum > 0) {
                right--
                continue;
            }
            // try a larger value to get closer to zero
            if (sum < 0) {
                left++
                continue;
            }
            if (sum === 0) {
                groups.push([nums[i], nums[left], nums[right]]);
                // moving just one pointer would result in duplicates
                left++
                right--

                // until the left pointer is a new value keep promoting it forward
                // the element to the left of left pointer is prev
                while (left < right && nums[left] === nums[left-1]) {
                  left++
                }
                // until the right pointer is a new value keep promoting it forward
                // the element to the right of right pointer is prev
                while (left < right && nums[right] === nums[right + 1]) {
                  right--
                }
            }
        }
    }

    return groups;
};