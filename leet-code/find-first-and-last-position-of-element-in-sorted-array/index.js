/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // binary search while keeping track of the original index with an offset
  function _searchRange(nums, target, offset) {
    // target is not present in empty list
    if (nums.length === 0) return [-1, -1]
    // the target is or is not the only element in a list of one
    if (nums.length === 1) return nums[0] === target ? [offset, offset] : [-1, -1];
    // binary search
    const mid = Math.floor(nums.length / 2)
    if (nums[mid] < target) {
      // accumulate the index offset relative to the original list
      offset = offset + mid;
      return _searchRange(nums.slice(mid, nums.length), target, offset)
    }
    if (nums[mid] > target) {
      return _searchRange(nums.slice(0, mid), target, offset)
    }
    // widen the range to find the first and last instance
    let minIndex = mid;
    let maxIndex = mid;
    while (nums[minIndex] === target) minIndex--
    while (nums[maxIndex] === target) maxIndex++
    // the last occurence of the target considering the offet
    return [minIndex + 1 + offset, maxIndex - 1 + offset]
  }
  return _searchRange(nums, target, 0)
};