steal(
        'appdev',
        'opstools/HrisAdminObjects/models/base/APIAttributeSet.js'
).then( function(){


    AD.models.APIAttributeSet = AD.models_base.APIAttributeSet.extend({
/*
         findAll: 'GET /apiattributeset',
        findOne: 'GET /apiattributeset/{id}',
        create:  'POST /apiattributeset/create',
        update:  'PUT /apiattributeset/update/{id}',
        destroy: 'DELETE /apiattributeset/destroy/{id}.json',
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