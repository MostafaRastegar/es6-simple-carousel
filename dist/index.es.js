function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var addClassToElement = function addClassToElement(params) {
  var item = params.item,
      className = params.className;
  item.classList.add(className);
};
var removeClassFromElement = function removeClassFromElement(params) {
  var item = params.item,
      className = params.className;
  item.classList.remove(className);
};
var calcCurrentIndex = function calcCurrentIndex(params) {
  var sliderItems = params.sliderItems,
      infinite = params.infinite,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth;

  if (infinite) {
    return Math.abs(Math.floor(getTranslate3d(sliderItems) / vdomArrayConvertor(sliderItems.children)[0].clientWidth));
  }

  if (Math.abs(getTranslate3d(sliderItems)) <= 1) {
    return 0;
  }

  if (Math.abs(getTranslate3d(sliderItems)) > 0) {
    var scroll = Math.abs(getTranslate3d(sliderItems));
    return Math.trunc((scroll + sliderMainWidth) / slideSize - perSlide);
  }
};
var setActiveclassToCurrent = function setActiveclassToCurrent(params) {
  var sliderItems = params.sliderItems,
      perSlide = params.perSlide,
      infinite = params.infinite,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth;
  var activeIndex = calcCurrentIndex({
    sliderItems: sliderItems,
    perSlide: perSlide,
    infinite: infinite,
    slideSize: slideSize,
    sliderMainWidth: sliderMainWidth
  });
  var configCount = perSlide;
  var activeItems = [];

  _toConsumableArray(Array(configCount).keys()).forEach(function (item) {
    return activeItems.push(item + activeIndex);
  });

  vdomArrayConvertor(sliderItems.children).forEach(function (item, itemIndex) {
    var classItemParams = {
      item: item,
      className: 'active'
    };

    if (activeItems.includes(itemIndex)) {
      addClassToElement(classItemParams);
    } else {
      removeClassFromElement(classItemParams);
    }
  });
};
var sliderClientWidth = function sliderClientWidth(slider) {
  return slider.clientWidth;
};
var truncResponsiveItemCount = function truncResponsiveItemCount(responsive) {
  return Math.trunc(responsiveItemCount(responsive));
};
var calcFinalItemPosition = function calcFinalItemPosition(params) {
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
var calcFirstItemPosition = function calcFirstItemPosition(params) {
  var slideSize = params.slideSize,
      perSlide = params.perSlide,
      infinite = params.infinite;
  var infiSwitchSlideSize = infinite ? slideSize : 0;
  return -(infiSwitchSlideSize * (perSlide + 1));
};
var calcSliderGroupCount = function calcSliderGroupCount(params) {
  var slidesLength = params.slidesLength,
      responsive = params.responsive;
  return Math.ceil(slidesLength / truncResponsiveItemCount(responsive));
}; // export const calcTruncSlideItemSize = items => {
//   // const itemsCeil = Math.ceil(items);
//   // const mainWidthTruncItem = sliderClientWidth(slider) / itemsCeil;
//   // // return (mainWidthTruncItem / 2);
//   return calcSliderChildWidth(responsiveItemCount(config.responsive));
// };

var calcSliderChildWidth = function calcSliderChildWidth(params) {
  var responsiveItemCount = params.responsiveItemCount,
      slider = params.slider; // const itemsTrunc = Math.trunc(responsiveItemCount);
  // if (responsiveItemCount - itemsTrunc === 0) {
  //   return sliderClientWidth(slider) / itemsTrunc;
  // }
  // const mainWidthTruncItem = sliderClientWidth(slider) / itemsTrunc;
  // let decriseWithForEachItems = mainWidthTruncItem / itemsTrunc / itemsTrunc;
  // if (responsiveItemCount > 1 && responsiveItemCount < 2) {
  //   decriseWithForEachItems = (sliderClientWidth(slider) / itemsTrunc) * 0.25;
  // }
  // return mainWidthTruncItem - decriseWithForEachItems;

  return sliderClientWidth(slider) / responsiveItemCount;
};
var setSliderItemsChildWidth = function setSliderItemsChildWidth(params) {
  var responsive = params.responsive,
      slider = params.slider,
      sliderItems = params.sliderItems;
  vdomArrayConvertor(sliderItems.children).forEach(function (child) {
    return child.style.width = calcSliderChildWidth({
      responsiveItemCount: responsiveItemCount(responsive),
      slider: slider
    }) + "px";
  });
};
var setSliderItemsPosition = function setSliderItemsPosition(params) {
  var indexItem = params.indexItem,
      sliderItemWidth = params.sliderItemWidth,
      sliderItems = params.sliderItems;
  sliderItems.style["transform"] = setTranslate3d(indexItem * -sliderItemWidth);
  return indexItem;
};
var setTranslate3d = function setTranslate3d(getValue) {
  return "translate3d(".concat(getValue, "px,0px,0px)");
};
var getTranslate3d = function getTranslate3d(sliderItems) {
  var values = sliderItems.style.transform.match(/translate3d\((.*)px\, (.*)px\, (.*)px\)/);

  if (!values[1] || !values[1].length) {
    return 0;
  }

  return parseFloat(values[1]);
};
var responsiveItemCount = function responsiveItemCount(getConfig) {
  var resp = Object.keys(getConfig);
  var newResp = resp.filter(function (item) {
    if (item <= document.body.clientWidth) {
      return item;
    }
  });
  return getConfig[parseInt(newResp.pop())].items;
};
var switchInfiniteResponsiveCount = function switchInfiniteResponsiveCount(itemCont, infinite) {
  return infinite ? itemCont : 0;
};
var prevNone = function prevNone(slider) {
  return childFider({
    wrapper: slider,
    className: ".prev"
  }).style.display = "none";
};
var prevBlock = function prevBlock(slider) {
  return childFider({
    wrapper: slider,
    className: ".prev"
  }).style.display = "block";
};
var nextNone = function nextNone(slider) {
  return childFider({
    wrapper: slider,
    className: ".next"
  }).style.display = "none";
};
var nextBlock = function nextBlock(slider) {
  return childFider({
    wrapper: slider,
    className: ".next"
  }).style.display = "block";
};
var transitionendWatcher = function transitionendWatcher(params) {
  var responsive = params.responsive,
      infinite = params.infinite,
      slider = params.slider,
      index = params.index,
      sliderItems = params.sliderItems,
      dotsSelector = params.dotsSelector,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      setAllowShift = params.setAllowShift,
      dots = params.dots,
      slidesLength = params.slidesLength,
      sliderItemWidth = params.sliderItemWidth,
      nav = params.nav,
      setIndex = params.setIndex,
      getIndex = params.getIndex;
  var perSlide = truncResponsiveItemCount(responsive);

  if (infinite && index > perSlide + slidesLength && Math.abs(getTranslate3d(sliderItems)) >= (perSlide + 1 + slidesLength) * sliderItemWidth) {
    setIndex(setSliderItemsPosition({
      indexItem: index - slidesLength,
      sliderItemWidth: sliderItemWidth,
      sliderItems: sliderItems
    }));
  } // shift to end from start item


  if (infinite && (Math.abs(getTranslate3d(sliderItems)) <= 1 || Math.abs(getTranslate3d(sliderItems)) === sliderItemWidth)) {
    setIndex(setSliderItemsPosition({
      indexItem: slidesLength + index,
      sliderItemWidth: sliderItemWidth,
      sliderItems: sliderItems
    }));
  }

  if (!infinite && nav && index === 0) {
    prevNone(slider);
    nextBlock(slider);
  } // run for set active class


  var setActiveclassToCurrentParams = {
    index: index,
    sliderItems: sliderItems,
    dotsSelector: dotsSelector,
    perSlide: perSlide,
    infinite: infinite,
    slideSize: slideSize,
    sliderMainWidth: sliderMainWidth
  };
  removeClassFromElement({
    item: sliderItems,
    className: 'shifting'
  });
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  setAllowShift(true);

  if (dots) {
    var dotActiveParams = {
      index: index,
      sliderItems: sliderItems,
      infinite: infinite,
      dotsSelector: dotsSelector,
      slider: slider,
      perSlide: perSlide,
      sliderMainWidth: sliderMainWidth
    };
    dotActive(dotActiveParams);
  }
};
var dotActive = function dotActive(params) {
  var sliderItems = params.sliderItems,
      slider = params.slider;
  var dotsSelector = childFider({
    wrapper: slider,
    className: '.dots'
  });

  if (activeChecker(sliderItems) >= 0) {
    var dotConvertor = vdomArrayConvertor(dotsSelector.children);
    var currentDot = dotConvertor[activeChecker(sliderItems)];
    dotConvertor.forEach(function (child) {
      var classItemParams = {
        item: child,
        className: 'active'
      };
      removeClassFromElement(classItemParams);
    });
    var classItemParams = {
      item: currentDot,
      className: 'active'
    };
    addClassToElement(classItemParams);
  }
};
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
};
var childFider = function childFider(params) {
  var wrapper = params.wrapper,
      className = params.className;
  return wrapper.querySelector(className);
};
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
};
var activeChecker = function activeChecker(sliderItems) {
  var activeChild = [];
  vdomArrayConvertor(sliderItems.children).forEach(function (child) {
    if (child.classList.contains('active')) {
      activeChild.push(child.dataset.page);
    }
  });
  return parseInt(activeChild.sort().pop() - 1);
};
var vdomArrayConvertor = function vdomArrayConvertor(items) {
  var isArrayCheck = Array.isArray(items);
  if (isArrayCheck) return items;
  return Object.values(items);
};

