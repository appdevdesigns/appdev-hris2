
steal(
        // List your Controller's dependencies here:
        'appdev',
        'opstools/GMAMatrix/controllers/ReportList.js',
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
                self.selectedReport(data.model);
            });
        },



        initDOM: function () {

            this.element.html(can.view(this.options.templateDOM, {} ));

            new AD.controllers.opstools.GMAMatrix.ReportList(this.element.find('.gmamatrix-report-reportlist'));

        },



        selectedAssignment: function(assignment) {
//            var self = this;

            this.stageInstructions.hide();
//            this.stageReport.hide();
            this.stageLoading.show();

            // a new Assignment was selected, so reset our report/strategy
            this.report = null;
            this.strategy = null;

        },



        selectedReport: function(report) {
            var self = this;

            this.stageInstructions.hide();
            this.stageReport.hide();
            this.stageLoading.show();

            this.report = report;
            this.measurements = null;
            this.placements = null;


            var measurementsLoaded = report.measurements();
            var placementsLoaded = report.placements();
            $.when(measurementsLoaded, placementsLoaded)
            .then(function(measurements, placements){

                self.measurements = measurements;
                self.placements = placements;

                if (self.strategy) {

                    // Now lets organize our Measurements
console.warn('TODO: organize our Measurements!!!');
                }
            })
            .fail(function(err){
                console.error(err);
            });

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