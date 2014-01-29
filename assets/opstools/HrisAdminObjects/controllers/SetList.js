
steal(
        // List your Controller's dependencies here:
        'appdev',
        'js/GenericList.js',
        'opstools/HrisAdminObjects/models/APIAttributeSet.js',
function(){


    if (typeof AD.controllers.opstools == 'undefined') AD.controllers.opstools = {};
    if (typeof AD.controllers.opstools.HrisAdminObjects == 'undefined') AD.controllers.opstools.HrisAdminObjects = {};
    AD.controllers.opstools.HrisAdminObjects.SetList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'opstools/HrisAdminObjects/views/SetList/SetList.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.current = {};
            this.current.object = null;

            this.initDOM();



            // AD.comm.hub.publish(this.options.notification_selected, { model: model });
            AD.comm.hub.subscribe('hris.object.selected', function(key, data) {

                var object = data.model;

                // an object was selected, so request a list of AttributeSets
                // for that object:

                var dataFound = AD.models.APIAttributeSet.findAll({object_id:object.getID()});
                $.when(dataFound).then(function(list) {

                    // save the data and now reload our list.
                    self.dataSource = list;
                    self.list.data(list);

                });
            });


            // listen for resize notifications
            AD.comm.hub.subscribe('opsportal.resize', function (key, data) {
                // this is a half height list:
                // so at most our list should take up:
                self.element.css("height", (data.height/2) + "px");
				//self.element.find('.hris-nav-list').css("height", data.height/2 + "px");
//				var mastheadHeight = self.element.find(".hris-widget-masthead").outerHeight(true);
				self.list.resize(data.height/2);

//				self.element.find(".hris-widget-inner").css("padding-top", (mastheadHeight+5) + "px");
            });

        },



        addItem:function() {

            AD.comm.hub.publish('hris.form.set.new', {});

        },



        initDOM: function() {
            var self = this;

            this.element.html(can.view(this.options.templateDOM, {} ));

         // add in the GenericList to our object list div
            this.list = new AD.controllers.GenericList(this.element.find('.hris-list-attributeset'), {
                title:'Attribute Sets',
                description: '<em>Attribute Sets</em> belong to <em>Objects</em> and contain categorized attributes belonging to an object.',
//                dataSource:[],  //this.dataSource,
                templateItem:'opstools/HrisAdminObjects/views/SetList/item.ejs',
                notification_selected:'hris.attributeset.selected',
                onAdd:function() { self.addItem();  }
            });
        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});