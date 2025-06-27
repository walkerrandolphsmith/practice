/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  // First we'll find the index of the pivot point
  // Then we'll do binary search of the range either starting or ending with the pivot item

  // Two pointer approach to find the pivot item
  let start = 0;
  let end = nums.length - 1;

  // pivot index
  let k;

  // Keep adjusting pointers until they meet
  while (start < end) {
    // Index of the middle of the range
    const mid = Math.floor((start + end) / 2)

    // If the middle is larger than the end
    // then the pivot is somewhere to the right of the middle
    if (nums[mid] > nums[end]) {
      // adjust the window to start with the element after the middle
      start = mid + 1
    } else {
      // otherwise the pivot is somewhere before the middle
      // adjust the window to not extend past middle 
      end = mid
    }
  }
  // we founnd the pivot
  k = start

  // The pivot separate the array into two distinct ranges
  // We need to determine which one to search for the target within

  // if the target is greater than the first element and less than the pivot we can search in the first range
  if (target >= nums[0] && target <= nums[k-1]) {
    start = 0
    end = k -1
  }
  else {
    // otherwise our target must be in the second range
    start = k
    end = nums.length - 1
  }

  // Reuse start and end and bound them to the range that target is in
  // Do a binary search within that range
  while (start <= end) {
    // Split the range in half
    const mid = Math.floor((start + end) / 2)
    const middleElement = nums[mid]
    // If we find the target return the middle index
    if (target === middleElement) return mid
    // Otherwise adjust the range based on which half the target is in
    if (target < middleElement) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  // Target was never found
  return -1;
}