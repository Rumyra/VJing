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
        screens[1].style.opacity = '1';
      } else {
        screens[1].style.opacity = '0';
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
  var allThangs = document.querySelectorAll('.dom section');
  allThangs.forEach(function(thang) {thang.style.display = 'none'});
  // window.cancelAnimationFrame(cssReqAnimId);
}


// only call request animation frame on function you actually want to run
function reqAnim() {
  requestAnimationFrame(reqAnim);

  screenDomFunc[1](1);
  screenDomFunc[0](0);

  var mixData = adjustFreqData(12);

  for (var i=0; i<12; i++) {
    if (mixData[i] > threshold){
      if (i<6) {
        screens[1].style.opacity = '1';
        screens[0].style.opacity = '0';
        // screenDomFunc[1](1);
      } else {
        screens[1].style.opacity = '0';
        screens[0].style.opacity = '1';
        // screenDomFunc[0](0);
      }
    }
  }
  
}



// D3 ~~~~~~~~~~~~~~~~~~~~~~~~~
var conArc = d3.svg.arc()
  .startAngle(0)
  .endAngle(function(d, i) { return d/40; })
  .innerRadius(function(d, i) { return i*30; })
  .outerRadius(function(d, i) { return (i+1)*30; });

function concentric(scrNo) {
  var svg = d3.select(svgEls[scrNo]),
    shape = svg.selectAll('path');    

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append("path")
    .attr("transform", "translate(" + screen.width / 2 + "," + screen.height * .52 + ")")
    .style("stroke", "#222");

  shape
    .attr("d", conArc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/1.5)+'%,'+d/255+')'; })
    .exit().remove();
}

var conArc2 = d3.svg.arc()
  .startAngle(0)
  .endAngle(function(d, i) { return d/32; })
  .innerRadius(function(d, i) { return i*32; })
  .outerRadius(function(d, i) { return (i+1)*24; });

function concentric2(scrNo) {
  var svg = d3.select(svgEls[scrNo]),
    shape = svg.selectAll('path');    

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append("path")
    .attr("transform", "translate(" + screen.width / 2 + "," + screen.height * .52 + ")")
    .style("stroke", "#222");

  shape
    .attr("d", conArc2)
    .style("fill", function(d,i) { return 'hsla('+i*16+',60%,60%,'+d/255+')'; })
    .exit().remove();
}

var arc = d3.svg.arc()
  .startAngle(function(d, i) { return (i/8)*Math.PI; })
  .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
  .innerRadius(function(d, i) { return 0; })
  .outerRadius(function(d, i) { return (i*15)+(d); });

