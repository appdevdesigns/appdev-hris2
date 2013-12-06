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