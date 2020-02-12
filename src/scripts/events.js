import {
  sliderItemsAddClass,
  sliderItemsRemoveClass,
  shiftSlideIsDir,
  shiftSlideNonDir,
  shiftFirstToEnd,
  shiftEndToFirst,
  setActiveclassToCurrent,
  dotsItemsGenerator,
  dotsItemsClick,
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

let sliderSelector = null,
  dotsSelector = null,
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
  const countItem = switchInfiniteResponsiveCount(
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
    countItem,
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
  const countItem = truncResponsiveItemCount(responsive);
  const calcFinalItemPositionConst = calcFinalItemPosition({
    slideSize,
    slidesLength,
    sliderMainWidth,
    countItem,
    infinite
  });
  posFinal = getTranslate3d(sliderItems);
  const calcIndex = calcCurrentIndex({
    sliderItems,
    infinite,
    countItem,
    slideSize,
    sliderMainWidth
  });
  index = calcIndex;
  const setActiveclassToCurrentParams = {
    sliderItems,
    countItem,
    infinite,
    slideSize,
    sliderMainWidth,
    dotsSelector,
    index
  };
  setActiveclassToCurrent(setActiveclassToCurrentParams);

  if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + countItem || 
    infinite && calcIndex + countItem === countItem
    ) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
  }

  if (infinite && calcIndex >= countItem + slidesLength) {
    const calcFirstItemPositionConst = calcFirstItemPosition({
      slideSize, countItem, infinite
    });
    sliderItems.style["transform"] = setTranslate3d(calcFirstItemPositionConst);
  }

  if (!infinite) {
    prevBlock(sliderSelector);
    nextBlock(sliderSelector);
  }
  if (!infinite && calcIndex === slidesLength + countItem) {
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
  const countItem = truncResponsiveItemCount(responsive);
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
      countItem,
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
  const countItem = truncResponsiveItemCount(responsive);
  const responsiveItem = responsiveItemCount(responsive);

  // // shift to end from start item
  // if (infinite && index < 0) {
  //   const shiftFirstToEndParams = { sliderItems, slidesLength, slideSize,countItem,responsiveItem };
  //   index = shiftFirstToEnd(shiftFirstToEndParams);
  // }

  // // shift after finish items
  // if (infinite && index >= countItem + slidesLength) {
  //   const shiftEndToFirstParams = { sliderItems, slideSize, countItem,responsiveItem };
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
    countItem,
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

export const slide = slideConfig => {
  sliderSelector = slideConfig.slider;
  slider = document.querySelector(`${sliderSelector}`);
  threshold = slideConfig.threshold;
  infinite = slideConfig.infinite;
  responsive = slideConfig.responsive;
  sliderMainWidth = slider.clientWidth;
  sliderItems = document.querySelector(`${sliderSelector} .slides`);
  dotsSelector = document.querySelector(`${sliderSelector} .dots`);
  const prevSelector = document.querySelector(`${sliderSelector} .prev`);
  const nextSelector = document.querySelector(`${sliderSelector} .next`);
  slideSize = calcSliderChildWidth({
    responsiveItemCount: responsiveItemCount(responsive),
    slider
  });
  sliderItemWidth = calcSliderChildWidth({
    responsiveItemCount: responsiveItemCount(responsive),
    slider
  });

  //store main slider before init
  const countItem = switchInfiniteResponsiveCount(
    truncResponsiveItemCount(responsive),
    infinite
  );
  // // init slider position
  setSliderItemsPosition({
    indexItem: countItem, // user init slide index (feature)
    sliderItemWidth,
    sliderItems
  });

  // // init slider for start
  const slides = sliderItems.children;
  slidesLength = slides.length;

  const dragStartCall = e => {
    let dragStartParams = { e, sliderItems, dragEnd, dragAction };
    const dragStartResult = dragStart(dragStartParams);
    posInitial = dragStartResult.posInitial;
    posX1 = dragStartResult.posX1;
  };

  // // Mouse events
  sliderItems.onmousedown = dragStartCall;

    //generate dots items
    const dotsItemsParams = {
      slidesLength,
      responsive,
      dotsSelector,
      sliderItems
    };
    dotsSelector = dotsItemsGenerator(dotsItemsParams);

  setPageNumberOnChild(dotsItemsParams);

  // // Clone first and last slide
  if (infinite) {
    const cloneNodeGeneratorParams = {
      countItem,
      sliderItems
    };
    cloneNodeGenerator(cloneNodeGeneratorParams);
  }

  // // init index for start
  index = countItem;

  setActiveclassToCurrent({
    sliderItems,
    countItem,
    infinite,
    slideSize,
    sliderMainWidth,
    dotsSelector,
    index
  });

  slider.classList.add("loaded");

  // // Touch events
  sliderItems.addEventListener("touchstart", dragStartCall);
  sliderItems.addEventListener("touchend", dragEnd);
  sliderItems.addEventListener("touchmove", dragAction);
  // // Transition events
  sliderItems.addEventListener("transitionend", checkIndex);

  // // Click events
  prevSelector.addEventListener("click", function() {
    shiftSlide(-1);
  });
  nextSelector.addEventListener("click", function() {
    shiftSlide(1);
  });

  // sliderItemWidth = sliderClientWidth(slider);

  setSliderItemsChildWidth({
    sliderItems,
    responsive,
    slider
  });


  // dots item click for transition on active index
  dotsSelector.children.forEach((item) => {
    item.addEventListener("click", () => {
      dotsSelector.children.forEach(child => {
        child.classList.remove("active");
      });
      item.classList.add("active");
      const dotIndex = parseInt(item.getAttribute('data-dot-index'));
      const indexItem =  truncResponsiveItemCount(responsive) * (dotIndex-1);
      const dotsItemsClickParams = {
        indexItem,
        sliderItemWidth,
        sliderMainWidth,
        sliderItems,
        slidesLength,
        countItem:truncResponsiveItemCount(responsive),
        slideSize,
        infinite,
        dotIndex,
        responsive,
        sliderSelector
      };
      // dotsItemsClick(dotsItemsClickParams);
      const dotsItemsClickConst = dotsItemsClick(dotsItemsClickParams);
      index = dotsItemsClickConst.index;
      allowShift = dotsItemsClickConst.allowShift;
      posInitial = dotsItemsClickConst.posInitial;
    });
  });

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
};

export default slide;