var shiftSlideIsDir = function shiftSlideIsDir(params) {
  var sliderItems = params.sliderItems,
      index = params.index,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      slidesLength = params.slidesLength,
      sliderMainWidth = params.sliderMainWidth,
      responsiveItem = params.responsiveItem,
      infinite = params.infinite,
      slider = params.slider;
  var newSlidesLength = infinite ? slidesLength : slidesLength - 1;
  var calcFinalItemPositionParams = {
    slideSize: slideSize,
    slidesLength: slidesLength,
    sliderMainWidth: sliderMainWidth,
    perSlide: perSlide,
    infinite: infinite
  };
  var newIndex = index + perSlide;

  if (!infinite && newIndex + perSlide - 1 >= newSlidesLength && responsiveItem !== 1) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPosition(calcFinalItemPositionParams));
    nextNone(slider);
    prevBlock(slider);
    return newIndex;
  } // if (!infinite && newIndex * perSlide >= slidesLength) {
  // 	sliderItems.style["transform"] = setTranslate3d(
  // 		calcFinalItemPosition(calcFinalItemPositionParams)
  // 	);
  // 	nextNone(slider);
  // 	prevBlock(slider);
  // }
  // when perSlide === 1


  if (!infinite && newIndex === newSlidesLength) {
    nextNone(slider);
    prevBlock(slider);
  }

  sliderItems.style["transform"] = setTranslate3d(newIndex * -slideSize);
  return newIndex;
};
var shiftSlideNonDir = function shiftSlideNonDir(params) {
  var sliderItems = params.sliderItems,
      slideSize = params.slideSize,
      index = params.index,
      perSlide = params.perSlide,
      infinite = params.infinite,
      slider = params.slider;
  var newIndex = index - perSlide;
  var infinitperSlide = infinite ? perSlide : 0;

  if (!infinite && index - infinitperSlide <= perSlide && index !== -1) {
    var calcFirstItemPositionParams = {
      slideSize: slideSize,
      perSlide: perSlide,
      infinite: infinite
    };
    sliderItems.style["transform"] = setTranslate3d(calcFirstItemPosition(calcFirstItemPositionParams));
    nextBlock(slider);
    prevNone(slider);
    return newIndex;
  }

  sliderItems.style["transform"] = setTranslate3d(-newIndex * slideSize);
  return newIndex;
};

