
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){

    // Namespacing conventions:
    // AD.classes.[application].[Class]  --> Object
    if (typeof AD.classes.gmamatrix == 'undefined') AD.classes.gmamatrix = {};
    AD.classes.gmamatrix.GMAReport = can.Construct.extend({

        reports:function(cb) {
            var dfd = AD.sal.Deferred();
            AD.comm.service.get({ url:'/gmamatrix/reports'})
            .then(function(data){

                // return an array of GMAReport instances:
                var returnArry = [];
                for (var i=0; i<data.length; i++){
                    returnArry.push( new AD.classes.gmamatrix.GMAReport(data[i]));
                }

                //
                if (cb) cb(null, returnArry);
                dfd.resolve(returnArry);
            })
            .fail(function(err) {
                if (cb) cb(err);
                dfd.reject(err);
            });
            return dfd;
        }
    },{

        init: function( data ) {
            var self = this;
            data = AD.defaults({
                id:-1,
                name:'?noname?'
            }, data);

            for (var d in data) {
                this[d] = data[d];
            }

        },


        getID: function(){
            return this.id;
        },



        label: function() {

            return this.name;
        }


    });


});