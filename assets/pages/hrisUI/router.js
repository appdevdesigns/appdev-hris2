steal(
        // List your Page's dependencies here:
        'appdev/appdev.js'

        , 'http://code.jquery.com/ui/1.10.1/jquery-ui.min.js'
        , 'bootstrap/css/bootstrap.min.css'

        , 'pages/hris/hris.css'
        , 'pages/hris/hris-scratch.css'


).then(
        'js/jquery.sidr.min.js'
        , 'styles/jquery.sidr.dark.css'



        , 'http://cdn.wijmo.com/jquery.wijmo-open.all.3.20133.20.min.js'
        , 'http://cdn.wijmo.com/interop/bootstrap-wijmo.css'

).then(

        "HrisUI/setup.js",
        "http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"

).then(function(){

    // All dependencies loaded by now
    // Create your controllers here:



    // attach the HrisUI controller
    new AD.controllers.HrisUI('#portal');







//// This next step can be removed once we refactor Model objects
//// to communicate across socket.io instead of ajax.


});