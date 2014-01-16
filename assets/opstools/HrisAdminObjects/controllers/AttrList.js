
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'OpsPortal/controllers/OpsPortal.js',
//        'HrisUI/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'HrisUI/views/ObjectList/ObjectList.ejs',
function(){


    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.HrisAdminObjects == 'undefined') AD.controllers.opstools.HrisAdminObjects = {};
    AD.controllers.opstools.HrisAdminObjects.AttrList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HrisAdminObjects/views/AttrList/AttrList.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();


            // listen for resize notifications
            AD.comm.hub.subscribe('opsportal.resize', function (key, data) {
                self.element.css("height", (data.height/2) + "px");
            });

        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});