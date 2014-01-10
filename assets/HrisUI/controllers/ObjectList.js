
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'HrisUI/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'HrisUI/views/ObjectList/ObjectList.ejs',
        'js/GenericList.js',
        'HrisUI/models/APIObject.js',
function(){



    AD.controllers.ObjectList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    templateDOM: 'HrisUI/views/ObjectList/ObjectList.ejs',
            }, options);


            this.initDOM();

            // pull the list of objects from the server
            var dataFound = AD.models.APIObject.findAll();
            $.when(dataFound).then(function(list) {

                // save the data and now reload our list.
                self.dataSource = list;
                self.list.data(list);

            })


        },



        addItem:function() {

            AD.comm.hub.publish('hris.form.object.new', {});

        },



        initDOM: function() {
            var self = this;

            // insert our base DOM with the Column contents: objectlist, and bottom elements
            this.element.html(can.view(this.options.templateDOM, {} ));

            // add in the GenericList to our object list div
            this.list = new AD.controllers.GenericList(this.element.find('.hris-list-object'), {
                title:'Objects',
                description: '<em>Objects</em> lets you add, delete, and configure the objects available in the HRIS system.',
//                dataSource:[],  //this.dataSource,
                templateItem:'HrisUI/views/ObjectList/item.ejs',
                notification_selected:'hris.object.selected',
                onAdd:function() { self.addItem();  }
            });

        },



        '.ad-item-add click': function($el, ev) {

            ev.preventDefault();
        },



        '#toggle-sets-attr click': function($el, ev) {
            console.log('toggle sets button clicked!');
            ev.preventDefault();
        },



        '#hris-import-data click': function($el, ev) {
            console.log('import data button clicked!');
            ev.preventDefault();
        }


    });


});