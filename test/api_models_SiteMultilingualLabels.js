
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/models/SiteMultilingualLabel.js :', function () {

    before(function(done){
        this.timeout(10000);
/*

//// TODO: refactor to this:
        ADUtil.testingDBInit({
            timeout:10000,
            models:[ SiteMultilingualLabel],
            dataPaths:['./helpers/data_reset_labels.js']
        }, done);
*/
        var sailsLoaded = ADUtil.sails(function(err, _sails) {
            if (err || !_sails) {
                return done(err | "sails could not be started!");
            } else {
                sails = _sails;

                // make sure all our models are in 'testing' mode
                 var models = [
                     SiteMultilingualLabel
                 ];

                 ADUtil.verifyTestingEnvironment(sails, models, function(err) {

                     if (err) {
                         done(err);
                     } else {

                         // ok, so setup our data to known values.
                         var initialData = require('./helpers/data_reset_labels.js');
                         var setup = ADUtil.dbSetup(initialData);
                         $.when(setup).then(function(data) {

                             // ok, get started with the tests
                             done();
                         })
                         .fail(function(err){
                             done(err);
                         })
                     }
                 })

            }
        });

    });



    describe('Labels  ', function() {

        // Our Model exists
        it(' Our Model exists ', function() {

            //// NOTE: truth is, this will fail in the before() method above
            ////       before we even get here.

            assert.isDefined(SiteMultilingualLabel,  ' yep, our model was found and read in.')

        });


    });


})
