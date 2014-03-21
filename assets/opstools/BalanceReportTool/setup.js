steal(
        // List your Page's dependencies here:
        '/opstools/BalanceReportTool/controllers/BalanceReportTool.js'
).then(
        '/opstools/BalanceReportTool/controllers/BalanceReportType.js'
		, '/opstools/BalanceReportTool/controllers/BalanceReportUpload.js'
		, '/opstools/BalanceReportTool/controllers/BalanceReportReview.js'
		, '/opstools/BalanceReportTool/controllers/BalanceReportSend.js'
		, '/opstools/BalanceReportTool/controllers/BalanceReportSendNational.js'
).then(
		 'js/dropzone.min.js'
		,'styles/dropzone.css'
).then(function(){

});