function KomAppStartGame($resource, $state){

	var startGame = function(){
		gameStart = true;
		currentPlayerNumber = 0;
		numPlayers = dominionArray.length;
		currentPlayer = dominionArray[currentPlayerNumber];

		//add a army to all players
		for(var i=0; i<dominionArray.length; i++) {
			if(dominionArray[i].citiesOwned[0]){
				console.log(i);
				dominionArray[i].recruitHero(new Hero(dominionArray[i].faction.startingHero));
				if(i === 0) {
					createArmy(dominionArray[i].citiesOwned[0].x,dominionArray[i].citiesOwned[0].y);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',10);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('archer1',4);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',3);
				} else if(dominionArray[i].race.raceName == 'Greek' && dominionArray[i].faction.factionName == 'Zeus') {
					//(10 regiments): 1 Battlecruiser, 3 Cruisers, 4(8) Destroyers, 2(8) Frigates
					createArmy(dominionArray[i].citiesOwned[0].x,dominionArray[i].citiesOwned[0].y);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',10);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('archer1',4);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',3);
				} else if(dominionArray[i].race.raceName == 'Greek' && dominionArray[i].faction.factionName == 'Hades') {
					//(10 regiments): 4 Carriercruisers, 1 Cruiser(missile), 2(4) Destroyers, 3(12) Frigates
					createArmy(dominionArray[i].citiesOwned[0].x,dominionArray[i].citiesOwned[0].y);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',10);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('archer1',5);
					dominionArray[i].armiesArray[0].addUnits('archer1',1);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',2);
				} else if(dominionArray[i].race.raceName == 'Greek' && dominionArray[i].faction.factionName == 'Poseidon') {
					createArmy(dominionArray[i].citiesOwned[0].x,dominionArray[i].citiesOwned[0].y);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('archer1',1);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',1);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',1);
				} else {
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('hoplite1',1);
					dominionArray[i].armiesArray[0].addUnits('archer1',1);
					dominionArray[i].armiesArray[0].addUnits('hippikon1',1);
				}
			} else dominionArray[i].alive = false;

			for(var j=0; j<dominionArray[i].citiesOwned.length; j++) {
				dominionArray[i].updateRecruitmentSlots(dominionArray[i].citiesOwned[j].region);
			}
		}

		//setExploredAndDiscoveredGameStart();
		startOfTurn(currentPlayer);
		setExploredAndDiscoveredAll();
	};

	return{
		'startGame':startGame
	};
}

KomAppStartGame.$inject = ['$resource', '$state'];

angular.module('KomApp').factory('KomAppStartGame', KomAppStartGame);