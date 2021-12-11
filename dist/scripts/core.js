"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

var _partial = require("./sliderArrows/partial");

var _index = _interopRequireDefault(require("./sliderDots/index"));

var _index2 = _interopRequireDefault(require("./slideTrailer/index"));

var _index3 = _interopRequireDefault(require("./sliderArrows/index"));

var _index4 = _interopRequireDefault(require("./dragEvent/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SliderCore = /*#__PURE__*/function () {
  function SliderCore(config) {
    var _this = this;

    _classCallCheck(this, SliderCore);

    _defineProperty(this, "setConfig", function (customConfig) {
      var slider = customConfig.slider,
          _customConfig$infinit = customConfig.infinite,
          infinite = _customConfig$infinit === void 0 ? false : _customConfig$infinit,
          _customConfig$horizon = customConfig.horizontal,
          horizontal = _customConfig$horizon === void 0 ? "default" : _customConfig$horizon,
          _customConfig$respons = customConfig.responsive,
          responsive = _customConfig$respons === void 0 ? {
        0: {
          items: 1
        }
      } : _customConfig$respons,
          _customConfig$prevArr = customConfig.prevArrow,
          prevArrow = _customConfig$prevArr === void 0 ? null : _customConfig$prevArr,
          _customConfig$nextArr = customConfig.nextArrow,
          nextArrow = _customConfig$nextArr === void 0 ? null : _customConfig$nextArr,
          _customConfig$customA = customConfig.customArrow,
          customArrow = _customConfig$customA === void 0 ? false : _customConfig$customA,
          _customConfig$nav = customConfig.nav,
          nav = _customConfig$nav === void 0 ? false : _customConfig$nav,
          _customConfig$dots = customConfig.dots,
          dots = _customConfig$dots === void 0 ? false : _customConfig$dots,
          _customConfig$autoPla = customConfig.autoPlay,
          autoPlay = _customConfig$autoPla === void 0 ? false : _customConfig$autoPla,
          _customConfig$rtl = customConfig.rtl,
          rtl = _customConfig$rtl === void 0 ? false : _customConfig$rtl,
          _customConfig$drag = customConfig.drag,
          drag = _customConfig$drag === void 0 ? true : _customConfig$drag,
          _customConfig$autoWid = customConfig.autoWidth,
          autoWidth = _customConfig$autoWid === void 0 ? false : _customConfig$autoWid,
          _customConfig$nextSpe = customConfig.nextSpeed,
          nextSpeed = _customConfig$nextSpe === void 0 ? 2000 : _customConfig$nextSpe,
          _customConfig$thresho = customConfig.threshold,
          threshold = _customConfig$thresho === void 0 ? 50 : _customConfig$thresho,
          _customConfig$freeScr = customConfig.freeScroll,
          freeScroll = _customConfig$freeScr === void 0 ? false : _customConfig$freeScr,
          _customConfig$paginat = customConfig.paginationWrapper,
          paginationWrapper = _customConfig$paginat === void 0 ? null : _customConfig$paginat,
          _customConfig$callBac = customConfig.callBack,
          callBack = _customConfig$callBac === void 0 ? function () {} : _customConfig$callBac,
          _customConfig$beforeC = customConfig.beforeChange,
          beforeChange = _customConfig$beforeC === void 0 ? function () {} : _customConfig$beforeC;
      _this.config = {
        slider: slider,
        infinite: infinite,
        responsive: responsive,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        customArrow: customArrow,
        nav: nav,
        dots: dots,
        autoPlay: autoPlay,
        rtl: rtl,
        drag: drag,
        autoWidth: autoWidth,
        nextSpeed: nextSpeed,
        threshold: threshold,
        horizontal: horizontal,
        freeScroll: freeScroll,
        callBack: callBack,
        paginationWrapper: paginationWrapper,
        beforeChange: beforeChange
      };
    });

    _defineProperty(this, "getConfig", function () {
      return _this.config;
    });

    _defineProperty(this, "setSlider", function (slider) {
      _this.slider = slider;
    });

    _defineProperty(this, "getSlider", function () {
      return _this.slider;
    });

    _defineProperty(this, "setPosX1", function (posX1) {
      _this.posX1 = posX1;
    });

    _defineProperty(this, "getPosX1", function () {
      return _this.posX1;
    });

    _defineProperty(this, "setIntervalId", function (intervalId) {
      _this.intervalId = intervalId;
    });

    _defineProperty(this, "getIntervalId", function () {
      return _this.intervalId;
    });

    _defineProperty(this, "setInfinite", function (infinite) {
      _this.infinite = infinite;
    });

    _defineProperty(this, "getInfinite", function () {
      return _this.infinite;
    });

    _defineProperty(this, "setDrag", function (drag) {
      _this.drag = drag;
    });

    _defineProperty(this, "getDrag", function () {
      return _this.drag;
    });

    _defineProperty(this, "setPosX2", function (posX2) {
      _this.posX2 = posX2;
    });

    _defineProperty(this, "getPosX2", function () {
      return _this.posX2;
    });

    _defineProperty(this, "setPerSlide", function (perSlide) {
      _this.perSlide = perSlide;
    });

    _defineProperty(this, "getPerSlide", function () {
      return _this.perSlide;
    });

    _defineProperty(this, "setSliderItems", function (sliderItems) {
      _this.sliderItems = sliderItems;
    });

    _defineProperty(this, "getSliderItems", function () {
      return _this.sliderItems;
    });

    _defineProperty(this, "setPosInitial", function (posInitial) {
      _this.posInitial = posInitial;
    });

    _defineProperty(this, "getPosInitial", function () {
      return _this.posInitial;
    });

    _defineProperty(this, "setPosFinal", function (posFinal) {
      _this.posFinal = posFinal;
    });

    _defineProperty(this, "getPosFinal", function () {
      return _this.posFinal;
    });

    _defineProperty(this, "setSlidesLength", function (slidesLength) {
      _this.slidesLength = slidesLength;
    });

    _defineProperty(this, "getSlidesLength", function () {
      return _this.slidesLength;
    });

    _defineProperty(this, "setSliderMainWidth", function (sliderMainWidth) {
      _this.sliderMainWidth = sliderMainWidth;
    });

    _defineProperty(this, "getSliderMainWidth", function () {
      return _this.sliderMainWidth;
    });

    _defineProperty(this, "setOrginSlider", function (orginSlider) {
      _this.orginSlider = orginSlider;
    });

    _defineProperty(this, "getOrginSlider", function () {
      return _this.orginSlider;
    });

    _defineProperty(this, "setSlideSize", function (slideSize) {
      _this.slideSize = slideSize;
    });

    _defineProperty(this, "getSlideSize", function () {
      return _this.slideSize;
    });

    _defineProperty(this, "setSliderItemWidth", function (sliderItemWidth) {
      _this.sliderItemWidth = sliderItemWidth;
    });

    _defineProperty(this, "getSliderItemWidth", function () {
      return _this.sliderItemWidth;
    });

    _defineProperty(this, "setIndex", function (index) {
      _this.index = index;
    });

    _defineProperty(this, "getIndex", function () {
      return _this.index;
    });

    _defineProperty(this, "setAllowShift", function (allowShift) {
      _this.allowShift = allowShift;
    });

    _defineProperty(this, "getAllowShift", function () {
      return _this.allowShift;
    });

    _defineProperty(this, "initialize", function () {
      var _this$getConfig = _this.getConfig(),
          slider = _this$getConfig.slider,
          infinite = _this$getConfig.infinite,
          responsive = _this$getConfig.responsive,
          nav = _this$getConfig.nav,
          dots = _this$getConfig.dots,
          autoPlay = _this$getConfig.autoPlay,
          rtl = _this$getConfig.rtl,
          drag = _this$getConfig.drag,
          nextSpeed = _this$getConfig.nextSpeed,
          customArrow = _this$getConfig.customArrow,
          autoWidth = _this$getConfig.autoWidth,
          horizontal = _this$getConfig.horizontal,
          paginationWrapper = _this$getConfig.paginationWrapper; // reset Slider


      var mainSlider = slider;
      var mainSliderClone = mainSlider.cloneNode(true);

      _this.setSlider(mainSliderClone);

      (0, _utils.removeAllChildren)({
        wrapper: slider,
        className: "clone"
      }); // ----------- start init variables  -----

      _this.setSlider(slider);

      var sliderClienWidth = _this.getSlider().getBoundingClientRect().width;

      _this.setSliderMainWidth(sliderClienWidth);

      var sliderSlidesSelector = (0, _utils.childFider)({
        wrapper: slider,
        className: ".slides"
      });

      _this.setSliderItems(sliderSlidesSelector);

      var sliderChildWidth = (0, _utils.calcSliderChildWidth)({
        responsiveItemCount: (0, _utils.responsiveItemCount)(responsive),
        slider: _this.getSlider()
      });

      _this.setSlideSize(sliderChildWidth);

      var sliderItemWidth = (0, _utils.calcSliderChildWidth)({
        responsiveItemCount: (0, _utils.responsiveItemCount)(responsive),
        slider: _this.getSlider()
      });

      _this.setSliderItemWidth(sliderItemWidth); // init slider for start


      var slides = (0, _utils.vdomArrayConvertor)(sliderSlidesSelector.children);
      var sliderLength = slides.length;

      _this.setSlidesLength(sliderLength);

      var perSlide = (0, _utils.switchInfiniteResponsiveCount)((0, _utils.truncResponsiveItemCount)(responsive), infinite);

      _this.setPerSlide(perSlide);

      var infCheck = (0, _utils.infiniteChecker)({
        infinite: infinite,
        perSlide: perSlide,
        sliderLength: sliderLength
      });

      _this.setInfinite(infCheck);

      var dragCheck = (0, _utils.dragChecker)({
        drag: drag,
        perSlide: (0, _utils.truncResponsiveItemCount)(responsive),
        sliderLength: sliderLength
      });

      _this.setDrag(dragCheck); // set init index


      if (infCheck) {
        _this.setIndex(perSlide + 1);
      } else {
        _this.setIndex(0);
      }

      if (rtl) {
        var classItemParams = {
          item: slider,
          className: "slider-rtl"
        };
        (0, _utils.addClassToElement)(classItemParams);
      }

      if (nav) {
        if (!customArrow) {
          (0, _utils.elementCreator)({
            tag: "Span",
            wrapper: slider,
            className: "control next"
          });
          (0, _utils.elementCreator)({
            tag: "Span",
            wrapper: slider,
            className: "control prev"
          });
        }

        _this.sliderArrows = new _index3["default"]({
          core: _this
        });

        var index = _this.getIndex();

        if (sliderLength <= (0, _utils.truncResponsiveItemCount)(responsive) || autoWidth && (0, _utils.calcAutoWidthAllSliderItems)(_this.sliderItems) <= _this.sliderMainWidth) {
          (0, _utils.prevNone)(slider);
          (0, _utils.nextNone)(slider);
        }

        if (!infCheck) {
          if (index === 0) {
            (0, _utils.prevNone)(slider);
          }
        }
      }

      if (dots || paginationWrapper && paginationWrapper.current) {
        if (dots) {
          (0, _utils.elementCreator)({
            tag: "Ul",
            wrapper: slider,
            className: "dots"
          });
        }

        _this.sliderDots = new _index["default"]({
          core: _this
        });
      }

      if (autoPlay) {
        var isIntervalRunning = false;
        var time = nextSpeed || 2000;

        var intervalNext = function intervalNext() {
          isIntervalRunning = true;

          _this.next();
        };

        var intervalPlay = function intervalPlay() {
          clearInterval(_this.getIntervalId()); // Clearing interval if for some reason it has not been cleared yet

          if (!isIntervalRunning) {
            _this.setIntervalId(setInterval(intervalNext, time));
          }
        };

        var intervalPause = function intervalPause() {
          clearInterval(_this.getIntervalId()); // Clearing interval on window blur

          isIntervalRunning = false;
        }; // toggle on mouseHover


        slider.addEventListener("touchstart", intervalPause);
        slider.addEventListener("touchmove", intervalPause);
        slider.addEventListener("mouseover", intervalPause);
        slider.addEventListener("mouseout", intervalPlay); // toggle on blur and focus browser window tab

        window.addEventListener("blur", intervalPause);
        window.addEventListener("focus", intervalPlay);

        if (!_this.getIntervalId()) {
          intervalPlay();
        }
      }

      _this.sliderTrailer = new _index2["default"]({
        core: _this
      }); // action drag event

      _this.dragEvent = new _index4["default"]({
        core: _this
      });
      sliderSlidesSelector.addEventListener("transitionend", function (e) {
        if (e.target !== sliderSlidesSelector) return;

        _this.transitionendWatcherCall();
      }); // active center mode

      if (horizontal === "center" && sliderLength < (0, _utils.truncResponsiveItemCount)(responsive)) {
        var freeItems = (0, _utils.truncResponsiveItemCount)(responsive) - sliderLength;
        var freeSpace = (0, _utils.directionSetter)({
          rtl: rtl,
          input: freeItems * sliderItemWidth / 2
        });
        _this.sliderItems.style.transform = (0, _utils.setTranslate3d)(freeSpace);
      }

      _this.windowResizeWatcher();
    });

    _defineProperty(this, "transitionendWatcherCall", function () {
      var _this$config = _this.config,
          slider = _this$config.slider,
          responsive = _this$config.responsive,
          dots = _this$config.dots,
          nav = _this$config.nav,
          rtl = _this$config.rtl,
          autoWidth = _this$config.autoWidth,
          infinite = _this$config.infinite,
          freeScroll = _this$config.freeScroll,
          callBack = _this$config.callBack,
          beforeChange = _this$config.beforeChange,
          index = _this.index,
          sliderItems = _this.sliderItems,
          slideSize = _this.slideSize,
          sliderMainWidth = _this.sliderMainWidth,
          slidesLength = _this.slidesLength,
          sliderItemWidth = _this.sliderItemWidth,
          setIndex = _this.setIndex,
          setAllowShift = _this.setAllowShift;
      (0, _utils.transitionendWatcher)({
        responsive: responsive,
        infinite: infinite,
        slider: slider,
        rtl: rtl,
        index: index,
        sliderItems: sliderItems,
        slideSize: slideSize,
        sliderMainWidth: sliderMainWidth,
        dots: dots,
        slidesLength: slidesLength,
        sliderItemWidth: sliderItemWidth,
        nav: nav,
        autoWidth: autoWidth,
        freeScroll: freeScroll,
        setAllowShift: setAllowShift,
        setIndex: setIndex,
        callBack: callBack,
        beforeChange: beforeChange
      });
    });

    _defineProperty(this, "windowResizeWatcher", function () {
      var resizeTimer;

      window.onresize = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          _this.initialize();
        }, 250);
      };
    });

    this.setConfig(config);
    this.initialize();
  }

  _createClass(SliderCore, [{
    key: "goToShowingSlide",
    value: function goToShowingSlide(newPosition) {
      var _this$config2 = this.config,
          responsive = _this$config2.responsive,
          rtl = _this$config2.rtl,
          infinite = _this$config2.infinite,
          slider = _this$config2.slider,
          nav = _this$config2.nav,
          autoWidth = _this$config2.autoWidth,
          getSliderItems = this.getSliderItems,
          transitionendWatcherCall = this.transitionendWatcherCall,
          getSliderItemWidth = this.getSliderItemWidth,
          setIndex = this.setIndex,
          setPosInitial = this.setPosInitial,
          getSlidesLength = this.getSlidesLength,
          slideSize = this.slideSize,
          sliderMainWidth = this.sliderMainWidth,
          perSlide = this.perSlide;

      if (getSlidesLength() <= (0, _utils.responsiveItemCount)(responsive)) {
        return false;
      }

      var sliderItems = getSliderItems();
      var newIndex = infinite ? newPosition + (0, _utils.responsiveItemCount)(responsive) + 1 : newPosition;
      var result = (0, _utils.directionSetter)({
        rtl: rtl,
        input: -getSliderItemWidth() * newIndex
      });
      var finalItemPosition = (0, _utils.calcFinalItemPosition)({
        indexItem: newIndex,
        slideSize: slideSize,
        sliderItems: sliderItems,
        sliderMainWidth: sliderMainWidth,
        perSlide: perSlide,
        slidesLength: getSlidesLength(),
        infinite: infinite,
        slider: slider,
        nav: nav,
        rtl: rtl,
        autoWidth: autoWidth
      });

      if (Math.abs(result) < Math.abs(finalItemPosition)) {
        sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
        setIndex(newIndex);
        setPosInitial(result);
        setTimeout(function () {
          transitionendWatcherCall();
        }, 0);
        return newIndex;
      }

      sliderItems.style.transform = (0, _utils.setTranslate3d)(-finalItemPosition);
      setIndex(newIndex);
      setPosInitial(-finalItemPosition);
      setTimeout(function () {
        transitionendWatcherCall();
      }, 0);
      return newIndex;
    }
  }, {
    key: "refresh",
    value: function refresh(flag) {
      if (flag) {
        this.initialize();
      }
    }
  }, {
    key: "next",
    value: function next() {
      var sliderItems = this.sliderItems,
          index = this.index,
          perSlide = this.perSlide,
          slideSize = this.slideSize,
          slidesLength = this.slidesLength,
          sliderMainWidth = this.sliderMainWidth,
          getInfinite = this.getInfinite,
          _this$config3 = this.config,
          slider = _this$config3.slider,
          responsive = _this$config3.responsive,
          rtl = _this$config3.rtl,
          autoWidth = _this$config3.autoWidth;
      var classItemParams = {
        item: (0, _utils.childFider)({
          wrapper: slider,
          className: ".slides"
        }),
        className: "shifting"
      };
      (0, _utils.addClassToElement)(classItemParams);
      this.setIndex((0, _partial.shiftSlideIsDir)({
        sliderItems: sliderItems,
        index: index,
        perSlide: perSlide,
        slideSize: slideSize,
        slidesLength: slidesLength,
        sliderMainWidth: sliderMainWidth,
        responsiveItem: (0, _utils.responsiveItemCount)(responsive),
        infinite: getInfinite(),
        slider: slider,
        rtl: rtl,
        autoWidth: autoWidth
      }));
    }
  }]);

  return SliderCore;
}();

var _default = SliderCore;
exports["default"] = _default;