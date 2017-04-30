// use like akaiControls.prog1.dial1[0]
// akaiControls.PAD.pad1.onPress[0]
// akaiControls.progChng.pad1[0]

var minim = {
  side: [
    {
      onPress: [144,32,64],
      onRelease: [144,32,0]
    },
    {
      onPress: [144,33,64],
      onRelease: [144,33,0]
    },
    {
      onPress: [144,34,64],
      onRelease: [144,34,0]
    },
    {
      onPress: [144,35,64],
      onRelease: [144,35,0]
    },
    {
      onPress: [144,44,64],
      onRelease: [144,44,0]
    },
    {
      onPress: [144,45,64],
      onRelease: [144,45,0]
    },
    {
      onPress: [144,46,64],
      onRelease: [144,46,0]
    },
    {
      onPress: [144,47,64],
      onRelease: [144,47,0]
    }
  ],

  pads: [
    {
      onPress: [144,36],
      onRelease: [144,36,0]
    },
    {
      onPress: [144,37],
      onRelease: [144,37,0]
    },
    {
      onPress: [144,38],
      onRelease: [144,38,0]
    },
    {
      onPress: [144,39],
      onRelease: [144,39,0]
    },
    {
      onPress: [144,40],
      onRelease: [144,40,0]
    },
    {
      onPress: [144,41],
      onRelease: [144,41,0]
    },
    {
      onPress: [144,42],
      onRelease: [144,42,0]
    },
    {
      onPress: [144,43],
      onRelease: [144,43,0]
    },
  ],

  top: [
    {
      onPress: [144,6,64],
      onRelease: [144,6,0]
    },
    {
      onPress: [144,5,64],
      onRelease: [144,6,0]
    },
    {
      onPress: [144,4,64],
      onRelease: [144,6,0]
    },
    {
      onPress: [144,3,64],
      onRelease: [144,6,0]
    },
    {
      onPress: [144,2,64],
      onRelease: [144,6,0]
    },
  ],
  
  cross: [176,1]
}

var minimOld = {
  right: {
    button1: {
      onPress: [144,44,64],
      onRelease: [144,44,0]
    },
    button2: {
      onPress: [144,45,64],
      onRelease: [144,45,0]
    },
    button3: {
      onPress: [144,46,64],
      onRelease: [144,46,0]
    },
    button4: {
      onPress: [144,47,64],
      onRelease: [144,47,0]
    },
    pad1: {
      onPress: [144,40],
      onRelease: [144,40,0]
    },
    pad2: {
      onPress: [144,41],
      onRelease: [144,41,0]
    },
    pad3: {
      onPress: [144,42],
      onRelease: [144,42,0]
    },
    pad4: {
      onPress: [144,43],
      onRelease: [144,43,0]
    }
  },
  left: {
    button1: {
      onPress: [144,32,64],
      onRelease: [144,32,0]
    },
    button2: {
      onPress: [144,33,64],
      onRelease: [144,33,0]
    },
    button3: {
      onPress: [144,34,64],
      onRelease: [144,34,0]
    },
    button4: {
      onPress: [144,35,64],
      onRelease: [144,35,0]
    },
    pad1: {
      onPress: [144,36],
      onRelease: [144,36,0]
    },
    pad2: {
      onPress: [144,37],
      onRelease: [144,37,0]
    },
    pad3: {
      onPress: [144,38],
      onRelease: [144,38,0]
    },
    pad4: {
      onPress: [144,39],
      onRelease: [144,39,0]
    }
  },
  topButton1: {
    onPress: [144,6,64],
    onRelease: [144,6,0]
  },
  topButton2: {
    onPress: [144,5,64],
    onRelease: [144,6,0]
  },
  topButton3: {
    onPress: [144,4,64],
    onRelease: [144,6,0]
  },
  topButton4: {
    onPress: [144,3,64],
    onRelease: [144,6,0]
  },
  topButton5: {
    onPress: [144,2,64],
    onRelease: [144,6,0]
  },
  cross: [176,1]
}

