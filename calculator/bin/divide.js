#!/usr/bin/env node

var Calculator = require('../lib').Calculator;

try {
  var calculator = new Calculator();
  var dividend = parseInt(process.argv[2]);
  var divisor = parseInt(process.argv[3]);
  var result = calculator.divide(dividend, divisor);
  console.log(result);
} catch (e) {
  console.log('Usage: bin/divide.js <dividend> <divisor>');
}
