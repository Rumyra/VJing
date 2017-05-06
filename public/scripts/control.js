
function onMIDIMessage(message) {
    data = message.data;
    // console.log('MIDI data', data);

    // Threshold for mixing - this show/hides screens
    if ( (data[0] === minim.cross[0]) && (data[1] === minim.cross[1]) ) {
      var bezierVal = data[2]/127;
      threshold = ( easing(bezierVal) )*240
      // console.log('midi:'+data[2]+'bezier:'+bezierVal+'threshold:'+threshold);
      console.log(data[2],bezierVal,threshold);
    }

    // if side buttons are pressed show set
    for (i=0; i<8; i++) {
      
      if ( (data[0] === minim.side[i].onPress[0]) && data[1] === minim.side[i].onPress[1] ) {
          set = sets[i];
          console.log("set "+set.name);
      }

      if ( (data[0] === minim.pads[i].onPress[0]) && data[1] === minim.pads[i].onPress[1] ) {

        // load correct set stuff
        if (set.type === 'video') {

          console.log(library);
          changeVidSrc(videoEls[screenNo], 'library/'+set.name+'/'+library.video[set.name][i]+'.mp4');

          showVideo(vidScreens[screenNo], domScreens[screenNo]);

          //set.name
        } else if (set.type === 'dom') {

          if (library.dom[set.name][i]) {
            var svg = d3.select(svgEls[screenNo]);
            svg.selectAll('*').remove();
            showCss(vidScreens[screenNo], domScreens[screenNo]);
            screenDomFunc[screenNo] = library.dom[set.name][i];
            reqAnim();  
          }
          
        }

      }

    }// for


    // effects

    // black
    if ( (data[0] === minim.top[0].onPress[0]) && (data[1] === minim.top[0].onPress[1]) ) {

      if ( data[2] === minim.top[0].onPress[2] ) {
        blackEl.style.opacity = 1;
      } else if ( data[2] === minim.top[0].onRelease[2] ) {
        blackEl.style.opacity = 0;
      }
      
    }

    // white
    if ( (data[0] === minim.top[1].onPress[0]) && (data[1] === minim.top[1].onPress[1]) ) {

      if ( data[2] === minim.top[1].onPress[2] ) {
        whiteEl.style.opacity = 1;
      } else if ( data[2] === minim.top[1].onRelease[2] ) {
        whiteEl.style.opacity = 0;
      }
      
    }

    // invert
    if ( (data[0] === minim.top[2].onPress[0]) && (data[1] === minim.top[2].onPress[1]) ) {

      if ( data[2] === minim.top[2].onPress[2] ) {
        videoEls[0].style.webkitFilter = "invert(100%)";
        videoEls[1].style.webkitFilter = "invert(100%)";
      } else if ( data[2] === minim.top[2].onRelease[2] ) {
        videoEls[0].style.webkitFilter = "invert(0%)";
        videoEls[1].style.webkitFilter = "invert(0%)";
      }
      
    }

    // zoom
    if ( (data[0] === minim.top[3].onPress[0]) && (data[1] === minim.top[3].onPress[1]) ) {

      if ( data[2] === minim.top[3].onPress[2] ) {
        screens[0].style.transform = 'scale(3)';
        screens[1].style.transform = 'scale(3)';
      } else if ( data[2] === minim.top[3].onRelease[2] ) {
        screens[0].style.transform = 'scale(1)';
        screens[1].style.transform = 'scale(1)';
      }
      
    }

    //

    return data;
}