function shell(scrNo) {
  var svg = d3.select(svgEls[scrNo]),
    shape = svg.selectAll('path');    

  var newData = adjustFreqData(32);

  shape = shape.data(newData);

  shape
    .enter().append("path")
    .attr("transform", "translate(" + screen.width / 2 + "," + screen.height * .52 + ")")
    .style("stroke", "#222");

  shape
    .attr("d", arc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
    .exit().remove();
}

function superChart(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('line');

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round(window.innerHeight/2 + (screen.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("cx", function(d, i) {
      return Math.round(window.innerWidth/2 + (screen.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    });
  
  shape
    .attr("r", function(d) { return d/2; })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.8)"})
    .exit().remove();

  shape2 = shape2.data(newData);

  shape2
    .enter().append('line')
    .attr("x1", function(d, i) {
      return Math.round(window.innerWidth/2 + (screen.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y1", function(d, i) {
      return Math.round(window.innerHeight/2 + (screen.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("stroke-width","2")
    .attr("stroke","hsla(320,60%,100%,0.9)");
  shape2
    .attr("x2",function(d, i) {
      return Math.round(window.innerWidth/2 + ( (screen.maxRadius-d)*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y2",function(d, i) {
      return Math.round(window.innerHeight/2 + ( (screen.maxRadius-d)*Math.sin((2*i*Math.PI)/16)) );
    })
    .exit().remove();
  
}

var sunArc = d3.svg.arc()
  .startAngle(function(d, i) { return (i/8)*Math.PI; })
  .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
  .innerRadius(function(d, i) { return screen.minRadius*2; })
  .outerRadius(function(d, i) { return d*2; });

function superSun(scrNo) {
  var svg = d3.select(svgEls[scrNo]),
    shape = svg.selectAll('path');    

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append("path")
    .attr("transform", "translate(" + screen.width / 2 + "," + screen.height * .52 + ")")
    .style("stroke", "#222");

  shape
    .attr("d", sunArc)
    .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
    .exit().remove();
}

function spectrum(scrNo) {

  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('rect');
  var newData = adjustFreqData(24);

  shape = shape.data(newData);

  shape
    .enter().append('rect')
    .attr("x", function(d, i) {
      return 60*i;
    })
    .attr("y", function(d, i) {
      // return Math.round( (window.innerWidth/2) + (i*Math.random) );
      return 10;
    })
    .attr("width", 50);
  
  shape
    .attr("height", function(d, i) { return ( (d*3)+20 ); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.8)"} )
    .exit().remove();
}

function stripes(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('rect');
  var newData = adjustFreqData(18);

  shape = shape.data(newData);

  shape
    .enter().append('rect')
    .attr("x", function(d, i) {
      return 70*i;
    })
    .attr("y", function(d, i) {
      // return Math.round( (window.innerWidth/2) + (i*Math.random) );
      return 10;
    })
    .attr("stroke-width", 2)
    .attr("height", "100vh");
    
  
  shape
    .attr("width", function(d, i) { return (d/1.5); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.8)"} )
    .attr("stroke", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,1)"})
    .exit().remove();
}

function diagonalCircles(scrNo) {

  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle');
  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      // return Math.round( (window.innerHeight/2) + (i*Math.random) );
      return 50*i;
    })
    .attr("cx", function(d, i) {
      // return Math.round( (window.innerWidth/2) + (i*Math.random) );
      return 90*i;
    });
  
  shape
    .attr("r", function(d, i) { return (d/2)*i/2; })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.5)"} )
    .exit().remove();

  return this;

}

function diagCircLine(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle');
  var newData = adjustFreqData(120);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cx", function(d, i) {
      return 40*(i%40);
    })
    .attr("cy", function(d, i) {
      return 30*(i%30);
    })
    .attr("stroke", "white");
  
  shape
    .attr("stroke-width", function(d, i) { return (d/32); })
    .attr("r", function(d, i) { return (28+d/8); })
    .exit().remove();
}

function dots(scrNo) {

  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle');
  var newData = adjustFreqData(58);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cx", function(d, i) {
      return 88*( (i%15)+1 ) ;
    })
    .attr("cy", function(d, i) {
      return 72*( (i%9)+1 );
    })
    .attr("stroke", "white")
    .attr("stroke-width", 2);
  
  shape
    .attr("r", function(d, i) { return (d/5); })
    .exit().remove();
}

function dots2(scrNo) {

  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle');
  var newData = adjustFreqData(58);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cx", function(d, i) {
      return 88*( (i%15)+1 ) ;
    })
    .attr("cy", function(d, i) {
      return 72*( (i%9)+1 );
    })
    .attr("stroke", "white")
    .attr("stroke-width", 2);
  
  shape
    .attr("r", function(d, i) { return (d/5); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.5)"} )
    .exit().remove();
}

function triangles(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('path');
  var newData = adjustFreqData(60);

  shape = shape.data(newData);

  shape
    .enter().append('path')
    .attr("d","M 100 100 L 300 200 L 150 300 z")
    .style("transform", function(d, i) {
      return "translate("+90*(i%10)+"px, "+80*(i%6)+"px)";
    })
    .attr("stroke", "white");
  
  shape
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",60%,70%,"+d/255+")"} )
    .exit().remove();
}

function triangles2(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('path');
  var newData = adjustFreqData(60);

  shape = shape.data(newData);

  shape
    .enter().append('path')
    .attr("d","M 100 100 L 300 200 L 150 300 z")
    .attr("stroke", "white");
  
  shape
    .style("transform", function(d, i) {
      return "translate("+(100*(i%10)+Math.round(d/4))+"px, "+90*(i%6)+"px)";
    })
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",60%,70%,"+d/255+")"} )
    .exit().remove();
}

// js conf
function jsConfLogo10(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('use');

  var newData = adjustFreqData(12);

  shape = shape.data(newData);

  shape
    .enter().append('use').attr('href', '#jsConfLogoOne')
    .style("transform", function(d, i) {
      return "translate("+120*(i%10)+"px, "+90*(i%6)+"px)";
    })
    .attr("stroke", "white")
    .attr("stroke-width", 2);
  
  shape
    .attr("fill", function(d,i) {return "hsla("+i*30+",60%,70%,"+d/128+")"} )
    .exit().remove();

}

function jsConfLogo20(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('use');

  var newData = adjustFreqData(12);

  shape = shape.data(newData);

  shape
    .enter().append('use').attr('href', '#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+90*(i%10)+"px, "+80*(i%6)+"px)";
    })
    .attr("stroke", "white");
  
  shape
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();

}

function jsConfShapes13(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two'),
    logo = svg.selectAll('use');

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("r", function(d, i) { return i*5; })
    .attr("cy", function(d, i) {
      return Math.round( screen.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screen.width*Math.random() );
    });
    
  shape
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape2 = shape2.data(newData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    })
    .attr('style', function(d,i) {
      return 'transform:rotate('+i*10+'deg);';
    } );

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*25;
    })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape3 = shape3.data(newData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    });

  shape3
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*10;
    })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  logo = logo.data(newData.filter(function(el,i){return i%9===0}));

  logo
    .enter().append('use').attr('href','#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+(screen.width/2-100)+"px, "+(screen.height/2-20)+"px)";
    })
    .attr("stroke", "white");

  logo
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();

  
}

