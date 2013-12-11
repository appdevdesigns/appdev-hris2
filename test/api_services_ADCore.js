
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/services/ADCore.js :', function () {

    var ADCore = null;

    before(function(done){

        this.timeout(20000);

        var initDone = ADUtil.testingDBInit({
            models:[ 'SiteMultilingualLabel'],
            dataPaths:['test/helpers/data_reset_labels.js']
        });
        $.when(initDone).then(function(data){
            sails = data;
            ADCore = sails.services.adcore;
            done();
        })
        .fail(function(err){
            done(err);
        })
    });



    describe(' ADCore works properly  ', function() {
        var englishLabels = null;
        var koreanLabels = null;
        var noLangLabels = null;
        var noContextLabels = null;

        before(function(done){

            var englishLoaded = ADCore.labelsForContext('site.common', 'en');
            var koreanLoaded  = ADCore.labelsForContext('site.common', 'ko');
            var noLangLoaded  = ADCore.labelsForContext('site.common');
            var noContextLoaded = ADCore.labelsForContext('not.there', 'en');

            $.when(englishLoaded, koreanLoaded, noLangLoaded, noContextLoaded)
            .then(function(english, korean, noLang, noContext){
                englishLabels = english;
                koreanLabels = korean;
                noLangLabels = noLang;
                noContextLabels = noContext;

                done();
            })
            .fail(function(err){
                done(err);
            })
        })

        // Our Service exists
        it(' -> Our Service is loaded ', function() {
            assert.isDefined( sails.services.adcore,
                ' => sails found our ADCore.js Service');

        });


        // We get the correct labels from the service
        it(' -> Pulls labels correctly ', function() {

            assert.lengthOf( englishLabels, 3, ' => found 3 english labels');
            assert.lengthOf( koreanLabels, 2, ' => found 3 korean labels');
            assert.lengthOf( noLangLabels, 5, ' => pulls all labels');
            assert.lengthOf( noContextLabels, 0, ' => not found any matches');

        });


    });


})
