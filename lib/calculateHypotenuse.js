module.exports = function calculateHypotenuse(x, y, callback) {
  callback(null, Math.sqrt(x * x + y * x));
};
