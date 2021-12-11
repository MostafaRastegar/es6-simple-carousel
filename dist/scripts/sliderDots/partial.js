"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSliderItemsPositionAfterDotClick = exports.dotsItemsGenerator = exports.dotsItemsClick = exports.AfterDotClickAutoWidth = void 0;

var _utils = require("../utils");

/* eslint-disable no-use-before-define */

/* eslint-disable no-plusplus */
var dotsItemsGenerator = function dotsItemsGenerator(params) {
  var dotsSelector = params.dotsSelector;

  for (var i = 0; i < (0, _utils.calcSliderGroupCount)(params); i++) {
    dotsSelector.innerHTML += "<li class=\"dots-item".concat(!i ? ' active' : '', "\" data-dot-index=\"").concat(i + 1, "\">").concat(i + 1, "</li>");
  }

  return dotsSelector;
};

exports.dotsItemsGenerator = dotsItemsGenerator;

var dotsItemsClick = function dotsItemsClick(params) {
  var indexItem = params.indexItem,
      perSlide = params.perSlide,
      sliderItems = params.sliderItems,
      infinite = params.infinite,
      getSliderItems = params.getSliderItems,
      item = params.item;
  setSliderItemsPositionAfterDotClick(params);
  var isActive = item.classList.contains('active');
  var allowShift = true;

  if (!isActive) {
    var itemClassParams = {
      item: getSliderItems(),
      className: 'shifting'
    };
    (0, _utils.addClassToElement)(itemClassParams);
    allowShift = false;
  }

  return {
    index: infinite ? indexItem + perSlide + 1 : indexItem,
    allowShift: allowShift,
    posInitial: (0, _utils.getTranslate3d)(sliderItems)
  };
}; // eslint-disable-next-line consistent-return


exports.dotsItemsClick = dotsItemsClick;

var setSliderItemsPositionAfterDotClick = function setSliderItemsPositionAfterDotClick(params) {
  var indexItem = params.indexItem,
      slideSize = params.slideSize,
      sliderItems = params.sliderItems,
      sliderMainWidth = params.sliderMainWidth,
      perSlide = params.perSlide,
      slidesLength = params.slidesLength,
      infinite = params.infinite,
      slider = params.slider,
      nav = params.nav,
      rtl = params.rtl,
      autoWidth = params.autoWidth;
  var finalItemPosition = (0, _utils.calcFinalItemPosition)(params); // when slidesLength <= perSlide dots is disable

  if (slidesLength <= perSlide || autoWidth && (0, _utils.calcAutoWidthAllSliderItems)(sliderItems) <= sliderMainWidth) {
    return false;
  }

  if (autoWidth) {
    AfterDotClickAutoWidth(params);
  }

  if (!autoWidth) {
    if (!infinite && indexItem + perSlide >= slidesLength) {
      var _result = (0, _utils.directionSetter)({
        rtl: rtl,
        input: finalItemPosition
      });

      sliderItems.style.transform = (0, _utils.setTranslate3d)(_result);

      if (nav) {
        (0, _utils.nextNone)(slider);
        (0, _utils.prevBlock)(slider);
      }

      return true;
    } // after time move to watcher


    if (nav) {
      (0, _utils.nextBlock)(slider);
      (0, _utils.prevBlock)(slider);
    }

    if (!infinite && nav && indexItem === 0) {
      (0, _utils.nextBlock)(slider);
      (0, _utils.prevNone)(slider);
    }

    var newItemIndex = infinite ? indexItem + perSlide + 1 : indexItem;
    var result = (0, _utils.directionSetter)({
      rtl: rtl,
      input: newItemIndex * -slideSize
    });
    sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
  }
};

exports.setSliderItemsPositionAfterDotClick = setSliderItemsPositionAfterDotClick;

var AfterDotClickAutoWidth = function AfterDotClickAutoWidth(params) {
  var sliderItems = params.sliderItems,
      sliderMainWidth = params.sliderMainWidth,
      slider = params.slider,
      nav = params.nav,
      rtl = params.rtl,
      dotIndex = params.dotIndex;
  var firstItemPosition = (0, _utils.calcFirstItemPosition)(params);
  var finalItemPosition = (0, _utils.calcFinalItemPosition)(params);

  if (dotIndex * sliderMainWidth >= Math.abs((0, _utils.calcAutoWidthAllSliderItems)(sliderItems))) {
    var _result2 = (0, _utils.directionSetter)({
      rtl: rtl,
      input: finalItemPosition
    });

    sliderItems.style.transform = (0, _utils.setTranslate3d)(_result2);

    if (nav) {
      (0, _utils.nextNone)(slider);
      (0, _utils.prevBlock)(slider);
    }

    return true;
  }

  if ((dotIndex - 1) * sliderMainWidth === firstItemPosition) {
    (0, _utils.nextBlock)(slider);
    (0, _utils.prevNone)(slider);
  }

  var result = (0, _utils.directionSetter)({
    rtl: rtl,
    input: (dotIndex - 1) * -sliderMainWidth
  });
  sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
  return result;
};

exports.AfterDotClickAutoWidth = AfterDotClickAutoWidth;