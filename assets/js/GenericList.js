
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
                    notification_selected:null,
                    templateDOM: 'js/GenListDOM.ejs',
                    templateItem: 'js/GenListItem.ejs',
                    title: 'List',
                    description:null
            }, options);

            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();
            this.loadItems();


        },



        clearItemList: function() {
            var items = this.element.find(this.options.dom_listarea);
            items.children().each(function(index, item){
                item.remove();
                });
        },



        data:function(dataList) {
            this.dataSource = dataList;
            this.loadItems();
        },



        initDOM: function() {

            this.element.html(can.view(this.options.templateDOM, {
                title: this.options.title,
                description: this.options.description
            } ));

        },



        loadItem: function(item, listArea) {
            var self = this;

            if (!listArea) {
                listArea = this.element.find(this.options.dom_listarea);
            }

            var domFrag = can.view(this.options.templateItem, { item: item });
            listArea[0].appendChild(domFrag);

            var itemLI = listArea.find('[gen-list-del-id='+item.getID()+']');
            itemLI.data('ad-model', item);

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

            if (this.dataSource) {
                for (var i=0; i<this.dataSource.length; i++) {
                    this.loadItem(this.dataSource[i], listArea);
                }
            }
        },



        'li.genlist-item click': function($el, ev) {

            //  hris-active hris-active-object
            this.element.find('.hris-active').each(function(index, item) {
                $(item).removeClass('hris-active hris-active-object');
            })

            // add the selected class to this li
            $el.addClass('hris-active');
            $el.addClass('hris-active-object');

            // send a message
            if (this.options.notification_selected) {
                var model = $el.data('ad-model');
                AD.comm.hub.publish(this.options.notification_selected, { model: model });
            }

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