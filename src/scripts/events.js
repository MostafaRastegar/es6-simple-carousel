import config from "./config";
import {
  caroueslTouchStart,
  caroueslDragAction,
  dragActionTouchmovePosX1,
  dragActionTouchmovePosX2,
  dragActionMousemovePosX1,
  dragActionMousemove,
  dragActionCalcPosition,
  mouseEventNull,
  sliderItemsAddClass,
  sliderItemsRemoveClass,
  shiftSlideIsDir,
  shiftSlideNonDir,
  checkIndexEnd,
  checkIndexFinish,
  setActiveclassToCurrent,
  dotsItemsGenerator,
  dotsItemsClick,
  sliderClientWidth,
  calcSliderChildWidth,
  setSliderItemsChildWidth,
  setSliderItemsPosition,
  getTranslate3d,
  arrGenerator,
  slideItemGenerator,
  responsiveItemCount,
  cloneNodeGenerator,
  truncResponsiveItemCount,
  calcFinalItemPosition,
  getTruncChildItems,
  setTranslate3d,
  calcCurrentIndex,
  calcSliderGroupCount,
  calcTruncSlideItemSize,
  setPageNumberOnChild,
  switchInfiniteResponsiveCount,
  prevNone,
  prevBlock,
  nextNone,
  nextBlock
} from "./utils";

let { slider, sliderItems, prev, next, threshold, dots, responsive,infinite } = config;
let posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  slidesLength = 0,
  sliderMainWidth = slider.clientWidth,
  // slideSize = sliderItems.getElementsByClassName("slide")[0].offsetWidth,
  orginSlider = [],
  slideSize = calcSliderChildWidth(responsiveItemCount(responsive)),
  sliderItemWidth = calcSliderChildWidth(responsiveItemCount(responsive)),
  index = 0,
  allowShift = true;