var akaiControls = {
  prog1: {
    dial1: [176, 1],
    dial2: [176, 2],
    dial3: [176, 3],
    dial4: [176, 4],
    dial5: [176, 5],
    dial6: [176, 6],
    dial7: [176, 7],
    dial8: [176, 8],
    PAD: {
      pad1: {
        onPress: [144, 36],
        onRelease: [128, 36, 127]
      },
      pad2: {
        onPress: [144, 37],
        onRelease: [128, 37, 127]
      },
      pad3: {
        onPress: [144, 38],
        onRelease: [128, 38, 127]
      },
      pad4: {
        onPress: [144, 39],
        onRelease: [128, 39, 127]
      },
      pad5: {
        onPress: [144, 40],
        onRelease: [128, 40, 127]
      },
      pad6: {
        onPress: [144, 41],
        onRelease: [128, 41, 127]
      },
      pad7: {
        onPress: [144, 42],
        onRelease: [128, 42, 127]
      },
      pad8: {
        onPress: [144, 43],
        onRelease: [128, 43, 127]
      }
    },
    progChng: {
      pad1: [192, 0],
      pad2: [192, 1],
      pad3: [192, 2],
      pad4: [192, 3],
      pad5: [192, 4],
      pad6: [192, 5],
      pad7: [192, 6],
      pad8: [192, 7]
    },
    CC: {
      pad1: {
        onPress: [176, 1],
        onRelease: [176, 1, 0]
      },
      pad2: {
        onPress: [176, 2],
        onRelease: [176, 2, 0]
      },
      pad3: {
        onPress: [176, 3],
        onRelease: [176, 3, 0]
      },
      pad4: {
        onPress: [176, 4],
        onRelease: [176, 4, 0]
      },
      pad5: {
        onPress: [176, 5],
        onRelease: [176, 5, 0]
      },
      pad6: {
        onPress: [176, 6],
        onRelease: [176, 6, 0]
      },
      pad7: {
        onPress: [176, 8],
        onRelease: [176, 8, 0]
      },
      pad8: {
        onPress: [176, 9],
        onRelease: [176, 9, 0]
      }
    }
  },
  prog2: {
    dial1: [177, 1],
    dial2: [177, 2],
    dial3: [177, 3],
    dial4: [177, 4],
    dial5: [177, 5],
    dial6: [177, 6],
    dial7: [177, 7],
    dial8: [177, 8],
    PAD: {
      pad1: {
        onPress: [145, 35],
        onRelease: [129, 35, 127]
      },
      pad2: {
        onPress: [145, 36],
        onRelease: [129, 36, 127]
      },
      pad3: {
        onPress: [145, 42],
        onRelease: [129, 42, 127]
      },
      pad4: {
        onPress: [145, 39],
        onRelease: [129, 39, 127]
      },
      pad5: {
        onPress: [145, 37],
        onRelease: [129, 37, 127]
      },
      pad6: {
        onPress: [145, 38],
        onRelease: [129, 38, 127]
      },
      pad7: {
        onPress: [145, 46],
        onRelease: [129, 46, 127]
      },
      pad8: {
        onPress: [145, 44],
        onRelease: [129, 44, 127]
      }
    },
    progChng: {
      pad1: [193, 0],
      pad2: [193, 1],
      pad3: [193, 2],
      pad4: [193, 3],
      pad5: [193, 4],
      pad6: [193, 5],
      pad7: [193, 6],
      pad8: [193, 7]
    },
    CC: {
      pad1: {
        onPress: [177, 1],
        onRelease: [177, 1, 0]
      },
      pad2: {
        onPress: [177, 2],
        onRelease: [177, 2, 0]
      },
      pad3: {
        onPress: [177, 3],
        onRelease: [177, 3, 0]
      },
      pad4: {
        onPress: [177, 4],
        onRelease: [177, 4, 0]
      },
      pad5: {
        onPress: [177, 5],
        onRelease: [177, 5, 0]
      },
      pad6: {
        onPress: [177, 6],
        onRelease: [177, 6, 0]
      },
      pad7: {
        onPress: [177, 8],
        onRelease: [177, 8, 0]
      },
      pad8: {
        onPress: [177, 9],
        onRelease: [177, 9, 0]
      }
    }
  },
  prog3: {
    dial1: [178, 1],
    dial2: [178, 2],
    dial3: [178, 3],
    dial4: [178, 4],
    dial5: [178, 5],
    dial6: [178, 6],
    dial7: [178, 7],
    dial8: [178, 8],
    PAD: {
      pad1: {
        onPress: [146, 60],
        onRelease: [130, 60, 127]
      },
      pad2: {
        onPress: [146, 62],
        onRelease: [130, 62, 127]
      },
      pad3: {
        onPress: [146, 64],
        onRelease: [130, 64, 127]
      },
      pad4: {
        onPress: [146, 65],
        onRelease: [130, 65, 127]
      },
      pad5: {
        onPress: [146, 67],
        onRelease: [130, 67, 127]
      },
      pad6: {
        onPress: [146, 69],
        onRelease: [130, 69, 127]
      },
      pad7: {
        onPress: [146, 71],
        onRelease: [130, 71, 127]
      },
      pad8: {
        onPress: [146, 72],
        onRelease: [130, 72, 127]
      }
    },
    progChng: {
      pad1: [194, 0],
      pad2: [194, 1],
      pad3: [194, 2],
      pad4: [194, 3],
      pad5: [194, 4],
      pad6: [194, 5],
      pad7: [194, 6],
      pad8: [194, 7]
    },
    CC: {
      pad1: {
        onPress: [178, 1],
        onRelease: [178, 1, 0]
      },
      pad2: {
        onPress: [178, 2],
        onRelease: [178, 2, 0]
      },
      pad3: {
        onPress: [178, 3],
        onRelease: [178, 3, 0]
      },
      pad4: {
        onPress: [178, 4],
        onRelease: [178, 4, 0]
      },
      pad5: {
        onPress: [178, 5],
        onRelease: [178, 5, 0]
      },
      pad6: {
        onPress: [178, 6],
        onRelease: [178, 6, 0]
      },
      pad7: {
        onPress: [178, 8],
        onRelease: [178, 8, 0]
      },
      pad8: {
        onPress: [178, 9],
        onRelease: [178, 9, 0]
      }
    }
  },
  prog4: {
    dial1: [179, 1],
    dial2: [179, 2],
    dial3: [179, 3],
    dial4: [179, 4],
    dial5: [179, 5],
    dial6: [179, 6],
    dial7: [179, 7],
    dial8: [179, 8],
    PAD: {
      pad1: {
        onPress: [147, 36],
        onRelease: [131, 36, 127]
      },
      pad2: {
        onPress: [146, 38],
        onRelease: [131, 38, 127]
      },
      pad3: {
        onPress: [146, 40],
        onRelease: [131, 40, 127]
      },
      pad4: {
        onPress: [146, 41],
        onRelease: [131, 41, 127]
      },
      pad5: {
        onPress: [146, 43],
        onRelease: [131, 43, 127]
      },
      pad6: {
        onPress: [146, 45],
        onRelease: [131, 45, 127]
      },
      pad7: {
        onPress: [146, 47],
        onRelease: [131, 47, 127]
      },
      pad8: {
        onPress: [146, 48],
        onRelease: [131, 48, 127]
      }
    },
    progChng: {
      pad1: [195, 0],
      pad2: [195, 1],
      pad3: [195, 2],
      pad4: [195, 3],
      pad5: [195, 4],
      pad6: [195, 5],
      pad7: [195, 6],
      pad8: [195, 7]
    },
    CC: {
      pad1: {
        onPress: [179, 1],
        onRelease: [179, 1, 0]
      },
      pad2: {
        onPress: [179, 2],
        onRelease: [179, 2, 0]
      },
      pad3: {
        onPress: [179, 3],
        onRelease: [179, 3, 0]
      },
      pad4: {
        onPress: [179, 4],
        onRelease: [179, 4, 0]
      },
      pad5: {
        onPress: [179, 5],
        onRelease: [179, 5, 0]
      },
      pad6: {
        onPress: [179, 6],
        onRelease: [179, 6, 0]
      },
      pad7: {
        onPress: [179, 8],
        onRelease: [179, 8, 0]
      },
      pad8: {
        onPress: [179, 9],
        onRelease: [179, 9, 0]
      }
    }
  }
};

