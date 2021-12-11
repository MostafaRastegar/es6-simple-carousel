"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _partial = require("./partial");

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DragEvent = /*#__PURE__*/function () {
  function DragEvent(params) {
    _classCallCheck(this, DragEvent);

    var core = params.core;
    this.setCore(core);
    this.initialize();
  }

  _createClass(DragEvent, [{
    key: "setCore",
    value: function setCore(core) {
      this.core = core;
    }
  }, {
    key: "getCore",
    value: function getCore() {
      return this.core;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this$core = this.core,
          _this$core$config = _this$core.config,
          responsive = _this$core$config.responsive,
          threshold = _this$core$config.threshold,
          rtl = _this$core$config.rtl,
          nav = _this$core$config.nav,
          autoWidth = _this$core$config.autoWidth,
          freeScroll = _this$core$config.freeScroll,
          getDrag = _this$core.getDrag,
          getInfinite = _this$core.getInfinite,
          getSliderItems = _this$core.getSliderItems,
          setPosInitial = _this$core.setPosInitial,
          setPosX1 = _this$core.setPosX1,
          getPosX1 = _this$core.getPosX1,
          setPosX2 = _this$core.setPosX2,
          getPosX2 = _this$core.getPosX2,
          getSlider = _this$core.getSlider,
          getPerSlide = _this$core.getPerSlide,
          getSlidesLength = _this$core.getSlidesLength,
          getIndex = _this$core.getIndex,
          getSlideSize = _this$core.getSlideSize,
          getSliderMainWidth = _this$core.getSliderMainWidth,
          getSliderItemWidth = _this$core.getSliderItemWidth,
          setIndex = _this$core.setIndex,
          setPosFinal = _this$core.setPosFinal,
          getPosFinal = _this$core.getPosFinal,
          setAllowShift = _this$core.setAllowShift,
          transitionendWatcherCall = _this$core.transitionendWatcherCall;
      var infinite = getInfinite();
      var sliderItems = getSliderItems();
      var drag = getDrag();
      var startTrans = null;

      var dragEndCall = function dragEndCall() {
        var dragStartParams = {
          sliderItems: getSliderItems(),
          slidesLength: getSlidesLength(),
          slideSize: getSlideSize(),
          sliderMainWidth: getSliderMainWidth(),
          slider: getSlider(),
          posFinal: getPosFinal(),
          threshold: threshold,
          responsive: responsive,
          infinite: infinite,
          rtl: rtl,
          nav: nav,
          autoWidth: autoWidth,
          setIndex: setIndex,
          setPosFinal: setPosFinal,
          transitionendWatcherCall: transitionendWatcherCall,
          dragAction: _partial.dragAction,
          drag: drag,
          setPosInitial: setPosInitial,
          setPosX1: setPosX1,
          setAllowShift: setAllowShift,
          index: getIndex(),
          sliderItemWidth: getSliderItemWidth(),
          freeScroll: freeScroll,
          startTrans: startTrans
        };
        (0, _partial.dragEnd)(dragStartParams);
      };

      var dragActionCall = function dragActionCall(e) {
        var dragActionParams = {
          e: e,
          getPosX1: getPosX1,
          setPosX1: setPosX1,
          setPosX2: setPosX2,
          setPosInitial: setPosInitial,
          getSliderItems: getSliderItems,
          threshold: threshold,
          rtl: rtl,
          autoWidth: autoWidth,
          getPosX2: getPosX2,
          getSlidesLength: getSlidesLength,
          getPerSlide: getPerSlide,
          responsive: responsive,
          getSlider: getSlider,
          infinite: infinite,
          getSlideSize: getSlideSize,
          getSliderMainWidth: getSliderMainWidth
        };
        (0, _partial.dragAction)(dragActionParams);
      };

      var dragStartCall = function dragStartCall(e) {
        var dragStartParams = {
          e: e,
          sliderItems: sliderItems,
          setPosInitial: setPosInitial,
          setPosX1: setPosX1,
          dragEndCall: dragEndCall,
          dragActionCall: dragActionCall,
          sliderMainWidth: getSliderMainWidth(),
          rtl: rtl,
          autoWidth: autoWidth
        };
        startTrans = (0, _utils.getTranslate3d)(sliderItems);
        (0, _partial.dragStart)(dragStartParams);
      }; // Mouse events


      sliderItems.addEventListener("mousedown", dragStartCall); // Touch events

      var supportsPassive = false;

      try {
        var opts = Object.defineProperty({}, "passive", {
          // eslint-disable-next-line getter-return
          get: function get() {
            supportsPassive = true;
          }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts); // eslint-disable-next-line no-empty
      } catch (e) {}

      sliderItems.addEventListener("touchstart", dragStartCall, supportsPassive ? {
        passive: true
      } : false);
      sliderItems.addEventListener("touchend", dragEndCall);
      sliderItems.addEventListener("touchmove", dragActionCall);
    }
  }]);

  return DragEvent;
}();

exports["default"] = DragEvent;