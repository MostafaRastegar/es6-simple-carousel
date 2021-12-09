"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vdomArrayConvertor = exports.truncResponsiveItemCount = exports.transitionendWatcher = exports.switchInfiniteResponsiveCount = exports.sorter = exports.sliderClientWidth = exports.setTranslate3d = exports.setSliderItemsPosition = exports.setSliderItemsChildWidth = exports.setActiveclassToCurrent = exports.responsiveItemCount = exports.removeClassFromElement = exports.removeAllChildren = exports.prevNone = exports.prevBlock = exports.nextNone = exports.nextBlock = exports.isFloat = exports.infiniteChecker = exports.getTranslate3d = exports.elementCreator = exports.dragChecker = exports.dotActive = exports.directionSetter = exports.childFider = exports.calcSliderGroupCount = exports.calcSliderChildWidth = exports.calcFirstItemPosition = exports.calcFinalWithoutAutoWidth = exports.calcFinalWidthAutoWidth = exports.calcFinalItemPosition = exports.calcCurrentIndex = exports.calcAutoWidthAllSliderItems = exports.arrGenerator = exports.addClassToElement = exports.activeChecker = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-use-before-define */
var addClassToElement = function addClassToElement(params) {
  var item = params.item,
      className = params.className;
  item.classList.add(className);
  return item;
};

exports.addClassToElement = addClassToElement;

var removeClassFromElement = function removeClassFromElement(params) {
  var item = params.item,
      className = params.className;
  item.classList.remove(className);
  return item;
};

exports.removeClassFromElement = removeClassFromElement;

var isFloat = function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}; // eslint-disable-next-line consistent-return


exports.isFloat = isFloat;

var calcCurrentIndex = function calcCurrentIndex(params) {
  var sliderItems = params.sliderItems,
      infinite = params.infinite,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      slidesLength = params.slidesLength,
      freeScroll = params.freeScroll,
      autoWidth = params.autoWidth,
      responsiveItemCount = params.responsiveItemCount;
  var getIndex = getTranslate3d(sliderItems) / vdomArrayConvertor(sliderItems.children)[0].clientWidth;

  if (infinite) {
    if (getIndex >= 0) return Math.round(getIndex);

    if (getIndex < 0) {
      return slidesLength + Math.round(getIndex);
    }
  }

  if (Math.abs(getTranslate3d(sliderItems)) <= 1) {
    return 0;
  }

  if (Math.abs(getTranslate3d(sliderItems)) > 0) {
    var scroll = Math.abs(getTranslate3d(sliderItems));

    if (!freeScroll && !autoWidth && !isFloat(responsiveItemCount)) {
      return Math.round((scroll + sliderMainWidth) / slideSize - perSlide);
    }

    return Math.trunc((scroll + sliderMainWidth) / slideSize - perSlide);
  }
};

exports.calcCurrentIndex = calcCurrentIndex;

var setActiveclassToCurrent = function setActiveclassToCurrent(params) {
  var sliderItems = params.sliderItems,
      perSlide = params.perSlide;
  var activeIndex = calcCurrentIndex(params);
  var activeItems = [];

  _toConsumableArray(Array(perSlide).keys()).forEach(function (item) {
    return activeItems.push(item + activeIndex);
  });

  vdomArrayConvertor(sliderItems.children).forEach(function (item, itemIndex) {
    var classItemParams = {
      item: item,
      className: "active"
    };

    if (activeItems.includes(itemIndex)) {
      addClassToElement(classItemParams);
    } else {
      removeClassFromElement(classItemParams);
    }
  });
};

exports.setActiveclassToCurrent = setActiveclassToCurrent;

var sliderClientWidth = function sliderClientWidth(slider) {
  return slider.clientWidth;
};

exports.sliderClientWidth = sliderClientWidth;

var truncResponsiveItemCount = function truncResponsiveItemCount(responsive) {
  return Math.trunc(responsiveItemCount(responsive));
};

exports.truncResponsiveItemCount = truncResponsiveItemCount;

var calcFinalItemPosition = function calcFinalItemPosition(params) {
  var autoWidth = params.autoWidth;

  if (autoWidth) {
    return calcFinalWidthAutoWidth(params);
  }

  return calcFinalWithoutAutoWidth(params);
};

exports.calcFinalItemPosition = calcFinalItemPosition;

var calcFinalWidthAutoWidth = function calcFinalWidthAutoWidth(params) {
  var sliderMainWidth = params.sliderMainWidth,
      sliderItems = params.sliderItems;
  return sliderMainWidth - calcAutoWidthAllSliderItems(sliderItems);
};

