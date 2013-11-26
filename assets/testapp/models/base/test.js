steal(
        'appdev'
).then( function(){


    AD.models_base.test = can.Model.extend({
        findAll: 'GET /test',
        findOne: 'GET /test/{id}',
        create:  'POST /test/create',
        update:  'PUT /test/update/{id}',
        destroy: 'DELETE /test/destroy/{id}.json',
        describe: function() {
            return {
    "name": "string",
    "birthday": "date"
};
        },
        fieldId:'id',
        fieldLabel:'name'
    },{
        model: function() {
            return AD.models.test;
        },
        getID: function() {
            return this.attr(AD.models.test.fieldId) || 'unknown id field';
        },
        getLabel: function() {
            return this.attr(AD.models.test.fieldLabel) || 'unknown label field';
        }
    });


});