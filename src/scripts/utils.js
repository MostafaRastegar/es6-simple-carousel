// export const calcSliderLength = slide => {

// }

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
    perSlide,
    slideSize,
    slidesLength,
    sliderMainWidth,
    responsiveItem,
    infinite,
    sliderSelector
  } = params;
  const newSlidesLength = infinite ? slidesLength : slidesLength - 1;

  const calcFinalItemPositionParams = {
    slideSize,
    slidesLength,
    sliderMainWidth,
    perSlide,
    infinite
  };

  const newIndex = index + perSlide;
  // const ceilResponsiveItem = Math.ceil(responsiveItem);

  if (!infinite && newIndex >= newSlidesLength && responsiveItem !== 1) {
    sliderItems.style["transform"] = setTranslate3d(
      calcFinalItemPosition(calcFinalItemPositionParams)
    );
    nextNone(sliderSelector);
    prevBlock(sliderSelector);

    return newIndex;
  }

  if (!infinite && newIndex * perSlide >= slidesLength) {
    sliderItems.style["transform"] = setTranslate3d(
      calcFinalItemPosition(calcFinalItemPositionParams)
    );
    nextNone(sliderSelector);
    prevBlock(sliderSelector);
  }
  if (!infinite && newIndex === newSlidesLength) {
    nextNone(sliderSelector);
    prevBlock(sliderSelector);
  }

  if (infinite && newIndex >= perSlide + slidesLength) {
    // shift after finish items
    const shiftEndToFirstParams = {
      sliderItems,
      slideSize,
      perSlide,
      newIndex,
      slidesLength
    };
    return shiftEndToFirst(shiftEndToFirstParams);
  }

  sliderItems.style["transform"] = setTranslate3d(-newIndex * slideSize);
  return newIndex;
};

export const shiftSlideNonDir = params => {
  let {
    sliderItems,
    slideSize,
    index,
    perSlide,
    infinite,
    sliderSelector,
    slidesLength
  } = params;
  const newIndex = index - perSlide;
  const infinitperSlide = infinite ? perSlide : 0;

  if (!infinite && index - infinitperSlide <= perSlide && index !== -1) {
    const calcFirstItemPositionParams = { slideSize, perSlide, infinite };
    sliderItems.style["transform"] = setTranslate3d(
      calcFirstItemPosition(calcFirstItemPositionParams)
    );
    nextBlock(sliderSelector);
    prevNone(sliderSelector);
    return newIndex;
  }

  // shift to end from start item
  if (infinite && newIndex < 0) {
    const shiftFirstToEndParams = {
      sliderItems,
      slidesLength,
      slideSize,
      newIndex
    };
    return shiftFirstToEnd(shiftFirstToEndParams);
  }

  sliderItems.style["transform"] = setTranslate3d(-newIndex * slideSize);
  return newIndex;
};

export const shiftFirstToEnd = params => {
  const { sliderItems, slidesLength, slideSize, newIndex } = params;
  sliderItems.style["transform"] = setTranslate3d(
    -((slidesLength + newIndex) * slideSize)
  );
  return slidesLength + newIndex;
};

export const shiftEndToFirst = params => {
  const { sliderItems, slideSize, perSlide, newIndex, slidesLength } = params;
  sliderItems.style["transform"] = setTranslate3d(
    -(newIndex - slidesLength) * slideSize
  );
  return newIndex - slidesLength;
};

export const calcCurrentIndex = params => {
  const {
    sliderItems,
    infinite,
    perSlide,
    slideSize,
    sliderMainWidth
  } = params;

  if (infinite) {
    return Math.abs(
      Math.floor(
        getTranslate3d(sliderItems) / sliderItems.children[0].clientWidth
      )
    );
  }

  if (getTranslate3d(sliderItems) === 0) {
    return 0;
  }

  if (Math.abs(getTranslate3d(sliderItems)) > 0) {
    const scroll = Math.abs(getTranslate3d(sliderItems));
    return Math.trunc((scroll + sliderMainWidth) / slideSize - perSlide);
  }
};

