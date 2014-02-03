
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'opstools/HRISUserProfile/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'opstools/HRISUserProfile/views/Tool/Tool.ejs',
function(){


    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.HrisUserProfile == 'undefined') AD.controllers.opstools.HrisUserProfile = {};
    AD.controllers.opstools.HrisUserProfile.Tool = AD.classes.UIController.extend({


        init: function (element, options) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HRISUserProfile/views/HrisUserProfile/HrisUserProfile.ejs',
            }, options);

            // Call parent init
            AD.classes.UIController.prototype.init.apply(this, arguments);
            //this._super.apply(this, arguments);


            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();
        },



        initDOM: function () {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function ($el, ev) {

            ev.preventDefault();
        },


    });


});