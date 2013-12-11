/**
 * ADCore
 *
 * @module      :: Service
 * @description :: This is a collection of core appdev features for an application.

 *
 */
var $ = require('jquery');

module.exports = {

        labelsForContext: function(context, code, cb) {
            var dfd = $.Deferred();

            // verify cb is properly set
            if (typeof code == 'function') {
                if (typeof cb == 'undefined') {
                    cb = code;
                    code = 'en';    // <-- this should come from site Default
                }
            }


            // options is the filter for our SiteMultilingualLabel.find()
            // make sure something is set for context
            var options = {
                label_context: context || ''
            };


            // optionally set code if provided
            if (code) {
                options.language_code = code;
            }


            SiteMultilingualLabel.find(options)
            .then(function(data){

                if (cb) cb(null, data);
                dfd.resolve(data);

            })
            .fail(function(err){

                if (cb) cb(err);
                dfd.reject(err);
            });

            return dfd;
        }
};


//// LEFT OFF:
//// - figure out unit tests for testing the controller output.