export const setActiveclassToCurrent = params => {
  const {
    sliderItems,
    perSlide,
    infinit,
    slideSize,
    sliderMainWidth,
    dotsSelector,
    index
  } = params;
  const activeIndex = calcCurrentIndex({
    sliderItems,
    perSlide,
    infinit,
    slideSize,
    sliderMainWidth
  });
  const configCount = perSlide;
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

  // dotsSelector.children.forEach((item,itemIndex) => {

  //   if((itemIndex + 1 * Math.floor(sliderWidth)) === Math.abs(translate3d)){
  //     item.classList.add("active");
  //   }

  //   if ((itemIndex * Math.floor(sliderWidth)) <= Math.abs(translate3d) && ((itemIndex + 1) * Math.floor(sliderWidth)) <= Math.abs(translate3d) ) {
  //     item.classList.add("active");
  //     if(itemIndex !== 0){
  //       dotsSelector.children[itemIndex - 1].classList.remove("active");
  //     }
  //   }
  //   if(itemIndex - 1 === -1){
  //     dotsSelector.children[dotsSelector.children.length - 1].classList.remove("active");
  // }

  // });

  // dotsSelector.children.forEach((item, itemIndex) => {
  //   if (activeIndex === index) {
  //     // dotsSelector.children[activeIndex/2].a;
  //     item.classList.add("active");
  //   }else{
  //     item.classList.remove("active");
  //   }
  // });
};

export const dotsItemsClick = params => {
  const {
    indexItem,
    perSlide,
    slideSize,
    slidesLength,
    sliderItems,
    sliderMainWidth,
    infinite,
    dotIndex,
    responsive,
    sliderSelector
  } = params;
  const newDotIndex = (dotIndex) * truncResponsiveItemCount(responsive);
  setSliderItemsPositionAfterDotClick({
    indexItem,
    slideSize,
    sliderItems,
    slidesLength,
    sliderMainWidth,
    perSlide,
    infinite,
    sliderSelector
  });
  return {
    index: newDotIndex,
    allowShift: sliderItemsAddClass(sliderItems),
    posInitial: getTranslate3d(sliderItems)
  };
};

export const dotsItemsGenerator = params => {
  const { slidesLength, dotsSelector, responsive } = params;
  for (let i = 0; i < calcSliderGroupCount({ responsive, slidesLength }); i++) {
    dotsSelector.innerHTML += `<li class="dots-item${!i ?
      " active":""}" data-dot-index="${i + 1}">${i + 1}</li>`;
  }
  return dotsSelector;
};

export const sliderClientWidth = slider => slider.clientWidth;

export const truncResponsiveItemCount = responsive => {
  return Math.trunc(responsiveItemCount(responsive));
};

// export const getTruncChildItems = items => {
//   const itemsTrunc = Math.ceil(items);
//   if (items - itemsTrunc === 0) {
//     return sliderClientWidth(slider);
//   }
//   const mainWidthTruncItem = sliderClientWidth(slider) / itemsTrunc;
//   return sliderClientWidth(slider) - mainWidthTruncItem / 2;
// };

export const calcFinalItemPosition = params => {
  const {
    slideSize,
    sliderMainWidth,
    perSlide,
    slidesLength,
    infinite
  } = params;
  const infiniteSlideLength = infinite
    ? slidesLength
    : slidesLength - perSlide;
  const totalDistanceToFinal = infiniteSlideLength * slideSize;
  return -(totalDistanceToFinal - (sliderMainWidth - slideSize * perSlide));
};

export const calcFirstItemPosition = params => {
  const { slideSize, perSlide, infinite } = params;
  return -((infinite ? slideSize : 0) * perSlide);
};

export const calcSliderGroupCount = params => {
  const { slidesLength, responsive } = params;
  return Math.ceil(slidesLength / truncResponsiveItemCount(responsive));
};

// export const calcTruncSlideItemSize = items => {
//   // const itemsCeil = Math.ceil(items);
//   // const mainWidthTruncItem = sliderClientWidth(slider) / itemsCeil;
//   // // return (mainWidthTruncItem / 2);
//   return calcSliderChildWidth(responsiveItemCount(config.responsive));
// };

export const calcSliderChildWidth = params => {
  const { responsiveItemCount, slider } = params;
  const itemsTrunc = Math.trunc(responsiveItemCount);
  if (responsiveItemCount - itemsTrunc === 0) {
    return sliderClientWidth(slider) / itemsTrunc;
  }
  const mainWidthTruncItem = sliderClientWidth(slider) / itemsTrunc;
  let decriseWithForEachItems = mainWidthTruncItem / itemsTrunc / itemsTrunc;
  if (responsiveItemCount > 1 && responsiveItemCount < 2) {
    decriseWithForEachItems = (sliderClientWidth(slider) / itemsTrunc) * 0.25;
  }

  return mainWidthTruncItem - decriseWithForEachItems;
};

