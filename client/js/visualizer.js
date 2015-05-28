var barColor = 'linear-gradient(rgb(0,0,0), rgb(200,200,200))';
		var globalFFTSize = 256;
		var vis = document.querySelectorAll('.initiator');
		var visual = null;
		var lastVisWindow;
		var lastVisWindowParentId;

		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

		var renderers = {
			'visWindow': (function() {
				var barsArr = [],
					initialized = false,
					bars,
					count,
					width;

				var height = 0;

				var init = function(config) {
					count = config.count;
					width = config.width;
					var barWidth = (width/count) >> 0;
					height = config.height;

					bars = document.getElementById('bars');
					initialized = true;
				};
				var max = 256;

				var renderFrame = function(frequencyData) {
					var freqData = '';
					var myNode = document.getElementById("bars");
					while (myNode.firstChild) {
					    myNode.removeChild(myNode.firstChild);
					}
					barsArr = [];
					var barWidth = (width/count) >> 0;
					for(var i=0; i<count; i++) {
						if(frequencyData[i] > 0) {
							var nunode = document.createElement('div');
							nunode.classList.add('bar');
							nunode.style.width = barWidth + 'px';
							nunode.style.left = ((barWidth+2) * i) + 'px';
							nunode.style.background = barColor;
							barsArr.push(nunode);
							bars.appendChild(nunode);
						}
					}
					for(var i = 0; i < barsArr.length; i++) {
						var bar = barsArr[i];
						bar.style.height = ((frequencyData[i]/max)*height + 'px');
						freqData += '[' + frequencyData[i] + '],';
					}
				};


				return {
					init: init,
					isInitialized: function() {
						return initialized;
					},
					renderFrame: renderFrame
				}
			})()
		}

		function startAudio(){
			var visWindow = vis[0];
			var id = visWindow.parentNode.id;

			if (!visual) {
				visual = new Visualization({renderer: renderers[id] });
			}
			visual.setRenderer(renderers[id]);
			if (visual.isPlaying()) {
				visual.stop();
				visWindow.style.backgroundColor = 'rgba(255,255,255,0.5)';
				document.getElementById('startstop').className = 'glyphicon glyphicon-play'
			} else {
				visual.start();
				visWindow.style.backgroundColor = 'rgba(0,0,0,0)';
				document.getElementById('startstop').className = 'glyphicon glyphicon-pause'
			}
			lastVisWindowParentId = id;
			lastVisWindow = visWindow;
		}

		function Visualization(config) {
			var audio,
				audioStream,
				analyser,
				source,
				audioCtx,
				canvasCtx,
				frequencyData,
				running = false,
				renderer = config.renderer,
				rect = document.getElementById('initiator').getBoundingClientRect(),
				width = window.innerWidth-rect.top,
				height = window.innerHeight-rect.top;

				//width = config.width || 1200,
				//height = config.height || 600;

			var init = function() {
				audio = document.getElementById('audioIn');
				audioCtx = new AudioContext();
				analyser = audioCtx.createAnalyser();
				console.log('FrequencyBinCount: ' + analyser.frequencyBinCount);
				console.log('Sample rate: ' +audioCtx.sampleRate + 'hz');
				source =  audioCtx.createMediaElementSource(audio);
				source.connect(analyser);
				analyser.connect(audioCtx.destination);
				analyser.fftSize = globalFFTSize;
				console.log('FFT size: ' + analyser.fftSize);
				frequencyData = new Uint8Array(analyser.frequencyBinCount);
				renderer.init({
					count: analyser.frequencyBinCount,
					width: width,
					height: height
				});
			};
			this.start = function() {
				audio.play();
				running = true;
				renderFrame();
				console.log('Start!');
			};
			this.stop = function() {
				running = false;
				audio.pause();
			};
			this.setRenderer = function(r) {
				if (!r.isInitialized()) {
					r.init({
						count: analyser.frequencyBinCount,
						width: width,
						height: height
					});
				} 
				renderer = r;
			};
			this.isPlaying = function() {
				return running;
			}

			var renderFrame = function() {
				analyser.getByteFrequencyData(frequencyData);
				renderer.renderFrame(frequencyData);
				if (running) {
					requestAnimationFrame(renderFrame);
				}
			};

			init();

		};

		function changeFFTSize() {
			globalFFTSize = parseInt(document.getElementById('fftSize').value);
		}

		function changeAudio(audioSrc) {
			if(visual) {
				visual.stop();
			}
			document.getElementById('audioIn').src = audioSrc;
			document.getElementById('startstop').className = 'glyphicon glyphicon-play'
		}

		function changeColor() {
			switch(document.getElementById('colorSelect').value) {
				case 'pop':
					barColor = 'linear-gradient(rgb(238,114,252), rgb(142,152,204))';
					break;
				case 'rock':
					barColor = 'linear-gradient(rgb(150,0,0), red)';
					break;
				case 'relaxing':
					barColor = 'linear-gradient(rgb(230,230,230), rgb(57,143,203))';
					break;
				case 'electronic':
					barColor = 'linear-gradient(red, blue)';
					break;
				case 'default':
					barColor = 'linear-gradient(rgb(0,0,0), rgb(200,200,200))';
					break;
			}
		}