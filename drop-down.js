var dropDown = angular.module("DropDown", ["ngAnimate"]);

dropDown.directive("dropDown", function(){
	return{
		scope:{
			obj:'=',
			options:'=',
			ngModel:'=',
			mod:'='
		},
		restrict:'E',
		controller: function($scope, $element){
			$scope.opt = $scope.options;
			if($scope.obj!=null){
				console.log($scope.obj)
			}	
			else
				$scope.currentSelection=$scope.options[0];
			$scope.dropped=false;
			$scope.dropdownInit = function(){
				$scope.dropped=!$scope.dropped;
				//console.log("drop");
			}
			$scope.changeSelection = function(){
				//console.log(this.$index);
				$scope.currentSelection = $scope.options[this.$index];
				$scope.ngModel=$scope.currentSelection;
				$scope.dropped=false;
			}
			$scope.$watch("options", function(){
				//console.log($scope.options);
			})
			$scope.$on("dragInit", function(){
				console.log("dsof");
				$scope.dropdownInit();
			});
		},
		link:function(scope, elem,attrs){
			//console.log(scope.options);
			//scope.currentSelection = scope.options[0];
			
		},
		template: function(elem, attrs){
			return "<div><div class='dropDownActive'><span class='dropDownCurrent'>{{currentSelection}}</span><button class='dropDownButton' ng-click='dropdownInit()'><img class='dropDrownButtonArrow' src='dropDrownButtonArrow.png'/></button></div>"+
			"<div ng-if='dropped' class='dropDownList'> <div ng-repeat='t in options' class='dropDownListItem clickable' ng-click='changeSelection()'>{{t}}</div></div></div>"
		
		}
		
	}
});