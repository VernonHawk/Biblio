class TokenError extends Error {
    constructor({ cause, message }) {
        super(message);

        this.name = "TokenError";
        this.cause = cause;
    }
}

module.exports = exports = TokenError;