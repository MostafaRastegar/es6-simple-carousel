"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseEventNull = exports.dragStart = exports.dragEnd = exports.dragActionTouchmovePosX2 = exports.dragActionTouchmovePosX1 = exports.dragActionMousemovePosX1 = exports.dragActionMousemove = exports.dragActionCalcPosition = exports.dragAction = exports.directionTouchClientX = exports.directionClientX = exports.caroueslTouchStart = exports.caroueslDragStart = void 0;

var _utils = require("../utils");

var directionTouchClientX = function directionTouchClientX(params) {
  var rtl = params.rtl,
      e = params.e,
      sliderMainWidth = params.sliderMainWidth;
  if (rtl) return sliderMainWidth - e.touches[0].clientX;
  return e.touches[0].clientX;
};

exports.directionTouchClientX = directionTouchClientX;

var caroueslTouchStart = function caroueslTouchStart(params) {
  return directionTouchClientX(params);
};

exports.caroueslTouchStart = caroueslTouchStart;

var dragActionTouchmovePosX2 = function dragActionTouchmovePosX2(params) {
  var e = params.e,
      posX1 = params.posX1,
      rtl = params.rtl,
      sliderMainWidth = params.sliderMainWidth;
  return posX1 - directionTouchClientX({
    rtl: rtl,
    e: e,
    sliderMainWidth: sliderMainWidth
  });
};

exports.dragActionTouchmovePosX2 = dragActionTouchmovePosX2;

var dragActionTouchmovePosX1 = function dragActionTouchmovePosX1(params) {
  return directionTouchClientX(params);
};

exports.dragActionTouchmovePosX1 = dragActionTouchmovePosX1;

var directionClientX = function directionClientX(params) {
  var rtl = params.rtl,
      e = params.e,
      sliderMainWidth = params.sliderMainWidth;
  if (rtl) return sliderMainWidth - e.clientX;
  return e.clientX;
};

exports.directionClientX = directionClientX;

var caroueslDragStart = function caroueslDragStart(params) {
  var e = params.e,
      dragEndCall = params.dragEndCall,
      dragActionCall = params.dragActionCall,
      sliderMainWidth = params.sliderMainWidth,
      rtl = params.rtl;
  document.onmouseup = dragEndCall;
  document.onmousemove = dragActionCall;
  return directionClientX({
    rtl: rtl,
    e: e,
    sliderMainWidth: sliderMainWidth
  });
};

exports.caroueslDragStart = caroueslDragStart;

var dragActionMousemove = function dragActionMousemove(params) {
  var posX1 = params.posX1,
      e = params.e,
      rtl = params.rtl,
      sliderMainWidth = params.sliderMainWidth;
  return posX1 - directionClientX({
    rtl: rtl,
    e: e,
    sliderMainWidth: sliderMainWidth
  });
};

exports.dragActionMousemove = dragActionMousemove;

var dragActionMousemovePosX1 = function dragActionMousemovePosX1(_ref) {
  var rtl = _ref.rtl,
      e = _ref.e,
      sliderMainWidth = _ref.sliderMainWidth;
  return directionClientX({
    rtl: rtl,
    e: e,
    sliderMainWidth: sliderMainWidth
  });
}; // eslint-disable-next-line consistent-return


exports.dragActionMousemovePosX1 = dragActionMousemovePosX1;

