import {
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	responsiveItemCount,
	calcSliderChildWidth,
	truncResponsiveItemCount,
	calcCurrentIndex,
	calcFirstItemPosition
} from '../utils';

export const caroueslTouchStart = e => e.touches[0].clientX;
export const caroueslDragAction = params => {
  const { e, dragEndCall, dragActionCall } = params;
  document.onmouseup = dragEndCall;
  document.onmousemove = dragActionCall;
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
    perSlide,
    slideSize,
    sliderMainWidth,
    infinite,
    threshold,
  } = params;

  // stop scroll when firstItem go to lastItem on drag
  if (!infinite && getTranslate3d(sliderItems) - posX2 > -sliderItemWidth * perSlide + threshold) {
    return false;
  }
  // stop scroll when lastItem go to firstItem on drag
  if (!infinite &&
    getTranslate3d(sliderItems) - posX2 <=
    calcFinalItemPosition({
      slideSize,
      slidesLength,
      sliderMainWidth,
      perSlide,
      infinite
    }) -
    threshold
  ) {
    return false;
  }
  // stop scroll when firstItem go to lastItem on drag
  if (infinite && getTranslate3d(sliderItems) - posX2 > 0) {
    return false;
  }
  // stop scroll when lastItem go to fistItem on drag
  if (infinite && (getTranslate3d(sliderItems) - posX2 < -(sliderItemWidth * (slidesLength + perSlide)))) {
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

export const dragStart = (params) => {
	let {
		e,
		sliderItems,
		dragEndCall,
		dragActionCall,
		setPosInitial,
		setPosX1
	} = params;

	e = e || window.event;
	e.preventDefault();
	const posInitial = getTranslate3d(sliderItems);
	if (e.type == "touchstart") {
		setPosInitial(posInitial);
		setPosX1(caroueslTouchStart(e));
	} else {
		const dragActionParams = {
			e,
			dragEndCall,
			dragActionCall
		};
		setPosInitial(posInitial);
		setPosX1(caroueslDragAction(dragActionParams));
	}
};

export const dragAction = (params) => {
	let {
		e,
		getPosX1,
		setPosX1,
		setPosX2,
		getSliderItems,
		threshold,
		getPosX2,
		getSlidesLength,
		getPerSlide,
		responsive,
		getSlider,
		infinite,
		getSlideSize,
		getSliderMainWidth
	} = params;

	e = e || window.event;
	if (e.type == "touchmove") {
		const dragActionTouchmovePosX2Params = {
			e,
			posX1: getPosX1()
		};
		setPosX2(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
		setPosX1(dragActionTouchmovePosX1(e));
	} else {
		const dragActionMousemoveParams = {
			e,
			posX1: getPosX1()
		};
		setPosX2(dragActionMousemove(dragActionMousemoveParams));
		setPosX1(dragActionMousemovePosX1(e));
	}
	const dragActionCalcPositionParams = {
		sliderItems: getSliderItems(),
		posX2: getPosX2(),
		slidesLength: getSlidesLength(),
		perSlide: getPerSlide(),
		sliderItemWidth: calcSliderChildWidth({
			responsiveItemCount: responsiveItemCount(responsive),
			slider: getSlider()
		}),
		slideSize: getSlideSize(),
		sliderMainWidth: getSliderMainWidth(),
		infinite,
		threshold,
	};
	dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = (params) => {
	let {
		sliderItems,
		threshold,
		slidesLength,
		responsive,
		infinite,
		slideSize,
		sliderMainWidth,
		setIndex,
		checkIndexCall,
		slider,
		setPosFinal,
	} = params;

	const perSlide = truncResponsiveItemCount(responsive);
	const calcFinalItemPositionConst = calcFinalItemPosition({
		slideSize,
		slidesLength,
		sliderMainWidth,
		perSlide,
		infinite
	});
	setPosFinal(getTranslate3d(sliderItems));

	const calcIndex = calcCurrentIndex({
		sliderItems,
		infinite,
		perSlide,
		slideSize,
		sliderMainWidth
	});
	setIndex(calcIndex);

	if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide ||
		infinite && calcIndex + perSlide === perSlide
	) {
		sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
	}

	if (infinite && calcIndex >= perSlide + slidesLength) {
		const calcFirstItemPositionConst = calcFirstItemPosition({
			slideSize, perSlide, infinite
		});
		sliderItems.style["transform"] = setTranslate3d(calcFirstItemPositionConst);
	}

	if (!infinite) {
		prevBlock(slider);
		nextBlock(slider);
	}
	if (!infinite && calcIndex === slidesLength + perSlide) {
		sliderItems.style["transform"] = setTranslate3d(
			getPosFinal() - sliderItems.children[0].clientWidth
		);
	}
	if (
		!infinite &&
		getTranslate3d(sliderItems) <= threshold &&
		getTranslate3d(sliderItems) >= 0
	) {
		sliderItems.style["transform"] = setTranslate3d(0);
		prevNone(slider);
		nextBlock(slider);
	}

	if (!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst) {
		sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
		nextNone(slider);
		prevBlock(slider);
	}

	mouseEventNull();
	checkIndexCall();
};