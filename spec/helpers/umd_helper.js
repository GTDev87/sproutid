/*global console */

/*global module, require, exports*/
/*global define */

function init(root, factory) {
    'use strict';

    if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        console.log("NODE MODE");
        factory(require('../../build/sproutid'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        console.log("AMD MODE");
        define(['../../build/sproutid'], factory);
    } else {
        // Browser globals
        console.log("GLOBALS MODE");
        factory(root.sproutid);
    }
}

if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    exports.init = init;
}