/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  // The depth of the container is fixed and omitted.
  // Therefore we are maxmimizing the area
  let maxArea = 0;

  let start = 0;
  let end = height.length - 1

  while (start < end) {
    const leftHeight = height[start]
    const rightHeight = height[end]

    // The rectangle can only be as tall as the shortest side
    const maxHeight = Math.min(leftHeight, rightHeight)
    // The distance of the x axis
    const width = end - start
  
    
    // The shorter of the two sides is the limiting factor
    // Move the pointer on the shorter side
    if (leftHeight > rightHeight) {
      end--
    } else {
      start++
    }
    const area = maxHeight * width;
    // If shorter walls with a wider base maximize the area we'll have recorded that already. 
    maxArea = Math.max(maxArea, area)
  }
  return maxArea;
}