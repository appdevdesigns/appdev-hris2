
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/models/SiteMultilingualLabel.js :', function () {

    before(function(done){
        this.timeout(10000);

        var initDone = ADUtil.testingDBInit({
            models:[ 'SiteMultilingualLabel'],
            dataPaths:['test/helpers/data_reset_labels.js']
        });
        $.when(initDone).then(function(data){
            sails = data;
            done();
        })
        .fail(function(err){
            done(err);
        })



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
