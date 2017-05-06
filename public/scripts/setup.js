const jsConfCols = {
  blue: {hue: 234, sat: 96, light: 44},
  dPink: {hue: 328, sat: 100, light: 44},
  lPink: {hue: 325, sat: 55, light: 76},
  denim: {hue: 222, sat: 41, light: 50}
};

const blackEl = document.getElementById('black'),
  whiteEl = document.getElementById('white'),
  screens = document.getElementsByClassName('screen'),
  vidScreens = document.getElementsByClassName('video'),
  domScreens = document.getElementsByClassName('dom'),
  videoEls = document.getElementsByTagName('video'),
  svgEls = document.getElementsByTagName('svg'),
  screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2
  };


var set = sets[0],
  screenNo = 1,
  threshold = 0;

const easing = BezierEasing(0.01, 0.8, 0.8, 0.01);
const audioApi = new window.AudioContext;

// variables
var audioBuffer,
    analyserNode,
    frequencyData = new Uint8Array(4096);

analyserNode = audioApi.createAnalyser();
analyserNode.fftSize = 8192;

function adjustFreqData(shapeNo) {
  analyserNode.getByteFrequencyData(frequencyData);
  var removed = frequencyData.slice(0,1024);
  
  var newFreqs = [], prevRangeStart = 0, prevItemCount = 0;

  // set up the maxPow & thus ratio based on shapeCount
  var maxPow = Math.pow(2,shapeNo/2);
  var ratio = 1024/maxPow;
  
  // looping - get values for new array based on shapeCount
  for (let j=1; j<shapeNo+1; j++) {
    var itemCount, rangeStart;

    var pow = j/2;

    // use ratio to get itemCount (round)
    itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

    rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
     // get new values
    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += frequencyData[k];
      newValue = parseInt(total/itemCount);
    }
    // add to new array
    newFreqs.push(newValue);

    prevItemCount = itemCount;
    prevRangeStart = rangeStart;
  }
  
  return newFreqs;
}

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  audioSource.connect(analyserNode);
}

document.addEventListener('keyup', (event) => {
  if ( (event.key === '1') || (event.key === '0') ) {
    screenNo = parseInt(event.key);
    console.log("screen: "+screenNo);
  }
}, false);

var screenDomFunc = [diagonalCircles, dots];

// getUserMedia success callback -> pipe audio stream into audio API
function gotStream(stream) {
    // Create an audio input from the stream.
    console.log('got stream');
    var audioSource = audioApi.createMediaStreamSource(stream);
    createAnalyserNode(audioSource);
    reqAnim();
    // mixScreens();
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);

// ----------------MIDI SHIZZLE
var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }


}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}