angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth)
{
	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every req
	$rootScope.$on('$routeChangeStart', function()
	{
		vm.loggedIn = Auth.isLoggedIn();

		// get user info on route change
		Auth.getUser()
		.success(function(data)
		{
			vm.user = data;
		});
	});

	// function to handle login form
	vm.doLogin = function()
	{
		// call the Auth.Login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data)
		{
			// if a user login w/ success, redirect to user page
			$location.path('/users');
		});
	};

	// function to handle logging out
	vm.doLogout = function() 
	{
		Auth.logout();

		// reset all user info
		vm.user = {};
		$location.path('/login');
	};
});