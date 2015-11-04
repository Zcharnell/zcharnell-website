function listUnit() {
	return {
		restrict:'E',
		replace:true,
		templateUrl:'templates/directives/listUnit.tpl.html',
		scope: {
			unit: '=',
			addUnit: '&'
		},
		link: function (scope, element) {
				
		}
	};
}

listUnit.$inject = [];
angular.module('KomApp').directive('listUnit', listUnit);