function CombatCtrl(KomAppService, $rootScope) {

	canvas = document.getElementById("canvas1");
	ctx = canvas.getContext("2d");
	canvas.width = 940;//window.innerWidth;
	canvas.height = 600;//window.innerHeight;
	cameraWidth = canvas.width;
	cameraHeight = canvas.height;

	if(!KomAppService.canvasLoaded()){
		KomAppService.setCanvasLoaded();
		$(document).ready(function(){
			//Image Initialization
			combatButton1 = new Object();
			combatButton1.x = cameraWidth/2-320+175;
			combatButton1.y = cameraHeight/2-240+360;
			combatButton2 = new Object();
			combatButton2.x = cameraWidth/2-320+275;
			combatButton2.y = cameraHeight/2-240+360;
			combatButton3 = new Object();
			combatButton3.x = cameraWidth/2-320+375;
			combatButton3.y = cameraHeight/2-240+360;
			combatButton4 = new Object();
			combatButton4.x = cameraWidth/2-320+175;
			combatButton4.y = cameraHeight/2-240+400;
			combatButton5 = new Object();
			combatButton5.x = cameraWidth/2-320+275;
			combatButton5.y = cameraHeight/2-240+400;
			combatButton6 = new Object();
			combatButton6.x = cameraWidth/2-320+375;
			combatButton6.y = cameraHeight/2-240+400;
			combatContinueButton = new Object();
			combatContinueButton.x = cameraWidth/2-320+260;
			combatContinueButton.y = cameraHeight/2-240+445;

			//initiate races
			initiateRaces();

			//general UI
			imageCardSmall = {
				width: 36,
				height: 74
			}

			endTurnButton = {
				x: cameraWidth-60,
				y: cameraHeight-55,
				radius: 30
			}
			minimap = {
				uiX: 0,
				x: 31.5,
				y: cameraHeight-200,
				width: 200,
				height: 200,
				uiWidth: 263
			}
			minimap.wars = {
				x: minimap.x,
				y: minimap.y-70,
				radius: 32
			}

			chatbox = {
				x: 0,
				y: minimap.y-160,
				height: 150,
				width: 250
			}

			//values for region/city window
			regionWindow = {
				width: 840,
				height: 200
			};
			regionWindow.x = cameraWidth/2-regionWindow.width/2;
			regionWindow.y = cameraHeight-regionWindow.height;
			regionWindowRegionTab = {
				x: regionWindow.x+2,
				y: regionWindow.y-18,
				width: 100,
				height: 18
			};
			regionWindow.cityWindow = {
				x: regionWindow.x+229,
				y: regionWindow.y
			};
			regionWindow.cityWindow.cityName = {
				x: regionWindow.cityWindow.x+190,
				y: regionWindow.cityWindow.y+25
			}
			regionWindow.cityWindow.buildings = {
				x: regionWindow.cityWindow.x+358,
				y: regionWindow.cityWindow.y+36,
				width: 72,
				height: 72,
				margin: 10
			}
			regionWindow.cityWindow.resources = {
				x: regionWindow.cityWindow.x+270,
				y: regionWindow.cityWindow.y+73,
				margin: 15
			}
			regionWindowCityTab = {
				x: regionWindow.x+229,
				y: regionWindow.y-18,
				width: 100,
				height: 18
			};
			regionWindowCityTabMargin = 102;
			regionWindowCityTab.cityCenter = {
				x: regionWindowCityTab.x + regionWindowCityTabMargin/2
			}
			regionWindowCityTab.cityName = {
				y: regionWindow.y+18
			}
			regionWindowCityTab.cityOwner = {
				y: regionWindow.y+34
			}
			regionWindowCityTab.cityResources = {
				x: regionWindowCityTab.cityCenter.x-10,
				y1: regionWindow.y+48,
				y2: regionWindow.y+65,
				y3: regionWindow.y+82
			}
			regionWindowCityTab.cityRace = {
				x: regionWindowCityTab.cityCenter.x+24,
				y: regionWindow.y+61,
				radius: 11
			}
			regionWindowCityTab.cityPicture = {
				x: regionWindowCityTab.cityCenter.x-31,
				y: regionWindow.y+103
			}

			armyWindowUnitsTab = {
				x: regionWindow.x+389,
				y: regionWindow.y-18,
				width: 100,
				height: 18
			};
			armyWindowRecruitmentTab = {
				x: regionWindow.x+488,
				y: regionWindow.y-18,
				width: 100,
				height: 18
			};
			armyWindowUnitsWindow = {
				x: regionWindow.x+389,
				y: regionWindow.y+6,
				width: 45,
				height: 95
			}
			armyWindowRecruitmentWindow = {
				x: regionWindow.x+375,
				y: regionWindow.y,
				width: regionWindow.width-375 //minus this window's x and minus the queue window's width
			}
			armyWindowRecruitmentWindow.recruitButton = {
				width: 92,
				height: 175
			}
			armyWindowRecruitmentWindow.queue = {
				x: regionWindow.x+regionWindow.width,
				y: regionWindow.y+5,
				width: 122,
				height: 190
			}
			armyWindow = {};
			armyWindow.factionInfo= {
				x: regionWindow.x+71,
				y: regionWindow.y+23,
				imageX: regionWindow.x+30,
				imageY: regionWindow.y+30,
				imageWidth: 90,
				imageHeight: 90
			}
			armyWindow.heroInfo = {
				x: regionWindow.x+180,
				y1: regionWindow.y+50,
				y2: regionWindow.y+68,
				imageX: regionWindow.x+238,
				imageY: regionWindow.y+8,
				imageWidth: 64,
				imageHeight: 64,
			}


			recruitmentScrollbar = {
				x: regionWindow.x+389,
				xToDraw: regionWindow.x+389,
				y: regionWindow.y+177,
				xFromLeft: 0,
				widthBG: 300,
				width: 200,
				height: 20,
				maxWidth: 0,
				hover: false
			}
			armyMapIcon = {
				width: 25,
				height: 15
			}


			combatWindow = {
			}
			combatWindow.middleWindow = {
				x: cameraWidth/2-300,
				y: cameraHeight-200,
				height: 200,
				width: 600
			}
			combatWindow.middleWindow.playerNames = {
				x: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2,
				y: combatWindow.middleWindow.y+46
			}
			combatWindow.middleWindow.armyRetreatBars = {
				x: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2-100,
				xNames: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2-115,
				y1: combatWindow.middleWindow.y+62,
				y2: combatWindow.middleWindow.y+87,
				width: 200,
				height: 15
			}
			combatWindow.middleWindow.spaceAndRegion = {
				x: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2+205,
				y1: combatWindow.middleWindow.y+75,
				y2: combatWindow.middleWindow.y+90
			}
			combatWindow.middleWindow.terrain = {
				x: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2+135,
				y1: combatWindow.middleWindow.y+61,
				y2: combatWindow.middleWindow.y+62,
				width: 40
			}
			combatWindow.middleWindow.unitsLost = {
				x1: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2-60,
				x2: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2+60,
				y: combatWindow.middleWindow.y+125
			}
			combatWindow.middleWindow.unitsRemaining = {
				x1: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2-60,
				x2: combatWindow.middleWindow.x+combatWindow.middleWindow.width/2+60,
				y: combatWindow.middleWindow.y+145
			}
			combatWindow.leftWindow = {
				x: 0,
				y: cameraHeight-410,
				height: 410,
				width: 274
			}
			combatWindow.leftWindow.playerName = {
				x: 0 + combatWindow.leftWindow.width/2,
				y: combatWindow.leftWindow.y+24
			}
			combatWindow.leftWindow.flag = {
				x: combatWindow.leftWindow.x+70,
				y: combatWindow.leftWindow.y+38,
				width: 64,
				height: 64,
				xname: combatWindow.leftWindow.x+102,
				yname: combatWindow.leftWindow.y+116
			}
			combatWindow.leftWindow.hero = {
				x: combatWindow.leftWindow.x+140,
				y: combatWindow.leftWindow.y+38,
				width: 64,
				height: 64,
				xname: combatWindow.leftWindow.x+172,
				yname: combatWindow.leftWindow.y+116,
				ytype: combatWindow.leftWindow.y+130
			}
			combatWindow.leftWindow.armySize = {
				x: 173,
				y: combatWindow.leftWindow.y+60
			}
			combatWindow.leftWindow.cultureName = {
				x: 90,
				y: combatWindow.leftWindow.y+60
			}
			combatWindow.leftWindow.raceName = {
				x: 90,
				y: combatWindow.leftWindow.y+45
			}
			combatWindow.leftWindow.unitCards = {
				x: 17,
				y: combatWindow.leftWindow.y+148,
				width: 34,
				height: 74
			}
			combatWindow.rightWindow = {
				x: cameraWidth-274,
				y: cameraHeight-410,
				height: 410,
				width: 274
			}
			combatWindow.rightWindow.playerName = {
				x: combatWindow.rightWindow.x+combatWindow.rightWindow.width/2,
				y: combatWindow.rightWindow.y+24
			}
			combatWindow.rightWindow.flag = {
				x: combatWindow.rightWindow.x+70,
				y: combatWindow.rightWindow.y+38,
				width: 64,
				height: 64,
				xname: combatWindow.rightWindow.x+102,
				yname: combatWindow.rightWindow.y+116
			}
			combatWindow.rightWindow.hero = {
				x: combatWindow.rightWindow.x+140,
				y: combatWindow.rightWindow.y+38,
				width: 64,
				height: 64,
				xname: combatWindow.rightWindow.x+172,
				yname: combatWindow.rightWindow.y+116,
				ytype: combatWindow.rightWindow.y+130
			}
			combatWindow.rightWindow.armySize = {
				x: combatWindow.rightWindow.x+99,
				y: combatWindow.rightWindow.y+60
			}
			combatWindow.rightWindow.cultureName = {
				x: combatWindow.rightWindow.x+184,
				y: combatWindow.rightWindow.y+60
			}
			combatWindow.rightWindow.raceName = {
				x: combatWindow.rightWindow.x+184,
				y: combatWindow.rightWindow.y+45
			}
			combatWindow.rightWindow.unitCards = {
				x: combatWindow.rightWindow.x+17,
				y: combatWindow.rightWindow.y+148,
				width: 34,
				height: 74
			}
			combatBattlePlanButton = {
				width: 90,
				height: 60
			}
			combatResultEndButton = {
				width: 40,
				height: 40,
				radius: 20
			}
			playerDiplomacyWindow = {
				x: 0,
				width: 400,
				height: 400,
			};
			playerDiplomacyWindow.x = cameraWidth/2-playerDiplomacyWindow.width/2;
			playerDiplomacyWindow.y = cameraHeight/2-playerDiplomacyWindow.height/2;
			playerDiplomacyWindow.playerName = {
				x: playerDiplomacyWindow.x+161,
				y: playerDiplomacyWindow.y+50
			}
			playerDiplomacyWindow.playerIcon = {
				x: playerDiplomacyWindow.x+36,
				y: playerDiplomacyWindow.y+43,
				radius: 20
			}
			playerDiplomacyWindow.diplomacyArea = {
				x: playerDiplomacyWindow.x+264,
				y: playerDiplomacyWindow.y+118,
				height: 22,
				width: 120
			}
			playerDiplomacyWindow.graphicalRelations = {
				x: playerDiplomacyWindow.x+99,
				y: playerDiplomacyWindow.y+233,
				warradius: 15,
				radius: 12.5
			}
			playerDiplomacyWindow.race = {
				x: playerDiplomacyWindow.x+70,
				y: playerDiplomacyWindow.y+115
			}
			playerDiplomacyWindow.faction = {
				x: playerDiplomacyWindow.x+180,
				y: playerDiplomacyWindow.y+115
			}
			playerDiplomacyWindow.cities = {
				x: playerDiplomacyWindow.x+59,
				y: playerDiplomacyWindow.y+162
			}
			playerDiplomacyWindow.regions = {
				x: playerDiplomacyWindow.x+111,
				y: playerDiplomacyWindow.y+162
			}

			/*var json2 = new File();
			json2.src = "array.json";
			var json1 = $.getJSON("array.json");
			//console.log(json1);
			//console.log(JSON.parse(json1));
			console.log('JSON');
			//json1 = JSON.parse("file:///C:/Users/MACharnell/Dropbox/Game%20Design/TwilightImperiumGame/array.json");
			console.log(json1.cityNameList);
			var json3 = JSON.parse(json2);
			console.log(json2);
			console.log(json3);*/

			ctx.fillRect(cameraWidth-cameraWidth*0.025,0, 2, 700);
					ctx.fillRect(cameraWidth*0.025,0,2, 700);
					ctx.fillRect(0,cameraHeight-cameraHeight*0.025,1400,2);
					ctx.fillRect(0,cameraHeight*0.025,1400,2);

			startGameButton = {
				x: cameraWidth*0.04,
				y: cameraHeight-cameraHeight*0.075,
				width: 65,
				height: 20
			};

			/*turnContinueButton = {
				x: cameraWidth*0.04,
				y: cameraHeight-cameraHeight*0.075,
				width: 65,
				height: 20
			};*/

			//used to remove the normal right-click functionality over the canvas so that right click can be used for the game
			canvas.oncontextmenu = function(e){
				return false;
			}

			//Mouse & Input Initialization
			document.addEventListener('mousemove',function(e){
				mouse.x = e.clientX || e.pageX;
				mouse.y = e.clientY || e.pageY;
			}, false);

			if(mouse.x === NaN || mouse.y === NaN){
				mouseInCanvas = false;
			}
			hoverListener = true;
			$('#canvas1').hover(function(){
				console.log('MOUSE moved into CANVAS');
				mouseInCanvas = true;
			},function(){
				console.log('MOUSE moved outof CANVAS');
				mouseInCanvas = false;
			});

			canvas.onmousedown = function(e)
			{
				if(currentScreen === 0)
				{
					console.log('MOUSE'+e.button+' down');
					if(e.button === mouseLeft)
					{
						mouseleftDown=true;
						leftClickHandler();
					}
					else if(e.button === mouseRight)
					{
						rightClickHandler();
					}
				}
			}

			canvas.onmouseup = function(e)
			{
				if(currentScreen === 0)
				{
					mouseleftDown = false;
					console.log('MOUSE'+e.button + ' up');
					if(e.button === mouseLeft)
					{
						if(devMode)
						{
						    if(nodeSelected)
						    {
						    	nodeSelected = null;
						    	saveGameState();
						    }
						}
					}
				}
			}

			$('body').on('keydown',keyDownHandler);


			nullNode = new City();

			//pathfinding
			//this.parentTile = null;

			//Initialize factions
			factionPlayer1 = new Player('Troy',race_greek,faction_zeus,'255','0','0','red',false);
			dominionArray.push(factionPlayer1);
			dominionArray.push(new Player('1',race_greek,faction_hades,'255','87','127','',true));
			dominionArray.push(new Player('2',race_greek,faction_poseidon,'20','150','20','green',true));
			dominionArray.push(new Player('3',race_greek,faction_zeus,'255','255','0','yellow',true));
			dominionArray.push(new Player('4',race_greek,faction_hades,'0','255','255','teal',true));
			dominionArray.push(new Player('5',race_greek,faction_zeus,'150','25','25','red',true));
			dominionArray.push(new Player('6',race_greek,faction_poseidon,'40','40','240','blue',true));
			dominionArray.push(new Player('7',race_greek,faction_hades,'0','200','178','teal',true));
			dominionArray.push(new Player('8',race_greek,faction_zeus,'50','50','50','',true));
			dominionArray.push(new Player('9',race_greek,faction_zeus,'24','251','34','',true,''));
			dominionArray.push(new Player('10',race_greek,faction_poseidon,'0','150','255','',true,''));
			dominionArray.push(new Player('11',race_greek,faction_zeus,'170','99','171','',true,''));
			dominionArray.push(new Player('12',race_greek,faction_poseidon,'255','76','0','',true,''));
			dominionArray.push(new Player('13',race_greek,faction_zeus,'232','46','151','',true,''));
			dominionArray.push(new Player('14',race_greek,faction_zeus,'240','240','240','',true,''));
			dominionArray.push(new Player('15',race_greek,faction_hades,'14','202','36','',true,''));
			dominionArray.push(new Player('16',race_greek,faction_hades,'30','127','222','',true,''));
			dominionArray.push(new Player('17',race_greek,faction_zeus,'109','255','102','',true,''));
			dominionArray.push(new Player('18',race_greek,faction_zeus,'218','0','133','',true,''));
			dominionArray.push(new Player('19',race_greek,faction_zeus,'133','0','255','',true,''));
			dominionArray.push(new Player('20',race_greek,faction_zeus,'228','133','0','',true,''));

			/*
			dominionArray[0].playerName = 'Pegasae'; //player, zeus
			dominionArray[1].playerName = 'Odessos'; //hades
			dominionArray[2].playerName = 'Juktas'; //poseidon
			dominionArray[3].playerName = 'Nicaea'; //zeus
			dominionArray[4].playerName = 'Naxos'; //hades
			dominionArray[5].playerName = 'Kameiros'; //zeus
			dominionArray[6].playerName = 'Antioch'; //poseidon
			dominionArray[7].playerName = 'Katane'; //hades
			dominionArray[8].playerName = 'Athens'; //zeus
			dominionArray[9].playerName = 'Acanthus'; //zeus
			dominionArray[10].playerName = 'Onchesmos'; //zeus
			dominionArray[11].playerName = 'Stagirus'; //zeus
			dominionArray[12].playerName = 'Vathypetros'; //zeus
			dominionArray[13].playerName = 'Heraclea'; //zeus
			dominionArray[14].playerName = 'Laodicea'; //zeus
			dominionArray[15].playerName = 'Larissa'; //zeus
			dominionArray[16].playerName = 'Abydos'; //zeus
			*/
			//factionCreep = new Player('Creep','creep','white',true);
			//factionPirates = new Player('Pirates',race_greek,faction_deathwatch,'200','200','200',true,'');
			//dominionArray.push(factionPirates);

			for(var i=0; i<dominionArray.length; i++) {
				dominionArray[i].dominionIndex = i;
				dominionArray[i].flag.src = dominionArray[i].faction.flag;
			}

			instantiateBuildingObjectsArray();

			//factionPlayer1.enemyPlayers.push(dominionArray[1]);
			resumeGame();
      var gameUpdateInterval = setInterval(function(){
				gameUpdate();
			},33);

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			    if(fromState.name === 'combat' && toState.name != 'combat'){
			    	clearInterval(gameUpdateInterval);
			    } else if(fromState.name != 'combat' && toState.name === 'combat') {
			    	gameUpdateInterval = setInterval(function(){
							gameUpdate();
						},33);
			    }
			});
		});
	}

	function startGame(){
		console.log('start');
	}
	/*
		jQuery(function($){
      var socket = io.connect(),
        $usernameForm = $('#setUsername'),
        $usernameError = $('#usernameError'),
        $usernameBox = $('#username'),
        $messageForm = $('#send-message'),
        $messageBox = $('#message'),
        $chat = $('#chat');

      $usernameForm.submit(function(e){
        console.log('---username submit');
        e.preventDefault();
        socket.emit('new user',{username: $usernameBox.val()},function(data){
          if(data){
            $('#login-div').hide();
            $('#canvas1').show();
            $('#contentWrapper').show();
            resumeGame();
            setInterval(function(){
							gameUpdate();
						},33);
          } else {
            $usernameError.html('That username is already taken. Try again.');  
          }
        });
        $usernameBox.val('');
        $messageForm.css('top',chatbox.height-20);
        $messageForm.css('width',chatbox.width);
        $messageForm.css('height',chatbox.height);
        $chat.css('top',chatbox.y);
        $chat.css('width',chatbox.width);
        $chat.css('height',chatbox.height-25);
        $('#contentWrapper').css('top',chatbox.y);
        $('#contentWrapper').css('width',chatbox.width);
        $('#contentWrapper').css('height',chatbox.height);
        //$('#chatWrapper').height(window.innerHeight - $messageForm.height());
        //$chat.height(window.innerHeight - $messageForm.height()*2);
      });

      socket.on('usernames',function(data){
        
      });

      $messageForm.submit(function(e){
        console.log('---message submit');
        e.preventDefault();
        socket.emit('send message',$messageBox.val());
        $messageBox.val('');
      });

      socket.on('new message',function(data){
        var d = new Date();
        var time = d.getHours()%12;
        if(time == 0) time = 12;
        time += ':';
        var minutes = d.getMinutes();
        if(minutes[1]) time += '0' + minutes;
        else time += minutes;
        if(d.getHours() > 11) time += 'pm';
        else time += 'am';

        var message = '';
        if(data.user){
					var style = "'color: " + data.user.color + "'";
					message += '<span style=' + style + '<b>' + data.user.username + '</b></span>: ';
				}
        message += "<div class='message-date'>" + time + "</div>" + data.message + "<br/>";
        $chat.append(message);
        $chat.scrollTop(99999);
        //$('#chatWrapper').height(window.innerHeight - $messageForm.height());
        //$chat.height(window.innerHeight - $messageForm.height()*2);
      })
     });
*/








	/*
	var canvas = document.getElementById("canvas1");
	var ctx = canvas.getContext("2d");
	var cameraWidth = 940;
	var cameraHeight = 600;
	this.armyList = KomAppService.army();

	this.refreshArmy = function(){
		this.armyList = KomAppService.army();
	};

	this.removeUnit = function(unit){
		KomAppService.removeUnitFromArmy(unit);
		this.armyList = KomAppService.army();
	};

	var gameUpdate = function(){
		ctx.font = "12px Arial";
		ctx.fillStyle = 'black';

			//Draw background
			ctx.fillStyle = 'black';
			//ctx.fillRect(0,0,1280,600);
			ctx.fillRect(0,0,cameraWidth,cameraHeight);
			//ctx.drawImage(mapBackground,0-cameraXLeft,0-cameraYTop,mapSizeX,mapSizeY);
		*/
			/*
			if(!gameStart){
				ctx.font = '13px Arial';
				ctx.fillStyle = 'white';
				ctx.fillRect(startGameButton.x,startGameButton.y,startGameButton.width,startGameButton.height);
				ctx.fillStyle = 'black';
				ctx.fillRect(startGameButton.x+2,startGameButton.y+2,startGameButton.width-4,startGameButton.height-4);
				ctx.fillStyle = 'white';
				ctx.fillText('Start Game',startGameButton.x+3,startGameButton.y+14,60);
			}
			
			
			//
			//Combat UI
			//

			//if(armyCombat)
			//{
				drawArmyCombatWindow();
			//}
		*/
			//Tooltips
			/*
			if(tooltipHover.show && !xInRectangle(tooltipHover.hovered[0],tooltipHover.hovered[1],tooltipHover.hovered[2],tooltipHover.hovered[3])){
				tooltipHover.show = false;
				tooltipHover.objectHovered = null;
				tooltipHover.typeHovered = null;
			}
			else if(tooltipHover.show){
				drawTooltip();
			}
			*/
	//}

	/*
	setInterval(function(){
		gameUpdate();
	},33);
	*/

}
CombatCtrl.$inject = ['KomAppService', '$rootScope'];

angular.module('KomApp').controller('CombatCtrl', CombatCtrl);