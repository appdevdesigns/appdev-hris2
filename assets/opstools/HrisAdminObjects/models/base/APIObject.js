steal(
        'appdev'
).then( function(){


    AD.models_base.APIObject = can.Model.extend({
        findAll: 'GET /apiobject',
        findOne: 'GET /apiobject/{id}',
        create:  'POST /apiobject/create',
        update:  'PUT /apiobject/update/{id}',
        destroy: 'DELETE /apiobject/destroy/{id}.json',
        describe: function() {
            return {
    "object_name": "string",
    "object_key": "string",
    "object_table": "string",
    "object_description": "string",
    "object_icon": "string"
};
        },
        fieldId:'id',
        fieldLabel:'object_name'
    },{
        model: function() {
            return AD.models.APIObject;
        },
        getID: function() {
            return this.attr(AD.models.APIObject.fieldId) || 'unknown id field';
        },
        getLabel: function() {
            return this.attr(AD.models.APIObject.fieldLabel) || 'unknown label field';
        }
    });


});