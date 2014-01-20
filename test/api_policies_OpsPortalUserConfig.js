
var path = require('path');
var $  = require('jquery');



var ADUtil = require('./helpers/util_helper.js');
sails = null;



var assert = require('chai').assert;
describe('test api/policies/OpsPortalUserConfig.js :', function () {

    var Policy = null;
    ADCore = null;

    before(function(done){
        this.timeout(15000);

        var initDone = ADUtil.testingDBInit({
            models:[],
            dataPaths:[]
        });
        $.when(initDone).then(function(data){
            sails = data;
            Policy = require(path.join(__dirname, '..', 'api', 'policies', 'OpsPortalUserConfig.js'));
            ADCore = sails.services.adcore;
            done();
        })
        .fail(function(err){
            done(err);
        })

    });



    describe(' Policy: OpsPortalUserConfig  ', function() {

        // Create a test config data
        var configOne = {

                areas:[
                    { icon:'i1', key:'k1', label:'l1', tools:[] },
                    { icon:'i2', key:'k2', label:'l2',
                        tools:[
{ controller:'k2C1', label:'C1L1', 'default': true, permissions:[ 'p1', 'p2'] },    // p1 || p2
{ controller:'k2C2', label:'C2L1', 'default': true, permissions:[ ['p2', 'p3'] ] }   // p2 && p3
                        ] },
                    { icon:'i3', key:'k3', label:'l3', tools:[
{ controller:'k3C1', label:'C1L1', 'default': true, permissions:[ ['p2', 'p3'] ] }
                        ] }
                ]
        };

        userP2 = { hasPermission: function(perm) {
            return (perm == 'p2');
        }}


        userP2P3 =  { hasPermission: function(perm) {
            return ((perm == 'p2') || (perm == 'p3'));
        }}

        var resultP2 = {};
        var resultP2P3 = {};


        var verifyAreaKeys = function (result) {
            for (var t=0; t<result.tools.length; t++ ) {
                var areaKey = result.tools[t].area;

                var found = false;
                for (var a=0; a<result.areas.length; a++) {
                    if (result.areas[a].key == areaKey) {
                        found = true;
                    }
                }
                assert.equal(found, true, ' => this tool had all area keys found');
            }
        }


        var areaNotIncluded = function (key, result) {
            var found = false;

            for (var a=0; a<result.areas.length; a++) {
                if (result.areas[a].key == key) {
                    found = true;
                }
            }
            assert.equal(found, false, ' => area did not show up');

        }



        before(function(){

            sails.config.opsportal = configOne;

            ADCore.user.current = function() {return userP2;};
            var req = {};
            var res = {};
            Policy(req, res, function(){
                resultP2 = res.appdev.opsportalconfig;
            })


            ADCore.user.current = function() {return userP2P3;};
            req = {};
            res = {};
            Policy(req, res, function(){
                resultP2P3 = res.appdev.opsportalconfig;
            })
/*
            console.log('');
            console.log('resultP2:');
            console.log(resultP2);
            console.log('');
            console.log('resultP2P3');
            console.log(resultP2P3);
*/
        });


        // areas without tools should not show up
        it(' -> areas without tools not shown ', function() {

            areaNotIncluded('k1', resultP2);
            areaNotIncluded('k1', resultP2P3);

        });


        // Areas with no approved tools not shown
        it(' -> Unmatched areas not shown ', function() {

            assert.equal( resultP2.areas.length, 1, ' => only 1 area returned ');
            assert.equal( resultP2P3.areas.length, 2, ' => both areas returned ');

        });


        // Every tool has a matching area
        it(' -> every tool has a matching area ', function() {

            verifyAreaKeys(resultP2);
            verifyAreaKeys(resultP2P3);

        });


    });

});
