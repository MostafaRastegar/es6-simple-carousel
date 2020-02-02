import config from "./config";

export const caroueslTouchStart = e => e.touches[0].clientX;

export const caroueslDragAction = params => {
  const { e, dragEnd, dragAction } = params;
  document.onmouseup = dragEnd;
  document.onmousemove = dragAction;
  return e.clientX;
};

export const dragActionTouchmovePosX2 = params => {
  const { e, posX1 } = params;
  return posX1 - e.touches[0].clientX;
};

export const dragActionTouchmovePosX1 = e => e.touches[0].clientX;

export const dragActionMousemove = params => {
  const { posX1, e } = params;
  return posX1 - e.clientX;
};

export const dragActionMousemovePosX1 = e => e.clientX;

export const dragActionCalcPosition = params => {
  const { sliderItems, posX2 } = params;
  sliderItems.style["transform"] = setTranslate3d(getTranslate3d(sliderItems) - posX2);
};

export const mouseEventNull = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};

export const sliderItemsAddClass = sliderItems => {
  sliderItems.classList.add("shifting");
  return false;
};

export const sliderItemsRemoveClass = sliderItems => {
  sliderItems.classList.remove("shifting");
  return true;
};

export const shiftSlideIsDir = params => {
  let { sliderItems, posInitial, slideSize, index } = params;
  sliderItems.style["transform"] = setTranslate3d(posInitial - slideSize);
  return index + 1;
};

export const shiftSlideNonDir = params => {
  let { sliderItems, posInitial, slideSize, index } = params;
  sliderItems.style["transform"] = setTranslate3d(posInitial + slideSize);
  return index - 1;
};

export const checkIndexEnd = params => {
  const { sliderItems, slidesLength, slideSize } = params;
  sliderItems.style["transform"] = setTranslate3d(-(slidesLength * slideSize));
  return slidesLength - 1;
};

export const checkIndexFinish = params => {
  const { sliderItems, slideSize } = params;
  sliderItems.style["transform"] = setTranslate3d(-slideSize);
  return 0;
};

export const setActiveclassToCurrent = params => {
  const { index, sliderItems, dots } = params;
  sliderItems.children.forEach((item, itemIndex) => {
    if (index + 1 === itemIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  dots.children.forEach((item, itemIndex) => {
    if (index === itemIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

export const dotsItemsClick = params => {
  const { sliderItems, dots, dotIndex, index, sliderItemWidth } = params;
  const setActiveParams = { index, sliderItems, dots };
  setSliderItemsPosition({
    indexItem: dotIndex,
    sliderItemWidth
  });
  setActiveclassToCurrent(setActiveParams);
  return {
    index: dotIndex,
    allowShift: sliderItemsAddClass(sliderItems),
    posInitial: getTranslate3d(sliderItems)
  };
};

export const dotsItemsGenerator = params => {
  const { slidesLength, dots } = params;
  for (let i = 0; i < slidesLength; i++) {
    dots.innerHTML += `<li class="dots-item ${i === 0 && ' active'}" data-dot-index="${i}">${i +
      1}</li>`;
  }
};

export const sliderClientWidth = () => config.slider.clientWidth;

export const setSliderItemsChildWidth = () => {
  config.sliderItems.children.forEach(child => child.style.width = sliderClientWidth() + 'px');
};

export const setSliderItemsPosition = (params) => {
  const { indexItem, sliderItemWidth } = params;
  config.sliderItems.style["transform"] = setTranslate3d((indexItem + 1) * -sliderItemWidth);
};

export const setTranslate3d = (getValue) => `translate3d(${getValue}px,0px,0px)`;

export const getTranslate3d = (sliderItems) => {
  const values = sliderItems.style.transform.match(/translate3d\((.*)px\, (.*)px\, (.*)px\)/);
  if (!values[1] || !values[1].length) {
      return 0;
  };
  return parseInt(values[1]);
};