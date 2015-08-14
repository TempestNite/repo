angular.module('authService', [])
.factory('Auth', function($http, $q, AuthToken)
{
	// create auth factory object
	var authFactory = {};

	// handle Login
	authFactory.login = function(username, password)
	{
		// return the promise object and its data
		return $http.post('/api/authenticate', {
			username: username,
			password: password
		});

		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	};

	// handle Logout
	authFactory.logout = function()
	{
		// clear the token
		AuthToken.setToken();
	};

	// check if a user logged in
	// check if there is a local token
	authFactory.isLoggedIn = function()
	{
		if (AuthToken.getToken()
			return true;
		else
			return false;
	};

	// get the logged in user
	authFactory.getUser = function()
	{
		if(AuthToken.getToken())
			return $http.get('/api/me');
		else
			return $q.reject({ message: 'User has no token.' });
	};

	// get the user info

	//return auth factory object
	return authFactory;
})

// =======================================================
// factory for handling tokens
// inject $window to store token client-side
// =======================================================
.factory ('AuthToken', function($window)
{
	var authTokenFactory = {}

	// get the token out of local storage
	authTokenFactory.getToken = function()
	{
		return $window.localStorage.getItem('token');
	};

	// function to set token or clear token
	// if a token is passed, set a token
	// if there is no token, clear it from local storage
	authTokenFactory.setToken = function(token)
	{
		if(token) 
			$window.localStorage.setItem('token', token);
		else 
			$window.localStorage.removeItem('token');
	};


	// set the token or clear the token

	return authTokenFactory;
})

// =======================================================
// application configuration to integrate token into requests
// =======================================================
.factory('AuthInterceptor', function($q, AuthToken)
{
	var interceptorFactory = {};
	// attach the token to every request
	interceptorFactory.request = function(config)
	{
		var token = AuthToken.getToken();

		// if token exists, add to header as x-access-token
		if (token)
			config.headers['x-access-token'] = token;

		return config;
	};

	// happens on response errors
	interceptorFactory.responseError = function(response)
	{
		// if our server returns a 403 forbidden response
		if (response.status == 403)
		{
			AuthToken.setToken();
			$location.path('/login');
		}

		// return the errors from the server as a promise
		return $q.reject(response);
	};

	// redirect if a token doesn't authenticate

	return interceptorFactory;
});