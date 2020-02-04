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
  const { sliderItems, posX2, index,posX1,posInitial,slidesLength,sliderItemWidth
  } = params;
  // console.log('============sliderItemWidth========================');
  // console.log(-sliderItemWidth*slidesLength,posInitial);
  // console.log('====================================');
  if(index === 0 && getTranslate3d(sliderItems) - posX2 > posInitial + 50){
    // console.log('====================================');
    // console.log(false);
    // console.log('====================================');
    return false;
  }
  // && ((getTranslate3d(sliderItems) - posX2) < (posInitial - 50))
  if((-sliderItemWidth*slidesLength) === (posInitial + 50)){
    // alert(posInitial);
    return false;
  }
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
  let { sliderItems, posInitial, slideSize, index,slidesLength } = params;
  // if(index + 1 === slidesLength-1){
  //   const configResponsive = config.responsive;
  //   sliderItems.style["transform"] = setTranslate3d(posInitial-slideSize + getTruncChildItems(responsiveItemSize(configResponsive)));
  //   return index + 1;
  // }
  sliderItems.style["transform"] = setTranslate3d(posInitial - slideSize);
  return index + 1;
};

export const shiftSlideNonDir = params => {
  let { sliderItems, posInitial, slideSize, index } = params;
  // if(index - 1 === 0){
  //   console.log('====================================');
  //   console.log(index);
  //   console.log('====================================');
  //   // const configResponsive = config.responsive;
  //   // sliderItems.style["transform"] = setTranslate3d(posInitial + slideSize + getTruncChildItems(responsiveItemSize(configResponsive)));
  //   // return index - 1;
  //   sliderItems.style["transform"] = setTranslate3d(posInitial + slideSize);
  //   return index-1;
  // }
  // if(index === 2){
  //   const configResponsive = config.responsive;
  //   sliderItems.style["transform"] = setTranslate3d(posInitial + slideSize - getTruncChildItems(responsiveItemSize(configResponsive)));
  //   return index - 1;
  // }
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
  const { sliderItems, dots, dotIndex, index, sliderItemWidth,slidesLength } = params;
  const setActiveParams = { index, sliderItems, dots };
  setSliderItemsPosition({
    indexItem: dotIndex,
    sliderItemWidth,
    sliderItems,
    slidesLength
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
      const configResponsive = config.responsive;
      console.log('====================================');
      console.log(responsiveItemSize(configResponsive));
      console.log('====================================');
  // const itemsTrunc = Math.trunc(items);
  for (let i = 0; i < slidesLength/responsiveItemSize(configResponsive); i++) {
    dots.innerHTML += `<li class="dots-item" data-dot-index="${i}">${i +
      1}</li>`;
  }
};

export const sliderClientWidth = () => config.slider.clientWidth;

export const getTruncChildItems = (items) => {
  const itemsTrunc = Math.round(items);
  if((items - itemsTrunc) === 0){
    return sliderClientWidth();
  }

  const mainWidthTruncItem = sliderClientWidth() / itemsTrunc;
  return sliderClientWidth() - (mainWidthTruncItem / 2);
};

export const calcSliderMainWidth = (items) => {
  const itemsTrunc = Math.trunc(items);
  if((items - itemsTrunc) === 0){
    return sliderClientWidth() / itemsTrunc;
  }
  const mainWidthTruncItem = sliderClientWidth() / itemsTrunc;
  const decriseWithForEachItems = (mainWidthTruncItem / itemsTrunc) / itemsTrunc;
  return mainWidthTruncItem - decriseWithForEachItems;
};

export const setSliderItemsChildWidth = (sliderItems) => {
  const configResponsive = config.responsive;
  sliderItems.children.forEach(child => child.style.width = calcSliderMainWidth(responsiveItemSize(configResponsive)) + 'px');
};

export const setSliderItemsPosition = (params) => {
  const { indexItem, sliderItemWidth,sliderItems } = params;
  sliderItems.style["transform"] = setTranslate3d((indexItem + 1) * -sliderItemWidth);
};

export const setTranslate3d = (getValue) => `translate3d(${getValue}px,0px,0px)`;

export const getTranslate3d = (sliderItems) => {
  const values = sliderItems.style.transform.match(/translate3d\((.*)px\, (.*)px\, (.*)px\)/);
  if (!values[1] || !values[1].length) {
      return 0;
  };
  return parseInt(values[1]);
};

export const arrGenerator = (arr,part) => {
  const  partTrunc = Math.trunc(part);
  const round = Math.ceil(arr.length / partTrunc);
  let counter = 0;
  const newArry=[];
  for(counter;round > counter; counter++){
   newArry[counter] = arr.slice(counter*partTrunc,(counter + 1) * partTrunc);
  }
  return newArry;
};

export const responsiveItemSize = (getConfig) => {
  const resp = Object.keys(getConfig);
  const newResp = resp.filter(item =>{
    if(item <= document.body.clientWidth) {
      return item;
    }
  });  
  return getConfig[parseInt(newResp.pop())].items;
};

export const slideItemGenerator = (sliderItems) => {  
  const newSliderItems = arrGenerator(
    Array.from(sliderItems.children),
    responsiveItemSize(config.responsive)
  );
  const newHtml =  newSliderItems.map((items,indexItem) => 
    `<div class="slide ${indexItem}">
      ${items.map(item => item.outerHTML).join('')}
    </div>`
  ).join('');

  return newHtml;
};

