
steal(
        // List your Controller's dependencies here:
        'appdev',

//        'ToolHrisAdminObjects/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'ToolHrisAdminObjects/views/ToolHrisAdminObjects/ToolHrisAdminObjects.ejs',
function(){


    // Namespacing conventions:
    // AD.controllers.opstools.[Tool].Tool  --> main controller for tool
    // AD.controllers.opstools.[Tool].[controller] --> sub controllers for tool
    // AD.controllers.opstools.HrisAdminObjects.Tool = can.Control.extend({

    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.HrisAdminObjects == 'undefined') AD.controllers.opstools.HrisAdminObjects = {};
    AD.controllers.opstools.HrisAdminObjects.Tool = AD.classes.opsportal.OpsTool.extend({

        init: function( element, options ) {
            var self = this;
            options = AD.defaults({
                    templateDOM: 'opstools/HrisAdminObjects/views/HrisAdminObjects/HrisAdminObjects.ejs',
                    resize_notification: 'hrisadminobjects.resize',
                    tool:null   // the parent opsPortal Tool() object
            }, options);
            this.options = options;

            // Call parent init
            AD.classes.opsportal.OpsTool.prototype.init.apply(this, arguments);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

//            this.shouldUpdateUI = true;     // we have not updated our UI for the work area yet.

            this.initDOM();

            new AD.controllers.opstools.HrisAdminObjects.ObjectList(this.element.find('.hris-object-widget'), {});
            new AD.controllers.opstools.HrisAdminObjects.SetList(this.element.find('.hris-set-widget'), {});
            new AD.controllers.opstools.HrisAdminObjects.AttrList(this.element.find('.hris-attr-widget'), {});
            new AD.controllers.opstools.HrisAdminObjects.FormObjectNew(this.element.find('.tool-hris-form-object-new'), {});
            new AD.controllers.opstools.HrisAdminObjects.FormSetNew(this.element.find('.tool-hris-form-set-new'), {});
            new AD.controllers.opstools.HrisAdminObjects.FormAttrNew(this.element.find('.tool-hris-form-attribute-new'), {});

			this.element.find('.tt').tooltip(options);
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


        },





        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },


/*
        needsUpdate: function() {
            // called by containing ops portal Tool() object when a new
            // has been issued.
            this.shouldUpdateUI = true;
        },



        resize: function( data ) {
            // called by containing ops portal Tool() object when a tool is
            // shown to the user.

            // more importantly it keeps a tool from resizing when it isn't
            // shown, which can introduce css mistakes from false height()
            // values.

            if (this.shouldUpdateUI) {
                AD.comm.hub.publish('hrisadminobjects.resize', data);
                this.shouldUpdateUI = false;
            }

        },

*/

        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});