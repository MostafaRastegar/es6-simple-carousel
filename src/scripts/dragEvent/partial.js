import {
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	directionSetter,
	responsiveItemCount,
	calcSliderChildWidth,
	truncResponsiveItemCount,
	calcCurrentIndex,
	prevBlock,
	prevNone,
	nextBlock,
	nextNone
} from '../utils';

/**
 * @name directionClientX
 * @description returns the position of the slider trailer based on the direction of the slider for drag
 * @param params
 * @returns {number|null}
 */
export const directionClientX = (params) => {
	const {rtl,e,sliderMainWidth} = params;
	if(rtl) return sliderMainWidth - e.clientX;
  return e.clientX;	
};

/**
 * @name directionTouchClientX
 * @description returns the position of the slider trailer based on the direction of the slider for toch
 * @param params
 * @returns {number|null}
 */
export const directionTouchClientX = (params) => {
	const {rtl,e,sliderMainWidth} = params;
	if(rtl) return sliderMainWidth - e.touches[0].clientX;
  return e.touches[0].clientX;	
};

/**
 * @name carouselTouchStart
 * @description a wrapper for the directionTouchClientX method to handle the touch start event
 * @param params
 * @returns {number}
 */
export const caroueslTouchStart = (params) => directionTouchClientX(params);

/**
 * @name carouselDragAction
 * @description a wrapper for the directionClientX method which attaches the mouse position for start to end point of the dragging to it
 * @param params
 * @returns {number}
 */
export const caroueslDragAction = params => {
  const { e, dragEndCall, dragActionCall,sliderMainWidth,rtl } = params;
  document.onmouseup = dragEndCall;
	document.onmousemove = dragActionCall;
	return directionClientX({rtl,e,sliderMainWidth});
};

/**
 * @name dragActionTouchmovePosX2
 * @description returns the end position of the touch to make the trailer, translate to that point
 * @param params
 * @returns {number}
 */
export const dragActionTouchmovePosX2 = params => {
  const { e, posX1,rtl,sliderMainWidth } = params;
  return posX1 - directionTouchClientX({rtl,e,sliderMainWidth});
};

/**
 * @name dragActionTouchmovePosX1
 * @description returns the start position of the touch to calculate later for translating the trailer to the end point
 * @param params
 * @returns {number}
 */
export const dragActionTouchmovePosX1 = params => directionTouchClientX(params);

/**
 * @name dragActionMousemove
 * @description returns the end position of the drag to make the trailer, translate to that point
 * @param params
 * @returns {number}
 */
export const dragActionMousemove = params => {
  const { posX1, e,rtl, sliderMainWidth} = params;
  return posX1 - directionClientX({rtl,e,sliderMainWidth});
};

/**
 * @name dragActionMousemovePosX1
 * @description returns the start position of the drag to calculate later for translating the trailer to the end point
 * @param params
 * @returns {number}
 */
export const dragActionMousemovePosX1 = ({rtl,e,sliderMainWidth}) => directionClientX({rtl,e,sliderMainWidth});

/**
 * @name dragActionCalcPosition
 * @description calculates the positions to translate the trailer to
 * @param params
 * @returns {boolean}
 */
