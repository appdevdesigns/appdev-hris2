
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){


    // Namespacing conventions:
    // AD.controllers.opstools.[Tool].Tool  --> main controller for tool
    // AD.controllers.opstools.[Tool].[controller] --> sub controllers for tool
    // AD.controllers.opstools.HrisAdminObjects.Tool = can.Control.extend({

    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.BalanceReportTool == 'undefined') AD.controllers.opstools.BalanceReportTool = {};
    AD.controllers.opstools.BalanceReportTool.Tool = AD.classes.opsportal.OpsTool.extend({

        init: function( element, options ) {
            var self = this;
            options = AD.defaults({
                    templateDOM: 'opstools/BalanceReportTool/views/BalanceReportTool/BalanceReportTool.ejs',
                    resize_notification: 'balancereporttool.resize',
                    tool:null   // the parent opsPortal Tool() object
            }, options);
            this.options = options;

            // Call parent init
            AD.classes.opsportal.OpsTool.prototype.init.apply(this, arguments);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

			// this.shouldUpdateUI = true;     // we have not updated our UI for the work area yet.

            this.initDOM();

			//new AD.controllers.opstools.BalanceReportTool.BalanceReportType(this.element.find('.tool-balance-report-type'), {});
			//new AD.controllers.opstools.BalanceReportTool.BalanceReportUpload(this.element.find('.tool-balance-report-upload'), {});
			new AD.controllers.opstools.BalanceReportTool.BalanceReportReview(this.element.find('.tool-balance-report-review'), {});
			//new AD.controllers.opstools.BalanceReportTool.BalanceReportSend(this.element.find('.tool-balance-report-send'), {});
			//new AD.controllers.opstools.BalanceReportTool.BalanceReportSendNational(this.element.find('.tool-balance-report-send-national'), {});

/*			this.element.find('.tt').tooltip(options);
			this.element.find('.tt-field').tooltip({placement: 'left'});

			this.element.find('.po-help').popover(options);
			this.element.find('.po').popover({
			    html : true,
			    title: function() {
			      return self.element.find('.po-title').html();
			    },
			    content: function() {
			      return self.element.find('.po-content').html();
			    }
			});
			
			this.element.find('.hris-form-datepicker').datepicker({}); */

        },

        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },

        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});