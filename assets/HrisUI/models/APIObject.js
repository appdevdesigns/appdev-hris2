steal(
        'appdev',
        'HrisUI/models/base/APIObject.js'
).then( function(){


    AD.models.APIObject = AD.models_base.APIObject.extend({
/*
         findAll: 'GET /apiobject',
        findOne: 'GET /apiobject/{id}',
        create:  'POST /apiobject/create',
        update:  'PUT /apiobject/update/{id}',
        destroy: 'DELETE /apiobject/destroy/{id}.json',
        describe: function() {},   // returns an object describing the Model definition
        fieldId: 'fieldName',       // which field is the ID
        fieldLabel:'fieldName'      // which field is considered the Label
*/
    },{
/*
        // Already Defined:
        model: function() {},   // returns the Model Class for an instance
        getID: function() {},   // returns the unique ID of this row
        getLabel: function() {} // returns the defined label value
*/
    });


});