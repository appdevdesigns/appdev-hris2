
steal(
        // List your Controller's dependencies here:
        'appdev',
        //'js/GenericList.js',
        //'opstools/HrisAdminObjects/models/APIObject.js',
function(){

    //if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    //if (typeof AD.controllers.opstools.HrisUserProfile == 'undefined') AD.controllers.opstools.HrisUserProfile = {};
    AD.controllers.opstools.HrisUserProfile.UserProfileList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HrisUserProfile/views/UserProfileList/UserProfileList.ejs',
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
        },
		
		'#hris-user-profile-list .genlist-item click':function($el, ev) {
			var self = this,
				myType = self.element.find($el).data('hris-attr');
			
			$('#hris-stage-user .opsportal-stage-main').hide();
			$('#' + myType).show();
			
			$('#hris-user-profile-list .genlist-item').hasClass('genlist-active') ? $('#hris-user-profile-list .genlist-item').removeClass("genlist-active genlist-active-object") : "";
			self.element.find($el).addClass("genlist-active genlist-active-object");
				
			ev.preventDefault();
		}

    });


});