
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){



    AD.controllers.FormObjectNew = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'HrisUI/views/FormObjectNew/FormObjectNew.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.element.hide();

            this.initDOM();

            // listen for any hris.form request
            AD.comm.hub.subscribe('hris.form.**', function(key, data) {

                if (key == 'hris.form.object.new') {
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