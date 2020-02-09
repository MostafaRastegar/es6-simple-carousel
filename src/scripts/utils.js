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
  const {
    sliderItems,
    posX2,
    slidesLength,
    sliderItemWidth,
    countItem,
    slideSize,
    sliderMainWidth,
    infinite
  } = params;

  // stop scroll when firstItem go to lastItem on drag
  if (getTranslate3d(sliderItems) - posX2 > -sliderItemWidth * countItem + 50) {
    return false;
  }

  // stop scroll when lastItem go to firstItem on drag
  if (
    getTranslate3d(sliderItems) - posX2 <=
    calcFinalItemPosition({
      slideSize,
      slidesLength,
      sliderMainWidth,
      countItem,
      infinite
    }) -
    50
  ) {
    return false;
  }

  sliderItems.style["transform"] = setTranslate3d(
    getTranslate3d(sliderItems) - posX2
  );
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
  let {
    sliderItems,
    index,
    countItem,
    slideSize,
    slidesLength,
    sliderMainWidth,
    responsiveItem,
    infinite,
  } = params;
  const newSlidesLength = infinite ? slidesLength : slidesLength -1;

console.log('==========params==========================');
console.log(params);
console.log('====================================');




  if (index + countItem >= newSlidesLength && responsiveItem !== 1) {
    const calcFinalItemPositionParams = {
      slideSize,
      slidesLength,
      sliderMainWidth,
      countItem,
      infinite
    };

    sliderItems.style["transform"] = setTranslate3d(
      calcFinalItemPosition(calcFinalItemPositionParams)
      );
      nextNone();
      return index + countItem;
    }
  sliderItems.style["transform"] = setTranslate3d(
    -(index + countItem) * slideSize
  );
  return index + countItem;
};

export const shiftSlideNonDir = params => {
  let { sliderItems, slideSize, index, countItem,infinite } = params;
  const infinitCountItem = infinite ? countItem : 0;
  if (index - infinitCountItem <= countItem && index !== -1) {
    const calcFirstItemPositionParams = { slideSize, countItem, infinite };
    sliderItems.style["transform"] = setTranslate3d(
      calcFirstItemPosition(calcFirstItemPositionParams)
    );
    return index - countItem;
  }
  sliderItems.style["transform"] = setTranslate3d(
    -(index - countItem) * slideSize
  );
  return index - countItem;
};

export const checkIndexEnd = params => {
  const { sliderItems, slidesLength, slideSize } = params;
  sliderItems.style["transform"] = setTranslate3d(-(slidesLength * slideSize));
  return slidesLength;
};

export const checkIndexFinish = params => {
  const { sliderItems, slideSize, countItem } = params;
  sliderItems.style["transform"] = setTranslate3d(-slideSize * countItem);
  return countItem;
};

export const calcCurrentIndex = params => {
  const {sliderItems,infinite,countItem,slideSize,sliderMainWidth} = params;

  if(infinite){
    return Math.abs(
      Math.floor(
        getTranslate3d(sliderItems) / sliderItems.children[0].clientWidth
      )
    );
  }

  if(getTranslate3d(sliderItems) === 0){
    return 0;
  }

  if(Math.abs(getTranslate3d(sliderItems)) > 0){
    const scroll = Math.abs(getTranslate3d(sliderItems));
    return Math.trunc(((scroll + sliderMainWidth) / slideSize) - countItem);
  }

};

