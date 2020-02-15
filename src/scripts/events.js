import {
  sliderItemsAddClass,
  sliderItemsRemoveClass,
  shiftSlideIsDir,
  shiftSlideNonDir,
  shiftFirstToEnd,
  shiftEndToFirst,
  setActiveclassToCurrent,

  // sliderClientWidth,
  calcSliderChildWidth,
  setSliderItemsChildWidth,
  setSliderItemsPosition,
  getTranslate3d,
  arrGenerator,
  // slideItemGenerator,
  responsiveItemCount,
  cloneNodeGenerator,
  truncResponsiveItemCount,
  calcFinalItemPosition,
  calcFirstItemPosition,
  // getTruncChildItems,
  setTranslate3d,
  calcCurrentIndex,
  calcSliderGroupCount,
  // calcTruncSlideItemSize,
  setPageNumberOnChild,
  switchInfiniteResponsiveCount,
  prevNone,
  prevBlock,
  nextNone,
  nextBlock
} from "./utils";

import {
  caroueslDragAction,
  caroueslTouchStart,
  dragActionCalcPosition,
  dragActionMousemove,
  dragActionMousemovePosX1,
  dragActionTouchmovePosX1,
  dragActionTouchmovePosX2,
  mouseEventNull,
  dragStart
} from "./dragEvent";

import SliderDots from './dots';
import SliderTrailer from './slideTrailer';

let sliderSelector = null,
  posX1 = 0,
  posX2 = 0,
  responsive = null,
  infinite = false,
  threshold = 0,
  slider = null,
  sliderItems = null,
  posInitial,
  posFinal,
  slidesLength = 0,
  sliderMainWidth = 0,
  orginSlider = [],
  slideSize = 0,
  sliderItemWidth = 0,
  index = 0,
  allowShift = true;

export const dragAction = e => {
  const perSlide = switchInfiniteResponsiveCount(
    truncResponsiveItemCount(responsive),
    infinite
  );
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
  const dragActionCalcPositionParams = {
    sliderItems,
    threshold,
    posX2,
    slidesLength,
    perSlide,
    sliderItemWidth: calcSliderChildWidth({
      responsiveItemCount: responsiveItemCount(responsive),
      slider
    }),
    slideSize,
    sliderMainWidth,
    infinite,
  };
  dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  const perSlide = truncResponsiveItemCount(responsive);
  const calcFinalItemPositionConst = calcFinalItemPosition({
    slideSize,
    slidesLength,
    sliderMainWidth,
    perSlide,
    infinite
  });
  posFinal = getTranslate3d(sliderItems);
  const calcIndex = calcCurrentIndex({
    sliderItems,
    infinite,
    perSlide,
    slideSize,
    sliderMainWidth
  });
  index = calcIndex;
  const setActiveclassToCurrentParams = {
    sliderItems,
    perSlide,
    infinite,
    slideSize,
    sliderMainWidth,
    dotsSelector,
    index
  };
  setActiveclassToCurrent(setActiveclassToCurrentParams);

  if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide || 
    infinite && calcIndex + perSlide === perSlide
    ) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
  }

  if (infinite && calcIndex >= perSlide + slidesLength) {
    const calcFirstItemPositionConst = calcFirstItemPosition({
      slideSize, perSlide, infinite
    });
    sliderItems.style["transform"] = setTranslate3d(calcFirstItemPositionConst);
  }

  if (!infinite) {
    prevBlock(sliderSelector);
    nextBlock(sliderSelector);
  }
  if (!infinite && calcIndex === slidesLength + perSlide) {
    sliderItems.style["transform"] = setTranslate3d(
      posFinal - sliderItems.children[0].clientWidth
    );
  }
  if (
    !infinite &&
    getTranslate3d(sliderItems) <= threshold &&
    getTranslate3d(sliderItems) >= 0
  ) {
    sliderItems.style["transform"] = setTranslate3d(0);
    prevNone(sliderSelector);
    nextBlock(sliderSelector);
  }

  if (!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
    nextNone(sliderSelector);
    prevBlock(sliderSelector);
  }

  mouseEventNull();
  checkIndex();
};

