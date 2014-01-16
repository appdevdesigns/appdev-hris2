
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){



    if (typeof AD.controllers.OpsPortal == 'undefined') AD.controllers.OpsPortal = {};
    AD.controllers.OpsPortal.Tool = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'OpsPortal/views/Tool/Tool.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

//            this.initDOM();


            //// TODO: attach the controller here
            var controller = this.options.data.controller;

            if (AD.controllers.opstools[controller]) {
                new AD.controllers.opstools[controller].Tool( this.element);
            } else {
                console.error('controller ('+controller+') not found!');
            }
        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});