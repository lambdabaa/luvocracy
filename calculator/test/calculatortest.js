
var should = require('should');

var Calculator = require('../lib').Calculator;

describe('Calculator', function() {
  var calculator = new Calculator();

  describe('#divide', function() {
    it('should throw an error when the divisor is 0', function() {
      (function() {
        calculator.divide(5, 0);
      }).should.throw('Divisor cannot be 0');
    });

    it('should throw an error when the dividend is not an int', function() {
      (function() {
        calculator.divide(3.14, 2);
      }).should.throw('Dividend and divisor must both be integers.');
    });

    it('should divide 6 by 5 to get 1r1', function() {
      var result = calculator.divide(6, 5);
      result.quotient.should.equal(1);
      result.remainder.should.equal(1);
    });
    
    it('should divide 6 by -5 to get -2r-4', function() {
      var result = calculator.divide(6, -5);
      result.quotient.should.equal(-2);
      result.remainder.should.equal(-4);
    });

    it('should divide -6 by 5 to get -2r4', function() {
      var result = calculator.divide(-6, 5);
      result.quotient.should.equal(-2);
      result.remainder.should.equal(4);
    });
    
    it('should divide -6 by -5 to get 1r-1', function() {
      var result = calculator.divide(-6, -5);
      result.quotient.should.equal(1);
      result.remainder.should.equal(-1);
    });
  });
});
