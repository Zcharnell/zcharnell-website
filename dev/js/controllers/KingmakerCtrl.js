function KingmakerCtrl(KomAppService) {
	//this.programs = PrefsGuiService.programs();
	//PrefsGuiService.stateChangeToLastProgram();
	this.greekUnits = KomAppService.units('greek');
	this.armyList = KomAppService.army();

	this.refreshArmy = function(){
		this.armyList = KomAppService.army();
	};

	this.removeUnit = function(unit){
		KomAppService.removeUnitFromArmy(unit);
		this.armyList = KomAppService.army();
	};

}
KingmakerCtrl.$inject = ['KomAppService'];

angular.module('KomApp').controller('KingmakerCtrl', KingmakerCtrl);