exports.calcFinalWidthAutoWidth = calcFinalWidthAutoWidth;

var calcFinalWithoutAutoWidth = function calcFinalWithoutAutoWidth(params) {
  var slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      perSlide = params.perSlide,
      slidesLength = params.slidesLength,
      infinite = params.infinite;
  var infiniteSlideLength = infinite ? slidesLength + perSlide + 1 : slidesLength;
  var box = perSlide * slideSize;
  var cost = sliderMainWidth - box;
  var finalResult = (infiniteSlideLength - perSlide) * slideSize - cost;
  return -finalResult;
};

exports.calcFinalWithoutAutoWidth = calcFinalWithoutAutoWidth;

var calcFirstItemPosition = function calcFirstItemPosition(params) {
  var slideSize = params.slideSize,
      perSlide = params.perSlide,
      infinite = params.infinite,
      autoWidth = params.autoWidth;

  if (autoWidth) {
    return 0;
  }

  var infiSwitchSlideSize = infinite ? slideSize : 0;
  return -(infiSwitchSlideSize * (perSlide + 1));
};

exports.calcFirstItemPosition = calcFirstItemPosition;

var calcSliderGroupCount = function calcSliderGroupCount(params) {
  var slidesLength = params.slidesLength,
      responsive = params.responsive,
      autoWidth = params.autoWidth,
      sliderItems = params.sliderItems,
      sliderMainWidth = params.sliderMainWidth;

  if (autoWidth) {
    return Math.ceil(calcAutoWidthAllSliderItems(sliderItems) / sliderMainWidth);
  }

  return Math.ceil(slidesLength / truncResponsiveItemCount(responsive));
};

exports.calcSliderGroupCount = calcSliderGroupCount;

var calcSliderChildWidth = function calcSliderChildWidth(params) {
  var responsiveItemCount = params.responsiveItemCount,
      slider = params.slider;
  return sliderClientWidth(slider) / responsiveItemCount;
};

exports.calcSliderChildWidth = calcSliderChildWidth;

var setSliderItemsChildWidth = function setSliderItemsChildWidth(params) {
  var responsive = params.responsive,
      slider = params.slider,
      sliderItems = params.sliderItems,
      autoWidth = params.autoWidth;
  vdomArrayConvertor(sliderItems.children).forEach(function (child) {
    var newChild = child;
    /* eslint-disable indent */

    newChild.style.width = !autoWidth ? "".concat(calcSliderChildWidth({
      responsiveItemCount: responsiveItemCount(responsive),
      slider: slider
    }), "px") : "auto";
    /* eslint-enable indent */
  });
};

exports.setSliderItemsChildWidth = setSliderItemsChildWidth;

var calcAutoWidthAllSliderItems = function calcAutoWidthAllSliderItems(sliderItems) {
  var allChildWidth = 0;
  vdomArrayConvertor(sliderItems.children).forEach(function (child) {
    allChildWidth += child.offsetWidth;
  });
  return allChildWidth;
};

exports.calcAutoWidthAllSliderItems = calcAutoWidthAllSliderItems;

var setSliderItemsPosition = function setSliderItemsPosition(params) {
  var indexItem = params.indexItem,
      sliderItemWidth = params.sliderItemWidth,
      sliderItems = params.sliderItems,
      rtl = params.rtl;
  var result = directionSetter({
    rtl: rtl,
    input: indexItem * -sliderItemWidth
  });
  sliderItems.style.transform = setTranslate3d(result);
  return indexItem;
};

exports.setSliderItemsPosition = setSliderItemsPosition;

var directionSetter = function directionSetter(params) {
  var rtl = params.rtl,
      input = params.input;

  if (rtl) {
    return -input;
  }

  return input;
};

exports.directionSetter = directionSetter;

var setTranslate3d = function setTranslate3d(getValue) {
  return "translate3d(".concat(getValue, "px,0px,0px)");
};

exports.setTranslate3d = setTranslate3d;

var getTranslate3d = function getTranslate3d(sliderItems) {
  var values = sliderItems.style.transform.match(/translate3d\((.*)px, (.*)px, (.*)px\)/);

  if (!values[1] || !values[1].length) {
    return 0;
  }

  return parseFloat(values[1]);
};

exports.getTranslate3d = getTranslate3d;

var arrGenerator = function arrGenerator(arr, part) {
  var partTrunc = Math.trunc(part);
  var round = Math.ceil(arr.length / partTrunc);
  var counter = 0;
  var newArry = []; // eslint-disable-next-line no-plusplus

  for (counter; round > counter; counter++) {
    newArry[counter] = arr.slice(counter * partTrunc, (counter + 1) * partTrunc);
  }

  return newArry;
};

