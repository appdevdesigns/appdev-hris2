
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'HrisUI/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
//        'HrisUI/views/ObjectList/ObjectList.ejs',
function(){



    AD.controllers.GenericList = can.Control.extend({


        init: function( element, options ) {
            var self = this;
            this.options = AD.defaults({
                    dom_listarea:'.genlist-list',
                    templateDOM: 'js/GenListDOM.ejs',
                    templateItem: 'js/GenListItem.ejs'
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();



        },



        clearItemList: function() {
            this.element.find(this.options.dom_listarea).each(function(item){ item.remove(); });
        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        loadItem: function(item, listArea) {
            var self = this;

            if (!listArea) {
                listArea = this.element.find(this.options.dom_listarea);
            }

            var domFrag = can.view(this.options.templateItem, { item: item });
            listArea[0].appendChild(domFrag);

            //// now on each model displayed, listen to it's destroyed event
            // when destroyed, .remove() this domFrag.
            var bindThis = function(model, frag) {

                var delThis = function (ev, attr){
                    if (attr == 'destroyed') {
                        self.element.find('[gen-list-del-id='+model.id+']').remove();
                    }
                }
                model.bind('change',delThis);

            };
            bindThis(item, domFrag);

        },



        loadItems: function() {
            var self = this;

            var listArea = this.element.find(this.options.dom_listarea);

            this.clearItemList();

            for (var i=0; i<this.dataSource.length; i++) {
                this.loadItem(this.dataSource[i], listArea);
            }
        },



        '.genlist-item click': function($el, ev) {

            // send a message

            ev.preventDefault();
        },


    });

///// LEFT OFF:
////  Implementing GenericList.js
////  verify we can embedd a model in domFrag (loadItem()) and then access
////  the model on '.genlist-item click'
////  - add in notifications: notify_on_select
////
});