export const setSliderItemsChildWidth = params => {
  const { responsive, slider, sliderItems } = params;
  sliderItems.children.forEach(
    child =>
      (child.style.width =
        calcSliderChildWidth({
          responsiveItemCount: responsiveItemCount(responsive),
          slider
        }) + "px")
  );
};

export const setSliderItemsPosition = params => {
  const { indexItem, sliderItemWidth, sliderItems } = params;
  sliderItems.style["transform"] = setTranslate3d(indexItem * -sliderItemWidth);
  return indexItem;
};

export const setSliderItemsPositionAfterDotClick = params => {
  const {
    indexItem,
    slideSize,
    sliderItems,
    sliderMainWidth,
    perSlide,
    slidesLength,
    infinite,
    sliderSelector
  } = params;

  if (indexItem * perSlide > slidesLength) {
    const calcFinalItemPositionParams = {
      slideSize,
      slidesLength,
      sliderMainWidth,
      perSlide,
      infinite
    };

    sliderItems.style["transform"] = setTranslate3d(
      calcFinalItemPosition(calcFinalItemPositionParams)
    );
    nextNone(sliderSelector);
    prevBlock(sliderSelector);
    return true;
  }

  nextBlock(sliderSelector);
  prevBlock(sliderSelector);

  if (indexItem === 0) {
    nextBlock(sliderSelector);
    prevNone(sliderSelector);
  }
  sliderItems.style["transform"] = setTranslate3d((infinite ? indexItem + perSlide : indexItem) * -slideSize);
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

// export const slideItemGenerator = sliderItems => {
//   const newSliderItems = arrGenerator(
//     Array.from(sliderItems.children),
//     responsiveItemCount(config.responsive)
//   );
//   const newHtml = newSliderItems
//     .map(
//       (items, indexItem) =>
//         `<div class="slide ${indexItem}">
//       ${items.map(item => item.outerHTML).join("")}
//     </div>`
//     )
//     .join("");
//   return newHtml;
// };

export const addCloneClass = item => {
  item.classList.add("clone");
};

export const cloneNodeGenerator = params => {
  const { perSlide, sliderItems } = params;
  const sliderItemsChildren = sliderItems.children;
  const deepCloneSliderItemsChildren = [...sliderItemsChildren];
  const cloneNodeParams = {
    perSlide,
    deepCloneSliderItemsChildren,
    sliderItems
  };
  cloneNodeAppendChild(cloneNodeParams);
  cloneNodeInsertBefore(cloneNodeParams);
};

export const cloneNodeAppendChild = params => {
  const { perSlide, deepCloneSliderItemsChildren, sliderItems } = params;
  deepCloneSliderItemsChildren.forEach((element, index) => {
    if (index < perSlide) {
      const cln = element.cloneNode(true);
      addCloneClass(cln);
      sliderItems.appendChild(cln);
    }
  });
};

export const cloneNodeInsertBefore = params => {
  const { perSlide, deepCloneSliderItemsChildren, sliderItems } = params;
  for (
    let i = deepCloneSliderItemsChildren.length - perSlide;
    i < deepCloneSliderItemsChildren.length;
    i++
  ) {
    const cln = deepCloneSliderItemsChildren[i].cloneNode(true);
    addCloneClass(cln);
    sliderItems.insertBefore(cln, deepCloneSliderItemsChildren[0]);
  }
};

export const setPageNumberOnChild = params => {
  const { sliderItems, responsive } = params;
  const perSlide = truncResponsiveItemCount(responsive);
  sliderItems.children.forEach((item, itemIndex) => {
    item.setAttribute("data-page", Math.trunc(itemIndex / perSlide) + 1);
  });
};

export const switchInfiniteResponsiveCount = (itemCont, infinite) => {
  return infinite ? itemCont : 0;
};

export const prevNone = sliderSelector =>
  (document.querySelector(`${sliderSelector} .prev`).style.display = "none");
export const prevBlock = sliderSelector =>
  (document.querySelector(`${sliderSelector} .prev`).style.display = "block");
export const nextNone = sliderSelector =>
  (document.querySelector(`${sliderSelector} .next`).style.display = "none");
export const nextBlock = sliderSelector =>
  (document.querySelector(`${sliderSelector} .next`).style.display = "block");
