
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/controllers/ADCoreController.js :', function () {

    before(function(done){

        this.timeout(50000);

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
        });
    });



    describe(' Controller is properly setup  ', function() {

        // Our Controller exists
        it(' -> Our Controller is loaded ', function() {
            assert.isDefined( sails.controllers.adcore,  ' => sails found our ADCoreController');
        });


        // Our expected Services:
        it(' -> Our expected Services ', function() {
            assert.isDefined( sails.controllers.adcore.configData,  ' => sails found our configData()');
            assert.isDefined( sails.controllers.adcore.labelConfigFile,  ' => sails found our labelConfigFile()');
            assert.isDefined( sails.controllers.adcore.login,  ' => sails found our login()');
            assert.isDefined( sails.controllers.adcore.logout,  ' => sails found our logout()');
        });

    });

});
