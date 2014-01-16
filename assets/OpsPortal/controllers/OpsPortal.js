
steal(
        // List your Controller's dependencies here:
        'appdev',
        'OpsPortal/portal-scratch.css',
        'OpsPortal/controllers/MenuList.js',
        'OpsPortal/controllers/WorkArea.js',

        'opsportal/requirements.js'
).then(
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'OpsPortal/views/Portal/Portal.ejs',
function(){


    // create our opstools namespace for our tools.
    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};

    // create our OpsPortal namespace for our controllers.
    if (typeof AD.controllers.OpsPortal == 'undefined') AD.controllers.OpsPortal = {};
    AD.controllers.OpsPortal.OpsPortal = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'OpsPortal/views/OpsPortal/OpsPortal.ejs'
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();
            this.requestConfiguration();


            // make sure we resize our display to the document/window
            var sizeContent = function () {
                self.resize();
            }
            $(document).ready(sizeContent);
            $(window).resize(sizeContent);

        },



        createTool: function( tool) {
            console.log(tool);
        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

            this.menu = new AD.controllers.OpsPortal.MenuList(this.element.find('.apd-portal-menu-widget'));
            this.workArea = new AD.controllers.OpsPortal.WorkArea(this.element.find('.apd-portal-content'));

        },



        resize: function() {

            var newHeight = $(window).height()  - this.element.find(".apd-portal-container-masthead").outerHeight(true);

            // notify of a resize action.
            AD.comm.hub.publish('opsportal.resize', { height: newHeight });
        },



        requestConfiguration: function() {
            var self = this;

            AD.comm.service.get({ url:'/opsportal/config' }, function (err, data) {

                if (err) {
                    // what to do here?
                } else {

                    // create each area
                    for (var a=0; a < data.areas.length; a++) {
                        AD.comm.hub.publish('opsportal.area.new', data.areas[a]);
                    }


                    var defaultTool = null;

                    // assign 1st tool as our default to show
                    if (data.tools[0]) defaultTool = data.tools[0];

                    // create each tool
                    for (var t=0; t < data.tools.length; t++) {
                        AD.comm.hub.publish('opsportal.tool.new', data.tools[t]);
                        if (data.tools[t].isDefault) defaultTool = data.tools[t];
                    }


                    //// all tools should be created now

                    // make sure they all have resize()ed
                    self.resize();


                    // display our default tool
                    if (defaultTool) {
                        AD.comm.hub.publish('opsportal.area.show', {area:defaultTool.area});
                        AD.comm.hub.publish('opsportal.tool.show', {tool:defaultTool.controller});
                    }
                }

            });

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },



        '.apd-portal-menu-trigger click': function($el, ev) {

            var width = this.menu.width();  //.toggle();
            AD.comm.hub.publish('opsportal.menu.toggle', { width: width });
        }


    });


});