export const dragActionCalcPosition = params => {
  const {
    sliderItems,
		posX2,
		rtl,
    slidesLength,
    sliderItemWidth,
    perSlide,
    slideSize,
    sliderMainWidth,
    infinite,
    threshold,
	} = params;

  // @todo: bellow methods need some cleanp, for example you can use bellow method to handle all of them
  /*
  // method
  const translateValue(value){
    return rtl ? -value : value;
  }
  //usage
  const posX2New = translateValue(posX2);
   */

	/**
	 * @name posX2New
	 * @description returns position of the dragged or touched point, to translate the trailer based on the direction
	 * @returns {number|*}
	 */
	const posX2New = () => {
		if(rtl) return -posX2;
		return posX2;
	};

	/**
	 * @name thresholdNew
	 * @description returns the permitted threshold, to stop the trailer after going to the void areas based on the direction
	 * @returns {number|*}
	 */
	const thresholdNew = () => {
		if(rtl) return -threshold;
		return threshold;
	};

	/**
	 * @name sliderItemWidthNew
	 * @description returns the width of slider items based on the direction
	 * @returns {number|*}
	 */
	const sliderItemWidthNew = () => {
		if(rtl) return sliderItemWidth;
		return -sliderItemWidth;
	};
	const calcFinalItemPositionNew = directionSetter({
		rtl,
		input: calcFinalItemPosition({
      slideSize,
      slidesLength,
      sliderMainWidth,
      perSlide,
      infinite
    })
	});

	// @todo: bellow calculation could be handled way better and cleaner using an object to point to a method which does the calculation for exact condition
	/*
     //here is an example
     const limitedLtr = () => {
      // stop drag when firstItem go to lastItem on drag
      const firstTolastDrag = getTranslate3d(sliderItems) - posX2New()
        > sliderItemWidthNew() * perSlide + thresholdNew();
      // stop drag when lastItem go to fistItem on drag
      const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New()
        <= calcFinalItemPositionNew - thresholdNew();

      if (firstTolastDrag || lastToFirstDrag) {
        return false;
      }
      return true
     }
     // map to methods
     const calculationMapper = {
      infinite: {
        rtl: infiniteRtl,
        ltr: infiniteLtr,
      },
      limited: {
        rtl: limitedRtl,
        ltr: limitedLtr,
      },
     }
     // usage
     const allowedToContinue = calculationMapper[infinite ? 'infinite' : 'limited][rtl ? 'rtl' : 'ltr']();
     if(allowedToContinue){
      // do whatever you want
     }
     */
	/**
	 * for sliders which are infinite and LTR
	 * makes the trailer only translate between permitted points,
	 * by passing the points it will stop the transitioning using threshold
	 */
	if(!infinite && !rtl){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() > (sliderItemWidthNew() * perSlide) + thresholdNew();
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() <= calcFinalItemPositionNew - thresholdNew();
		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	}

	/**
	 * for sliders which are infinite and LTR
	 * makes the trailer only translate between permitted points,
	 * by passing the points it will stop the transitioning using trailer position
	 */
	if(infinite && !rtl){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() > 0;
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() + 5 < sliderItemWidthNew() * (slidesLength + perSlide + 1);

		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	};

	/**
	 * for sliders which are not infinite and RTL
	 * makes the trailer only translate between permitted points,
	 * by passing the points it will stop the transitioning using threshold
	 */
	if(!infinite && rtl){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() < (sliderItemWidthNew() * perSlide) + thresholdNew();
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() >= calcFinalItemPositionNew - thresholdNew();
		
		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	};

	/**
	 * for sliders which are infinite and RTL
	 * makes the trailer only translate between permitted points,
	 * by passing the points it will stop the transitioning using trailer position
	 */
	if(infinite && rtl){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() < 0;
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() - 5 > sliderItemWidthNew() * (slidesLength + perSlide + 1);
		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	};

	/**
	 * @name = result;
	 * @description wrapper for getTranslate3d to get the css translate to set on the slider trailer
	 * @returns {number}
	 */
	// @todo: no need to make a function, you can simply use a variable
	/*
      //e.g.
      const result = getTranslate3d(sliderItems) - posX2New();
      //usage
      sliderItems.style.transform = setTranslate3d(result);
     */
	const result = () => getTranslate3d(sliderItems) - posX2New();
	sliderItems.style["transform"] = setTranslate3d(result());
};

/**
 * @name mouseEventNull
 * @description detaches the mouse events
 */
export const mouseEventNull = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};

/**
 * @name dragStart
 * @description starts the touching or the dragging of the slider and sets the initial position to use it later to finish the transition of the slider
 * @param params
 */
export const dragStart = (params) => {
	const {
		sliderItems,
		dragEndCall,
		dragActionCall,
		setPosInitial,
		setPosX1,
		sliderMainWidth,
		rtl,
	} = params;

	// @todo: instead of overwriting the destructured variable, make a new one
	/*
    //e.g.
    const {e} = params;
    // usage
    const event = e || window.event;
    event.preventDefault();
     */
	let {
		e,
	} = params;
	e = e || window.event; // @todo: deprecated symbol, use better alternatives
	e.preventDefault();
	const posInitial = getTranslate3d(sliderItems);
	if (e.type == "touchstart") {
		setPosInitial(posInitial);
		setPosX1(caroueslTouchStart({
			e,
			rtl,
			sliderMainWidth
		}));
	} else {
		const dragActionParams = {
			e,
			rtl,
			dragEndCall,
			dragActionCall,
			sliderMainWidth,
		};
		setPosInitial(posInitial);
		setPosX1(caroueslDragAction(dragActionParams));
	}
};

