steal(
        'appdev',
        'opstools/HrisAdminObjects/models/base/APIAttribute.js'
).then( function(){


    AD.models.APIAttribute = AD.models_base.APIAttribute.extend({
/*
         findAll: 'GET /apiattribute',
        findOne: 'GET /apiattribute/{id}',
        create:  'POST /apiattribute/create',
        update:  'PUT /apiattribute/update/{id}',
        destroy: 'DELETE /apiattribute/destroy/{id}.json',
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