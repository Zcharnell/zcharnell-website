function listUnitsData(KomAppService) {
	return {
		restrict:'E',
		replace:true,
		templateUrl:'templates/directives/listUnitsData.tpl.html',
		scope: {
			value: '=',
			units: '=',
			onUnitAdd: '&'
		},
		link: function (scope, element) {

			scope.addUnit = function(unit){
				KomAppService.addUnitToArmy(unit);
			};
			
		}
	};
}

listUnitsData.$inject = ['KomAppService'];
angular.module('KomApp').directive('listUnitsData', listUnitsData);