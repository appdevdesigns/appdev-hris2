
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



    describe(' ADCore.comm tests  ', function() {

        // Create a Mock Response object to gather response details
        var mockRes = function() {
            this.httpHeaders = {};
            this.data = '';
            this.status = 0;
        };

        mockRes.prototype.header = function(type, value) {
            this.httpHeaders[type] = value;
        };

        mockRes.prototype.send = function(data, code) {
            this.data = JSON.parse(data);
            this.status = code;
        };


        var errorResNoCode = new mockRes();
        var errorResCode = new mockRes();

        var successResNoCode = new mockRes();
        var successResCode = new mockRes();

        var reauth = new mockRes();

        before(function(){

            ADCore.comm.error(errorResNoCode, { id:'id', message:'message', test:'test' });
            ADCore.comm.error(errorResCode, { id:'id', message:'message', test:'test' }, 499);

            ADCore.comm.success(successResNoCode, { test:'test' });
            ADCore.comm.success(successResCode, { test:'test' }, 299);

            ADCore.comm.reauth(reauth);
        });


        // Errors are properly formatted
        it(' -> Errors formatted properly ', function() {

            assert.equal( errorResNoCode.httpHeaders['Content-type'], 'application/json', ' => content-type set to application/json ');
            assert.equal( errorResCode.httpHeaders['Content-type'], 'application/json', ' => content-type set to application/json ');

            assert.isDefined(errorResNoCode.data.status, ' => status field set');
            assert.isDefined(errorResCode.data.status, ' => status field set');

            assert.equal(errorResNoCode.data.status, 'error', ' => status set to "error" ');
            assert.equal(errorResCode.data.status, 'error', ' => status set to "error" ');

            assert.equal(errorResNoCode.status, 400, ' => http status defaults to 400 ');
            assert.equal(errorResCode.status, 499, ' => http status properly set ');

        });


        // Successes are properly formatted
        it(' -> Successes formatted properly ', function() {

            assert.equal( successResNoCode.httpHeaders['Content-type'], 'application/json', ' => content-type set to application/json ');
            assert.equal( successResCode.httpHeaders['Content-type'], 'application/json', ' => content-type set to application/json ');

            assert.isDefined(successResNoCode.data.status, ' => status field set');
            assert.isDefined(successResCode.data.status, ' => status field set');

            assert.equal(successResNoCode.data.status, 'success', ' => status set to "success" ');
            assert.equal(successResCode.data.status, 'success', ' => status set to "success" ');

            assert.equal(successResNoCode.status, 200, ' => http status defaults to 200 ');
            assert.equal(successResCode.status, 299, ' => http status properly set ');

        });


        // Reauth() requests are formatted properly
        it(' -> reauth() formatted properly ', function() {

            assert.equal( reauth.httpHeaders['Content-type'], 'application/json', ' => content-type set to application/json ');
            assert.isDefined(reauth.data.status, ' => status field set');
            assert.isDefined(reauth.data.id, ' => id field set');
            assert.isDefined(reauth.data.message, ' => message field set');
            assert.equal(reauth.data.status, 'error', ' => status set to "error" ');
            assert.equal(reauth.data.id, 5, ' => id set to 5 ');
            assert.equal(reauth.data.message, 'Reauthenticate.', ' => message set to "Reauthenticate" ');
            assert.equal(reauth.status, 401, ' => http status defaults to 400 ');

        });

    });



    describe(' ADCore.hasPermission() works properly  ', function() {

        var reqNoViewer   = null;
        var reqWithPerm   = null;
        var reqNoPerm     = null;

        var viewer_with_perm = {
            hasPermission:function() { return true }
        };

        var viewer_no_perm = {
            hasPermision:function() { return false }
        }


        var resExpectingError = null;
        var resNoError = null;

        var noNext = null;
        var yesNext = null;

        var hasPermission = null;

        // before we get started, create some mock Express objects (req, res)
        before(function(){

            var mockObjects = ADUtil.mockExpressObjects();
            reqNoViewer = $.extend({}, mockObjects.reqAuthenticated);

            reqWithPerm = $.extend({}, mockObjects.reqAuthenticated);
            reqWithPerm.session.appdev = {
                user:viewer_with_perm
            }

            reqNoPerm = $.extend({}, mockObjects.reqAuthenticated);
            reqNoPerm.session.appdev = {
                user:viewer_no_perm
            }

            resExpectingError = $.extend({}, mockObjects.resExpectingError);
            resNoError = $.extend({}, mockObjects.resNoError);

            noNext = mockObjects.noNext;
            yesNext = mockObjects.yesNext;


            hasPermission = ADCore.hasPermission;
        })

/*
        // Missing Viewers should fail
        it(' -> missing users should fail ', function() {
            hasPermission(reqNoViewer, resExpectingError, noNext, 'test');
        });


        // Calls without an action key should fail
        it(' -> missing action key should fail ', function() {
            hasPermission(reqWithPerm, resExpectingError, noNext);
        });


        // viewers with no permission should fail
        it(' -> users without permission should fail ', function() {
            hasPermission(reqNoPerm, resExpectingError, noNext, 'test');
        })

*/
        // viewers with permission should pass
        it(' -> users with permission should pass ', function() {
            hasPermission(reqWithPerm, resNoError, yesNext, 'test');
        })


    });



    describe(' ADCore.labelsForContext() works properly  ', function() {
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
