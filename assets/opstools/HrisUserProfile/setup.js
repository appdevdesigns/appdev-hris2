steal(
        // List your Page's dependencies here:
        '/opstools/HrisUserProfile/controllers/HrisUserProfile.js'

        //'/site/labels/HRISUserProfile'
).then(
		'opstools/HrisUserProfile/controllers/UserList.js'
        ,'/opstools/HrisUserProfile/controllers/UserProfileList.js'
        ,'/opstools/HrisUserProfile/controllers/UserSummary.js'
).then(function(){

});