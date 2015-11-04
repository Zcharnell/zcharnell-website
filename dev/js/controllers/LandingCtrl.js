function LandingCtrl(KomAppService) {
	//this.programs = PrefsGuiService.programs();
	//PrefsGuiService.stateChangeToLastProgram();
	console.log("Landing");
}
LandingCtrl.$inject = ['KomAppService'];

angular.module('KomApp').controller('LandingCtrl', LandingCtrl);