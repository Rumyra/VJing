// SCREENS ~~~~~~~~~~~~~~~~~~~~~~~~~~
var mixScreens = function mixScreens() {
  // console.log('Threshold for mix: ' + threshold);
  requestAnimationFrame(mixScreens);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  for (var i=0; i<49; i++) {
    var freqDataKey = i*8;
    if (frequencyData[freqDataKey] > threshold){
      if (i<10) {
        screens[0].style.opacity = '1';
      } else {
        screens[0].style.opacity = '0';
      }
    }
  }
}


// VIDEOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}


// hideing/showing vid css
var showVideo = function showVideo(vidEl, cssEl) {
  vidEl.style.display = "block"
  cssEl.style.display = "none"
}
var showCss = function showCss(vidEl, cssEl) {
  cssEl.style.display = "block"
  vidEl.style.display = "none"
}
function stopCurrentCss() {
  var allThangs = document.querySelectorAll('.css section');
  allThangs.forEach(function(thang) {thang.style.display = 'none'});
  // window.cancelAnimationFrame(cssReqAnimId);
}


// only call request animation frame on function you actually want to run
function reqAnim() {
  requestAnimationFrame(reqAnim);

  
  switch(cssThang) {
    case 'squareLights':
      squareLights();
    break;
    case 'simpleSpectrum':
      simpleSpectrum();
    break;
    case 'barToFish':
      barToFish();
    break;
    case 'resizeSqLights':
      resizeSqLights();
    break;
    case 'expandLines':
      expandLines();
    break;
    case 'fish':
      fish();
    break;
  }
  
}

// CSS ~~~~~~~~~~~~~~~~~~~~~~~~~
function squareLights() {
  var domEl = document.getElementById('squareLights');
  domEl.style.display = 'flex';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  analyserNode.getByteFrequencyData(frequencyData);
  for (var i=0; i<totalEls; i++) {
    // set colours
    var lightColour = i*10;
    lightEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
    lightEls[i].style.borderColor = 'hsla('+lightColour+',  80%, 50%, 1)';
    // flash on frequency
    var freqDataKey = i*2;
    if (frequencyData[freqDataKey] > 140){
      // frequency played - make opache
      lightEls[i].style.opacity = "1";
    } else {
      // frequency not played - fade out
      lightEls[i].style.opacity = "0.2";
    }
  }

  return this;
}

