function OIDCSUserError(message, err) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'OIDCSUserError';
  this.message = message;
  this.oauthError = err;
  this.status = 500;
}

// Inherit from `Error`.
OIDCSUserError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = OIDCSUserError;
