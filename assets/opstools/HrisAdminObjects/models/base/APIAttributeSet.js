steal(
        'appdev'
).then( function(){


    AD.models_base.APIAttributeSet = can.Model.extend({
        findAll: 'GET /apiattributeset',
        findOne: 'GET /apiattributeset/{id}',
        create:  'POST /apiattributeset/create',
        update:  'PUT /apiattributeset/update/{id}',
        destroy: 'DELETE /apiattributeset/destroy/{id}.json',
        describe: function() {
            return {
          "type_id": "integer",
          "object_id": "integer",
          "attributeset_key": "string",
          "attributeset_pkey": "string",
          "attributeset_table": "string",
          "attributeset_relation": "string",
          "attributeset_uniqueKey": "integer",
          "attributeset_icon": "string"
};
        },
        fieldId:'id',
        fieldLabel:'attributeset_key'
    },{
        model: function() {
            return AD.models.APIAttributeSet;
        },
        getID: function() {
            return this.attr(AD.models.APIAttributeSet.fieldId) || 'unknown id field';
        },
        getLabel: function() {
            return this.attr(AD.models.APIAttributeSet.fieldLabel) || 'unknown label field';
        }
    });


});