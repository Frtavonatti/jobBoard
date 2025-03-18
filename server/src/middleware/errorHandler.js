const errorHandler = (error, _req, res, _next) => {
  console.error('Error', error.message);
  console.error('Stack', error.stack);

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' });
    case 'SyntaxError':
      if (error.status === 400) {
        return res.status(400).json({ error: 'malformed request' });
      }
      break;
    case 'MongoServerError':
      if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ error: 'resource already exists' });
      }
      break;
    default: // Check if it's a custom error with status code
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      break;
  }

  // Error not specifically handled
  return res.status(500).json({ error: 'internal server error' });
}

module.exports = errorHandler