export const shiftSlide = (dir, action) => {
  const perSlide = truncResponsiveItemCount(responsive);
  if (allowShift) {
    if (!action) {
      posInitial = getTranslate3d(sliderItems);
    }
    let shiftSlideParams = {
      sliderItems,
      posInitial,
      slideSize,
      index,
      slidesLength,
      perSlide,
      dir,
      sliderMainWidth,
      responsiveItem: responsiveItemCount(responsive),
      infinite,
      sliderSelector
    };
    if (dir == 1) {
      index = shiftSlideIsDir(shiftSlideParams);
    } else if (dir == -1) {
      index = shiftSlideNonDir(shiftSlideParams);
    }
  }
  allowShift = sliderItemsAddClass(sliderItems);
};

export const checkIndex = () => {
  const perSlide = truncResponsiveItemCount(responsive);
  const responsiveItem = responsiveItemCount(responsive);

  // // shift to end from start item
  // if (infinite && index < 0) {
  //   const shiftFirstToEndParams = { sliderItems, slidesLength, slideSize,perSlide,responsiveItem };
  //   index = shiftFirstToEnd(shiftFirstToEndParams);
  // }

  // // shift after finish items
  // if (infinite && index >= perSlide + slidesLength) {
  //   const shiftEndToFirstParams = { sliderItems, slideSize, perSlide,responsiveItem };
  //   index = shiftEndToFirst(shiftEndToFirstParams);
  // }

  if (!infinite && index === 0) {
    prevNone(sliderSelector);
    nextBlock(sliderSelector);
  }

  // run for set active class
  const setActiveclassToCurrentParams = {
    index,
    sliderItems,
    dotsSelector,
    perSlide,
    infinite,
    slideSize,
    sliderMainWidth
  };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  allowShift = sliderItemsRemoveClass(sliderItems);
  const currentDataPage = parseInt(sliderItems.children[infinite ? index : index -1].getAttribute("data-page"));
  const currentDot = dotsSelector.children[currentDataPage-1];
  dotsSelector.children.forEach(child => {
    child.classList.remove("active");
  });
  currentDot.classList.add("active");
};

class SliderCore {
	config = {};
	sliderSelector = null;
	posX1 = 0;
	posX2 = 0;
	responsive = null;
	infinite = false;
	threshold = 0;
	slider = null;
	sliderItems = null;
	posInitial = 0;
	posFinal = 0;
	slidesLength = 0;
	sliderMainWidth = 0;
	orginSlider = [];
	slideSize = 0;
	sliderItemWidth = 0;
	index = 0;
  allowShift = true;
  perSlide = 0;

	constructor(config) {
		this.setConfig(config);
		this.initialize();
	};

	setConfig = config => { this.config = config };
	getConfig = () => this.config;

	setSliderSelector = sliderSelector => { this.sliderSelector = sliderSelector };
	getSliderSelector = () => this.sliderSelector;

	setSlider = slider => { this.slider = slider };
	getSlider = () => this.slider;

	setPosX1 = posX1 => { this.posX1 = posX1 };
	getPosX1 = () => this.posX1;

	setPosX2 = posX2 => { this.posX2 = posX2 };
  getPosX2 = () => this.posX2;
  
	setPerSlide = perSlide => { this.perSlide = perSlide };
	getPerSlide = () => this.perSlide;


	setSliderItems = sliderItems => { this.sliderItems = sliderItems };
	getSliderItems = () => this.sliderItems;

	setPosInitial = posInitial => { this.posInitial = posInitial };
	getPosInitial = () => this.posInitial;

	setPosFinal = posFinal => { this.posFinal = posFinal };
	getPosFinal = () => this.posFinal;