var dragActionCalcPosition = function dragActionCalcPosition(params) {
  var sliderItems = params.sliderItems,
      posX2 = params.posX2,
      rtl = params.rtl,
      slidesLength = params.slidesLength,
      sliderItemWidth = params.sliderItemWidth,
      perSlide = params.perSlide,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      infinite = params.infinite,
      threshold = params.threshold,
      autoWidth = params.autoWidth;

  var posX2New = function posX2New() {
    if (rtl) return -posX2;
    return posX2;
  };

  var thresholdNew = function thresholdNew() {
    if (rtl) return -threshold;
    return threshold;
  };

  var sliderItemWidthNew = function sliderItemWidthNew() {
    if (rtl) return sliderItemWidth;
    return -sliderItemWidth;
  };

  var finalItemPosition = (0, _utils.directionSetter)({
    rtl: rtl,
    input: (0, _utils.calcFinalItemPosition)({
      slideSize: slideSize,
      slidesLength: slidesLength,
      sliderMainWidth: sliderMainWidth,
      perSlide: perSlide,
      infinite: infinite,
      autoWidth: autoWidth,
      sliderItems: sliderItems
    })
  }); // when slidesLength <= perSlide dragEvent is disable

  if (slidesLength <= perSlide) {
    return false;
  }

  if (!infinite && !rtl) {
    // stop drag when firstItem go to lastItem on drag
    var firstTolastDrag = (0, _utils.getTranslate3d)(sliderItems) - posX2New() > sliderItemWidthNew() * perSlide + thresholdNew(); // stop drag when lastItem go to fistItem on drag

    var lastToFirstDrag = (0, _utils.getTranslate3d)(sliderItems) - posX2New() <= finalItemPosition - thresholdNew();

    if (firstTolastDrag || lastToFirstDrag) {
      return false;
    }
  }

  if (infinite && !rtl) {
    // stop drag when firstItem go to lastItem on drag
    var _firstTolastDrag = (0, _utils.getTranslate3d)(sliderItems) - posX2New() > 0; // stop drag when lastItem go to fistItem on drag


    var _lastToFirstDrag = (0, _utils.getTranslate3d)(sliderItems) - posX2New() + 5 < sliderItemWidthNew() * (slidesLength + perSlide + 1);

    if (_firstTolastDrag || _lastToFirstDrag) {
      return false;
    }
  }

  if (!infinite && rtl) {
    // stop drag when firstItem go to lastItem on drag
    var _firstTolastDrag2 = (0, _utils.getTranslate3d)(sliderItems) - posX2New() < sliderItemWidthNew() * perSlide + thresholdNew(); // stop drag when lastItem go to fistItem on drag


    var _lastToFirstDrag2 = (0, _utils.getTranslate3d)(sliderItems) - posX2New() >= finalItemPosition - thresholdNew();

    if (_firstTolastDrag2 || _lastToFirstDrag2) {
      return false;
    }
  }

  if (infinite && rtl) {
    // stop drag when firstItem go to lastItem on drag
    var _firstTolastDrag3 = (0, _utils.getTranslate3d)(sliderItems) - posX2New() < 0; // stop drag when lastItem go to fistItem on drag


    var _lastToFirstDrag3 = (0, _utils.getTranslate3d)(sliderItems) - posX2New() - 5 > sliderItemWidthNew() * (slidesLength + perSlide + 1);

    if (_firstTolastDrag3 || _lastToFirstDrag3) {
      return false;
    }
  }

  var result = function result() {
    return (0, _utils.getTranslate3d)(sliderItems) - posX2New();
  };

  sliderItems.style.transform = (0, _utils.setTranslate3d)(result());
};

exports.dragActionCalcPosition = dragActionCalcPosition;

var mouseEventNull = function mouseEventNull() {
  document.onmouseup = null;
  document.onmousemove = null;
};

exports.mouseEventNull = mouseEventNull;

var dragStart = function dragStart(params) {
  var e = params.e;
  var sliderItems = params.sliderItems,
      dragEndCall = params.dragEndCall,
      dragActionCall = params.dragActionCall,
      setPosInitial = params.setPosInitial,
      setPosX1 = params.setPosX1,
      sliderMainWidth = params.sliderMainWidth,
      rtl = params.rtl;
  e = e || window.event;
  var posInitial = (0, _utils.getTranslate3d)(sliderItems);

  if (e.type === "touchstart") {
    setPosInitial(posInitial);
    setPosX1(caroueslTouchStart({
      e: e,
      rtl: rtl,
      sliderMainWidth: sliderMainWidth
    }));
  } else {
    e.preventDefault();
    var dragActionParams = {
      e: e,
      rtl: rtl,
      dragEndCall: dragEndCall,
      dragActionCall: dragActionCall,
      sliderMainWidth: sliderMainWidth
    };
    setPosInitial(posInitial);
    setPosX1(caroueslDragStart(dragActionParams));
  }
}; // eslint-disable-next-line consistent-return