var dotsItemsGenerator = function dotsItemsGenerator(params) {
  var slidesLength = params.slidesLength,
      dotsSelector = params.dotsSelector,
      responsive = params.responsive;

  for (var i = 0; i < calcSliderGroupCount({
    responsive: responsive,
    slidesLength: slidesLength
  }); i++) {
    dotsSelector.innerHTML += "<li class=\"dots-item".concat(!i ? " active" : "", "\" data-dot-index=\"").concat(i + 1, "\">").concat(i + 1, "</li>");
  }

  return dotsSelector;
};
var dotsItemsClick = function dotsItemsClick(params) {
  var indexItem = params.indexItem,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      slidesLength = params.slidesLength,
      sliderItems = params.sliderItems,
      sliderMainWidth = params.sliderMainWidth,
      infinite = params.infinite,
      slider = params.slider,
      getSliderItems = params.getSliderItems,
      nav = params.nav;
  setSliderItemsPositionAfterDotClick({
    indexItem: indexItem,
    slideSize: slideSize,
    sliderItems: sliderItems,
    slidesLength: slidesLength,
    sliderMainWidth: sliderMainWidth,
    perSlide: perSlide,
    infinite: infinite,
    slider: slider,
    nav: nav
  });
  var itemClassParams = {
    item: getSliderItems(),
    className: 'shifting'
  };
  addClassToElement(itemClassParams);
  return {
    index: infinite ? indexItem + perSlide + 1 : indexItem,
    allowShift: false,
    posInitial: getTranslate3d(sliderItems)
  };
};
var setSliderItemsPositionAfterDotClick = function setSliderItemsPositionAfterDotClick(params) {
  var indexItem = params.indexItem,
      slideSize = params.slideSize,
      sliderItems = params.sliderItems,
      sliderMainWidth = params.sliderMainWidth,
      perSlide = params.perSlide,
      slidesLength = params.slidesLength,
      infinite = params.infinite,
      slider = params.slider,
      nav = params.nav;

  if (!infinite && indexItem + perSlide > slidesLength) {
    var calcFinalItemPositionParams = {
      slideSize: slideSize,
      slidesLength: slidesLength,
      sliderMainWidth: sliderMainWidth,
      perSlide: perSlide,
      infinite: infinite
    };
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPosition(calcFinalItemPositionParams));

    if (nav) {
      nextNone(slider);
      prevBlock(slider);
    }

    return true;
  } // after time move to watcher


  if (nav) {
    nextBlock(slider);
    prevBlock(slider);
  }

  if (!infinite && nav && indexItem === 0) {
    nextBlock(slider);
    prevNone(slider);
  }

  var newItemIndex = infinite ? indexItem + perSlide + 1 : indexItem;
  sliderItems.style["transform"] = setTranslate3d(newItemIndex * -slideSize);
};

