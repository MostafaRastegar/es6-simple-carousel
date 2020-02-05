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
  const { sliderItems, posX2, index, posX1, posInitial, slidesLength, sliderItemWidth
  } = params;

  if(getTranslate3d(sliderItems) - posX2 > (-sliderItemWidth*2) + 50){
    // alert('salam');
    return false;
  }

  if(getTranslate3d(sliderItems) - posX2 <= (-slidesLength * sliderItemWidth +100)){
    // alert('salam');
    // sliderItems.style["transform"] = setTranslate3d(-slidesLength * sliderItemWidth);  
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
  let { sliderItems, posInitial, slideSize, index, slidesLength } = params;
  // console.log('==================params==================');
  // console.log(params);
  // console.log('====================================');
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
  sliderItems.style["transform"] = setTranslate3d(posInitial + slideSize);
  return index - 1;
};

export const checkIndexEnd = params => {
  const { sliderItems, slidesLength, slideSize } = params;
  sliderItems.style["transform"] = setTranslate3d(-(slidesLength * slideSize));
  console.log('============checkIndexEnd========================');
  console.log(slidesLength);
  console.log('====================================');
  return slidesLength;
};

export const checkIndexFinish = params => {
  const { sliderItems, slideSize,countItem } = params;
  sliderItems.style["transform"] = setTranslate3d(-slideSize * countItem);
  return countItem;
};

export const calcCurrentIndex = sliderItems => {
  return Math.abs(Math.round(getTranslate3d(sliderItems) / sliderItems.children[0].clientWidth));
};

export const setActiveclassToCurrent = params => {
  const { sliderItems,countItem } = params;
  // console.log('===========index2=========================');
  // console.log(index);
  // console.log('====================================');
  const activeIndex = calcCurrentIndex(sliderItems);
  const configCount = countItem;
  // const sliderWidth = calcSliderMainWidth(responsiveItemSize(config.responsive)) * countItem;
  // const translate3d = getTranslate3d(sliderItems);
  const activeItems = [];
  // const activeDots = [];
  [...Array(configCount).keys()].forEach(
    item => activeItems.push(item + activeIndex)
  );
  sliderItems.children.forEach((item,itemIndex) => {
    if (activeItems.includes(itemIndex)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // dots.children.forEach((item,itemIndex) => {
  //   console.log('==========itemIndex==========================');
  //   console.log(itemIndex);
  //   console.log('====================================');

  //   if((itemIndex + 1 * Math.floor(sliderWidth)) === Math.abs(translate3d)){
  //     item.classList.add("active");
  //   }

  //   if ((itemIndex * Math.floor(sliderWidth)) <= Math.abs(translate3d) && ((itemIndex + 1) * Math.floor(sliderWidth)) <= Math.abs(translate3d) ) {
  //     item.classList.add("active");
  //     if(itemIndex !== 0){
  //       dots.children[itemIndex - 1].classList.remove("active");
  //     }
  //   }
  //   if(itemIndex - 1 === -1){
  //     dots.children[dots.children.length - 1].classList.remove("active");
  // }
    
  // });


  // if (activeIndex === index) {
  //   dots.children[activeIndex/2].a
  //   item.classList.add("active");
  // }else{
  //   item.classList.remove("active");
  // }
  // dots.children.forEach((item, itemIndex) => {
  // });
};

// export const dotsItemsClick = params => {
//   const { sliderItems, dots, dotIndex, index, sliderItemWidth, slidesLength } = params;
//   const configResponsive = config.responsive;
//   const newDotIndex = (dotIndex + 1) * truncResponsiveItemSize(configResponsive);
//   setSliderItemsPosition({
//     indexItem: newDotIndex,
//     sliderItemWidth,
//     sliderItems,
//   });
//   return {
//     index: newDotIndex,
//     allowShift: sliderItemsAddClass(sliderItems),
//     posInitial: getTranslate3d(sliderItems)
//   };
// };

// export const dotsItemsGenerator = params => {
//   const { slidesLength, dots } = params;
//   const configResponsive = config.responsive;
//   for (let i = 0; i < slidesLength / truncResponsiveItemSize(configResponsive); i++) {
//     dots.innerHTML += `<li class="dots-item" data-dot-index="${i}">${i +
//       1}</li>`;
//   }
// };

export const sliderClientWidth = () => config.slider.clientWidth;

export const truncResponsiveItemSize = (itemsConfig) => {
  return Math.trunc(responsiveItemSize(itemsConfig));
};

export const getTruncChildItems = (items) => {
  const itemsTrunc = Math.round(items);
  if ((items - itemsTrunc) === 0) {
    return sliderClientWidth();
  }
  const mainWidthTruncItem = sliderClientWidth() / itemsTrunc;
  return sliderClientWidth() - (mainWidthTruncItem / 2);
};

export const calcSliderMainWidth = (items) => {
  const itemsTrunc = Math.trunc(items);
  if ((items - itemsTrunc) === 0) {
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
  const { indexItem, sliderItemWidth, sliderItems } = params;
  sliderItems.style["transform"] = setTranslate3d(indexItem * -sliderItemWidth);
};

export const setTranslate3d = (getValue) => `translate3d(${getValue}px,0px,0px)`;

export const getTranslate3d = (sliderItems) => {
  const values = sliderItems.style.transform.match(/translate3d\((.*)px\, (.*)px\, (.*)px\)/);
  if (!values[1] || !values[1].length) {
    return 0;
  };
  return parseInt(values[1]);
};

export const arrGenerator = (arr, part) => {
  const partTrunc = Math.trunc(part);
  const round = Math.ceil(arr.length / partTrunc);
  let counter = 0;
  const newArry = [];
  for (counter; round > counter; counter++) {
    newArry[counter] = arr.slice(counter * partTrunc, (counter + 1) * partTrunc);
  }
  return newArry;
};

export const responsiveItemSize = (getConfig) => {
  const resp = Object.keys(getConfig);
  const newResp = resp.filter(item => {
    if (item <= document.body.clientWidth) {
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
  const newHtml = newSliderItems.map((items, indexItem) =>
    `<div class="slide ${indexItem}">
      ${items.map(item => item.outerHTML).join('')}
    </div>`
  ).join('');
  return newHtml;
};

export const addCloneClass = (item) => {
  item.classList.add('clone');
};

export const cloneNodeGenerator = (params) => {
  const { countItem, sliderItems } = params;
  const sliderItemsChildren = sliderItems.children;
  const deepCloneSliderItemsChildren = [...sliderItemsChildren];
  const cloneNodeParams = { countItem, deepCloneSliderItemsChildren, sliderItems };
  cloneNodeAppendChild(cloneNodeParams);
  cloneNodeInsertBefore(cloneNodeParams);
};

export const cloneNodeAppendChild = (params) => {
  const { countItem, deepCloneSliderItemsChildren, sliderItems } = params;
  deepCloneSliderItemsChildren.forEach((element, index) => {
    if (index < countItem) {
      const cln = element.cloneNode(true);
      addCloneClass(cln);
      sliderItems.appendChild(cln);
    }
  });
};

export const cloneNodeInsertBefore = (params) => {
  const { countItem, deepCloneSliderItemsChildren, sliderItems } = params;
  for (let i = deepCloneSliderItemsChildren.length - countItem; i < deepCloneSliderItemsChildren.length; i++) {
    const cln = deepCloneSliderItemsChildren[i].cloneNode(true);
    addCloneClass(cln);
    sliderItems.insertBefore(cln, deepCloneSliderItemsChildren[0]);
  };
};