const logger = (req, _res, next) => {
  console.log('PATH: ', req.path);
  console.log('METHOD: ', req.method);
  console.log('BODY: ', req.body);
  console.log('---');
  next();
}

const errorHandler = (error, _req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next(error);
}

module.exports = { logger, errorHandler };