var SliderDots =
/*#__PURE__*/
function () {
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
          infinite = _this$core$config.infinite,
          responsive = _this$core$config.responsive,
          nav = _this$core$config.nav,
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
      var dotsSelector = childFider({
        wrapper: slider,
        className: '.dots'
      }); //generate dots items

      var dotsItemsParams = {
        slidesLength: getSlidesLength(),
        responsive: responsive,
        dotsSelector: dotsSelector,
        sliderItems: sliderItems
      }; //generate dots group per show slides

      dotsItemsGenerator(dotsItemsParams); // dots item click for transition on active index

      vdomArrayConvertor(dotsSelector.children).forEach(function (item) {
        item.addEventListener("click", function () {
          var dotIndex = parseInt(item.getAttribute('data-dot-index'));
          var indexItem = truncResponsiveItemCount(responsive) * (dotIndex - 1);
          var dotsItemsClickParams = {
            indexItem: indexItem,
            sliderItemWidth: getSliderItemWidth(),
            sliderMainWidth: getSliderMainWidth(),
            sliderItems: sliderItems,
            slider: getSlider(),
            slideSize: getSlideSize(),
            slidesLength: getSlidesLength(),
            perSlide: truncResponsiveItemCount(responsive),
            infinite: infinite,
            dotIndex: dotIndex,
            responsive: responsive,
            getSliderItems: getSliderItems,
            nav: nav
          };

          var _dotsItemsClick = dotsItemsClick(dotsItemsClickParams),
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

var setPageNumberOnChild = function setPageNumberOnChild(params) {
  var sliderItems = params.sliderItems,
      responsive = params.responsive;
  var perSlide = truncResponsiveItemCount(responsive);
  vdomArrayConvertor(sliderItems.children).forEach(function (item, itemIndex) {
    item.setAttribute("data-page", Math.trunc(itemIndex / perSlide) + 1);
  });
};
var addCloneClass = function addCloneClass(item) {
  item.classList.add("clone");
};
var cloneNodeGenerator = function cloneNodeGenerator(params) {
  var perSlide = params.perSlide,
      sliderItems = params.sliderItems;
  var sliderItemsChildren = vdomArrayConvertor(sliderItems.children);

  var deepCloneSliderItemsChildren = _toConsumableArray(sliderItemsChildren);

  var cloneNodeParams = {
    perSlide: perSlide,
    deepCloneSliderItemsChildren: deepCloneSliderItemsChildren,
    sliderItems: sliderItems
  };
  cloneNodeAppendChild(cloneNodeParams);
  cloneNodeInsertBefore(cloneNodeParams);
};
var cloneNodeAppendChild = function cloneNodeAppendChild(params) {
  var perSlide = params.perSlide,
      deepCloneSliderItemsChildren = params.deepCloneSliderItemsChildren,
      sliderItems = params.sliderItems;
  deepCloneSliderItemsChildren.forEach(function (element, index) {
    if (index <= perSlide) {
      var cln = element.cloneNode(true);
      addCloneClass(cln);
      sliderItems.appendChild(cln);
    }
  });
};
var cloneNodeInsertBefore = function cloneNodeInsertBefore(params) {
  var perSlide = params.perSlide,
      deepCloneSliderItemsChildren = params.deepCloneSliderItemsChildren,
      sliderItems = params.sliderItems;

  for (var i = deepCloneSliderItemsChildren.length - perSlide - 1; i < deepCloneSliderItemsChildren.length; i++) {
    var cln = deepCloneSliderItemsChildren[i].cloneNode(true);
    addCloneClass(cln);
    sliderItems.insertBefore(cln, deepCloneSliderItemsChildren[0]);
  }
};

var SliderTrailer =
/*#__PURE__*/
function () {
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
          infinite = _this$core$config.infinite,
          responsive = _this$core$config.responsive,
          slider = _this$core$config.slider,
          getSliderItems = _this$core.getSliderItems,
          getSliderItemWidth = _this$core.getSliderItemWidth,
          getPerSlide = _this$core.getPerSlide,
          getSlideSize = _this$core.getSlideSize,
          getSliderMainWidth = _this$core.getSliderMainWidth,
          getIndex = _this$core.getIndex,
          setIndex = _this$core.setIndex;
      var sliderItems = getSliderItems();
      var slideSize = getSlideSize();
      var sliderItemWidth = getSliderItemWidth();
      var perSlide = getPerSlide();
      var sliderMainWidth = getSliderMainWidth();
      var index = getIndex(); // set width per slide

      setSliderItemsChildWidth({
        sliderItems: sliderItems,
        slider: slider,
        responsive: responsive
      }); // init slider position

      setIndex(setSliderItemsPosition({
        indexItem: index,
        sliderItemWidth: sliderItemWidth,
        sliderItems: sliderItems
      }));
      setPageNumberOnChild({
        sliderItems: sliderItems,
        responsive: responsive
      }); // Clone group of slide from infinit carousel

      if (infinite) {
        var cloneNodeGeneratorParams = {
          perSlide: perSlide,
          sliderItems: sliderItems,
          wrapper: slider
        };
        cloneNodeGenerator(cloneNodeGeneratorParams);
      }

      setActiveclassToCurrent({
        sliderItems: sliderItems,
        perSlide: perSlide,
        slideSize: slideSize,
        sliderMainWidth: sliderMainWidth,
        index: getIndex(),
        infinite: infinite
      }); // add loaded class to main slide after init

      var classItemParams = {
        item: slider,
        className: 'loaded'
      };
      addClassToElement(classItemParams);
    }
  }]);

  return SliderTrailer;
}();

var SliderArrows =
/*#__PURE__*/
function () {
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
      var prevSelector = childFider({
        wrapper: slider,
        className: '.prev'
      });
      var nextSelector = childFider({
        wrapper: slider,
        className: '.next'
      }); // Click events

      prevSelector.addEventListener("click", function () {
        return _this.shiftSlide(-1);
      });
      nextSelector.addEventListener("click", function () {
        return _this.shiftSlide(1);
      }); //remove shifting class and allowSHift permission

      var itemClassParams = {
        item: getSliderItems(),
        className: 'shifting'
      };
      removeClassFromElement(itemClassParams);
      setAllowShift(true);
    }
  }, {
    key: "shiftSlide",
    value: function shiftSlide(dir, action) {
      var _this$core2 = this.core,
          _this$core2$config = _this$core2.config,
          infinite = _this$core2$config.infinite,
          responsive = _this$core2$config.responsive,
          getSliderItems = _this$core2.getSliderItems,
          getPosInitial = _this$core2.getPosInitial,
          setPosInitial = _this$core2.setPosInitial,
          getSlideSize = _this$core2.getSlideSize,
          setIndex = _this$core2.setIndex,
          getIndex = _this$core2.getIndex,
          getSlidesLength = _this$core2.getSlidesLength,
          getSliderMainWidth = _this$core2.getSliderMainWidth,
          getSlider = _this$core2.getSlider,
          getAllowShift = _this$core2.getAllowShift,
          setAllowShift = _this$core2.setAllowShift;
      var perSlide = truncResponsiveItemCount(responsive);

      if (getAllowShift()) {
        if (!action) {
          setPosInitial(getTranslate3d(getSliderItems()));
        }

        var shiftSlideParams = {
          sliderItems: getSliderItems(),
          posInitial: getPosInitial(),
          slideSize: getSlideSize(),
          slidesLength: getSlidesLength(),
          slider: getSlider(),
          sliderMainWidth: getSliderMainWidth(),
          index: getIndex(),
          responsiveItem: responsiveItemCount(responsive),
          perSlide: perSlide,
          dir: dir,
          infinite: infinite
        };

        if (dir == 1) {
          setIndex(shiftSlideIsDir(shiftSlideParams));
        } else if (dir == -1) {
          setIndex(shiftSlideNonDir(shiftSlideParams));
        }
      }
      var itemClassParams = {
        item: getSliderItems(),
        className: 'shifting'
      };
      addClassToElement(itemClassParams);
      setAllowShift(false);
    }
  }]);

  return SliderArrows;
}();