exports.arrGenerator = arrGenerator;

var sorter = function sorter(a, b) {
  if (a < b) return -1; // any negative number works

  if (a > b) return 1; // any positive number works

  return 0; // equal values MUST yield zero
};

exports.sorter = sorter;

var responsiveItemCount = function responsiveItemCount(getConfig) {
  var resp = Object.keys(getConfig).map(function (el) {
    return parseInt(el, 10);
  });
  var newResp = resp.sort(sorter).filter(function (item) {
    return item <= document.body.clientWidth;
  });
  return getConfig[parseInt(newResp.pop(), 10)].items;
};

exports.responsiveItemCount = responsiveItemCount;

var switchInfiniteResponsiveCount = function switchInfiniteResponsiveCount(itemCont, infinite) {
  return infinite ? itemCont : 0;
};

exports.switchInfiniteResponsiveCount = switchInfiniteResponsiveCount;

var prevNone = function prevNone(slider) {
  var childFind = childFider({
    wrapper: slider,
    className: ".prev"
  });
  childFind.style.display = "none";
  return childFind;
};

exports.prevNone = prevNone;

var prevBlock = function prevBlock(slider) {
  var childFind = childFider({
    wrapper: slider,
    className: ".prev"
  });
  childFind.style.display = "flex";
  return childFind;
};

exports.prevBlock = prevBlock;

var nextNone = function nextNone(slider) {
  var childFind = childFider({
    wrapper: slider,
    className: ".next"
  });
  childFind.style.display = "none";
  return childFind;
};

exports.nextNone = nextNone;

var nextBlock = function nextBlock(slider) {
  var childFind = childFider({
    wrapper: slider,
    className: ".next"
  });
  childFind.style.display = "flex";
  return childFind;
};

exports.nextBlock = nextBlock;

var transitionendWatcher = function transitionendWatcher(params) {
  var responsive = params.responsive,
      infinite = params.infinite,
      slider = params.slider,
      rtl = params.rtl,
      index = params.index,
      sliderItems = params.sliderItems,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      setAllowShift = params.setAllowShift,
      dots = params.dots,
      slidesLength = params.slidesLength,
      sliderItemWidth = params.sliderItemWidth,
      nav = params.nav,
      setIndex = params.setIndex,
      autoWidth = params.autoWidth,
      freeScroll = params.freeScroll,
      callBack = params.callBack,
      beforeChange = params.beforeChange;
  beforeChange(index);
  var perSlide = truncResponsiveItemCount(responsive);
  var calcIndex = calcCurrentIndex({
    infinite: infinite,
    perSlide: truncResponsiveItemCount(responsive),
    slidesLength: slidesLength,
    slideSize: slideSize,
    sliderMainWidth: sliderMainWidth,
    slider: slider,
    sliderItems: sliderItems,
    freeScroll: freeScroll,
    autoWidth: autoWidth
  });
  setIndex(calcIndex);

  if (infinite && !autoWidth && calcIndex > perSlide + slidesLength && Math.abs(getTranslate3d(sliderItems)) >= (perSlide + 1 + slidesLength) * sliderItemWidth) {
    return setIndex(setSliderItemsPosition({
      indexItem: calcIndex - slidesLength,
      sliderItemWidth: sliderItemWidth,
      sliderItems: sliderItems,
      rtl: rtl
    }));
  } // if page-index === 1 && clone === true


  if (infinite && !autoWidth && calcIndex === perSlide + 1 + slidesLength) {
    return setIndex(setSliderItemsPosition({
      indexItem: perSlide + 1,
      sliderItemWidth: sliderItemWidth,
      sliderItems: sliderItems,
      rtl: rtl
    }));
  } // shift to end from start item


  if (infinite && !autoWidth && (Math.abs(getTranslate3d(sliderItems)) <= 1 || Math.abs(getTranslate3d(sliderItems)) === sliderItemWidth)) {
    return setIndex(setSliderItemsPosition({
      indexItem: slidesLength + calcIndex,
      sliderItemWidth: sliderItemWidth,
      sliderItems: sliderItems,
      rtl: rtl
    }));
  }

  if (!infinite && nav) {
    var finalPos = {
      slideSize: slideSize,
      sliderMainWidth: sliderMainWidth,
      perSlide: perSlide,
      slidesLength: slidesLength,
      infinite: infinite,
      autoWidth: autoWidth,
      sliderItems: sliderItems
    };
    var finalConst = Math.abs(Math.trunc(calcFinalItemPosition(finalPos)));
    var firstConst = Math.abs(Math.trunc(calcFirstItemPosition(finalPos)));
    var translate3dConst = Math.abs(Math.trunc(getTranslate3d(sliderItems)));
    var showNext = true;
    var showPrev = true;

    if (finalConst <= translate3dConst + 50) {
      showNext = false;
    }

    if (!autoWidth) {
      if (index === 0) {
        showPrev = false;
      }
    }

    if (firstConst >= translate3dConst - 50) {
      showPrev = false;
    }

    if (showNext) {
      nextBlock(slider);
    } else {
      nextNone(slider);
    }

    if (showPrev) {
      prevBlock(slider);
    } else {
      prevNone(slider);
    }
  } // run for set active class


  removeClassFromElement({
    item: sliderItems,
    className: "shifting"
  });

  if (!autoWidth) {
    setActiveclassToCurrent({
      index: index,
      sliderItems: sliderItems,
      perSlide: perSlide,
      infinite: infinite,
      slideSize: slideSize,
      sliderMainWidth: sliderMainWidth,
      autoWidth: autoWidth,
      freeScroll: freeScroll
    });
  }

  setAllowShift(true);

  if (dots) {
    dotActive(params);
  }

  callBack(calcIndex);
  return calcIndex;
};

