steal(
        // List your Page's dependencies here:
        'appdev/appdev.js'
		
		, 'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'
        , 'bootstrap/css/bootstrap.min.css'
        , 'pages/hris/hris.css'
		, 'pages/hris/hris-scratch.css'
		

).then(
        "appdev/widgets/ad_list_crud",
		"HrisUI/setup.js"
		
).then(
		'js/jquery.sidr.min.js'
		, 'styles/jquery.sidr.dark.css'
		, 'http://cdn.wijmo.com/interop/bootstrap-wijmo.css'
		, 'http://cdn.wijmo.com/jquery.wijmo-pro.all.3.20133.20.min.css'
		, 'http://cdn.wijmo.com/jquery.wijmo-open.all.3.20133.20.min.js'
		, 'http://cdn.wijmo.com/jquery.wijmo-pro.all.3.20133.20.min.js'
		, 'http://cdn.wijmo.com/interop/wijmo.data.ajax.3.20133.20.js'
		, 'http://cdn.wijmo.com/wijmo/external/knockout-2.2.0.js'
		, 'http://cdn.wijmo.com/interop/knockout.wijmo.3.20133.20.js'
		//,'js/jquery.formalize.min.js'
		//,'styles/formalize.css'
).then(function(){

    // All dependencies loaded by now
    // Create your controllers here:



    new AD.controllers.HrisUI('#hris', {});






//// This next step can be removed once we refactor Model objects
//// to communicate across socket.io instead of ajax.

    socket.get('/tests', function(response){
        console.log('from server:');
        console.log(response);
    })


});