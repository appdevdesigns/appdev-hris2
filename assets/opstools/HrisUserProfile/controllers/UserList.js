
steal(
        // List your Controller's dependencies here:
        'appdev',
        //'js/GenericList.js',
        //'opstools/HrisAdminObjects/models/APIObject.js',
function(){

    //if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    //if (typeof AD.controllers.opstools.HrisUserProfile == 'undefined') AD.controllers.opstools.HrisUserProfile = {};
    AD.controllers.opstools.HrisUserProfile.UserList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HrisUserProfile/views/UserList/UserList.ejs',
            }, options);

            this.initDOM();

            // listen for resize notifications
            AD.comm.hub.subscribe('hrisuserprofile.resize', function (key, data) {
                self.element.css("height", data.height + "px");

                // the height of our list should be the height of our portal - height of our bottom buttons
				var buttonHeight = self.element.find(".hris-widget-nav-sub").outerHeight(true);
				//self.list.resize(data.height - buttonHeight);
				self.element.find('.genlist-widget-inner').css("height", data.height+'px');

			    var mastheadHeight = self.element.find(".hris-widget-masthead").outerHeight(true);

				self.element.find('.hris-nav-list').css("height", (data.height -mastheadHeight -5 -15) + "px");

				// now we apply a padding to our widget container so that the list drops below the masthead
				self.element.find(".genlist-widget-inner")
				    .css("padding-top", (mastheadHeight+5) + "px");
            });
        },

        initDOM: function() {
            var self = this;

            // insert our base DOM with the Column contents: objectlist, and bottom elements
            this.element.html(can.view(this.options.templateDOM, {} ));
        }

    });


});