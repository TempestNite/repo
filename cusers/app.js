angular.module('firstApp', [])

.controller('mainController', function()
{
	// bind this to vm (view-model)
	var vm = this;

	//define variables and objects on this
	// this lets them be available to our views

	//define a basic variable
	vm.message = 'Hey there';
	vm.computers = 
	[
		{ name: 'MBP', color: 'Silver', nerdness: 7 },
		{ name: 'yoga pro', color: 'gray', nerdness: 6 },
		{ name: 'chromebook', color: 'black', nerdness: 5}
	];
});