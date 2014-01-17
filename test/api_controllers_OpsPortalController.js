
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
var sails = null;



var assert = require('chai').assert;
describe('test api/controllers/OpsPortalController.js :', function () {

    before(function(done){

        this.timeout(15000);

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

        // Our Controller exists
        it(' -> Our Controller is loaded ', function() {
            assert.isDefined( sails.controllers.opsportal,  ' => sails found our OpsPortalController')
        });


        // Our expected Services:
        it(' -> Our expected Services ', function() {
            assert.isDefined( sails.controllers.opsportal.config,  ' => sails found our config()');
            assert.isDefined( sails.controllers.opsportal.requirements,  ' => sails found our requirements()');
        });

    });


})
