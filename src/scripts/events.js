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
} from "./utils";

let { slider, sliderItems, prev, next, threshold, dots, responsive } = config;
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
    countItem: truncResponsiveItemCount(config.responsive),
    sliderItemWidth: calcSliderChildWidth(responsiveItemCount(responsive))
  };
  dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = e => {
  const countItem = truncResponsiveItemCount(config.responsive);
  posFinal = getTranslate3d(sliderItems);
  const calcIndex = calcCurrentIndex(sliderItems);
  const setActiveclassToCurrentParams = {
    sliderItems,
    countItem
  };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  index = calcIndex;
  if (calcIndex > slidesLength && calcIndex < slidesLength + countItem) {
    // revert final item when drag
    sliderItems.style["transform"] = setTranslate3d(
      posFinal - sliderItems.children[0].clientWidth
    );
  }
  if (calcIndex === slidesLength + countItem) {
    sliderItems.style["transform"] = setTranslate3d(
      posFinal - sliderItems.children[0].clientWidth
    );
  }
  if (calcIndex === slidesLength || calcIndex === countItem) {
    // revert final item when drag
    const dragEndCalcPositionParams = {
      sliderItemWidth: calcSliderChildWidth(responsiveItemCount(responsive)),
      indexItem: index,
      sliderItems,
      slidesLength
    };
    setSliderItemsPosition(dragEndCalcPositionParams);
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
      responsiveItem:responsiveItemCount(responsive)
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

  if(index === countItem){
    config.prev.style.display = "none";
  }else{
    config.prev.style.display = "block";
  }

  if(index >= slidesLength){
    config.next.style.display = "none";
  }else{
    config.next.style.display = "block";
  }

  // shift to end from start item
  // if (index == -1) {
  //   const checkIndexEndParams = { sliderItems, slidesLength, slideSize };
  //   index = checkIndexEnd(checkIndexEndParams);
  // }

  // shift after finish items
  if (index === slidesLength + countItem) {
    const checkIndexFinishParams = { sliderItems, slideSize, countItem };
    index = checkIndexFinish(checkIndexFinishParams);
  }

  //action on index end
  if (index === 0) {
    const checkIndexFinishParams = { sliderItems, slidesLength, slideSize };
    index = checkIndexEnd(checkIndexFinishParams);
  }

  // run for set active class
  const setActiveclassToCurrentParams = { index, sliderItems, dots, countItem };
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  allowShift = sliderItemsRemoveClass(sliderItems);
};

export const slide = () => {
  //store main slider before init
  orginSlider = sliderItems.cloneNode(true);
  setSliderItemsPosition({
    indexItem: truncResponsiveItemCount(config.responsive),
    sliderItemWidth,
    sliderItems
  });

  // init slider for start
  const slides = sliderItems.children;
  slidesLength = slides.length;

  // Mouse events
  sliderItems.onmousedown = dragStart;

  // Clone first and last slide
  const cloneNodeGeneratorParams = {
    countItem: truncResponsiveItemCount(config.responsive),
    sliderItems
  };
  cloneNodeGenerator(cloneNodeGeneratorParams);

  // init index for start
  index = truncResponsiveItemCount(config.responsive);

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
  //       sliderItemWidth: calcSliderChildWidth(responsiveItemCount(responsive)),
  //       slidesLength
  //     };
  //     const dotsItemsClickConst = dotsItemsClick(dotsItemsClickParams);
  //     index = dotsItemsClickConst.index;
  //     allowShift = dotsItemsClickConst.allowShift;
  //     posInitial = dotsItemsClickConst.posInitial;
  //   });
  // });

  setActiveclassToCurrent({
    sliderItems,
    countItem: truncResponsiveItemCount(config.responsive)
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