export const setActiveclassToCurrent = params => {
  const { sliderItems, countItem,infinit,   slideSize,
    sliderMainWidth } = params;
  const activeIndex = calcCurrentIndex({ sliderItems, countItem,infinit,    slideSize,
    sliderMainWidth });
  const configCount = countItem;
  const activeItems = [];
  [...Array(configCount).keys()].forEach(item =>
    activeItems.push(item + activeIndex)
  );
  sliderItems.children.forEach((item, itemIndex) => {
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

export const dotsItemsClick = params => {
  const { indexItem, countItem, slideSize, slidesLength, sliderItems, sliderMainWidth } = params;
  // const configResponsive = config.responsive;
  // const newDotIndex = (dotIndex + 1) * truncResponsiveItemCount(configResponsive);
  setSliderItemsPositionAfterDotClick({
    indexItem,
    slideSize,
    sliderItems,
    slidesLength,
    sliderMainWidth,
    countItem
  });
  // return {
  //   index: newDotIndex,
  //   allowShift: sliderItemsAddClass(sliderItems),
  //   posInitial: getTranslate3d(sliderItems)
  // };
};

export const dotsItemsGenerator = params => {
  const { slidesLength, dots, configResponsive } = params;
  for (
    let i = 0;
    i < calcSliderGroupCount({ configResponsive, slidesLength });
    i++
  ) {
    dots.innerHTML += `<li class="dots-item" data-dot-index="${i + 1}">${i +
      1}</li>`;
  }
};

export const sliderClientWidth = () => config.slider.clientWidth;

export const truncResponsiveItemCount = itemsConfig => {
  return Math.trunc(responsiveItemCount(itemsConfig));
};

export const getTruncChildItems = items => {
  const itemsTrunc = Math.ceil(items);
  if (items - itemsTrunc === 0) {
    return sliderClientWidth();
  }
  const mainWidthTruncItem = sliderClientWidth() / itemsTrunc;
  return sliderClientWidth() - mainWidthTruncItem / 2;
};

export const calcFinalItemPosition = params => {
  const { slideSize, sliderMainWidth, countItem, slidesLength,infinite } = params;
  const infiniteSlideLength = infinite ? slidesLength : (slidesLength-countItem);
  const totalDistanceToFinal = infiniteSlideLength * slideSize;
  return -(totalDistanceToFinal - (sliderMainWidth - slideSize * countItem));
};

export const calcFirstItemPosition = params => {
  const { slideSize, countItem, infinite } = params;
  return -((infinite ? slideSize : 0) * countItem);
};

export const calcSliderGroupCount = params => {
  const { slidesLength, configResponsive } = params;
  return Math.ceil(slidesLength / truncResponsiveItemCount(configResponsive));
};

export const calcTruncSlideItemSize = items => {
  // const itemsCeil = Math.ceil(items);
  // const mainWidthTruncItem = sliderClientWidth() / itemsCeil;
  // // return (mainWidthTruncItem / 2);
  return calcSliderChildWidth(responsiveItemCount(config.responsive));
};

export const calcSliderChildWidth = items => {
  const itemsTrunc = Math.trunc(items);
  if (items - itemsTrunc === 0) {
    return sliderClientWidth() / itemsTrunc;
  }
  const mainWidthTruncItem = sliderClientWidth() / itemsTrunc;
  let decriseWithForEachItems = mainWidthTruncItem / itemsTrunc / itemsTrunc;
  if (items > 1 && items < 2) {
    decriseWithForEachItems = (sliderClientWidth() / itemsTrunc) * 0.25;
  }

  return mainWidthTruncItem - decriseWithForEachItems;
};

export const setSliderItemsChildWidth = sliderItems => {
  const configResponsive = config.responsive;
  sliderItems.children.forEach(
    child =>
      (child.style.width =
        calcSliderChildWidth(responsiveItemCount(configResponsive)) + "px")
  );
};

export const setSliderItemsPosition = params => {
  const { indexItem, sliderItemWidth, sliderItems } = params;
  sliderItems.style["transform"] = setTranslate3d(indexItem * -sliderItemWidth);
};

export const setSliderItemsPositionAfterDotClick = params => {
  const {
    indexItem,
    slideSize,
    sliderItems,
    sliderMainWidth,
    countItem,
    slidesLength } = params;
  if (indexItem > slidesLength) {
    const calcFinalItemPositionParams = {
      slideSize,
      slidesLength,
      sliderMainWidth,
      countItem,
      infinite
    };

    return sliderItems.style["transform"] = setTranslate3d(calcFinalItemPosition(calcFinalItemPositionParams));
  }
  return sliderItems.style["transform"] = setTranslate3d(indexItem * -slideSize);
};

export const setTranslate3d = getValue => `translate3d(${getValue}px,0px,0px)`;

export const getTranslate3d = sliderItems => {
  const values = sliderItems.style.transform.match(
    /translate3d\((.*)px\, (.*)px\, (.*)px\)/
  );
  if (!values[1] || !values[1].length) {
    return 0;
  }
  return parseInt(values[1]);
};

export const arrGenerator = (arr, part) => {
  const partTrunc = Math.trunc(part);
  const round = Math.ceil(arr.length / partTrunc);
  let counter = 0;
  const newArry = [];
  for (counter; round > counter; counter++) {
    newArry[counter] = arr.slice(
      counter * partTrunc,
      (counter + 1) * partTrunc
    );
  }
  return newArry;
};

export const responsiveItemCount = getConfig => {
  const resp = Object.keys(getConfig);
  const newResp = resp.filter(item => {
    if (item <= document.body.clientWidth) {
      return item;
    }
  });
  return getConfig[parseInt(newResp.pop())].items;
};

export const slideItemGenerator = sliderItems => {
  const newSliderItems = arrGenerator(
    Array.from(sliderItems.children),
    responsiveItemCount(config.responsive)
  );
  const newHtml = newSliderItems
    .map(
      (items, indexItem) =>
        `<div class="slide ${indexItem}">
      ${items.map(item => item.outerHTML).join("")}
    </div>`
    )
    .join("");
  return newHtml;
};

export const addCloneClass = item => {
  item.classList.add("clone");
};

export const cloneNodeGenerator = params => {
  const { countItem, sliderItems } = params;
  const sliderItemsChildren = sliderItems.children;
  const deepCloneSliderItemsChildren = [...sliderItemsChildren];
  const cloneNodeParams = {
    countItem,
    deepCloneSliderItemsChildren,
    sliderItems
  };
  cloneNodeAppendChild(cloneNodeParams);
  cloneNodeInsertBefore(cloneNodeParams);
};

export const cloneNodeAppendChild = params => {
  const { countItem, deepCloneSliderItemsChildren, sliderItems } = params;
  deepCloneSliderItemsChildren.forEach((element, index) => {
    if (index < countItem) {
      const cln = element.cloneNode(true);
      addCloneClass(cln);
      sliderItems.appendChild(cln);
    }
  });
};

export const cloneNodeInsertBefore = params => {
  const { countItem, deepCloneSliderItemsChildren, sliderItems } = params;
  for (
    let i = deepCloneSliderItemsChildren.length - countItem;
    i < deepCloneSliderItemsChildren.length;
    i++
  ) {
    const cln = deepCloneSliderItemsChildren[i].cloneNode(true);
    addCloneClass(cln);
    sliderItems.insertBefore(cln, deepCloneSliderItemsChildren[0]);
  }
};

export const setPageNumberOnChild = params => {
  const { slidesLength, sliderItems, configResponsive } = params;
  const countItem = truncResponsiveItemCount(configResponsive);
  sliderItems.children.forEach((item, itemIndex) => {
    item.setAttribute("data-page", Math.trunc(itemIndex / countItem));
  });
};


export const switchInfiniteResponsiveCount = (itemCont, infinite) => {
  return infinite ? itemCont : 0;
};

export const prevNone = () => config.prev.style.display = "none";
export const prevBlock = () => config.prev.style.display = "block";
export const nextNone = () => config.next.style.display = "none";
export const nextBlock = () => config.next.style.display = "block";