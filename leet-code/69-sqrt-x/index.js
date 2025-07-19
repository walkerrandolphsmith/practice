function initialGuess(x) {
  const log2S = Math.log2(x);
  const exponent = Math.floor(log2S / 2);
  return Math.pow(2, exponent);
}

/**
 * Approximating Square Roots with Newton's Method
 * f(x)=x^2−S
 * x_n+1 = 1/2 * (x_n + S / x_n)
 * 
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    // short circuit on edge case
    if (x === 0) return x
    // speed up convergence with a reasonable guess
    x0 = initialGuess(x)
    // store the next tabulated value
    let xn = x0;
    // 32bit signed ints only need about 6 iterations to converge
    for (var i = 0; i < 6;  i++) {
        // apply newtons method to find the root of the function
        xn = (xn + (x/xn))/2
    }
    // floor the approximation
    return Math.floor(xn)
};