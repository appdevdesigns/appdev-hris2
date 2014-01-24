
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){



    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.HrisAdminObjects == 'undefined') AD.controllers.opstools.HrisAdminObjects = {};
    AD.controllers.opstools.HrisAdminObjects.FormSetNew = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HrisAdminObjects/views/FormSetNew/FormSetNew.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.element.hide();

            this.initDOM();

			// listen for resize notifications
            AD.comm.hub.subscribe('opsportal.resize', function (key, data) {

				self.element.find(".hris-stage-container").css("height", data.height + "px");
				
            });

            // listen for any hris.form request
            AD.comm.hub.subscribe('hris.form.**', function(key, data) {

                if (key == 'hris.form.set.new') {
                    self.element.show();
                } else {
                    self.element.hide();
                }
            })

        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});