'use strict';
angular.module("confusionApp", [])
 .controller('MenuController', ['$scope', function($scope){

	$scope.tab=1;
	$scope.filtText = '';
	$scope.dishes=[
		{
			name:'Ulthapizza',
			image: 'images/uthapizza.png',
			category: 'mains',
			label: 'Hot',
			price:'4.99',
			description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cergnola olives, rive vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
			comment:'' 
		},
		{
			name:'Ulthapizza2',
			image: 'images/uthapizza.png',
			category: 'appetizers',
			label: '',
			price:'4.99',
			description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cergnola olives, rive vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
			comment:'' 
		},
		{
			name:'Paella',
			image: 'images/paella.png',
			category: 'mains',
			label: '',
			price:'14.99',
			description:'Delicious dish from valencian cuisine, saffron coloured rice with vegetables and meats. Incredibly tasty and healthy. A traditional must try.',
			comment:'' 
		}
		]; 
	$scope.select=function(setTab){
		$scope.tab=setTab;
		if (setTab === 2){
			$scope.filtText='appetizers';}
		else if (setTab === 3){
					$scope.filtText='mains';}
		else if (setTab === 4){
					$scope.filtText='desserts';}
		else {$scope.filtText = '';}
	};
	$scope.isSelected=function(checkTab){
		return ($scope.tab === checkTab);
	};
}]);