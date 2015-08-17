require.config({
	baseUrl: '/assets/',
	paths: {
		"jquery": "/assets/jquery/jquery.min",
		'bootstrap': "/assets/bs3/js/bootstrap.min",
		'angular': '/assets/angular.min'
	},
	shim: {
		"bootstrap": {
			"deps": ["jquery"],
			"exports":"bootstrap"
		}
	}
})
require(['jquery'], function($) {
	console.log($);
	
})