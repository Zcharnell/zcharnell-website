function KomAppService($resource, $state, KomAppStartGame){
	var data;
	var id;
	var canvasLoaded = false;
	var programs = {};
	var variables = {};
	var defaultProgramState = '';
	var lastProgram = '';
	var lastContact = '';
	var alerts = {};
	var armyList = {
		infantry:[],
		ranged:[],
		cavalry:[],
		goldCost: {
			infantry:0,
			ranged:0,
			cavalry:0,
			total:0,
			maxCost:1000
		}
	};

	playerGlobalArmyList = armyList;

	//var rest = $resource('/ui/api/profile/v3/accounts/lookup/:id.json', null, {
	var rest = $resource('/json/units.json', null, {
		'query':{method:'get', isArray:false},
		'update':{method:'PUT'}
	});

	var loadData = function(){
		if(id) data = rest.query({id:id}).$promise.then(dataLoaded);
	};

	var getData = function(_id){
		id = 'komapp';
		if(!data) loadData();
		return data;
	};

	var dataLoaded = function(result){
		data = result;

		//setupPrograms();
		//setupVariables();
		//PrefsGuiContacts.setupContacts(data);
		//PrefsGuiErrors.setupErrors(data);
		//setupAlerts();
		//setupDefaultStates();
	};

	var addUnitToArmy = function(unit){
		unit = angular.copy(unit);
		armyList[unit.unitClass].push(unit);
		updateArmyGold(unit.unitClass);
	};

	var removeUnitFromArmy = function(unit){
		var index = armyList[unit.unitClass].indexOf(unit);
		armyList[unit.unitClass].splice(unit,1);
		updateArmyGold(unit.unitClass);
	}

	var updateArmyGold = function(unitClass){
		if(unitClass){
			armyList.goldCost[unitClass] = 0;
			for(var i in armyList[unitClass]){
				armyList.goldCost[unitClass] += armyList[unitClass][i].goldCost;
			}
		} else {
			armyList.goldCost.infantry = 0;
			armyList.goldCost.ranged = 0;
			armyList.goldCost.cavalry = 0;

			for(var i in armyList.infantry){
				armyList.goldCost.infantry += armyList.infantry[i].goldCost;
			}
			for(var i in armyList.ranged){
				armyList.goldCost.ranged += armyList.ranged[i].goldCost;
			}
			for(var i in armyList.cavalry){
				armyList.goldCost.cavalry += armyList.cavalry[i].goldCost;
			}
		}

		armyList.goldCost.total = armyList.goldCost.infantry + armyList.goldCost.ranged + armyList.goldCost.cavalry;
		
	};

	var getArmy = function(){
		return armyList;
	};

	var getUnits = function(race){
		return data[race + '_units'];
	};

	var getCanvasLoaded = function(){
		return canvasLoaded;
	};

	var setCanvasLoaded = function(){
		canvasLoaded = true;
	};

	return{
		'getData':getData,
		'units':getUnits,
		'addUnitToArmy':addUnitToArmy,
		'army':getArmy,
		'removeUnitFromArmy':removeUnitFromArmy,
		'canvasLoaded':getCanvasLoaded,
		'setCanvasLoaded':setCanvasLoaded
	};
}

KomAppService.$inject = ['$resource', '$state', 'KomAppStartGame'];

angular.module('KomApp').factory('KomAppService', KomAppService);