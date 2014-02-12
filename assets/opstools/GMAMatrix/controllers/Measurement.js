
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'opstools/GMAMatrix/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'opstools/GMAMatrix/views/Measurement/Measurement.ejs',
function(){

    // Namespacing conventions:
    // AD.controllers.[application].[controller]
    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.GMAMatrix == 'undefined') AD.controllers.opstools.GMAMatrix = {};
    AD.controllers.opstools.GMAMatrix.Measurement = AD.classes.UIController.extend({


        init: function (element, options) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/GMAMatrix/views/Measurement/Measurement.ejs',
            }, options);

            // Call parent init
            this._super.apply(this, arguments);


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