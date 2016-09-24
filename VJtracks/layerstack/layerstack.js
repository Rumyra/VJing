/*
  LayerStack

  Splits an element's multiple backgrounds into separate layers (DOM elements)
  so that each layer corresponds to one of the original element's backgrounds.

  Visualize in 3D.
*/
function LayerStack(el) {

  // Ensure we're called with `new`
  if (!(this instanceof LayerStack)) {
    return new LayerStack(el);
  }

  // Helpers
  var _qs = document.querySelector.bind(document);

  // Store for event callbacks
  var _events = {};

  if (!el) {
    throw TypeError(`Invalid element parameter. Expected DOM element, got ${el}.`);
    return;
  }

  function getBackgroundLayers(el) {
    var style = window.getComputedStyle(el);

    /*
    Create array of objects with layer data from `background-image` value.

    Add an extra paranthesis at end of each image declaration,
    then split by one paranthesis and comma to yield an array of declarations.

    If there is no backgrond-image value, the computed value is `none`.
    That yields an array with a single value onto which we can tack on stuff
    like `background-color`, if defined.
    */
    layers = style.getPropertyValue('background-image')
              .replace(/\),/gi, ')),')
              .split('),')
              .map(function(img) {
                return {
                  'background-image': img,
                  'box-sizing': style.getPropertyValue('box-sizing'),
                  // TODO: add support for separate border declarations
                  'border': style.getPropertyValue('border')
                }
              });

    // All other background properties can be split by comma.
    var props = ['background-size', 'background-repeat', 'background-position', 'background-origin'];

    props.forEach(function(prop) {
      var values = style.getPropertyValue(prop).split(',');

      /*
        If there's one background-* value, like background-repeat, but multiple background images,
        getGomputedStyle() in Firefox won't replicate the value to match the number of images.
        Do this manually.
      */
      if (values.length === 1) {
        layers.forEach(function(layer) {
          layer[prop] = values[0].trim();
        })
      } else {
        values.forEach(function(value, index) {
          layers[index][prop] = value.trim();
        })
      }
    })

    // Use backgrond-color only on base layer
    layers[layers.length - 1]['background-color'] = style.getPropertyValue('background-color');

    return layers;
  }

  function getTransformStyleSheetForLayers(layers) {
    var style = document.createElement('style');
    // offset step between layers
    var step = 75;

    layers.forEach(function(layer, index) {
      // Concat transform style for this layer
      style.textContent += `.animated .bg-stack__layer:nth-child(${index + 1}) {
        transform: translateY(calc(var(--yoffset, 0) * ${index * -1 * step}px)) translateZ(calc(var(--yoffset, 0) * ${index * step}px));
      }\n`
    })

    return style;
  }

  var sourceEl = el;

  var stack = document.createElement('div');
  stack.classList.add('bg-stack');

  var stackContainer = document.createElement('div');
  stackContainer.classList.add('bg-stack-container');
  stackContainer.appendChild(stack);

  var sourceElBgLayers = getBackgroundLayers(sourceEl);
  sourceElBgLayers.forEach(function(layer, index) {
    var stackLayer = document.createElement('div')
    stackLayer.classList.add('bg-stack__layer');

    for (var prop in layer){
      stackLayer.style[prop] = layer[prop];
    }

    // DOM order is reverse z-order; insert bottom layers at top of stack;
    stack.insertBefore(stackLayer, stack.firstChild)
  })

  var sourceElBox = sourceEl.getBoundingClientRect();
  for (var key in sourceElBox) {
    stackContainer.style[key] = sourceElBox[key] + 'px';
  }

  var transformStyleSheet = getTransformStyleSheetForLayers(sourceElBgLayers);
  document.head.appendChild(transformStyleSheet);

  sourceEl.parentElement.appendChild(stackContainer);
  sourceEl.classList.add('u-invisible');

  // Add animated class after appending to DOM so we get smooth transition
  requestAnimationFrame(function(){
    stackContainer.classList.add('animated');
  })

  // Add stylesheet with dynamic values for CSS Variables set by mouse position
  var cssVars = document.createElement('style');
  document.head.appendChild(cssVars);

  var maxRotation = 60; // max Z rotation (from -30deg to 30deg)
  var minRotation = 0;
  var minLayerOffset = 1;
  var maxLayerOffset = 4; // max Y layer offset; used in CSS as multiplier
  var maxWidth = window.innerWidth;
  var maxHeight = window.innerHeight;

  var ticking = false;
  var mouseX = 0;
  var mouseY = 0;

  function updateCSSVars() {
    ticking = false;

    var xoffset = -1 * ((maxRotation / 2) - (maxRotation / maxWidth) * mouseX);
    var yoffset = maxLayerOffset - (maxLayerOffset / maxHeight) * mouseY;

    cssVars.innerHTML = `:root { --xoffset: ${xoffset}; --yoffset: ${yoffset} }`;
  }

  function update(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if(!ticking) {
      requestAnimationFrame(updateCSSVars);
    }

    ticking = true;
  }

  document.addEventListener('mousemove', update);

  return {
    /*
      Remove LayerStack DOM nodes and styling. Restore visibility of source object.
      @param {Object} options - config object for destroy action.

      Config options:
      {Boolean} immediate - When true, destroy without running animation. Default `false`.

      @example destroy({ immediate: true })
    */
    destroy: function(options){
      document.removeEventListener('mousemove', update);
      stackContainer.classList.remove('animated');
      var self = this;

      function destroyDOM(e) {
        transformStyleSheet.parentElement.removeChild(transformStyleSheet);
        cssVars.parentElement.removeChild(cssVars);
        stackContainer.removeEventListener('transitionend', destroyDOM)
        stackContainer.parentElement.removeChild(stackContainer);

        sourceEl.classList.remove('u-invisible');
        self.trigger('afterdestroy');
      }

      if (options && options.immediate) {
        destroyDOM();
      } else {
        stackContainer.addEventListener('transitionend', destroyDOM)
      }
    },

    on: function(event, fn) {
      if (!_events[event]) {
        _events[event] = [];
      }
      _events[event].push(fn);
    },

    trigger: function(event, data) {
      if (_events[event]) {
        _events[event].forEach(function(fn){
          fn.call(this, data);
        })
      }
    }

  }
}
