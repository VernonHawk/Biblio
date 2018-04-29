class PropError extends Error {
    
    constructor({ cause, message }) {
      super(message);

      this.name = "PropError";
      this.cause = cause;
    }
  }

module.exports = exports = PropError;