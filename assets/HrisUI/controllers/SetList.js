
steal(
        // List your Controller's dependencies here:
        'appdev',
        'js/GenericList.js',
        'HrisUI/models/APIAttributeSet.js',
function(){



    AD.controllers.SetList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'HrisUI/views/SetList/SetList.ejs',
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.current = {};
            this.current.object = null;

            this.initDOM();

            self.list.button.add.hide();

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

                    self.list.button.add.show();

                })
            })

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
                templateItem:'HrisUI/views/SetList/item.ejs',
                notification_selected:'hris.attributeset.selected',
                onAdd:function() { self.addItem();  }
            });
        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },


    });


});