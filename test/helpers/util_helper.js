
var path = require('path');
var $  = require('jquery');

var SailsHelper = require('./sails_helper.js');

var sails = null;
var sailsInstances = 0;



module.exports= {

        verifyTestingEnvironment: function(sails, models, done) {

            if (typeof done == 'undefined') {
                done = models;
                models = [];
            }

            // check process.env.NODE_ENV
            if (process.env.NODE_ENV != 'test') done('not testing environment: process.env.NODE_ENV="'+process.env.NODE_ENV+'"')
//            console.log('process.env.NODE_ENV:['+process.env.NODE_ENV+']');

            // check ../config/local.js  .environment == 'development' || 'testing'
            if (sails.config.environment == 'production') done('not testing environment: sails.config.environment="'+sails.config.environment+'"');

            // foreach model provided,
            for (var m=0; m<models.length; m++) {
                if (models[m].adapter.config.database.indexOf('live_') != -1) {
                    return(done('model ['+models[m].identity+'] tied to a live database:'+models[m].adapter.config.database))
                }
            }
            // check to make sure their database != 'live_*'

            // if we get here, then I think all the checks pass.
            done();
        },

        sails: function(cb) {
            var dfd = $.Deferred();

            if (sails) {
                sailsInstances++;
                if (cb)  cb(null, sails);
                dfd.resolve(sails);
            } else {
                SailsHelper.build(function(err, _sails){
                    if (err || !_sails) {
                        if (cb) cb(err||'sails could not be created!');
                        dfd.reject(err || 'sails could not be created');
                    } else {
                        sails = _sails;
                        sailsInstances++;
                        if (cb) cb(null, sails);
                        dfd.resolve(sails);
                    }

                })
            }

            return dfd;
        },


        dbSetup: function(tableData, done) {
            var dfd = $.Deferred();



            var countTables = 0;
            var countDone = 0;


            var processTables = function(tables) {



                for (var t in tables) {

                    countTables++;

                    var name = t;
                    var model = tables[t].model;
                    var fields = tables[t].fields;
                    var values = '(' + tables[t].values.join('), (') + ')';
                    var then = tables[t].then || null;
                    var disableKeys = tables[t].disableKeys || false;
                    var commandsPre = tables[t].preCommands || null;

                    var queryIt = function( name, model, fields, values, then, keyCheckOff, preCommands) {

                        // disable foreign key checking if requested
                        var done = disableForeignKeys(keyCheckOff, model);
                        var doneCommands = doPreCommands(preCommands, model);
                        $.when(done, doneCommands).then(function(){

//console.log(name+'.destroy()!');
                            // delete all entries of a table
                            model.destroy()
                                .then(function(results){

                                    // now insert the expected values into the table
                                    // model.query('sql query', [optional data], callback);
                                    model.query('insert into '+name+' (' + fields +') VALUES '+values, [], function(err) {

                                        // make sure foreign key checks are re-enabled
                                        var keyReset = enableForeignKeys(keyCheckOff, model);
                                        $.when(keyReset).then(function(){


                                            if(err) {

                                                dfd.reject(err);

                                            } else {

                                                countDone++;

                                                // if there are dependent tables process them now:
                                                if (then) {

                                                    processTables(then);

                                                } else {

                                                    // wait until all are done before resolving()
                                                    if (countDone >= countTables)  dfd.resolve();

                                                }
                                            }

                                        })

                                    }); // end model.query()


                                }) // end model.destroy().then()
                                .fail(function(err){
                                    dfd.reject(err);
                                })



                        });  // end


    /*
                        .query('delete from '+name, null, {logging: function(){}, raw:true})
                            .success(function() {
                                sequelize.query('insert into '+name+' (' + fields +') VALUES '+values, null, {logging:false})
                                    .success(function(){
                                        countDone++;
                                        if (countDone >= countTables)  done();
                                    })
                                    .error(function(err) {
                                        console.log(err);
                                        countDone++;
                                        if (countDone >= countTables)  done();
                                    })

                            })
                            .error(function(err){
                                console.log(err);
                                countDone++;
                                if (countDone >= countTables)  done();
                            });
    */
                        }
                    queryIt(name, model,  fields, values, then, disableKeys, commandsPre);

                }  // end for tables

            } // end processTables

            processTables(tableData);

            return dfd;
        } // end dbSetup()
}



var disableForeignKeys = function(checkingOff, model) {
    var dfd = $.Deferred();

    if (checkingOff) {
console.log('turning foreign key checking off.');
        model.query('SET FOREIGN_KEY_CHECKS=0;', function(err,results){
            if (err) {
                dfd.reject(err);
            } else {
console.log('back now');
                dfd.resolve();
            }
        });
    } else {
        dfd.resolve();
    }
    return dfd;
}


var enableForeignKeys = function(checkingOff, model) {
    var dfd = $.Deferred();

    if (checkingOff) {
console.log('re-enabling foreign key checks.');
        model.query('SET FOREIGN_KEY_CHECKS=1;', function(err,results){
            if (err) {
                dfd.reject(err);
            } else {
                dfd.resolve();
            }
        });
    } else {
        dfd.resolve();
    }
    return dfd;
}



var doPreCommands = function(commands, model) {
    var dfd = $.Deferred();

    if (commands) {

        var countDone=0;

        for (var i=0; i<commands.length; i++){
console.log('running command:'+commands[i]);
            model.query(commands[i], function(err, data){
                countDone++;
                if (err) {
                    dfd.reject(err);
                } else {
                    if (countDone >= commands.length) {
                        dfd.resolve();
                    }
                }
            })
        }

    } else {
        dfd.resolve();
    }

    return dfd;
}