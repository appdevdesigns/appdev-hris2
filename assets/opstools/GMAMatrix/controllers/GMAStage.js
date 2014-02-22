
steal(
        // List your Controller's dependencies here:
        'appdev',
        'opstools/GMAMatrix/controllers/ReportList.js',
        'opstools/GMAMatrix/controllers/StrategyList.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'opstools/GMAMatrix/views/GMAStage/GMAStage.ejs',
function(){

    // Namespacing conventions:
    // AD.controllers.[application].[controller]
    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.GMAMatrix == 'undefined') AD.controllers.opstools.GMAMatrix = {};
    AD.controllers.opstools.GMAMatrix.GMAStage = AD.classes.UIController.extend({


        init: function (element, options) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/GMAMatrix/views/GMAStage/GMAStage.ejs',
            }, options);

            // Call parent init
            AD.classes.UIController.apply(this, arguments);


            // keep track of the currently selected reports and
            // strategies in order to know what to display.
            this.report = null;
            this.strategy = null;


            this.locations = null;


            this.initDOM();

            this.setupComponents();

            // listen for resize notifications
            AD.comm.hub.subscribe('gmamatrix.resize', function (key, data) {
                self.element.css("height", data.height + "px");
            });


            AD.comm.hub.subscribe('gmamatrix.assignment.selected', function(key, data){
                self.selectedAssignment(data.model);
            });

            AD.comm.hub.subscribe('gmamatrix.report.selected', function(key, data){
                self.selectedReport(data.report);
            });


            AD.comm.hub.subscribe('gmamatrix.strategy.selected', function(key, data){
                self.selectedStrategy(data.strategy);
            });
        },



        initDOM: function () {

            this.element.html(can.view(this.options.templateDOM, {} ));

            this.reportList = new AD.controllers.opstools.GMAMatrix.ReportList(this.element.find('.gmamatrix-report-reportlist'));
            this.strategyList = new AD.controllers.opstools.GMAMatrix.StrategyList(this.element.find('.gmamatrix-report-strategylist'));

            this.locations = this.element.find('.gmamatrix-measurement-location');
            this.locations.droppable({disable:true});
        },



        loadMeasurements: function() {
            if (this.strategy) {


                // if our strategy exists in our measurements
                if (this.measurements[this.strategy.id]) {

                    // if there are any measurements that don't have any
                    // placements?
                    var noPlacements = this.report.measurementsWithoutPlacements(this.strategy.id);
                    if (noPlacements.length > 0) {

                        // oops ... well switch to placement mode:
                        // areas droppable
                        this.locations.enable();

                        // list noPlacements in column
                        AD.comm.hub.publish('gmamatrix.noplacements.list', {list:noPlacements});

                    } else {


                        // ok, we are ready to show em:

                    }

                } else {

                    console.error('selected strategy ['+this.strategy+'] not in our measurements');
                    console.log(this.measurements);

                }// end if

            }
        },



        selectedAssignment: function(assignment) {
//            var self = this;

            this.stageInstructions.hide();
//            this.stageReport.hide();
            this.stageLoading.show();

            // a new Assignment was selected, so reset our report/strategy
            this.report = null;
//            this.strategy = null;  // let's keep strategy and reuse

        },



        selectedReport: function(report) {
            var self = this;

            this.stageInstructions.hide();
            this.stageReport.show();
//            this.stageLoading.show();

            // store the selected report
            this.report = report;

            // we load the measurements and placement values
            var measurementsLoaded = report.measurements();
            var placementsLoaded = report.placements();
            $.when(measurementsLoaded, placementsLoaded)
            .then(function(measurements, placements){

                self.measurements = measurements;
                self.placements = placements;

                // compile the strategies for the measurements on this report
                // post a 'gmamatrix.strategies.loaded' notification
                var strategies = [];
                for (var s in measurements){
                    strategies.push(s);
                }

                AD.comm.hub.publish('gmamatrix.strategies.loaded', {strategies:strategies});


/*                // if a strategy was previously selected
                if (self.strategy) {

                   self.loadMeasurements();

                }
*/
            })
            .fail(function(err){
                console.error(err);
            });

        },



        selectedStrategy: function(strategy) {

            this.stageInstructions.hide();
            this.stageReport.show();
            this.stageLoading.hide();

            this.strategy = strategy;       // each report has a strategy

            // by this point, we should already have measurements
            // and placements loaded, so now show the Measurements
            this.loadMeasurements();

        },



        setupComponents: function() {

            this.stageLoading = this.element.find('.gmamatrix-stage-loading');
            this.stageLoading.hide();

            this.stageInstructions = this.element.find('.gmamatrix-stage-instructions');

            this.stageReport = this.element.find('.gmamatrix-stage-report');
//            this.stageReport.hide();

            // Start by displaying the datepicker for the user to choose which
            // time period the GMA reports will be selected from.
/*
            var $date = this.element.find('#reports-date');
            $date.kendoDatePicker({
                format: "yyyy-MM-dd",
                change: function(e) {
                    var widget = $date.data('kendoDatePicker');

                    // Don't allow the date to be changed again
                    widget.enable(false);
                    widget.close();

                    // Get value and convert to a Ymd string
                    var dateObj = widget.value();
                    var selectedDate = dateObj.getFullYear()
                        + String(dateObj.getMonth()+1).replace(/^(.)$/, '0$1')
                        + String(dateObj.getDate()).replace(/^(.)$/, '0$1');

                    //doFetchReportList(selectedDate);

                    AD.comm.hub.publish('gmamatrix.date.selected', { date: selectedDate });

                }
            });
*/
        }





    });


});