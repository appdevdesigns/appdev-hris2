
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/controllers/ADLanguageController.js :', function () {

    before(function(done){

        this.timeout(10000);

        var initDone = ADUtil.testingDBInit({
            models:[],
            dataPaths:[]
        });
        $.when(initDone).then(function(data){
            sails = data;
            done();
        })
        .fail(function(err){
            done(err);
        })
    });



    describe(' Controller is properly setup  ', function() {

        // Our Model exists
        it(' -> Our Controller is loaded ', function() {

            assert.isDefined( sails.controllers.adlanguage,  ' => sails found our ADLanguageController')

        });


    });


})
