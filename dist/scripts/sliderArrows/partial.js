"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftSlideNonDirAutoWidth = exports.shiftSlideNonDir = exports.shiftSlideIsDirAutoWidth = exports.shiftSlideIsDir = void 0;

var _utils = require("../utils");

/* eslint-disable no-use-before-define */
var shiftSlideIsDir = function shiftSlideIsDir(params) {
  var sliderItems = params.sliderItems,
      index = params.index,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      slidesLength = params.slidesLength,
      responsiveItem = params.responsiveItem,
      infinite = params.infinite,
      slider = params.slider,
      rtl = params.rtl,
      autoWidth = params.autoWidth;
  var FinalItemPosition = (0, _utils.calcFinalItemPosition)(params);

  if (autoWidth) {
    return shiftSlideIsDirAutoWidth({
      sliderItems: sliderItems,
      index: index,
      perSlide: perSlide,
      slideSize: slideSize,
      slidesLength: slidesLength,
      responsiveItem: responsiveItem,
      infinite: infinite,
      slider: slider,
      rtl: rtl,
      autoWidth: autoWidth,
      FinalItemPosition: FinalItemPosition
    });
  }

  var newIndex = index + perSlide; // when slidesLength <= perSlide arrow is disable

  if (slidesLength <= perSlide) {
    (0, _utils.nextNone)(slider);
    (0, _utils.prevBlock)(slider);
    return index;
  }

  if (!infinite && newIndex + perSlide - 1 >= slidesLength - 1 && responsiveItem !== 1) {
    var _result = (0, _utils.directionSetter)({
      rtl: rtl,
      input: FinalItemPosition
    });

    sliderItems.style.transform = (0, _utils.setTranslate3d)(_result);
    (0, _utils.nextNone)(slider);
    (0, _utils.prevBlock)(slider);
    return newIndex;
  } // when perSlide === 1


  if (!infinite && newIndex === slidesLength - 1) {
    (0, _utils.nextNone)(slider);
    (0, _utils.prevBlock)(slider);
  }

  var result = (0, _utils.directionSetter)({
    rtl: rtl,
    input: newIndex * -slideSize
  });
  sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
  return newIndex;
};

exports.shiftSlideIsDir = shiftSlideIsDir;

var shiftSlideNonDir = function shiftSlideNonDir(params) {
  var sliderItems = params.sliderItems,
      slideSize = params.slideSize,
      index = params.index,
      perSlide = params.perSlide,
      infinite = params.infinite,
      slider = params.slider,
      rtl = params.rtl,
      autoWidth = params.autoWidth,
      slidesLength = params.slidesLength;
  var firstItemPosition = (0, _utils.calcFirstItemPosition)(params);

  if (autoWidth) {
    return shiftSlideNonDirAutoWidth({
      sliderItems: sliderItems,
      slideSize: slideSize,
      index: index,
      perSlide: perSlide,
      infinite: infinite,
      slider: slider,
      rtl: rtl,
      autoWidth: autoWidth,
      slidesLength: slidesLength,
      firstItemPosition: firstItemPosition
    });
  }

  var newIndex = index - perSlide;
  var infinitperSlide = infinite ? perSlide : 0;

  if (!infinite && index - infinitperSlide <= perSlide && index !== -1) {
    var _result2 = (0, _utils.directionSetter)({
      rtl: rtl,
      input: firstItemPosition
    });

    sliderItems.style.transform = (0, _utils.setTranslate3d)(_result2);
    (0, _utils.nextBlock)(slider);
    (0, _utils.prevNone)(slider);
    return newIndex;
  }

  if (infinite && newIndex <= 0) {
    var infiniteIndex = newIndex + slidesLength;

    var _result3 = (0, _utils.directionSetter)({
      rtl: rtl,
      input: -infiniteIndex * slideSize
    });

    sliderItems.style.transform = (0, _utils.setTranslate3d)(_result3);
    return infiniteIndex;
  }

  var result = (0, _utils.directionSetter)({
    rtl: rtl,
    input: -newIndex * slideSize
  });
  sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
  return newIndex;
};

exports.shiftSlideNonDir = shiftSlideNonDir;

var shiftSlideNonDirAutoWidth = function shiftSlideNonDirAutoWidth(params) {
  var rtl = params.rtl,
      sliderMainWidth = params.sliderMainWidth,
      sliderItems = params.sliderItems,
      infinite = params.infinite,
      firstItemPosition = params.firstItemPosition,
      slider = params.slider,
      index = params.index;
  var result = (0, _utils.directionSetter)({
    rtl: rtl,
    input: Math.abs((0, _utils.getTranslate3d)(sliderItems)) - sliderMainWidth
  });

  if (!infinite && (!rtl && result <= firstItemPosition || rtl && result >= firstItemPosition)) {
    (0, _utils.nextBlock)(slider);
    (0, _utils.prevNone)(slider);
    sliderItems.style.transform = (0, _utils.setTranslate3d)(firstItemPosition);
    return index;
  }

  sliderItems.style.transform = (0, _utils.setTranslate3d)(-result);
  return index;
};

exports.shiftSlideNonDirAutoWidth = shiftSlideNonDirAutoWidth;

var shiftSlideIsDirAutoWidth = function shiftSlideIsDirAutoWidth(params) {
  var rtl = params.rtl,
      sliderMainWidth = params.sliderMainWidth,
      sliderItems = params.sliderItems,
      infinite = params.infinite,
      FinalItemPosition = params.FinalItemPosition,
      slider = params.slider,
      index = params.index;
  var result = (0, _utils.directionSetter)({
    rtl: rtl,
    input: sliderMainWidth + Math.abs((0, _utils.getTranslate3d)(sliderItems))
  });

  if (!infinite && Math.abs(result) >= Math.abs(FinalItemPosition)) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)((0, _utils.directionSetter)({
      rtl: rtl,
      input: FinalItemPosition
    }));
    (0, _utils.nextNone)(slider);
    (0, _utils.prevBlock)(slider);
    return index;
  }

  sliderItems.style.transform = (0, _utils.setTranslate3d)(-result);
  return index;
};

exports.shiftSlideIsDirAutoWidth = shiftSlideIsDirAutoWidth;