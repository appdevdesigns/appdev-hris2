steal(
        'appdev',
        'testapp/models/base/test.js'
).then( function(){


    AD.models.test = AD.models_base.test.extend({
/*
         findAll: 'GET /test',
        findOne: 'GET /test/{id}',
        create:  'POST /test/create',
        update:  'PUT /test/update/{id}',
        destroy: 'DELETE /test/destroy/{id}.json',
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