function simpleSpectrum() {
  var domEl = document.getElementById('simpleSpectrum');
  domEl.style.display = 'block';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  // function move() {
    // cssReqAnimId = requestAnimationFrame(squareLights);
    analyserNode.getByteFrequencyData(frequencyData);
    for (var i=0; i<totalEls; i++) {
      // set colours
      var elementColour = i*10;
      lightEls[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
      lightEls[i].style.boxShadow = '0px 0px 5px 0px hsla('+elementColour+',  80%, 50%, 1)';
      // flash on frequency
      var freqDataKey = i*2;
      if (frequencyData[freqDataKey] > 50){
        // frequency played - make opache
        lightEls[i].style.height = Math.pow(frequencyData[freqDataKey]/4, 2)/10+'px';
        lightEls[i].style.opacity = "1";
      } else {
        // frequency not played - fade out
       lightEls[i].style.height = '6px'; lightEls[i].style.opacity = "0.2";
      }
    }// for
  // }
  // move();
  return this;
}

function barToFish() {
  var domEl = document.getElementById('barToFish');
  domEl.style.display = 'block';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  // set bass, mid and treb vars
  var propBass = frequencyData[5]/255;
  var propMid = frequencyData[20]/255;
  var propTreb = frequencyData[35]/255;
  document.documentElement.style.setProperty('--bassVol', propBass);
  document.documentElement.style.setProperty('--midVol', propMid);
  document.documentElement.style.setProperty('--trebleVol', propTreb);

  // function move() {
    // cssReqAnimId = requestAnimationFrame(squareLights);
    analyserNode.getByteFrequencyData(frequencyData);
    for (var i=0; i<totalEls; i++) {
      // set data
      var lightColour = i*15;
      
      // allRepeatedEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.top = Math.sin(i*propBass)+(i*15)+'px';
      lightEls[i].style.left = (Math.tan(i*propTreb)*100)+300+'px';
      // flash on frequency
      var freqDataKey = i*2;
      if (frequencyData[freqDataKey] > 100){
        // frequency played - make opache
        lightEls[i].style.opacity = "0.8";
      } else {
        // frequency not played - fade out
        lightEls[i].style.opacity = "0.2";
      }
    }// for
  // }
  // move();
  return this;
}

function resizeSqLights() {
  var domEl = document.getElementById('resizeSqLights');
  domEl.style.display = 'flex';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  // function move() {
    // cssReqAnimId = requestAnimationFrame(squareLights);
    analyserNode.getByteFrequencyData(frequencyData);
    for (var i=0; i<totalEls; i++) {
      // set colours
      var elementColour = i*15;
      lightEls[i].style.backgroundImage = 'linear-gradient(90deg, hsla('+elementColour+',80%,50%,0.2),hsla('+elementColour+',80%,50%,0.2))';
      // flash on frequency
      var freqDataKey = i*2;
      if (frequencyData[freqDataKey] > 160){
        lightEls[i].style.backgroundSize = "100% 100%";
        lightEls[i].style.backgroundImage = 'linear-gradient(90deg, hsla('+elementColour+',80%,50%,1),hsla('+elementColour+',80%,50%,1))';
      } else if (frequencyData[freqDataKey] > 120) {
        lightEls[i].style.backgroundSize = "75% 75%";
        lightEls[i].style.backgroundImage = 'linear-gradient(90deg, hsla('+elementColour+',80%,50%,0.7),hsla('+elementColour+',80%,50%,0.7))';
      } else if (frequencyData[freqDataKey] > 80) {
        lightEls[i].style.backgroundSize = "50% 50%";
        lightEls[i].style.backgroundImage = 'linear-gradient(90deg, hsla('+elementColour+',80%,50%,0.5),hsla('+elementColour+',80%,50%,0.5))';
      } else if (frequencyData[freqDataKey] > 40) {
        lightEls[i].style.backgroundSize = "25% 25%";
        lightEls[i].style.backgroundImage = 'linear-gradient(90deg, hsla('+elementColour+',80%,50%,0.2),hsla('+elementColour+',80%,50%,0.2))';
      }
    }// for
  // }
  // move();
  return this;
}

function expandLines() {
  var domEl = document.getElementById('expandLines');
  domEl.style.display = 'block';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  // set bass, mid and treb vars
  var propBass = frequencyData[5]/255;
  var propMid = frequencyData[20]/255;
  var propTreb = frequencyData[35]/255;
  document.documentElement.style.setProperty('--bassVol', propBass);
  document.documentElement.style.setProperty('--midVol', propMid);
  document.documentElement.style.setProperty('--trebleVol', propTreb);

  // function move() {
    // cssReqAnimId = requestAnimationFrame(squareLights);
    analyserNode.getByteFrequencyData(frequencyData);
    for (var i=0; i<totalEls; i++) {
      // set data
      var lightColour = i*15;
      
      // allRepeatedEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.top = Math.sin(i*propTreb*10)+(i*10)+'px';
      lightEls[i].style.left = (Math.tan(i)*150)+300+'px';
      // flash on frequency
      var freqDataKey = i*2;
      if (frequencyData[freqDataKey] > 100){
        // frequency played - make opache
        lightEls[i].style.opacity = "0.8";
        lightEls[i].style.transform = "scale(1.2)";
      } else {
        // frequency not played - fade out
        lightEls[i].style.opacity = "0.4";
        lightEls[i].style.transform = "scale(0.8)";

      }
    }// for
  // }
  // move();
  return this;
}

function fish() {
  var domEl = document.getElementById('fish');
  domEl.style.display = 'block';
  var lightEls = domEl.getElementsByTagName('i');
  var totalEls = lightEls.length;

  // set bass, mid and treb vars
  var propBass = frequencyData[5]/255;
  var propMid = frequencyData[20]/255;
  var propTreb = frequencyData[35]/255;
  document.documentElement.style.setProperty('--bassVol', propBass);
  document.documentElement.style.setProperty('--midVol', propMid);
  document.documentElement.style.setProperty('--trebleVol', propTreb);

  // function move() {
    // cssReqAnimId = requestAnimationFrame(squareLights);
    analyserNode.getByteFrequencyData(frequencyData);
    for (var i=0; i<totalEls; i++) {
      // set data
      var lightColour = i*15;
      
      // allRepeatedEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.borderLeftColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
      lightEls[i].style.top = Math.sin(i*propBass)+(i*15)+'px';
      lightEls[i].style.left = (Math.tan(i*propTreb)*100)+300+'px';
      // flash on frequency
      var freqDataKey = i*2;
      if (frequencyData[freqDataKey] > 100){
        // frequency played - make opache
        lightEls[i].style.opacity = "0.8";
      } else {
        // frequency not played - fade out
        lightEls[i].style.opacity = "0.2";
      }
    }// for
  // }
  // move();
  return this;
}




