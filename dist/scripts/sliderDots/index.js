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

var SliderDots = /*#__PURE__*/function () {
  function SliderDots(params) {
    _classCallCheck(this, SliderDots);

    var core = params.core;
    this.setCore(core);
    this.initialize();
  }

  _createClass(SliderDots, [{
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
    key: "setDotsSelector",
    value: function setDotsSelector(dotsSelector) {
      this.dotsSelector = dotsSelector;
    }
  }, {
    key: "getDotsSelector",
    value: function getDotsSelector() {
      return this.dotsSelector;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this$core = this.core,
          _this$core$config = _this$core.config,
          slider = _this$core$config.slider,
          responsive = _this$core$config.responsive,
          nav = _this$core$config.nav,
          rtl = _this$core$config.rtl,
          autoWidth = _this$core$config.autoWidth,
          paginationWrapper = _this$core$config.paginationWrapper,
          getInfinite = _this$core.getInfinite,
          getSlidesLength = _this$core.getSlidesLength,
          getSliderItemWidth = _this$core.getSliderItemWidth,
          getSliderMainWidth = _this$core.getSliderMainWidth,
          getSliderItems = _this$core.getSliderItems,
          getSlider = _this$core.getSlider,
          getSlideSize = _this$core.getSlideSize,
          setIndex = _this$core.setIndex,
          setAllowShift = _this$core.setAllowShift,
          setPosInitial = _this$core.setPosInitial;
      var sliderItems = getSliderItems();
      var dotsSelector = paginationWrapper ? paginationWrapper.current.querySelector(".slides") : (0, _utils.childFider)({
        wrapper: slider,
        className: ".dots"
      });

      if (!paginationWrapper) {
        // generate dots items
        var dotsItemsParams = {
          slidesLength: getSlidesLength(),
          responsive: responsive,
          dotsSelector: dotsSelector,
          sliderItems: sliderItems,
          autoWidth: autoWidth,
          sliderMainWidth: getSliderMainWidth()
        };
        (0, _partial.dotsItemsGenerator)(dotsItemsParams);
      } // generate dots group per show slides
      // dots item click for transition on active index


      (0, _utils.vdomArrayConvertor)(dotsSelector.children).forEach(function (item) {
        item.addEventListener("click", function () {
          var dotIndex = parseInt(item.getAttribute("data-dot-index"), 10);
          var indexItem = (0, _utils.truncResponsiveItemCount)(responsive) * (dotIndex - 1);
          var dotsItemsClickParams = {
            indexItem: indexItem,
            sliderItemWidth: getSliderItemWidth(),
            sliderMainWidth: getSliderMainWidth(),
            sliderItems: sliderItems,
            slider: getSlider(),
            slideSize: getSlideSize(),
            slidesLength: getSlidesLength(),
            perSlide: (0, _utils.truncResponsiveItemCount)(responsive),
            infinite: getInfinite(),
            dotIndex: dotIndex,
            responsive: responsive,
            getSliderItems: getSliderItems,
            nav: nav,
            rtl: rtl,
            item: item,
            autoWidth: autoWidth
          };

          var _dotsItemsClick = (0, _partial.dotsItemsClick)(dotsItemsClickParams),
              index = _dotsItemsClick.index,
              allowShift = _dotsItemsClick.allowShift,
              posInitial = _dotsItemsClick.posInitial;

          setIndex(index);
          setAllowShift(allowShift);
          setPosInitial(posInitial);
        });
      });
    }
  }]);

  return SliderDots;
}();

exports["default"] = SliderDots;