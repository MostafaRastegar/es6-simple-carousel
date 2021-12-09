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

var SliderTrailer = /*#__PURE__*/function () {
  function SliderTrailer(params) {
    _classCallCheck(this, SliderTrailer);

    var core = params.core;
    this.setCore(core);
    this.initialize();
  }

  _createClass(SliderTrailer, [{
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
          slider = _this$core$config.slider,
          rtl = _this$core$config.rtl,
          autoWidth = _this$core$config.autoWidth,
          freeScroll = _this$core$config.freeScroll,
          getInfinite = _this$core.getInfinite,
          getSliderItems = _this$core.getSliderItems,
          getSlidesLength = _this$core.getSlidesLength,
          getSliderItemWidth = _this$core.getSliderItemWidth,
          getPerSlide = _this$core.getPerSlide,
          getSlideSize = _this$core.getSlideSize,
          getSliderMainWidth = _this$core.getSliderMainWidth,
          getIndex = _this$core.getIndex,
          setIndex = _this$core.setIndex;
      var infinite = getInfinite();
      var sliderItems = getSliderItems();
      var slidesLength = getSlidesLength();
      var slideSize = getSlideSize();
      var sliderItemWidth = getSliderItemWidth();
      var perSlide = getPerSlide();
      var sliderMainWidth = getSliderMainWidth();
      var index = getIndex(); // set width per slide

      (0, _utils.setSliderItemsChildWidth)({
        sliderItems: sliderItems,
        slider: slider,
        responsive: responsive,
        autoWidth: autoWidth
      }); // init slider position

      setIndex((0, _utils.setSliderItemsPosition)({
        indexItem: index,
        sliderItemWidth: sliderItemWidth,
        sliderItems: sliderItems,
        rtl: rtl
      }));

      if (!autoWidth) {
        (0, _partial.setPageNumberOnChild)({
          sliderItems: sliderItems,
          responsive: responsive
        }); // Clone group of slide from infinite carousel

        if (infinite) {
          var cloneNodeGeneratorParams = {
            perSlide: perSlide,
            sliderItems: sliderItems,
            wrapper: slider
          };
          (0, _partial.cloneNodeGenerator)(cloneNodeGeneratorParams);
        }

        (0, _utils.setActiveclassToCurrent)({
          sliderItems: sliderItems,
          perSlide: perSlide,
          slideSize: slideSize,
          sliderMainWidth: sliderMainWidth,
          index: getIndex(),
          infinite: infinite,
          slidesLength: slidesLength,
          autoWidth: autoWidth,
          freeScroll: freeScroll
        });
      } // add loaded class to main slide after init


      var classItemParams = {
        item: slider,
        className: "loaded"
      };
      (0, _utils.addClassToElement)(classItemParams);
    }
  }]);

  return SliderTrailer;
}();

exports["default"] = SliderTrailer;