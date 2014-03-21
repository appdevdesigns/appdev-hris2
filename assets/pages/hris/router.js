steal(
        // List your Page's dependencies here:
        'appdev/appdev.js'

//        , 'http://code.jquery.com/ui/1.10.1/jquery-ui.min.js'
        , 'js/jquery-ui.min.js'
		, 'bootstrap/css/bootstrap.min.css'

        , 'pages/hris/hris.css'
		, 'pages/hris/hris-scratch.css'
		
		, 'pages/hris/balancereport.css'
		, 'pages/hris/balancereport-scratch.css'


).then(
        'js/jquery.sidr.min.js'
        , 'styles/jquery.sidr.dark.css'

		, 'bootstrap/js/bootstrap-datepicker.js'

//        , 'http://cdn.wijmo.com/jquery.wijmo-open.all.3.20133.20.min.js'
        , 'js/jquery.wijmo-open.all.3.20133.20.min.js'

//        , 'http://cdn.wijmo.com/interop/bootstrap-wijmo.css'
        , 'styles/bootstrap-wijmo.css'


).then(

        "appdev/widgets/ad_list_crud",
        "OpsPortal/setup.js",
//        "http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
        "styles/font-awesome.css"


).then(function(){

    // All dependencies loaded by now
    // Create your controllers here:

    new AD.controllers.OpsPortal.OpsPortal('#portal');





//// This next step can be removed once we refactor Model objects
//// to communicate across socket.io instead of ajax.
/*
    socket.get('/tests', function(response){
        console.log('from server:');
        console.log(response);
    })
*/

});