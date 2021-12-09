"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _partial = require("./partial");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SliderArrows = /*#__PURE__*/function () {
  function SliderArrows(params) {
    _classCallCheck(this, SliderArrows);

    var core = params.core;
    this.setCore(core);
    this.initialize();
  }

  _createClass(SliderArrows, [{
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
      var _this = this;

      var _this$core = this.core,
          slider = _this$core.config.slider,
          getSliderItems = _this$core.getSliderItems,
          setAllowShift = _this$core.setAllowShift;
      var prevSelector = (0, _utils.childFider)({
        wrapper: slider,
        className: '.prev'
      });
      var nextSelector = (0, _utils.childFider)({
        wrapper: slider,
        className: '.next'
      }); // Click events

      prevSelector.addEventListener('click', function () {
        return _this.shiftSlide(-1);
      });
      nextSelector.addEventListener('click', function () {
        return _this.shiftSlide(1);
      }); // remove shifting class and allowSHift permission

      var itemClassParams = {
        item: getSliderItems(),
        className: 'shifting'
      };
      (0, _utils.removeClassFromElement)(itemClassParams);
      setAllowShift(true);
    }
  }, {
    key: "shiftSlide",
    value: function shiftSlide(dir, action) {
      var _this$core2 = this.core,
          _this$core2$config = _this$core2.config,
          responsive = _this$core2$config.responsive,
          rtl = _this$core2$config.rtl,
          autoWidth = _this$core2$config.autoWidth,
          getInfinite = _this$core2.getInfinite,
          getSliderItems = _this$core2.getSliderItems,
          setPosInitial = _this$core2.setPosInitial,
          getSlideSize = _this$core2.getSlideSize,
          setIndex = _this$core2.setIndex,
          getIndex = _this$core2.getIndex,
          getSlidesLength = _this$core2.getSlidesLength,
          getSliderMainWidth = _this$core2.getSliderMainWidth,
          getSlider = _this$core2.getSlider,
          getAllowShift = _this$core2.getAllowShift,
          setAllowShift = _this$core2.setAllowShift;
      var perSlide = (0, _utils.truncResponsiveItemCount)(responsive);

      if (getAllowShift()) {
        if (!action) {
          setPosInitial((0, _utils.getTranslate3d)(getSliderItems()));
        }

        var shiftSlideParams = {
          sliderItems: getSliderItems(),
          slideSize: getSlideSize(),
          slidesLength: getSlidesLength(),
          slider: getSlider(),
          sliderMainWidth: getSliderMainWidth(),
          index: getIndex(),
          responsiveItem: (0, _utils.responsiveItemCount)(responsive),
          perSlide: perSlide,
          dir: dir,
          infinite: getInfinite(),
          rtl: rtl,
          autoWidth: autoWidth
        };

        if (dir === 1) {
          setIndex((0, _partial.shiftSlideIsDir)(shiftSlideParams));
        } else if (dir === -1) {
          setIndex((0, _partial.shiftSlideNonDir)(shiftSlideParams));
        }
      }

      var itemClassParams = {
        item: getSliderItems(),
        className: 'shifting'
      };
      (0, _utils.addClassToElement)(itemClassParams);
      setAllowShift(false);
    }
  }]);

  return SliderArrows;
}();

exports["default"] = SliderArrows;