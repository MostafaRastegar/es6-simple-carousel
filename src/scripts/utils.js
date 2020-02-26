export const addClassToElement = params =>{
  const { item,className} = params;
  item.classList.add(className);
};

export const removeClassFromElement = params =>{
  const { item,className} = params;
  item.classList.remove(className);
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
        getTranslate3d(sliderItems) / vdomArrayConvertor(sliderItems.children)[0].clientWidth
      )
    );
  }

  if (Math.abs(getTranslate3d(sliderItems)) <= 1) {
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
    infinite,
    slideSize,
    sliderMainWidth,
  } = params;
  const activeIndex = calcCurrentIndex({
    sliderItems,
    perSlide,
    infinite,
    slideSize,
    sliderMainWidth
  });
  const configCount = perSlide;
  const activeItems = [];
  [...Array(configCount).keys()].forEach(item =>
    activeItems.push(item + activeIndex)
  );
  vdomArrayConvertor(sliderItems.children).forEach((item, itemIndex) => {
    const classItemParams = {
      item,
      className:'active',
    };

    if (activeItems.includes(itemIndex)) {
      addClassToElement(classItemParams);
    } else {
      removeClassFromElement(classItemParams);
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
  // const itemsTrunc = Math.trunc(responsiveItemCount);
  // if (responsiveItemCount - itemsTrunc === 0) {
  //   return sliderClientWidth(slider) / itemsTrunc;
  // }
  // const mainWidthTruncItem = sliderClientWidth(slider) / itemsTrunc;
  // let decriseWithForEachItems = mainWidthTruncItem / itemsTrunc / itemsTrunc;
  // if (responsiveItemCount > 1 && responsiveItemCount < 2) {
  //   decriseWithForEachItems = (sliderClientWidth(slider) / itemsTrunc) * 0.25;
  // }

	// return mainWidthTruncItem - decriseWithForEachItems;
	return sliderClientWidth(slider) / responsiveItemCount
};

export const setSliderItemsChildWidth = params => {
  const { responsive, slider, sliderItems } = params;
  vdomArrayConvertor(sliderItems.children).forEach(
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
  return parseFloat(values[1]);
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


export const transitionendWatcher = (params) => {
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
    slidesLength,
    sliderItemWidth,
    nav,
		setIndex,
		getIndex
	} = params;

  const perSlide = truncResponsiveItemCount(responsive);

  if (infinite && index > perSlide + slidesLength &&
    Math.abs(getTranslate3d(sliderItems)) >= (perSlide + 1 + slidesLength) * sliderItemWidth
  ) {
    setIndex(setSliderItemsPosition({
      indexItem: index - slidesLength,
      sliderItemWidth,
      sliderItems
    }));
  }
  // shift to end from start item
  if (infinite && (
    Math.abs(getTranslate3d(sliderItems)) <= 1 ||
    Math.abs(getTranslate3d(sliderItems)) === sliderItemWidth)
  ) {
    setIndex(setSliderItemsPosition({
      indexItem: slidesLength + index,
      sliderItemWidth,
      sliderItems
    }));
  }

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
  removeClassFromElement({
    item:sliderItems,
    className:'shifting'
  });
  setActiveclassToCurrent(setActiveclassToCurrentParams);
  setAllowShift(true);

  if (dots) {
    const dotActiveParams = {
      index,
      sliderItems,
      infinite,
      dotsSelector,
      slider,
      perSlide,
      sliderMainWidth
    };
    dotActive(dotActiveParams);
  }
};

export const dotActive = (params) => {
  const {
    sliderItems,
    slider,
  } = params;
  const dotsSelector = childFider({
    wrapper: slider,
    className: '.dots'
  });
  if(activeChecker(sliderItems) >= 0){
    const dotConvertor = vdomArrayConvertor(dotsSelector.children);
    const currentDot = dotConvertor[activeChecker(sliderItems)];
    dotConvertor.forEach(child => {
      const classItemParams = {
        item:child,
        className:'active',
      };
      removeClassFromElement(classItemParams);
    });
    const classItemParams = {
			item:currentDot,
			className:'active',
		};
		addClassToElement(classItemParams);
  }
};


export const elementCreator = (params) => {
  const { tag, wrapper, className } = params;
  removeAllChildren({wrapper, className});
  let node = document.createElement(tag);
  node.className = className;
  wrapper.appendChild(node);
};

export const childFider = (params) => {
  const { wrapper, className } = params;
  return wrapper.querySelector(className);
};

export const removeAllChildren = (params) => {
  const { wrapper, className } = params;
  const newClassName = `.${className.split(" ").pop()}`;
  const findElements =  wrapper.querySelectorAll(newClassName);
  if(findElements.length){
    findElements.forEach(child =>{
       child.remove();
      });
  };
};

export const activeChecker = (sliderItems) => {
  const activeChild = [];
    vdomArrayConvertor(sliderItems.children).forEach(child => {
      if(child.classList.contains('active')){
        activeChild.push(child.dataset.page);
      }
    });
  return parseInt(activeChild.sort().pop()-1);
};

export const vdomArrayConvertor = (items) => {
  const isArrayCheck = Array.isArray(items);
  if(isArrayCheck) return items;
  return Object.values(items);
};