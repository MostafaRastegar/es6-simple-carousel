import config from "./config";
import {
  caroueslTouchStart,
  caroueslDragAction,
  carouselPositionLeft,
  dragActionTouchmovePosX1,
  dragActionTouchmovePosX2,
  dragActionMousemovePosX1,
  dragActionMousemove,
  dragActionCalcPosition,
  dragEndCalcPosition,
  mouseEventNull,
  sliderItemsAddClass,
  sliderItemsRemoveClass,
  shiftSlideIsDir,
  shiftSlideNonDir,
  checkIndexEnd,
  checkIndexFinish,
  setActiveclassToCurrent,
  dotsItemsGenerator,
  dotsItemsClick
} from "./utils";

let { slider, sliderItems, prev, next, threshold, dots } = config;
let posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  slides = sliderItems.getElementsByClassName("slide"),
  slidesLength = slides.length,
  slideSize = sliderItems.getElementsByClassName("slide")[0].offsetWidth,
  firstSlide = slides[0],
  lastSlide = slides[slidesLength - 1],
  cloneFirst = firstSlide.cloneNode(true),
  cloneLast = lastSlide.cloneNode(true),
  index = 0,
  allowShift = true;

export const dragStart = e => {
  e = e || window.event;
  e.preventDefault();
  posInitial = carouselPositionLeft(sliderItems);

  if (e.type == "touchstart") {
    posX1 = caroueslTouchStart(e);
  } else {
    const dragActionParams = {
      e,
      dragEnd,
      dragAction
    };
    posX1 = caroueslDragAction(dragActionParams);
  }
};

export const dragAction = e => {
  e = e || window.event;
  if (e.type == "touchmove") {
    const dragActionTouchmovePosX2Params = { e, posX1 };
    posX2 = dragActionTouchmovePosX2(dragActionTouchmovePosX2Params);
    posX1 = dragActionTouchmovePosX1(e);
  } else {
    const dragActionMousemoveParams = { e, posX1 };
    posX2 = dragActionMousemove(dragActionMousemoveParams);
    posX1 = dragActionMousemovePosX1(e);
  }
  const dragActionCalcPositionParams = { sliderItems, posX2 };
  dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  posFinal = carouselPositionLeft(sliderItems);
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, "drag");
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, "drag");
  } else {
    const dragEndCalcPositionParams = { sliderItems, posInitial };
    dragEndCalcPosition(dragEndCalcPositionParams);
  }
  mouseEventNull();
};

export const shiftSlide = (dir, action) => {
  if (allowShift) {
    if (!action) {
      posInitial = carouselPositionLeft(sliderItems);
    }
    let shiftSlideParams = { sliderItems, posInitial, slideSize, index };
    if (dir == 1) {
      index = shiftSlideIsDir(shiftSlideParams);
    } else if (dir == -1) {
      index = shiftSlideNonDir(shiftSlideParams);
    }
  }
  allowShift = sliderItemsAddClass(sliderItems);
};

export const checkIndex = () => {
  if (index == -1) {
    const checkIndexEndParams = { sliderItems, slidesLength, slideSize };
    index = checkIndexEnd(checkIndexEndParams);
  }

  if (index == slidesLength) {
    const checkIndexFinishParams = { sliderItems, slideSize };
    index = checkIndexFinish(checkIndexFinishParams);
  }

  const setActiveclassToCurrentParams = { index, sliderItems, dots };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  allowShift = sliderItemsRemoveClass(sliderItems);
};

export const slide = () => {
  // Mouse events
  sliderItems.onmousedown = dragStart;

  // Clone first and last slide
  sliderItems.appendChild(cloneFirst);
  sliderItems.insertBefore(cloneLast, firstSlide);

  // generate dots items
  const dotsItemsParams = { slidesLength, dots };
  dotsItemsGenerator(dotsItemsParams);

  // dots item click for transition on active index
  dots.children.forEach((item, dotIndex) => {
    item.addEventListener("click", () => {
      const dotsItemsClickParams = { sliderItems, dots, dotIndex, index };
      const dotsItemsClickConst = dotsItemsClick(dotsItemsClickParams);
      index = dotsItemsClickConst.index;
      allowShift = dotsItemsClickConst.allowShift;
      posInitial = dotsItemsClickConst.posInitial;
    });
  });

  slider.classList.add("loaded");

  // Touch events
  sliderItems.addEventListener("touchstart", dragStart);
  sliderItems.addEventListener("touchend", dragEnd);
  sliderItems.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function() {
    shiftSlide(-1);
  });
  next.addEventListener("click", function() {
    shiftSlide(1);
  });

  // Transition events
  sliderItems.addEventListener("transitionend", checkIndex);
};

export default slide;