exports.transitionendWatcher = transitionendWatcher;

var dotActive = function dotActive(params) {
  var sliderItems = params.sliderItems,
      slider = params.slider,
      autoWidth = params.autoWidth,
      sliderMainWidth = params.sliderMainWidth;
  var dotsSelector = childFider({
    wrapper: slider,
    className: ".dots"
  });
  var dotConvertor = vdomArrayConvertor(dotsSelector.children);
  var currentDot = null;

  if (autoWidth) {
    var dotIndex = Math.ceil(Math.abs(getTranslate3d(sliderItems)) / sliderMainWidth);
    currentDot = dotConvertor[dotIndex];
  }

  if (activeChecker(sliderItems) >= 0 && !autoWidth) {
    currentDot = dotConvertor[activeChecker(sliderItems)];
  }

  if ((autoWidth || activeChecker(sliderItems) >= 0) && currentDot) {
    dotConvertor.forEach(function (child) {
      var classItemParams = {
        item: child,
        className: "active"
      };
      removeClassFromElement(classItemParams);
    });
    var classItemParams = {
      item: currentDot,
      className: "active"
    };
    addClassToElement(classItemParams);
  }
};

exports.dotActive = dotActive;

var elementCreator = function elementCreator(params) {
  var tag = params.tag,
      wrapper = params.wrapper,
      className = params.className;
  removeAllChildren({
    wrapper: wrapper,
    className: className
  });
  var node = document.createElement(tag);
  node.className = className;
  wrapper.appendChild(node);
  return node;
};

exports.elementCreator = elementCreator;

var childFider = function childFider(params) {
  var wrapper = params.wrapper,
      className = params.className;
  return wrapper.querySelector(className);
};

exports.childFider = childFider;

var removeAllChildren = function removeAllChildren(params) {
  var wrapper = params.wrapper,
      className = params.className;
  var newClassName = ".".concat(className.split(" ").pop());
  var findElements = wrapper.querySelectorAll(newClassName);

  if (findElements.length) {
    findElements.forEach(function (child) {
      child.remove();
    });
  }

  return findElements.length;
};

exports.removeAllChildren = removeAllChildren;

var activeChecker = function activeChecker(sliderItems) {
  var activeChild = [];
  vdomArrayConvertor(sliderItems.children).forEach(function (child) {
    if (child.classList.contains("active")) {
      activeChild.push(child.dataset.page);
    }
  });
  return parseInt(activeChild.sort().pop() - 1, 10);
};

exports.activeChecker = activeChecker;

var vdomArrayConvertor = function vdomArrayConvertor(items) {
  var isArrayCheck = Array.isArray(items);
  if (isArrayCheck) return items;
  return Object.values(items);
};

exports.vdomArrayConvertor = vdomArrayConvertor;

var infiniteChecker = function infiniteChecker(params) {
  var infinite = params.infinite,
      sliderLength = params.sliderLength,
      perSlide = params.perSlide;

  if (infinite && sliderLength === perSlide) {
    return false;
  }

  return infinite;
};

exports.infiniteChecker = infiniteChecker;

var dragChecker = function dragChecker(params) {
  var drag = params.drag,
      sliderLength = params.sliderLength,
      perSlide = params.perSlide;

  if (drag === false || sliderLength <= perSlide) {
    return false;
  }

  return drag;
};

exports.dragChecker = dragChecker;