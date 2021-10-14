class InvalidArgument extends Error {
  statusCode; 

  constructor(message) {
    super(message);
    this.name = "InvalidArgument";
    this.statusCode = 400;
  }
}

class NotFound extends Error {
  statusCode;

  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
  }
}
class Unauthorized extends Error {
  statusCode;

  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
  }
}
class Conflict extends Error {
  statusCode;

  constructor(message) {
    super(message);
    this.name = "Conflict";
    this.statusCode = 409;
  }
}
class InvalidToken extends Error {
  statusCode;

  constructor(message) {
    super(message);
    this.name = "InvalidToken";
    this.statusCode = 498;
  }
}

module.exports = {
  InvalidArgument,
  NotFound,
  Unauthorized,
  Conflict,
  InvalidToken,
};
