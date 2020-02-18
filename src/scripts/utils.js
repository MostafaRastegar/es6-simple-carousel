export const sliderItemsAddClass = sliderItems => {
  sliderItems.classList.add("shifting");
  return false;
};

export const sliderItemsRemoveClass = sliderItems => {
  sliderItems.classList.remove("shifting");
  return true;
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
};


export const sliderClientWidth = slider => slider.clientWidth;

export const truncResponsiveItemCount = responsive => {
  return Math.trunc(responsiveItemCount(responsive));
};


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

export const switchInfiniteResponsiveCount = (itemCont, infinite) => {
  return infinite ? itemCont : 0;
};

export const prevNone = slider =>
  childFider({
    wrapper: slider,
    className: ".prev"
  }).style.display = "none";

export const prevBlock = slider =>
  childFider({
    wrapper: slider,
    className: ".prev"
  }).style.display = "block";

export const nextNone = slider =>
  childFider({
    wrapper: slider,
    className: ".next"
  }).style.display = "none";
export const nextBlock = slider =>
  childFider({
    wrapper: slider,
    className: ".next"
  }).style.display = "block";


export const checkIndex = (params) => {
  const {
    responsive,
    infinite,
    slider,
    index,
    sliderItems,
    dotsSelector,
    slideSize,
    sliderMainWidth,
    setAllowShift,
    dots,
    nav
  } = params;

  const perSlide = truncResponsiveItemCount(responsive);
  // const responsiveItem = responsiveItemCount(responsive);

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

  if (!infinite && nav && index === 0) {
    prevNone(slider);
    nextBlock(slider);
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
  setAllowShift(sliderItemsRemoveClass(sliderItems));

  if (dots) {
    const dotActiveParams = {
      index,
      sliderItems,
      infinite,
      dotsSelector,
      slider
    };
    dotActive(dotActiveParams);
  }
};

export const dotActive = (params) => {
  const {
    index,
    sliderItems,
    infinite,
    slider
  } = params;
  const dotsSelector = childFider({
    wrapper: slider,
    className: '.dots'
  });
  const currentDataPage = parseInt(
    sliderItems.children[infinite ? index : index - 1].getAttribute("data-page")
  );
  const currentDot = dotsSelector.children[currentDataPage - 1];
  dotsSelector.children.forEach(child => {
    child.classList.remove("active");
  });
  currentDot.classList.add("active");
};


export const elementCreator = (params) => {
  const { tag, wrapper, className } = params;
  let node = document.createElement(tag);
  node.className = className;
  wrapper.appendChild(node);
};

export const childFider = (params) => {
  const { wrapper, className } = params;
  return wrapper.querySelector(className);
};