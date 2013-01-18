
/**
 * @constructor
 */
function Calculator() {
}


/**
 * Divide the dividend by the divisor and throw an error if the divisor is 0
 * Also throw an error if either of the params are not integers
 * @param {number} dividend the numerator
 * @param {number} divisor the denominator
 * @return {Object} object with quotient and remainder keys
 */
Calculator.prototype.divide = function(dividend, divisor) {
  // Check for 0 divisor
  if (0 == divisor) {
    throw new Error('Divisor cannot be 0')
  }

  // Check for non-integral operands
  if (!(this.isInteger_(dividend) && this.isInteger_(divisor))) {
    throw new Error('Dividend and divisor must both be integers.');
  }

  // Find an appropriate range to bound our solution
  var range = this.findQuotientRange_(dividend, divisor);

  // Do binary search to find quotient
  var quotient = null;
  while (true) {
    // Find the average between the lower and upper numbers
    quotient = (range.lower + range.upper) >> 1;

    // Calculate the approximation for the dividend
    var result = divisor * quotient;

    // If we've found the closest thing, we're done
    if (Math.abs(dividend - result) <= Math.abs(divisor)) {
      break;
    }

    // Recompute bounds
    if (divisor >= 0) {
      if (result > dividend) {
        range.upper = quotient;
      } else {
        range.lower = quotient;
      }
    } else {
      if (result < dividend) {
        range.upper = quotient;
      } else {
        range.lower = quotient;
      }
    }
  }

  // Find the remainder
  var remainder = dividend - (quotient * divisor);

  return { quotient: quotient, remainder: remainder };
};


/**
 * Find the lower and upper bounds for a quotient
 * @param {number} dividend the numerator
 * @param {number} divisor the denominator
 * @return {Object} object with upper, lower, and positive keys
 * @private
 */
Calculator.prototype.findQuotientRange_ = function(dividend, divisor) {
  var samesign = (dividend > 0) == (divisor > 0);
  var lower = samesign ? 0 : Math.min(dividend, -dividend);
  var upper = samesign ? Math.abs(dividend) : 0;
  return { lower: lower, upper: upper, positive: samesign };
};


/**
 * @return {boolean} result whether or not param is integer
 * @param {number} number
 * @private
 */
Calculator.prototype.isInteger_ = function(number) {
  return number % 1 === 0;
};


module.exports = Calculator;
