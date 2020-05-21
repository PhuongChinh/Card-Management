'use strict'
/**
 * @author Phuong Chinh
 * 
 * https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
 */
module.exports = {
    '/api/*': {
        'target': 'http://localhost:8080',
        'secure': false,
        'logLevel': 'debug',
        'changeOrigin': true,
        'ws': true,
        "bypass": function (req, res, proxyOptions) {
        }
    }
}