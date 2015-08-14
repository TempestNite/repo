// inject ngRoute for all our routing needs
// dependent module on ngRoute which links routes to SPWeb
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
// routeProvider for object define routes
// locationProvider for pretty URL
.config(function($routeProvider, $locationProvider)
{
	$routeProvider

	// route for the homepage
	.when('/',
	{
		templateUrl : 'views/pages/home.html',
		controller : 'homeController',
		controllerAs : 'home'
	})

	.when('/about',
	{
		templateUrl : 'views/pages/about.html',
		controller : 'aboutController',
		controllerAs : 'about'
	})

	.when('/contact',
	{
		templateUrl : 'views/pages/contact.html',
		controller : 'contactController',
		controllerAs : 'contact'
	});

	// set our app up to have pretty URLs
	$locationProvider.html5Mode(true);
})