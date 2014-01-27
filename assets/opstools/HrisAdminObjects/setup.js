steal(
        // List your Page's dependencies here:
        'appdev/appdev.js'
        , 'bootstrap/css/bootstrap.min.css'
).then(
		"opstools/HrisAdminObjects/controllers/ObjectList.js",
		"opstools/HrisAdminObjects/controllers/SetList.js",
        "opstools/HrisAdminObjects/controllers/AttrList.js",
        "opstools/HrisAdminObjects/controllers/FormAttrNew.js",
        "opstools/HrisAdminObjects/controllers/FormObjectNew.js",
        "opstools/HrisAdminObjects/controllers/FormSetNew.js",
		"site/labels/HrisAdminObjects"
).then(
        "opstools/HrisAdminObjects/controllers/HrisAdminObjects.js"
).then(
		'bootstrap/js/bootstrap.min.js'
).then(function(){

});