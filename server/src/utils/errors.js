class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'forbidden action') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'bad request') {
    super(message, 400);
    this.name = 'BadRequestError'
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError
};