/**
 * Wraps an async controller to handle errors automatically
 * @param {Function} fn - Async controller function
 * @returns {Function} Middleware that handles errors
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;