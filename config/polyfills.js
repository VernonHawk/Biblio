"use strict";

if (typeof Promise === "undefined") {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    require("promise/lib/rejection-tracking").enable();
    
    window.Promise = require("promise/lib/es6-extensions.js");
}

// fetch() polyfill for making API calls.
require("whatwg-fetch");

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign");

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === "test") {
    require("raf").polyfill(global);
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        value: function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError("'this' is null or not defined");
            }

            const o = Object(this);

            const len = o.length >>> 0;

            if (len === 0) {
                return false;
            }

            const n = fromIndex | 0;

            let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
            }

            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }

                k++;
            }

            return false;
        }
    });
}
