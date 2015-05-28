var listToggle = angular.module("ListToggle", ["ngAnimate"]);

listToggle.directive("listToggle", function factory(){
	return{
		restrict:"E",
		scope:{
			data:"=bind"
		},
		controller: function($scope,$element, $attrs){
		var executableActions = ["Remove", "Done", "Check", "Edit"];
		//console.log($scope.data);
		
		$scope.click1 = $scope.data.options[0];
		$scope.click2 = $scope.data.options[1];
		$scope.toggle = $scope.data.toggle;
		$scope.deleteAction = function(objIndex){

			$scope.disabled = !$scope.disabled;
			$scope.reddelete = !$scope.reddelete;
			$scope.$emit('listToggleDelete', objIndex);
		}
		$scope.completeAction = function(objIndex){
			$scope.disabled = !$scope.disabled;
			$scope.greencomplete = !$scope.greencomplete;
			$scope.$emit('listToggleComplete', objIndex);
		};
		$scope.editAction = function(objIndex){
			$scope.disabled = !$scope.disabled;
			$scope.$emit('listToggleEdit', objIndex);	
		};
		
		$scope.execAction = function(optName, objIndex){

			var ind =  executableActions.indexOf(optName);

			switch(true){
				case (ind == 0):
				$scope.deleteAction(objIndex);
				break;
				case (ind >0 && ind <3):
				$scope.completeAction(objIndex);
				break;
				case (ind == 3):
				$scope.editAction(objIndex);
				break;
			}
		}
		
		$scope.doaction = function(opt){
			var objIndex = this.$parent.$index;
			if(opt == 1){
				$scope.execAction(this.click1, objIndex);
			}else{
				$scope.execAction(this.click2, objIndex);
			}
		}
		
		
		},
		template: function(elem, attrs){
			return ''+
			'<div class="tblockcontainer">'+
			'<div class="tblock">'+
			'<ul>'+ 
				'<li class="li_red" ng-class="{reddelete:reddelete,greencomplete:greencomplete}"></li>'+
				'<li class="block-m-container" ng-class="{greencomplete:greencomplete}">'+
					'<div class="block-m-back" >'+
						'<button class="optionButton" ng-click="doaction('+"'1'"+')">{{click1}}</button><button class="optionButton" ng-click="doaction('+"'2'"+')">{{click2}}</button></div>'+
						'<div class="block-m " ng-class="{disabled:disabled}"><div class="block-m-text">{{data.name}}</div><button class="toggleButton" ng-click="disabled=!disabled">Toggle</button>'+
					'</div>'+
				'</li>'+
				'<li class="li_green" ng-class="{greencomplete:greencomplete}"></li>'+
			'</ul>'+
			'</div>'+
			'</div>'
			
		}
	}
});

listToggle.directive("listToggleEditor", function factory(){
	return{
		restric: "E",
		scope:{
			data:"=bind",
			updating: "=replace"
		},
		controller: function($scope, $element, $attrs){
			$scope.updateItem = function(){
				$scope.$parent.$parent.displayEditor = false;
			}
		},
		template:function(elem, attrs){
			return '<div class="cloak"></div>'+'<div class="alertContainer" ><input class="alertInput" id="editorInput" type="text" ng-model="data.name" autofocus/><button class="alertButton" ng-click="updateItem()">Update</button></div>'
			
		}
	}
});