function jsConfShapes14(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two'),
    logo = svg.selectAll('use');

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round( screen.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screen.width*Math.random() );
    });
    
  shape
    .attr("r", function(d, i) { return d/4; })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .attr('style', function(d,i) {
      return 'mix-blend-mode: screen;';
    } )
    .exit().remove();

  shape2 = shape2.data(newData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    })
    ;

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*25;
    })
    .attr('style', function(d,i) {
      return 'transform:rotate('+i*10+'deg) scale('+((d/255)+1)+');mix-blend-mode: screen;';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape3 = shape3.data(newData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    });

  shape3
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*10;
    })
    .attr('style', function(d,i) {
      return 'transform:scale('+((d/255)+1)+');mix-blend-mode: screen;';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  logo = logo.data(newData.filter(function(el,i){return i%9===0}));

  logo
    .enter().append('use').attr('href','#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+(screen.width/2-100)+"px, "+(screen.height/2-20)+"px)";
    })
    .attr("stroke", "white");

  logo
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();

}

function jsConfShapes15(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two'),
    logo = svg.selectAll('use');

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round( screen.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screen.width*Math.random() );
    });
    
  shape
    .attr("r", function(d, i) { return d/4; })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape2 = shape2.data(newData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    })
    ;

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*25;
    })
    .attr('style', function(d,i) {
      return 'transform:rotate('+i*10+'deg) scale('+((d/255)+1)+');';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape3 = shape3.data(newData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random()) );
    });

  shape3
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*10;
    })
    .attr('style', function(d,i) {
      return 'transform:scale('+((d/255)+1)+');';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  logo = logo.data(newData.filter(function(el,i){return i%9===0}));

  logo
    .enter().append('use').attr('href','#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+(screen.width/2-100)+"px, "+(screen.height/2-20)+"px)";
    })
    .attr("stroke", "white");

  logo
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();

}

function jsConfShapes16(scrNo) {
  var svg = d3.select(svgEls[scrNo]);
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two');

  var newData = adjustFreqData(16);

  shape = shape.data(newData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round( screen.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screen.width*Math.random() );
    })
    // .attr("fill", "white");
    .attr("fill", function(d,i) {
      if (i%5 === 0) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (i%5 === 1) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (i%5 === 2) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (i%5 === 3) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    });
  shape
    .attr("r", function(d, i) { return d/4; })
    .exit().remove();

  shape2 = shape2.data(newData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("fill", function(d,i) {
      if (i%5 === 0) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (i%5 === 1) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (i%5 === 2) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (i%5 === 3) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .attr("x", function(d, i) {
      return Math.round( (screen.width*Math.random())-(i*5) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screen.height*Math.random())-(d*1.25) );
    });

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return d*2.5;
    })
    
    .exit().remove();

  shape3 = shape3.data(newData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("fill", function(d,i) {
      if (i%5 === 0) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (i%5 === 1) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (i%5 === 2) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (i%5 === 3) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    });

  shape3
    .attr("width",function(d, i) {
      return d+i;
    })
    .attr("height",function(d, i) {
      return d+i;
    })
    .attr("x", function(d, i) {
      return Math.round( screen.width*Math.random()-((d+i)/2) );
    })
    .attr("y", function(d, i) {
      return Math.round( screen.height*Math.random()-((d+i)/2) );
    })
    .exit().remove();
}


