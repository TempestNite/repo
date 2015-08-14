angular.module('routerApp', ['routerRoutes', 'ngAnimate'])

// create the controllers
// this will be the controller for the ENTIRE SITE
.controller('mainController', function()
{
	var vm = this;

	// create a bigMessage var to display in view
	vm.bigMessage = 'A smooth sea never made a skilled sailor.';
})

// home page specific controller
.controller('homeController', function()
{
	var vm = this;
	vm.message = 'This is the home page!';
})

// about page controller
.controller('aboutController', function()
{
	var vm = this;

	vm.message = 'Look, an about page';
})

.controller('contactController', function()
{
	var vm = this;
	vm.message = 'Contact us. Demo.';
});