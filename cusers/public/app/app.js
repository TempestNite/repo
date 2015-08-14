angular.module('userApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'userService'
	]);

// ngAnimate to add animations to all directives
// app.routes for routing
// authService for webtoken handling
// mainCtrl brand new ctrl for main view
// userCtrl ctrls for all user management pages
// userService handle user CRUDs