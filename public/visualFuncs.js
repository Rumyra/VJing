var showVideo = function showVideo(vidEl, cssEl) {
  vidEl.style.display = "block"
  cssEl.style.display = "none"
}
var showCss = function showCss(vidEl, cssEl) {
  cssEl.style.display = "block"
  vidEl.style.display = "none"
}


// CSS ~~~~~~~~~~~~~~~~~~~~~~~~~

var flashLights = function flashLights() {
  requestAnimationFrame(flashLights);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  var totalElements = lightEls.length;

  for (var i=0; i<totalElements; i++) {
    //set light colours
    var elementColour = i*10;
    lightEls[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
    lightEls[i].style.borderColor = 'hsla('+elementColour+',  80%, 50%, 1)';
    //flash on frequency
    var freqDataKey = i*5;
    if (frequencyData[freqDataKey] > 140){
      //start animation on element
      lightEls[i].style.opacity = "1";
    } else {
      lightEls[i].style.opacity = "0.2";
    }
  }
}

var sizeCircles = function sizeCircles() {
  requestAnimationFrame(sizeCircles);

  analyserNode.getByteFrequencyData(frequencyData);

  var totalElements = circleEls.length;

  for (var i=0; i<totalElements; i++) {
    //set position
    var elPosLeft = Math.floor((Math.random() * 100) + 1);
    var elPosTop = Math.floor((Math.random() * 100) + 1);
    circleEls[i].style.left = elPosLeft+'%';
    circleEls[i].style.top = elPosTop+'vh';
    var elementColour = i*10;
    circleEls[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
    circleEls[i].style.borderColor = 'hsla('+elementColour+',  80%, 50%, 1)';
    //change size on freq
    var freqDataKey = i*10;
    if (frequencyData[freqDataKey] > 140){
      //start animation on element
      var circSize = frequencyData[freqDataKey]+'px';
      circleEls[i].style.width = circSize;
      circleEls[i].style.height = circSize;
    } else {
      circleEls[i].style.width = '50px';
      circleEls[i].style.height = '50px';
    }
  }
}

// var sizeCircles = function sizeCircles() {
//   requestAnimationFrame(sizeCircles);

//   analyserNode.getByteFrequencyData(frequencyData);

//   var totalElements = circleEls.length;

//   for (var i=0; i<totalElements; i++) {
//     //set position
//     var elPosLeft = Math.floor((Math.random() * 100) + 1);
//     var elPosTop = Math.floor((Math.random() * 100) + 1);
//     circleEls[i].style.left = elPosLeft+'%';
//     circleEls[i].style.top = elPosTop+'vh';
//     var elementColour = i*10;
//     circleEls[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
//     circleEls[i].style.borderColor = 'hsla('+elementColour+',  80%, 50%, 1)';
//     //change size on freq
//     var freqDataKey = i*10;
//     if (frequencyData[freqDataKey] > 140){
//       //start animation on element
//       var circSize = frequencyData[freqDataKey]+'px';
//       circleEls[i].style.width = circSize;
//       circleEls[i].style.height = circSize;
//     } else {
//       circleEls[i].style.width = '50px';
//       circleEls[i].style.height = '50px';
//     }
//   }
// }



// VIDEOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}

var mixVids = function mixVids() {
  console.log('Threshold for mix: ' + threshold);
  requestAnimationFrame(mixVids);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  for (var i=0; i<49; i++) {
    var freqDataKey = i*8;
    if (frequencyData[freqDataKey] > threshold){
      if (i<10) {
        videoElTwo.style.opacity = '1';
      } else {
        videoElTwo.style.opacity = '0';
      }
    }
  }
}