	setSlidesLength = slidesLength => { this.slidesLength = slidesLength };
	getSlidesLength = () => this.slidesLength;

	setSliderMainWidth = sliderMainWidth => { this.sliderMainWidth = sliderMainWidth };
	getSliderMainWidth = () => this.sliderMainWidth;


	setOrginSlider = orginSlider => { this.orginSlider = orginSlider };
	getOrginSlider = () => this.orginSlider;

	setSlideSize = slideSize => { this.slideSize = slideSize };
	getSlideSize = () => this.slideSize;

	setSliderItemWidth = sliderItemWidth => { this.sliderItemWidth = sliderItemWidth };
	getSliderItemWidth = () => this.sliderItemWidth;

	setIndex = index => { this.index = index };
	getIndex = () => this.index;

	setAllowShift = allowShift => { this.allowShift = allowShift };
	getAllowShift = () => this.allowShift;

	initialize = () => {
		const {
			slider,
			infinite,
			responsive,
		} = this.getConfig();
		//----------- start init variables  -----
		this.setSlider(slider);

		const sliderSelector = document.querySelector(`${slider}`);
		this.setSliderSelector(sliderSelector);

		const sliderClienWidth = this.getSliderSelector().clientWidth;
		this.setSliderMainWidth(sliderClienWidth);

		const sliderSlidesSelector = document.querySelector(`${slider} .slides`);
		this.setSliderItems(sliderSlidesSelector);

		const sliderChildWidth = calcSliderChildWidth({
			responsiveItemCount: responsiveItemCount(responsive),
			slider:this.getSliderSelector()
		});
		this.setSlideSize(sliderChildWidth);

		const sliderItemWidth = calcSliderChildWidth({
			responsiveItemCount: responsiveItemCount(responsive),
			slider:this.getSliderSelector()
		})
		this.setSliderItemWidth(sliderItemWidth);

		// init slider for start
		const slides = this.getSliderItems().children;
		this.setSlidesLength(slides.length);

		// change name to perSlide
		const perSlide = switchInfiniteResponsiveCount(
			truncResponsiveItemCount(responsive),
			infinite
    );
    this.setPerSlide(perSlide);
    this.setIndex(perSlide);
    
    this.sliderTrailer = new SliderTrailer({core: this});



		const dragStartCall = e => {
			let dragStartParams = { e, sliderItems:this.getSliderItems(), dragEnd, dragAction };
			const dragStartResult = dragStart(dragStartParams);
			posInitial = dragStartResult.posInitial;
			posX1 = dragStartResult.posX1;
		};
		// Mouse events
		this.getSliderItems().onmousedown = dragStartCall;
		// Touch events
		this.getSliderItems().addEventListener("touchstart", dragStartCall);
		this.getSliderItems().addEventListener("touchend", dragEnd);
		this.getSliderItems().addEventListener("touchmove", dragAction);
		// Transition events
		this.getSliderItems().addEventListener("transitionend", checkIndex);


		// put in arrow
    const prevSelector = document.querySelector(`${slider} .prev`);
    const nextSelector = document.querySelector(`${slider} .next`);
    
		// Click events
		prevSelector.addEventListener("click", function () {
			shiftSlide(-1);
		});
		nextSelector.addEventListener("click", function () {
			shiftSlide(1);
    });
    


    this.sliderDots = new SliderDots({core: this});



		// window.onresize = () => {
		//   sliderItems = orginSlider;
		//   sliderItems.innerHTML = slideItemGenerator(orginSlider);
		//   sliderItemWidth = slideSize = sliderClientWidth(slider);
		//   setSliderItemsChildWidth(orginSlider);
		//   const setSliderItemsPositionParams = {
		//     indexItem: index,
		//     sliderItemWidth,
		//     sliderItems: orginSlider
		//   };
		//   setSliderItemsPosition(setSliderItemsPositionParams);
		// };

	}

};

export default SliderCore;