var caroueslTouchStart = function caroueslTouchStart(e) {
  return e.touches[0].clientX;
};
var caroueslDragAction = function caroueslDragAction(params) {
  var e = params.e,
      dragEndCall = params.dragEndCall,
      dragActionCall = params.dragActionCall;
  document.onmouseup = dragEndCall;
  document.onmousemove = dragActionCall;
  return e.clientX;
};
var dragActionTouchmovePosX2 = function dragActionTouchmovePosX2(params) {
  var e = params.e,
      posX1 = params.posX1;
  return posX1 - e.touches[0].clientX;
};
var dragActionTouchmovePosX1 = function dragActionTouchmovePosX1(e) {
  return e.touches[0].clientX;
};
var dragActionMousemove = function dragActionMousemove(params) {
  var posX1 = params.posX1,
      e = params.e;
  return posX1 - e.clientX;
};
var dragActionMousemovePosX1 = function dragActionMousemovePosX1(e) {
  return e.clientX;
};
var dragActionCalcPosition = function dragActionCalcPosition(params) {
  var sliderItems = params.sliderItems,
      posX2 = params.posX2,
      slidesLength = params.slidesLength,
      sliderItemWidth = params.sliderItemWidth,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      infinite = params.infinite,
      threshold = params.threshold; // stop scroll when firstItem go to lastItem on drag

  if (!infinite && getTranslate3d(sliderItems) - posX2 > -sliderItemWidth * perSlide + threshold) {
    return false;
  } // stop scroll when lastItem go to firstItem on drag


  if (!infinite && getTranslate3d(sliderItems) - posX2 <= calcFinalItemPosition({
    slideSize: slideSize,
    slidesLength: slidesLength,
    sliderMainWidth: sliderMainWidth,
    perSlide: perSlide,
    infinite: infinite
  }) - threshold) {
    return false;
  } // stop drag when firstItem go to lastItem on drag


  if (infinite && getTranslate3d(sliderItems) - posX2 > 0) {
    return false;
  } // stop drag when lastItem go to fistItem on drag


  if (infinite && getTranslate3d(sliderItems) - posX2 < -(sliderItemWidth * (slidesLength + perSlide + 1))) {
    return false;
  }

  sliderItems.style["transform"] = setTranslate3d(getTranslate3d(sliderItems) - posX2);
};
var mouseEventNull = function mouseEventNull() {
  document.onmouseup = null;
  document.onmousemove = null;
};
var dragStart = function dragStart(params) {
  var e = params.e,
      sliderItems = params.sliderItems,
      dragEndCall = params.dragEndCall,
      dragActionCall = params.dragActionCall,
      setPosInitial = params.setPosInitial,
      setPosX1 = params.setPosX1;
  e = e || window.event;
  e.preventDefault();
  var posInitial = getTranslate3d(sliderItems);

  if (e.type == "touchstart") {
    setPosInitial(posInitial);
    setPosX1(caroueslTouchStart(e));
  } else {
    var dragActionParams = {
      e: e,
      dragEndCall: dragEndCall,
      dragActionCall: dragActionCall
    };
    setPosInitial(posInitial);
    setPosX1(caroueslDragAction(dragActionParams));
  }
};
var dragAction = function dragAction(params) {
  var e = params.e,
      getPosX1 = params.getPosX1,
      setPosX1 = params.setPosX1,
      setPosX2 = params.setPosX2,
      getSliderItems = params.getSliderItems,
      threshold = params.threshold,
      getPosX2 = params.getPosX2,
      getSlidesLength = params.getSlidesLength,
      getPerSlide = params.getPerSlide,
      responsive = params.responsive,
      getSlider = params.getSlider,
      infinite = params.infinite,
      getSlideSize = params.getSlideSize,
      getSliderMainWidth = params.getSliderMainWidth;
  e = e || window.event;

  if (e.type == "touchmove") {
    var dragActionTouchmovePosX2Params = {
      e: e,
      posX1: getPosX1()
    };
    setPosX2(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
    setPosX1(dragActionTouchmovePosX1(e));
  } else {
    var dragActionMousemoveParams = {
      e: e,
      posX1: getPosX1()
    };
    setPosX2(dragActionMousemove(dragActionMousemoveParams));
    setPosX1(dragActionMousemovePosX1(e));
  }

  var dragActionCalcPositionParams = {
    sliderItems: getSliderItems(),
    posX2: getPosX2(),
    slidesLength: getSlidesLength(),
    perSlide: getPerSlide(),
    sliderItemWidth: calcSliderChildWidth({
      responsiveItemCount: responsiveItemCount(responsive),
      slider: getSlider()
    }),
    slideSize: getSlideSize(),
    sliderMainWidth: getSliderMainWidth(),
    infinite: infinite,
    threshold: threshold
  };
  dragActionCalcPosition(dragActionCalcPositionParams);
};
var dragEnd = function dragEnd(params) {
  var sliderItems = params.sliderItems,
      threshold = params.threshold,
      slidesLength = params.slidesLength,
      responsive = params.responsive,
      infinite = params.infinite,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      setIndex = params.setIndex,
      transitionendWatcherCall = params.transitionendWatcherCall,
      slider = params.slider,
      setPosFinal = params.setPosFinal,
      getPosFinal = params.getPosFinal;
  var perSlide = truncResponsiveItemCount(responsive);
  var calcFinalItemPositionConst = calcFinalItemPosition({
    slideSize: slideSize,
    slidesLength: slidesLength,
    sliderMainWidth: sliderMainWidth,
    perSlide: perSlide,
    infinite: infinite
  });
  setPosFinal(getTranslate3d(sliderItems));
  var calcIndex = calcCurrentIndex({
    sliderItems: sliderItems,
    infinite: infinite,
    perSlide: perSlide,
    slideSize: slideSize,
    sliderMainWidth: sliderMainWidth
  });
  setIndex(calcIndex);

  if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide || infinite && calcIndex + perSlide === perSlide) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
  }

  if (!infinite) {
    prevBlock(slider);
    nextBlock(slider);
  }

  if (!infinite && calcIndex === slidesLength + perSlide) {
    sliderItems.style["transform"] = setTranslate3d(getPosFinal() - sliderItems.children[0].clientWidth);
  }

  if (!infinite && getTranslate3d(sliderItems) <= threshold && getTranslate3d(sliderItems) >= 0) {
    sliderItems.style["transform"] = setTranslate3d(0);
    prevNone(slider);
    nextBlock(slider);
  }

  if (!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
    nextNone(slider);
    prevBlock(slider);
  }

  mouseEventNull();
  transitionendWatcherCall();
};

