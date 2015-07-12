
// ~~~~ To alter HTML & CSS tracks to music
var analyseCss = function analyseCss(allElements, frequencyDataArray, analyserNode) {
  // always poll this function
  requestAnimationFrame(analyseCss);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyDataArray);

  var totalElements = allElements.length;

  for (var i=0; i<totalElements; i++) {
    //set light colours
    var elementColour = i*10;
    totalElements[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
    totalElements[i].style.borderColor = 'hsla('+elementColour+',  80%, 50%, 1)';
    //flash on frequency
    var freqDataKey = i*6;
    if (frequencyDataArray[freqDataKey] > 160){
      //start animation on element
      totalElements[i].style.opacity = "1";
    } else {
      totalElements[i].style.opacity = "0.2";
    }
  }
}

// ~~~ To change source of video tracks
var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}

// ~~~~ To mix two video tracks to music
var mixVideos = function mixVideos(vidEl, frequencyDataArray, analyserNode) {
  requestAnimationFrame(mixVideos);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyDataArray);

  for (var i=0; i<49; i++) {
    var freqDataKey = i*8;
    if (frequencyDataArray[freqDataKey] > 160){
      if (i<10) {
        vidEl.style.opacity = '1';
      } else {
        vidEl.style.opacity = '0';
      }
    }
  }

}

var showVideo = function showVideo(vidEl, cssEl) {
  vidEl.style.display === "block"
  cssEl.style.display === "none"
}
var showCss = function showCss(vidEl, cssEl) {
  cssEl.style.display === "block"
  vidEl.style.display === "none"
}

