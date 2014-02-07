
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){

    // Namespacing conventions:
    // AD.classes.[application].[Class]  --> Object
    if (typeof AD.classes.gmamatrix == 'undefined') AD.classes.gmamatrix = {};
    AD.classes.gmamatrix.GMAReport = can.Construct.extend({

        reports:function(nodeId, cb) {
            var dfd = AD.sal.Deferred();

            AD.comm.service.get({ url:'/gmamatrix/reports', data:{ nodeId: nodeId }})
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
                reportId:-1,
                nodeId:-1,
                nodeName:'?nodeName?',
                startDate:'yyyy-mm-dd',
                endDate:'yyyy-mm-dd'
            }, data);

            for (var d in data) {
                this[d] = data[d];
            }

            // keep track of the measurements associated with this report
            this.measurements = null;

        },


        getID: function(){
            return this.reportId;
        },



        label: function() {

            return this.nodeName;
        },


        measurements:function() {
            var self = this;
            var dfd = AD.sal.Deferred();


            if (this.measurements == null) {
                AD.classes.gmamatrix.GMAMeasurement.measurements( this.getID() )
                .then(function(measurements) {
                    self.measurements = measurements;
                    dfd.resolve(measurements);
                })
                .fail(function(err){
                    dfd.reject(err);
                });

            } else {
                dfd.resolve(this.measurements);
            }
            return dfd;
        }


    });


});