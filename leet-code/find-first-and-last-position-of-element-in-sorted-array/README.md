# find-first-and-last-position-of-element-in-sorted-array

# Find First and Last Position of Element in Sorted Array

You are given an array of integers `nums` that is **sorted in non-decreasing order**.  
Your task is to find the **starting and ending position** of a given `target` value.

If the target is **not found** in the array, return `[-1, -1]`.

You must write an algorithm with **O(log n)** runtime complexity.

## Examples

**Example 1**  
Input: `nums = [5,7,7,8,8,10]`, `target = 8`  
Output: `[3, 4]`

**Example 2**  
Input: `nums = [5,7,7,8,8,10]`, `target = 6`  
Output: `[-1, -1]`

**Example 3**  
Input: `nums = []`, `target = 0`  
Output: `[-1, -1]`

## Constraints

- `0 <= nums.length <= 100,000`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is sorted in non-decreasing order.
- `-10^9 <= target <= 10^9`

