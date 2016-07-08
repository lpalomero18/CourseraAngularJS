'use strict';
angular.module("confusionApp", [])
 .controller('menuController', function(){
	this.tab=1;
	this.filtText = '';
	var dishes=[
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
			description:'Delicious dish from valencian cuisine, saffron coloured rice with vegetables and meats. Incredibly tasty and healthy. A must try.',
			comment:'' 
		}
		]; 
	this.dishes=dishes;
	this.select=function(setTab){
		this.tab=setTab;
		if (setTab === 2){
			this.filtText='appetizers';}
		else if (setTab === 3){
					this.filtText='mains';}
		else if (setTab === 4){
					this.filtText='desserts';}
		else {this.filtText = '';}
	};
	this.isSelected=function(checkTab){
		return (this.tab === checkTab);
	};
});