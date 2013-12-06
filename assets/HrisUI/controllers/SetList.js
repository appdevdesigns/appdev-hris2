
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'HrisUI/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'HrisUI/views/ObjectList/ObjectList.ejs',
function(){



    AD.controllers.SetList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'HrisUI/views/SetList/SetList.ejs',
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