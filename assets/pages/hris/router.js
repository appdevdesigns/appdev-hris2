steal(
        // List your Page's dependencies here:
        'appdev/appdev.js'
        , 'bootstrap/css/bootstrap.min.css'
        , 'pages/hris/hris.css'
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