exports.dragStart = dragStart;

var dragAction = function dragAction(params) {
  var e = params.e;
  var getPosX1 = params.getPosX1,
      setPosX1 = params.setPosX1,
      setPosX2 = params.setPosX2,
      rtl = params.rtl,
      getSliderItems = params.getSliderItems,
      threshold = params.threshold,
      getPosX2 = params.getPosX2,
      getSlidesLength = params.getSlidesLength,
      getPerSlide = params.getPerSlide,
      responsive = params.responsive,
      getSlider = params.getSlider,
      infinite = params.infinite,
      getSlideSize = params.getSlideSize,
      getSliderMainWidth = params.getSliderMainWidth,
      autoWidth = params.autoWidth;
  var sliderMainWidth = getSliderMainWidth();
  e = e || window.event;
  var clientXParams = {
    e: e,
    rtl: rtl,
    sliderMainWidth: sliderMainWidth
  };
  var perSlide = (0, _utils.truncResponsiveItemCount)(responsive); // when drag false or slidesLength <= perSlide dragEvent is disable

  if (getSlidesLength() <= perSlide) {
    return false;
  }

  if (autoWidth) {
    if ((0, _utils.calcAutoWidthAllSliderItems)(getSliderItems()) <= sliderMainWidth) {
      return false;
    }
  }

  var startAvoidClicks = function startAvoidClicks(Posx) {
    if (Math.abs(Posx) > 2) {
      (0, _utils.addClassToElement)({
        item: getSliderItems(),
        className: "avoid-clicks"
      });
    }

    return Posx;
  };

  if (e.type === "touchmove") {
    var dragActionTouchmovePosX2Params = {
      posX1: getPosX1(),
      e: e,
      rtl: rtl,
      sliderMainWidth: sliderMainWidth
    };
    setPosX2(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
    setPosX1(dragActionTouchmovePosX1(clientXParams));
    startAvoidClicks(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
  } else {
    var dragActionMousemoveParams = {
      posX1: getPosX1(),
      e: e,
      rtl: rtl,
      sliderMainWidth: sliderMainWidth
    };
    setPosX2(dragActionMousemove(dragActionMousemoveParams));
    setPosX1(dragActionMousemovePosX1(clientXParams));
    startAvoidClicks(dragActionMousemove(dragActionMousemoveParams));
  }

  var dragActionCalcPositionParams = {
    sliderItems: getSliderItems(),
    posX2: getPosX2(),
    slidesLength: getSlidesLength(),
    perSlide: getPerSlide(),
    sliderItemWidth: (0, _utils.calcSliderChildWidth)({
      responsiveItemCount: (0, _utils.responsiveItemCount)(responsive),
      slider: getSlider()
    }),
    slideSize: getSlideSize(),
    sliderMainWidth: sliderMainWidth,
    infinite: infinite,
    threshold: threshold,
    rtl: rtl,
    autoWidth: autoWidth
  };
  dragActionCalcPosition(dragActionCalcPositionParams);
}; // eslint-disable-next-line consistent-return


exports.dragAction = dragAction;

var dragEnd = function dragEnd(params) {
  var sliderItems = params.sliderItems,
      threshold = params.threshold,
      slidesLength = params.slidesLength,
      responsive = params.responsive,
      infinite = params.infinite,
      slideSize = params.slideSize,
      sliderMainWidth = params.sliderMainWidth,
      sliderItemWidth = params.sliderItemWidth,
      setIndex = params.setIndex,
      transitionendWatcherCall = params.transitionendWatcherCall,
      slider = params.slider,
      setPosFinal = params.setPosFinal,
      getPosFinal = params.getPosFinal,
      nav = params.nav,
      rtl = params.rtl,
      autoWidth = params.autoWidth,
      freeScroll = params.freeScroll,
      index = params.index,
      startTrans = params.startTrans;
  (0, _utils.removeClassFromElement)({
    item: sliderItems,
    className: "avoid-clicks"
  });
  var perSlide = (0, _utils.truncResponsiveItemCount)(responsive); // when drag false or slidesLength <= perSlide dragEvent is disable

  if (slidesLength <= perSlide) {
    mouseEventNull();
    return false;
  }

  if (autoWidth) {
    if ((0, _utils.calcAutoWidthAllSliderItems)(sliderItems) <= sliderMainWidth) {
      return false;
    }
  }

  var thresholdNew = function thresholdNew() {
    if (rtl) return -threshold;
    return threshold;
  };

  var finalItemPosition = (0, _utils.directionSetter)({
    rtl: rtl,
    input: (0, _utils.calcFinalItemPosition)({
      slideSize: slideSize,
      slidesLength: slidesLength,
      sliderMainWidth: sliderMainWidth,
      perSlide: perSlide,
      infinite: infinite,
      autoWidth: autoWidth,
      sliderItems: sliderItems
    })
  });
  setPosFinal((0, _utils.getTranslate3d)(sliderItems));
  var calcIndex = (0, _utils.calcCurrentIndex)({
    sliderItems: sliderItems,
    infinite: infinite,
    perSlide: perSlide,
    slideSize: slideSize,
    sliderMainWidth: sliderMainWidth,
    slidesLength: slidesLength,
    freeScroll: freeScroll,
    autoWidth: autoWidth,
    index: index,
    responsiveItemCount: (0, _utils.responsiveItemCount)(responsive)
  });
  var currentPosition = (0, _utils.getTranslate3d)(sliderItems);
  setIndex(calcIndex);

  if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide || infinite && calcIndex + perSlide === perSlide) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)(finalItemPosition);
  }

  if (!infinite && nav) {
    (0, _utils.prevBlock)(slider);
    (0, _utils.nextBlock)(slider);
  }

  if (!infinite && calcIndex === slidesLength + perSlide) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)(getPosFinal() - sliderItems.children[0].clientWidth);
  }

  if (!infinite && (0, _utils.getTranslate3d)(sliderItems) <= thresholdNew() && (0, _utils.getTranslate3d)(sliderItems) >= 0 || rtl && (0, _utils.getTranslate3d)(sliderItems) <= 0) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)(0);

    if (nav) {
      (0, _utils.prevNone)(slider);
      (0, _utils.nextBlock)(slider);
    }
  }

  if (!infinite && !rtl && (0, _utils.getTranslate3d)(sliderItems) <= finalItemPosition) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)(finalItemPosition);

    if (nav) {
      (0, _utils.nextNone)(slider);
      (0, _utils.prevBlock)(slider);
    }
  }

  if (!infinite && rtl && (0, _utils.getTranslate3d)(sliderItems) >= finalItemPosition) {
    sliderItems.style.transform = (0, _utils.setTranslate3d)(finalItemPosition);

    if (nav) {
      (0, _utils.nextNone)(slider);
      (0, _utils.prevBlock)(slider);
    }
  }

  if (!infinite && Math.abs(currentPosition) < Math.abs(finalItemPosition) && currentPosition > 0 && startTrans !== currentPosition && !freeScroll && !autoWidth) {
    (0, _utils.addClassToElement)({
      item: sliderItems,
      className: "soft-transition"
    });
    var result = (0, _utils.directionSetter)({
      rtl: rtl,
      input: -sliderItemWidth * calcIndex
    });
    sliderItems.style.transform = (0, _utils.setTranslate3d)(result);
    setTimeout(function () {
      (0, _utils.removeClassFromElement)({
        item: sliderItems,
        className: "soft-transition"
      });
    }, 300);
  }

  mouseEventNull();
  transitionendWatcherCall();
};

exports.dragEnd = dragEnd;