var DragEvent =
/*#__PURE__*/
function () {
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
          infinite = _this$core$config.infinite,
          responsive = _this$core$config.responsive,
          threshold = _this$core$config.threshold,
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
          setIndex = _this$core.setIndex,
          setPosFinal = _this$core.setPosFinal,
          getPosFinal = _this$core.getPosFinal,
          setAllowShift = _this$core.setAllowShift,
          transitionendWatcherCall = _this$core.transitionendWatcherCall;

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
          setIndex: setIndex,
          setPosFinal: setPosFinal,
          transitionendWatcherCall: transitionendWatcherCall,
          dragAction: dragAction,
          setPosInitial: setPosInitial,
          setPosX1: setPosX1,
          setAllowShift: setAllowShift,
          index: getIndex()
        };
        dragEnd(dragStartParams);
      };

      var _dragActionCall = function dragActionCall(e) {
        var dragActionParams = {
          e: e,
          getPosX1: getPosX1,
          setPosX1: setPosX1,
          setPosX2: setPosX2,
          setPosInitial: setPosInitial,
          getSliderItems: getSliderItems,
          threshold: threshold,
          getPosX2: getPosX2,
          getSlidesLength: getSlidesLength,
          getPerSlide: getPerSlide,
          responsive: responsive,
          getSlider: getSlider,
          infinite: infinite,
          getSlideSize: getSlideSize,
          getSliderMainWidth: getSliderMainWidth
        };
        dragAction(dragActionParams);
      };

      var dragStartCall = function dragStartCall(e) {
        var dragStartParams = {
          e: e,
          sliderItems: getSliderItems(),
          setPosInitial: setPosInitial,
          setPosX1: setPosX1,
          dragEndCall: dragEndCall,
          dragActionCall: function dragActionCall(e) {
            return _dragActionCall(e);
          }
        };
        dragStart(dragStartParams);
      }; // Mouse events


      getSliderItems().onmousedown = dragStartCall; // Touch events

      getSliderItems().addEventListener("touchstart", dragStartCall);
      getSliderItems().addEventListener("touchend", dragEndCall);
      getSliderItems().addEventListener("touchmove", _dragActionCall);
    }
  }]);

  return DragEvent;
}();

