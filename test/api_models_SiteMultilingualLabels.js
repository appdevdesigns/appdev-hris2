
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



    describe('Labels : ', function() {

        var labels = null;

        before(function(done){
            SiteMultilingualLabel.find()
                .done(function(err, data){

                    if (err) {
                        done(err);
                    } else {
                        labels = data;
                        done();
                    }
                })

        })
        // Our Model exists
        it(' -> Our Model exists ', function() {

            //// NOTE: truth is, this will fail in the before() method above
            ////       before we even get here.

            assert.isDefined(SiteMultilingualLabel,  ' => our model was found');

        });


        // Our Model can pull from the site_multilingual_label table
        // NOTE: we are not trying to test out all features that should be
        //       tested already with the Sails Model.  Just making sure we
        //       read in our data correctly.
        it(' -> Our Model works ', function() {



            assert.lengthOf(labels, 5,  ' => found all the labels we expected.');

        });


    });


})
