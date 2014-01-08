
steal(
        // List your Controller's dependencies here:
        'appdev',
        'OpsPortal/models/OpsPortalConfig.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'OpsPortal/views/Portal/Portal.ejs',
function(){



    AD.controllers.OpsPortal = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'OpsPortal/views/OpsPortal/OpsPortal.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();
            this.requestConfiguration();

        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        requestConfiguration: function() {
            var self = this;

            AD.models.OpsPortalConfig.findAll({}, function(list) {

                console.log(list);
            });



        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});