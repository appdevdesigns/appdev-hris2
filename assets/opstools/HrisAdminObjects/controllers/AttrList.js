
steal(
        // List your Controller's dependencies here:
        'appdev',
        'js/GenericList.js',
        'opstools/HrisAdminObjects/models/APIAttribute.js',
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

            this.current = {};
            this.current.object = null;
            this.current.attributeSet = null;

            this.initDOM();


            // listen for resize notifications
            AD.comm.hub.subscribe('opsportal.resize', function (key, data) {
                self.element.css("height", (data.height/2) + "px");
				//self.element.find('.hris-nav-list').css("height", data.height/2 + "px");
            });


            // on object selections we need to clear our att
            AD.comm.hub.subscribe('hris.object.selected', function(key, data) {

                // save the selected object
                self.current.object = data.model;
                self.current.attributeSet = null;

                // self.list.button.add.hide();

                // clear my list of elements
                self.list.clear();
            });


            // AD.comm.hub.publish(this.options.notification_selected, { model: model });
            AD.comm.hub.subscribe('hris.attributeset.selected', function(key, data) {

                var set = data.model;

                self.current.attributeSet = set;

                // an object was selected, so request a list of AttributeSets
                // for that object:

                var dataFound = AD.models.APIAttribute.findAll({attributeset_id:set.getID()});
                $.when(dataFound).then(function(list) {

                    // save the data and now reload our list.
                    self.dataSource = list;
                    self.list.data(list);

                    //self.list.button.add.show();

                });
            });

        },



        addItem:function() {

            AD.comm.hub.publish('hris.form.attribute.new', {});
        },



        initDOM: function() {

            var self = this;


            this.element.html(can.view(this.options.templateDOM, {} ));
            this.list = new AD.controllers.GenericList(this.element.find('.hris-list-attribute'), {
                title:'Attributes',
                description: '<em>Attributes</em> belong to <em>Attribute Sets</em> and represent properties of an object.',
//                dataSource:[],  //this.dataSource,
                templateItem:'opstools/HrisAdminObjects/views/AttrList/item.ejs',
                notification_selected:'hris.attribute.selected',
                onAdd:function() { self.addItem();  }
            });
        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});