// SCREENS ~~~~~~~~~~~~~~~~~~~~~~~~~~
var mixScreens = function mixScreens() {
  // console.log('Threshold for mix: ' + threshold);
  requestAnimationFrame(mixScreens);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  for (var i=0; i<16; i++) {
    var freqDataKey = i;
    if (frequencyData[freqDataKey] > threshold){
      if (i<8) {
        rightScreen.style.opacity = '1';
      } else {
        rightScreen.style.opacity = '0';
      }
    }
  }
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
function stopCurrentCss(side) {
  var allThangs = '';
  if (side === 'left') {
    allThangs = document.querySelectorAll('#screen-left .css section');
  } else {
    allThangs = document.querySelectorAll('#screen-right .css section');
  }
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
    case 'superChart':
      superChart();
    break;
    case 'superSquares':
      superSquares();
    break;
    case 'superSunburst':
      superSunburst();
    break;
    case 'superSpiral':
      superSpiral();
    break;
    case 'superCentric':
      superCentric();
    break;
    case 'diagCirc':
      diagCirc();
    break;
    case 'superSpotsOne':
      superSpotsOne();
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
      var freqDataKey = i;
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


function superChart() {
  var domEl = document.getElementById('superChart');
  domEl.style.display = 'block';

  var superSvg = d3.select('#superChart svg');
  var superCircle = superSvg.selectAll('circle'),
    superLine = superSvg.selectAll('line'),
    superRadius = window.innerHeight/2.5-50;

  analyserNode.getByteFrequencyData(frequencyData);
  superCircle = superCircle.data(frequencyData);
  
  superCircle
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round(window.innerHeight/2 + (superRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("cx", function(d, i) {
      return Math.round(window.innerWidth/2 + (superRadius*Math.cos((2*i*Math.PI)/16)) );
    });
  
  superCircle
    .attr("r", function(d) { return d/2; })
    .attr("fill", "hsla(200,50%,80%,0.7)")
    .exit().remove();

  superLine = superLine.data(frequencyData);

  superLine
    .enter().append('line')
    .attr("x1", function(d, i) {
      return Math.round(window.innerWidth/2 + (superRadius*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y1", function(d, i) {
      return Math.round(window.innerHeight/2 + (superRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("stroke-width","3")
    .attr("stroke","hsla(320,60%,50%,0.9)");
  superLine
    .attr("x2",function(d, i) {
      return Math.round(window.innerWidth/2 + ( (superRadius-d)*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y2",function(d, i) {
      return Math.round(window.innerHeight/2 + ( (superRadius-d)*Math.sin((2*i*Math.PI)/16)) );
    })
    .exit().remove();
  return this;

}

function translate(i) {
  return "translate("+(i%16)*z+","+Math.round(Math.floor(i/16))*z+")";
}
var z = Math.round(Math.floor(window.innerHeight/16));

function superSquares() {
  var domEl = document.getElementById('superSquares');
  domEl.style.display = 'block';
  var svg = d3.select('#superSquares svg');
  var rects = svg.selectAll('rect');

  analyserNode.getByteFrequencyData(frequencyData);

  rects = rects.data(frequencyData);
  
  rects
    .enter().append('rect')
    .attr("transform", function(d, i) {return "translateY("+(i*z)+")";})
    .attr("width", "100vw")
    .attr("height", z);

  rects
    .style("fill", function(d,i) { 
      return "hsla("+(i%15)*24+",50%,"+Math.round(d/5+10)+"%,1)";
    })
    .exit().remove();
  return this;

}

function superSunburst() {
  var domEl = document.getElementById('superSunburst');
  domEl.style.display = 'block';

  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select("#superSunburst svg")
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
  var g = d3.select("g");
  var arcs = g.selectAll("path");

  var arc = d3.svg.arc()
      .startAngle(function(d, i) { return (i/8)*Math.PI; })
      .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
      .innerRadius(function(d, i) { return 0; })
      .outerRadius(function(d, i) { return (i*15)+(d); });

  analyserNode.getByteFrequencyData(frequencyData);

  arcs = arcs.data(frequencyData);

  arcs
    .enter().append("path")
    .style("stroke", "#222");

  arcs
    .attr("d", arc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
    .exit().remove();

}

function superSpiral() {
  var domEl = document.getElementById('superSpiral');
  domEl.style.display = 'block';

  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select("#superSpiral svg")
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
  var g = d3.select("g");
  var arcs = g.selectAll("path");

  var arc = d3.svg.arc()
      .startAngle(function(d, i) { return (i/8)*Math.PI; })
      .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
      .innerRadius(function(d, i) { return radius/3; })
      .outerRadius(function(d, i) { return d*2; });

  analyserNode.getByteFrequencyData(frequencyData);

  arcs = arcs.data(frequencyData);

  arcs
    .enter().append("path")
    .style("stroke", "#fff");
    

  arcs
    .attr("d", arc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
    .exit().remove();
}

function superCentric() {
  var domEl = document.getElementById('superSpiral');
  domEl.style.display = 'block';
  var PI = Math.Pi,
  arcMin = 75,
  arcWidth = 15,
  arcPad = 1;

// center all the things
var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

var svg = d3.select("#superCentric svg")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
var g = d3.select("g");
var arcs = g.selectAll("path");

var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) {return d/40;})
    .innerRadius(function(d,i) {return i*30;})
    .outerRadius(function(d,i) {return (i+1)*30});

  analyserNode.getByteFrequencyData(frequencyData);

  arcs = arcs.data(frequencyData);

  arcs
    .enter().append("path")
    .style("stroke", "#fff");

  arcs
    .attr("d", arc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/1.5)+'%,'+d/255+')'; })
    .exit().remove();


}

function diagCirc() {
  var domEl = document.getElementById('diagCircle');
  domEl.style.display = 'block';
  var svg = d3.select('#diagCircle svg');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;

  analyserNode.getByteFrequencyData(frequencyData);

  circle = circle.data(frequencyData);
  
  circle
    .enter().append('circle')
    .attr("cy", function(d, i) {
      // return Math.round( (window.innerHeight/2) + (i*Math.random) );
      return 50*i;
    })
    .attr("cx", function(d, i) {
      // return Math.round( (window.innerWidth/2) + (i*Math.random) );
      return 90*i;
    });
  
  circle
    .attr("r", function(d, i) { return (d/2)*i/2; })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.5)"} )
    .exit().remove();
}

function superSpotsOne() {
  var domEl = document.getElementById('superSpotsOne');
  domEl.style.display = 'block';
  var svg = d3.select('#superSpotsOne svg');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;

  analyserNode.getByteFrequencyData(frequencyData);

  circle = circle.data(frequencyData);
  
  circle
    .enter().append('circle')
    .attr("cy", function(d, i) {
      // return Math.round( () + (i*Math.random) );
      return Math.round(window.innerHeight*Math.random());
    })
    .attr("cx", function(d, i) {
      // return Math.round( () + (i*Math.random) );
      return Math.round(window.innerWidth*Math.random());
    });
  
  circle
    .attr("r", function(d, i) { return (d/2); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,60%,0.7)"} )
    .attr("stroke","white")
    .exit().remove();

  return this;

}

// VIDEOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}

var mixVids = function mixVids() {
  // console.log('Threshold for mix: ' + threshold);
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
