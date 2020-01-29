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
	sliderItemsRemoveClass
} from './utils';

let { slider, sliderItems, prev, next, threshold } = config;
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
		const dragActionTouchmovePosX2Params = {e,posX1};
    posX2 = dragActionTouchmovePosX2(dragActionTouchmovePosX2Params);
    posX1 = dragActionTouchmovePosX1(e);
  } else {
		const dragActionMousemoveParams = {e,posX1};
    posX2 = dragActionMousemove(dragActionMousemoveParams);
    posX1 = dragActionMousemovePosX1(e);
	}
	const dragActionCalcPositionParams = {sliderItems,posX2};
	dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  posFinal = carouselPositionLeft(sliderItems);
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, "drag");
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, "drag");
  } else {
		const dragEndCalcPositionParams = {sliderItems,posInitial}
		dragEndCalcPosition(dragEndCalcPositionParams);
  }
	mouseEventNull();
};

export const shiftSlide = (dir, action) => {
	sliderItemsAddClass(sliderItems);
  if (allowShift) {
    if (!action) {
      posInitial = carouselPositionLeft(sliderItems);
    }

    if (dir == 1) {
      sliderItems.style["left"] = posInitial - slideSize + "px";
      index++;
    } else if (dir == -1) {
      sliderItems.style["left"] = posInitial + slideSize + "px";
      index--;
    }
  }
  allowShift = false;
};

export const checkIndex = () => {
	sliderItemsRemoveClass(sliderItems);
  if (index == -1) {
    sliderItems.style["left"] = -(slidesLength * slideSize) + "px";
    index = slidesLength - 1;
  }
  if (index == slidesLength) {
    sliderItems.style["left"] = -(1 * slideSize) + "px";
    index = 0;
  }
  allowShift = true;
};

export const slide = () => {
  // Mouse events
  sliderItems.onmousedown = dragStart;

  // Clone first and last slide
  sliderItems.appendChild(cloneFirst);
  sliderItems.insertBefore(cloneLast, firstSlide);
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