export const dragStart = e => {
  e = e || window.event;
  e.preventDefault();
  posInitial = getTranslate3d(sliderItems);

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
  const dragActionCalcPositionParams = {
    sliderItems,
    posX2,
    slidesLength,
    countItem: switchInfiniteResponsiveCount(
      truncResponsiveItemCount(config.responsive),
      infinite
    ),
    sliderItemWidth: calcSliderChildWidth(responsiveItemCount(responsive)),
    slideSize,
    sliderMainWidth,
    infinite
  };
  dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  const countItem = truncResponsiveItemCount(config.responsive);
  const calcFinalItemPositionConst =  calcFinalItemPosition({
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
  const setActiveclassToCurrentParams = {
    sliderItems,
    countItem,
    infinite,
    slideSize,
    sliderMainWidth
  };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  index = calcIndex;

  if(!infinite){
    prevBlock();
    nextBlock();
  }
  if (calcIndex > slidesLength && calcIndex < slidesLength + countItem) {
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
    // revert final item when drag
    // sliderItems.style["transform"] = setTranslate3d(
    //   posFinal - sliderItems.children[0].clientWidth
    // );
  }
  if (calcIndex === slidesLength + countItem) {
    sliderItems.style["transform"] = setTranslate3d(
      posFinal - sliderItems.children[0].clientWidth
    );
  }
  if (infinite && calcIndex === countItem) {
    // revert to final item when drag end
    const dragEndCalcPositionParams = {
      sliderItemWidth: calcSliderChildWidth(responsiveItemCount(responsive)),
      indexItem: index,
      sliderItems,
      slidesLength,
      infinite
    };
    setSliderItemsPosition(dragEndCalcPositionParams);
  }
  console.log('====================================');
  console.log(calcIndex,countItem,calcFinalItemPositionConst);
  console.log('====================================');
  if (!infinite && getTranslate3d(sliderItems) <= threshold && getTranslate3d(sliderItems) >=0) {
    sliderItems.style["transform"] = setTranslate3d(0);
    prevNone();
    nextBlock();
  }

  if (infinite && calcIndex === slidesLength) {
    console.log("====================================");
    console.log(4);
    console.log("====================================");
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
  }

  if(!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst){
    sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
    nextNone();
    prevBlock();
  }


  mouseEventNull();
  checkIndex();
};

export const shiftSlide = (dir, action) => {
  const countItem = truncResponsiveItemCount(config.responsive);
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
      infinite
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
  const countItem = truncResponsiveItemCount(config.responsive);
  const countItemInfinit = switchInfiniteResponsiveCount(
    truncResponsiveItemCount(config.responsive),
    infinite
  );

  // shift to end from start item
  if (index == -1) {
    // const checkIndexEndParams = { sliderItems, slidesLength, slideSize };
    // index = checkIndexEnd(checkIndexEndParams);
  }

  // shift after finish items
  if (index === slidesLength + countItem) {
    const checkIndexFinishParams = { sliderItems, slideSize, countItem };
    index = checkIndexFinish(checkIndexFinishParams);
  }

  //action on index end
  if (index === 0 && infinite) {
    const checkIndexFinishParams = { sliderItems, slidesLength, slideSize };
    index = checkIndexEnd(checkIndexFinishParams);
  }

  if (!infinite && index === 0) {
    prevNone();
    nextBlock();
  }
  console.log('==========index==========================');
  console.log((index * countItem),slidesLength);
  console.log('====================================');
  if (!infinite && (index * countItem) >= slidesLength) {
    nextNone();
    prevBlock();
  }

  // run for set active class
  const setActiveclassToCurrentParams = { index, sliderItems, dots, countItem,infinite,    slideSize,
    sliderMainWidth };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  allowShift = sliderItemsRemoveClass(sliderItems);
  // const currentDataPage = sliderItems.children[index + 1].getAttribute("data-page");
  // const currentDot = dots.children[currentDataPage - 1];
  // dots.children.forEach(child => {
  //   child.classList.remove("active");
  // });
  // currentDot.classList.add("active");
};

export const slide = () => {
  //store main slider before init
  // orginSlider = sliderItems.cloneNode(true);
  const countItem = switchInfiniteResponsiveCount(
    truncResponsiveItemCount(config.responsive),
    infinite
  );

  setSliderItemsPosition({
    indexItem: countItem,
    sliderItemWidth,
    sliderItems
  });

  // init slider for start
  const slides = sliderItems.children;
  slidesLength = slides.length;

  // Mouse events
  sliderItems.onmousedown = dragStart;

  // Clone first and last slide
  if(infinite){
    const cloneNodeGeneratorParams = {
      countItem: switchInfiniteResponsiveCount(
        truncResponsiveItemCount(config.responsive),
        infinite
      ),
      sliderItems
    };
    cloneNodeGenerator(cloneNodeGeneratorParams);
  }

  // init index for start
  index = countItem;

  // generate dots items
    const dotsItemsParams = {
      slidesLength,
      configResponsive: responsive,
      dots,
      sliderItems
    };
    dotsItemsGenerator(dotsItemsParams);

  setPageNumberOnChild(dotsItemsParams);
  // dots item click for transition on active index
  dots.children.forEach((item) => {
    item.addEventListener("click", () => {
      dots.children.forEach(child => {
        child.classList.remove("active");
      });
      item.classList.add("active");
      const dotIndex = parseInt(item.getAttribute('data-dot-index'));
      const indexItem = countItem * dotIndex;
      const dotsItemsClickParams = {
        indexItem,
        sliderItemWidth,
        sliderMainWidth,
        sliderItems,
        slidesLength,
        countItem,
        slideSize,
      };
      dotsItemsClick(dotsItemsClickParams);
      // const dotsItemsClickConst = dotsItemsClick(dotsItemsClickParams);
      // index = dotsItemsClickConst.index;
      // allowShift = dotsItemsClickConst.allowShift;
      // posInitial = dotsItemsClickConst.posInitial;
    });
  });

  setActiveclassToCurrent({
    sliderItems,
    countItem: switchInfiniteResponsiveCount(
      truncResponsiveItemCount(config.responsive),
      infinite
    ),
    infinite,
    slideSize,
    sliderMainWidth
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

  sliderItemWidth = sliderClientWidth();

  setSliderItemsChildWidth(sliderItems);

  // window.onresize = () => {
  //   sliderItems = orginSlider;
  //   sliderItems.innerHTML = slideItemGenerator(orginSlider);
  //   sliderItemWidth = slideSize = sliderClientWidth();
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
