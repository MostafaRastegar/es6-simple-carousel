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
  calcSliderMainWidth,
  setSliderItemsChildWidth,
  setSliderItemsPosition,
  getTranslate3d,
  arrGenerator,
  slideItemGenerator,
  responsiveItemSize,
  cloneNodeGenerator,
  truncResponsiveItemSize,
  getTruncChildItems
} from "./utils";

let { slider, sliderItems, prev, next, threshold, dots, responsive } = config;
let posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  slidesLength = 0,
  // slideSize = sliderItems.getElementsByClassName("slide")[0].offsetWidth,
  orginSlider = [],
  slideSize = calcSliderMainWidth(responsiveItemSize(responsive)),
  sliderItemWidth = calcSliderMainWidth(responsiveItemSize(responsive)),
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
     sliderItems, posX2,index,posInitial ,slidesLength,
     sliderItemWidth:calcSliderMainWidth(responsiveItemSize(responsive)),
     posX1
    };
  dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  // sliderItems.style["transform"] = setTranslate3d(-slidesLength * sliderItemWidth);
  posFinal = getTranslate3d(sliderItems);
  if (posFinal - posInitial < -threshold) {
    console.log('===============۱=====================');
    console.log(posFinal,posInitial,threshold,index);
    console.log('====================================');
    // shiftSlide(1, "drag");
  } else if (posFinal - posInitial > threshold) {
    console.log('==============۲======================');
    console.log(posFinal,posInitial,threshold,index);
    console.log('====================================');
    // shiftSlide(-1, "drag");
  } else {
    const dragEndCalcPositionParams = { 
      sliderItemWidth:calcSliderMainWidth(responsiveItemSize(responsive)),
      indexItem: 2,
      sliderItems,
      slidesLength
    };
    setSliderItemsPosition(dragEndCalcPositionParams);
  }
  mouseEventNull();
};

export const shiftSlide = (dir, action) => {
  if (allowShift) {
    if (!action) {
      posInitial = getTranslate3d(sliderItems);
    }
    let shiftSlideParams = { sliderItems, posInitial, slideSize, index,slidesLength,dir };
    if (dir == 1) {
      index = shiftSlideIsDir(shiftSlideParams);
    } else if (dir == -1) {
      index = shiftSlideNonDir(shiftSlideParams);
    }
  }
  allowShift = sliderItemsAddClass(sliderItems);
};

export const checkIndex = () => {
  const countItem = truncResponsiveItemSize(config.responsive);
  console.log('==============checkIndex======================');
  console.log(index,slidesLength + countItem);
  console.log('====================================');

  // shift to end from start item
  if (index == -1) {
    const checkIndexEndParams = { sliderItems, slidesLength, slideSize };
    index = checkIndexEnd(checkIndexEndParams);
  };

  // shift after finish items
  if (index === slidesLength + countItem) {
    const checkIndexFinishParams = { sliderItems, slideSize, countItem };
    index = checkIndexFinish(checkIndexFinishParams);
  }

  //action on index end
  if(index === 0){
    const checkIndexFinishParams = { sliderItems, slidesLength, slideSize };
    index = checkIndexEnd(checkIndexFinishParams);
  }

  const setActiveclassToCurrentParams = { index, sliderItems, dots,countItem };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  allowShift = sliderItemsRemoveClass(sliderItems);
};

export const slide = () => {

  //store main slider before init
  orginSlider = sliderItems.cloneNode(true);
  setSliderItemsPosition({
    indexItem: truncResponsiveItemSize(config.responsive),
    sliderItemWidth,
    sliderItems,
  });

  // init slider for start
  const slides = sliderItems.children;
  slidesLength = slides.length;

  // Mouse events
  sliderItems.onmousedown = dragStart;


  // Clone first and last slide
  const cloneNodeGeneratorParams = {
    countItem:truncResponsiveItemSize(config.responsive),
    sliderItems
  };
  cloneNodeGenerator(cloneNodeGeneratorParams);


  // init index for start
  index = truncResponsiveItemSize(config.responsive);
  
  // generate dots items
  // const dotsItemsParams = { slidesLength, dots };
  // dotsItemsGenerator(dotsItemsParams);

  // dots item click for transition on active index
  // dots.children.forEach((item, dotIndex) => {
  //   item.addEventListener("click", () => {
  //     const dotsItemsClickParams = {
  //       sliderItems,
  //       dots,
  //       dotIndex,
  //       index,
  //       sliderItemWidth: calcSliderMainWidth(responsiveItemSize(responsive)),
  //       slidesLength
  //     };
  //     const dotsItemsClickConst = dotsItemsClick(dotsItemsClickParams);
  //     index = dotsItemsClickConst.index;
  //     allowShift = dotsItemsClickConst.allowShift;
  //     posInitial = dotsItemsClickConst.posInitial;
  //   });
  // });

  setActiveclassToCurrent({
    sliderItems, countItem:truncResponsiveItemSize(config.responsive)
  });

  slider.classList.add("loaded");

  // Touch events
  sliderItems.addEventListener("touchstart", dragStart);
  sliderItems.addEventListener("touchend", dragEnd);
  sliderItems.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });
  next.addEventListener("click", function () {
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