var iDJcontrols = {
  left: {
    bal: {
      dial: [176, 30, 0],
      top: [144, 22, 127]
    },
    hi: {
      dial: [176, 20, 0],
      top: [144, 14, 127]
    },
    mid: {
      dial: [176, 21, 0],
      top: [144, 15, 127]
    },
    low: {
      dial: [176, 23, 0],
      top: [144, 17, 127]
    },
    gain: {
      dial: [176, 28, 0],
      top: [144, 24, 127]
    },
    top: {
      dial: [176, 84, 0],
      top: [144, 1, 127] 
    },
    bottom: {
      dial: [176, 85, 0],
      top: [144, 2, 127]
    },
    tempo: {
      slide: [176, 14, 0],
      mid: [144, 12, 127]
    },
    sync: {
      onPress: [144, 101, 127],
      onRelease: [144, 101, 0]
    },
    lloop: {
      onPress: [144, 102, 127],
      onRelease: [144, 102, 0]
    },
    rloop: {
      onPress: [144, 66, 127],
      onRelease: [144, 66, 0]
    },
    butOut: {
      onPress: [144, 50, 127],
      onRelease: [144, 50, 0]
    },
    butIn: {
      onPress: [144, 52, 127],
      onRelease: [144, 52, 0]
    },
    cue: {
      onPress: [144, 51, 127],
      onRelease: [144, 51, 0]
    },
    play: {
      onPress: [144, 70, 127],
      onRelease: [144, 70, 0]
    },
    pgm: [176, 12, 0],
    midButs: {
      topLeft: {
        onPress: [144, 85, 127],
        onRelease: [144, 85, 0]
      },
      topRight: {
        onPress: [144, 88, 127],
        onRelease: [144, 88, 0]
      },
      botRight: {
        onPress: [144, 79, 127],
        onRelease: [144, 79, 0]
      },
      botLeft: {
        onPress: [144, 78, 127],
        onRelease: [144, 78, 0]
      }
    },
    dial: {
      value: [144, 107, 0],
      tapOne: [144, 48, 0],
      tapTwo: [144, 46, 0],
      forward: [144, 58, 0],
      back: [144, 59, 0],
      onPress: {
        forward: [176, 16, 65],
        backward: [176, 16, 63]
      }
    }
  },
  right: {
    bal: {
      dial: [176, 31, 0],
      top: [144, 23, 127]
    },
    hi: {
      dial: [176, 27, 0],
      top: [144, 21, 127]
    },
    mid: {
      dial: [176, 25, 0],
      top: [144, 19, 127]
    },
    low: {
      dial: [176, 24, 0],
      top: [144, 18, 127]
    },
    gain: {
      dial: [176, 29, 0],
      top: [144, 25, 127]
    },
    top: {
      dial: [176, 86, 0],
      top: [144, 3, 127] 
    },
    bottom: {
      dial: [176, 87, 0],
      top: [144, 4, 127]
    },
    tempo: {
      slide: [176, 15, 0],
      mid: [144, 13, 127]
    },
    sync: {
      onPress: [144, 103, 127],
      onRelease: [144, 103, 0]
    },
    lloop: {
      onPress: [144, 104, 127],
      onRelease: [144, 104, 0]
    },
    rloop: {
      onPress: [144, 67, 127],
      onRelease: [144, 67, 0]
    },
    butOut: {
      onPress: [144, 56, 127],
      onRelease: [144, 56, 0]
    },
    butIn: {
      onPress: [144, 54, 127],
      onRelease: [144, 54, 0]
    },
    cue: {
      onPress: [144, 71, 127],
      onRelease: [144, 71, 0]
    },
    play: {
      onPress: [144, 55, 127],
      onRelease: [144, 55, 0]
    },
    pgm: [176, 13, 0],
    midButs: {
      topLeft: {
        onPress: [144, 91, 127],
        onRelease: [144, 91, 0]
      },
      topRight: {
        onPress: [144, 76, 127],
        onRelease: [144, 76, 0]
      },
      botRight: {
        onPress: [144, 83, 127],
        onRelease: [144, 83, 0]
      },
      botLeft: {
        onPress: [144, 82, 127],
        onRelease: [144, 82, 0]
      }
    },
    dial: {
      value: [144, 108, 0],
      tapOne: [144, 49, 0],
      tapTwo: [144, 47, 0],
      forward: [144, 58, 0],
      back: [144, 59, 0],
      onPress: {
        forward: [176, 17, 65],
        backward: [176, 17, 63]
      }
    }
  },
  cross: [176, 8, 0]
};

