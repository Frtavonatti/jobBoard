const logger = (req, _res, next) => {
  console.log('PATH: ', req.path);
  console.log('METHOD: ', req.method);
  console.log('BODY: ', req.body);
  next();
}

module.exports = logger