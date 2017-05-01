
function onMIDIMessage(message) {
    data = message.data;
    // console.log('MIDI data', data);

    // Threshold for mixing - this show/hides screens
    if ( (data[0] === minim.cross[0]) && (data[1] === minim.cross[1]) ) {
      var bezierVal = data[2]/127;
      threshold = ( easing(bezierVal) )*240
      // console.log('midi:'+data[2]+'bezier:'+bezierVal+'threshold:'+threshold);
      // console.log(data[2],bezierVal,threshold);
    }

    // if side buttons are pressed show set
    for (i=0; i<8; i++) {
      
      if ( (data[0] === minim.side[i].onPress[0]) && data[1] === minim.side[i].onPress[1] ) {
          set = sets[i];
      }

      if ( (data[0] === minim.pads[i].onPress[0]) && data[1] === minim.pads[i].onPress[1] ) {

        // load correct set stuff
        if (set.type === 'video') {

          changeVidSrc(videoEls[screenNo], 'media/'+set.name+'/'+library.video[set.name][i]+'.mp4');

          showVideo(vidScreens[screenNo], domScreens[screenNo]);

          //set.name
        } else if (set.type === 'dom') {
          stopCurrentCss();
          showCss(vidScreens[screenNo], domScreens[screenNo]);
          cssThang = library.dom[set.name][i];
          reqAnim();
        }

      }

    }// for


    // effects

    // black
    if ( (data[0] === minim.topButton1.onPress[0]) && (data[1] === minim.topButton1.onPress[1]) ) {

      if ( data[2] === minim.topButton1.onPress[2] ) {
        blackEl.style.opacity = 1;
      } else if ( data[2] === minim.topButton1.onRelease[2] ) {
        blackEl.style.opacity = 0;
      }
      
    }

    // white
    if ( (data[0] === minim.topButton2.onPress[0]) && (data[1] === minim.topButton2.onPress[1]) ) {

      if ( data[2] === minim.topButton2.onPress[2] ) {
        whiteEl.style.opacity = 1;
      } else if ( data[2] === minim.topButton2.onRelease[2] ) {
        whiteEl.style.opacity = 0;
      }
      
    }

    // invert
    if ( (data[0] === minim.topButton3.onPress[0]) && (data[1] === minim.topButton3.onPress[1]) ) {

      if ( data[2] === minim.topButton3.onPress[2] ) {
        videoElOne.style.webkitFilter = "invert(100%)";
        videoElTwo.style.webkitFilter = "invert(100%)";
      } else if ( data[2] === minim.topButton3.onRelease[2] ) {
        videoElOne.style.webkitFilter = "invert(0%)";
        videoElTwo.style.webkitFilter = "invert(0%)";
      }
      
    }

    // zoom
    if ( (data[0] === minim.topButton4.onPress[0]) && (data[1] === minim.topButton4.onPress[1]) ) {

      if ( data[2] === minim.topButton4.onPress[2] ) {
        rightScreen.style.transform = 'scale(3)';
        leftScreen.style.transform = 'scale(3)';
      } else if ( data[2] === minim.topButton4.onRelease[2] ) {
        rightScreen.style.transform = 'scale(1)';
        leftScreen.style.transform = 'scale(1)';
      }
      
    }

    //

    return data;
}