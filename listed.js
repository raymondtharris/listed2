var listed = angular.module("listed",["ListToggle","DropDown", "ngRoute"]);

listed.config(function($routeProvider){
	$routeProvider.when("/list",{
		templateUrl:"list.html",
		controller:"listController"
	}).otherwise({redirectTo:"/list"});
});

listed.filter("listSearchFilter", function(){
	return function( ){
		return;
	}
});

listed.directive("draggable", function(){
	return{
		restrict:"A",
		link: function(scope, element, attributes){
			element.attr("draggable", true);
			element.bind("dragstart", function(evt){
				console.log("dragstart");
				//evt.originalEvent.dataTransfer.setData("text", element);
				scope.$emit("dragInit", evt);
				scope.$broadcast("dragInit", evt);
				scope.$$childHead.dropped = true;
				
			});
		}
	}
});
listed.directive("droppable", function(){
	return{
		restrict:"A",
		link: function(scope, element, attributes, ctlr){
			element.bind("dragover", function(evt){
				//console.log("over");
//				//scope.$$childHead.dropdownInit();
				evt.preventDefault();
				//scope.$$childHead.dropped=true;
			});
			element.bind("drop", function(evt){
				//console.log(scope);
				//scope.$$childHead.dropped=true;
				evt.preventDefault();
			});
		}
	}
});


listed.controller("listedController", function($scope,$timeout,$rootScope){
	$scope.listed = [];
	$scope.lists = ["All","Project 1","Project 2" ,"Deleted"];
	$scope.addControlsButtonOptions = [{"image":"ListedButtonSearch.png","state":"Search"},{"image":"ListedButtonAdd.png","state":"Add"},{"image":"ListedButtonDuplicate.png","state":"Duplicate"}];
	$scope.addControlsButtonOptionsCurrent = $scope.addControlsButtonOptions[0].image;
	$scope.adminNav = false;
	$scope.addFilterTextfield = "";
	$scope.addControlsButtonState = $scope.addControlsButtonOptions[0].state;
	$scope.submitToListed = function(){
		if($scope.addControlsButtonState == "Add"){
		var newItem = {"name": $scope.addFilterTextfield,"options":["Remove","Done"], "toggle":"yes"};
		$scope.$broadcast("addList", newItem);
		}else{
			
		}
		 $scope.addFilterTextfield = "";
	}
	
	$scope.$on("addControlsButtonState", function(evt, stateOption){
		if(stateOption == "Add"){
			$scope.addControlsButtonOptionsCurrent = $scope.addControlsButtonOptions[1].image;
			$scope.addControlsButtonState = $scope.addControlsButtonOptions[1].state;
		}
		else if(stateOption =="Search"){
			$scope.addControlsButtonOptionsCurrent = $scope.addControlsButtonOptions[0].image;
			$scope.addControlsButtonState = $scope.addControlsButtonOptions[0].state;
		}
	});
	
	$scope.$watch("addFilterTextfield", function(evt){
		if(evt.length>2){
			$scope.$broadcast("filterLists", evt);
		}
		else{
			$scope.$broadcast("filterLists", "");
		}
	});
});

listed.controller("listController", function($scope,$timeout, $filter){
	$scope.listed=[];
	$scope.filtered = $scope.listed;
	$scope.$on("addList", function(evt, newItem){
		$scope.listed.push(newItem);
	});
	
	/** list-toggle protocol **/
	$scope.$on('listToggleDelete', function(evt, objIndex){
		$timeout(function(){
			$scope.filtered.splice(objIndex,1);
		}, 3000);
		
	});
	$scope.$on('listToggleComplete', function(evt, objIndex){
		$timeout(function(){
			$scope.filtered.splice(objIndex,1);
		}, 3000);
	});
	$scope.$on('listToggleEdit', function(evt, objIndex){
		$timeout(function(){
			//present list-toggle Edit view
			$scope.editingElement = $scope.listed[objIndex];
			$scope.displayEditor = !$scope.displayEditor;
		}, 1000);
	});
	
	$scope.$on("filterLists", function(evt, filterModifier){
		$scope.filtered = $filter('filter')($scope.listed, filterModifier);
		if($scope.filtered.length == 0){
			$scope.$emit("addControlsButtonState", "Add");
		}else{
			$scope.$emit("addControlsButtonState", "Search");
		}
		
	});
	
});