/**
 * @name dragAction
 * @description handles the drag or touch of the slider trailer to translate to the current drag or touch point
 * @param params
 */
export const dragAction = (params) => {
	const {
		getPosX1,
		setPosX1,
		setPosX2,
		rtl,
		getSliderItems,
		threshold,
		getPosX2,
		getSlidesLength,
		getPerSlide,
		responsive,
		getSlider,
		infinite,
		getSlideSize,
		getSliderMainWidth,
	} = params;

	// @todo: instead of overwriting the destructured variable, make a new one
	/*
    //e.g.
    const {e} = params;
    // usage
    const event = e || window.event;
    //whatever you want
     */
	let {
		e,
	} = params;
	const sliderMainWidth = getSliderMainWidth();
	e = e || window.event; // @todo: deprecated symbol, use better alternatives
	const clientXParams = {e,rtl,sliderMainWidth};
	if (e.type == "touchmove") {
		const dragActionTouchmovePosX2Params = {
			posX1: getPosX1(),
			...clientXParams
		};
		setPosX2(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
		setPosX1(dragActionTouchmovePosX1(clientXParams));
	} else {
		const dragActionMousemoveParams = {
			posX1: getPosX1(),
			...clientXParams
		};
		setPosX2(dragActionMousemove(dragActionMousemoveParams));
		setPosX1(dragActionMousemovePosX1(clientXParams));
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
		sliderMainWidth,
		infinite,
		threshold,
		rtl
	};
	dragActionCalcPosition(dragActionCalcPositionParams);
};

/**
 * @name dragEnd
 * @description handles the drag end to make slider trailer translate to the given point, also checks to avoid the trailer pass the permitted points
 * @param params
 */
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
		transitionendWatcherCall,
		slider,
		setPosFinal,
		getPosFinal,
		drag,
		nav,
		rtl
	} = params;

	if(!drag){
		mouseEventNull();
		return false;
	}

	const perSlide = truncResponsiveItemCount(responsive);

	/**
	 * @name thresholdNew
	 * @description returns the threshold based on the direction
	 * @return {number|*}
	 */
	const thresholdNew = () => {
		if(rtl) return -threshold;
		return threshold;
	};

	const calcFinalItemPositionNew = directionSetter({
		rtl,
		input: calcFinalItemPosition({
      slideSize,
      slidesLength,
      sliderMainWidth,
      perSlide,
      infinite
    })
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

	/**
	 * transforms to the final point, if infinite or limited sliders have valid active slider index
	 */
	if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide ||
		infinite && calcIndex + perSlide === perSlide
	) {
		sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionNew);
	}

	if (!infinite && nav) {
		prevBlock(slider);
		nextBlock(slider);
	}

	// @todo: you can use the mapping approach that mentioned earlier, to make bellow code cleaner

	/**
	 * transforms to the borders of the slider, if  limited sliders passed the permitted range
	 */
	if (!infinite && calcIndex === slidesLength + perSlide) {
		sliderItems.style["transform"] = setTranslate3d(
			getPosFinal() - sliderItems.children[0].clientWidth
		);
	}

	/**
	 * for limited or RTL sliders, makes the trailer stick to the starting position, if drag end event happened out of permitted range
	 */
	if (
		!infinite &&
		(getTranslate3d(sliderItems) <= thresholdNew() &&
		getTranslate3d(sliderItems) >= 0) ||
		(rtl && getTranslate3d(sliderItems) <= 0)
	) {
		sliderItems.style["transform"] = setTranslate3d(0);
		if(nav){
			prevNone(slider);
			nextBlock(slider);
		}
	}

	/**
	 * for limited and LTR sliders, makes the trailer stick to the ending border, if drag end event happened out of the permitted range
	 */
	if (!infinite && !rtl && getTranslate3d(sliderItems) <= calcFinalItemPositionNew) {
		sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionNew);
		if(nav){
			nextNone(slider);
			prevBlock(slider);
		}
	}

	/**
	 * for limited and RTL sliders, makes the trailer stick to the ending border, if drag end event happened out of the permitted range
	 */
	if (!infinite && rtl && getTranslate3d(sliderItems) >= calcFinalItemPositionNew) {
		sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionNew);
		if(nav){
			nextNone(slider);
			prevBlock(slider);
		}
	}

	mouseEventNull();
	transitionendWatcherCall();
};