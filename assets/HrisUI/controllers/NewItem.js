
steal(
        // List your Controller's dependencies here:
        'appdev',
function(){



    AD.controllers.NewItem = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'HrisUI/views/NewItem/NewItem.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();

        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});