var SliderCore =
/*#__PURE__*/
function () {
  function SliderCore(_config) {
    var _this = this;

    _classCallCheck(this, SliderCore);

    _defineProperty(this, "setConfig", function (config) {
      _this.config = config;
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

    _defineProperty(this, "updateLog", function () {
      console.log(_this.index);
    });

    _defineProperty(this, "initialize", function () {
      var _this$getConfig = _this.getConfig(),
          slider = _this$getConfig.slider,
          infinite = _this$getConfig.infinite,
          responsive = _this$getConfig.responsive,
          nav = _this$getConfig.nav,
          dots = _this$getConfig.dots,
          autoPlay = _this$getConfig.autoPlay;

      removeAllChildren({
        wrapper: slider,
        className: 'clone'
      }); //----------- start init variables  -----

      _this.setSlider(slider);

      var sliderClienWidth = _this.getSlider().clientWidth;

      _this.setSliderMainWidth(sliderClienWidth);

      var sliderSlidesSelector = childFider({
        wrapper: slider,
        className: '.slides'
      });

      _this.setSliderItems(sliderSlidesSelector);

      var sliderChildWidth = calcSliderChildWidth({
        responsiveItemCount: responsiveItemCount(responsive),
        slider: _this.getSlider()
      });

      _this.setSlideSize(sliderChildWidth);

      var sliderItemWidth = calcSliderChildWidth({
        responsiveItemCount: responsiveItemCount(responsive),
        slider: _this.getSlider()
      });

      _this.setSliderItemWidth(sliderItemWidth); // init slider for start


      var slides = vdomArrayConvertor(_this.getSliderItems().children);

      _this.setSlidesLength(slides.length);

      var perSlide = switchInfiniteResponsiveCount(truncResponsiveItemCount(responsive), infinite);

      _this.setPerSlide(perSlide); // set init index


      if (infinite) {
        _this.setIndex(perSlide + 1);
      } else {
        _this.setIndex(0);
      }

      if (nav) {
        elementCreator({
          tag: 'Span',
          wrapper: slider,
          className: 'control next'
        });
        elementCreator({
          tag: 'Span',
          wrapper: slider,
          className: 'control prev'
        });
        _this.sliderArrows = new SliderArrows({
          core: _this
        });

        var index = _this.getIndex();

        if (!infinite && index === 0) {
          prevNone(slider);
        }
      }

      if (dots) {
        elementCreator({
          tag: 'Ul',
          wrapper: slider,
          className: 'dots'
        });
        _this.sliderDots = new SliderDots({
          core: _this
        });
      }

      if (autoPlay) {
        setInterval(function () {
          return _this.next();
        }, 3000);
      }

      _this.sliderTrailer = new SliderTrailer({
        core: _this
      });
      _this.dragEvent = new DragEvent({
        core: _this
      });
      sliderSlidesSelector.addEventListener("transitionend", _this.transitionendWatcherCall);

      _this.windowResizeWatcher();
    });

    _defineProperty(this, "transitionendWatcherCall", function () {
      var _this$config = _this.config,
          slider = _this$config.slider,
          infinite = _this$config.infinite,
          responsive = _this$config.responsive,
          dots = _this$config.dots,
          nav = _this$config.nav,
          index = _this.index,
          getIndex = _this.getIndex,
          setIndex = _this.setIndex,
          dragAction = _this.dragAction,
          setPosInitial = _this.setPosInitial,
          setPosX1 = _this.setPosX1,
          setAllowShift = _this.setAllowShift,
          sliderItems = _this.sliderItems,
          slideSize = _this.slideSize,
          sliderMainWidth = _this.sliderMainWidth,
          slidesLength = _this.slidesLength,
          sliderItemWidth = _this.sliderItemWidth;
      transitionendWatcher({
        slider: slider,
        infinite: infinite,
        responsive: responsive,
        dots: dots,
        nav: nav,
        sliderItems: sliderItems,
        dragAction: dragAction,
        setPosInitial: setPosInitial,
        setPosX1: setPosX1,
        setAllowShift: setAllowShift,
        index: index,
        slideSize: slideSize,
        sliderMainWidth: sliderMainWidth,
        slidesLength: slidesLength,
        sliderItemWidth: sliderItemWidth,
        setIndex: setIndex,
        getIndex: getIndex
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

    this.setConfig(_config);
    this.initialize();
  }

  _createClass(SliderCore, [{
    key: "next",
    value: function next() {
      var sliderItems = this.sliderItems,
          index = this.index,
          perSlide = this.perSlide,
          slideSize = this.slideSize,
          slidesLength = this.slidesLength,
          sliderMainWidth = this.sliderMainWidth,
          _this$config2 = this.config,
          infinite = _this$config2.infinite,
          slider = _this$config2.slider,
          responsive = _this$config2.responsive;
      var classItemParams = {
        item: childFider({
          wrapper: slider,
          className: ".slides"
        }),
        className: 'shifting'
      };
      addClassToElement(classItemParams);
      this.setIndex(shiftSlideIsDir({
        sliderItems: sliderItems,
        index: index,
        perSlide: perSlide,
        slideSize: slideSize,
        slidesLength: slidesLength,
        sliderMainWidth: sliderMainWidth,
        responsiveItem: responsiveItemCount(responsive),
        infinite: infinite,
        slider: slider
      }));
    }
  }]);

  return SliderCore;
}();

export { SliderCore as Slider };
//# sourceMappingURL=index.es.js.map
