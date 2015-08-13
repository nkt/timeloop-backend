const Joi = require('joi');

function createValidationMiddleware(schema) {
  function validation(req, res, next) {
    Joi.validate(req.body, schema, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    }, (err, body) => {
      if (err) {
        return next(err);
      }

      req.body = body;
      next();
    });
  }

  return validation;
}

module.exports = createValidationMiddleware;
