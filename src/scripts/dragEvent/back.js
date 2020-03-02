import {
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	responsiveItemCount,
	calcSliderChildWidth,
	truncResponsiveItemCount,
	calcCurrentIndex,
	prevBlock,
	prevNone,
	nextBlock,
	nextNone,
	directionSetter
} from '../utils';

export const caroueslTouchStart = e => e.touches[0].clientX;
export const caroueslDragAction = params => {
  const { e, dragEndCall, dragActionCall } = params;
  document.onmouseup = dragEndCall;
  document.onmousemove = dragActionCall;
  return e.clientX;
};
export const dragActionTouchmovePosX2 = params => {
	const { e, posX1, rtl } = params;
	if(rtl){
		return posX1 + e.touches[0].clientX;
	}
  return posX1 - e.touches[0].clientX;
};
export const dragActionTouchmovePosX1 = e => e.touches[0].clientX;
export const dragActionMousemove = params => {
	const { posX1, e,rtl } = params;
	if(rtl){
		return posX1 + e.clientX;
	}
  return posX1 - e.clientX;
};
export const dragActionMousemovePosX1 = e => e.clientX;
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
	
	const posX2New = () => {
		if(rtl) return posX2;
		return posX2;
	};
	const thresholdNew = () => {
		if(rtl) return -threshold;
		return threshold;
	};
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

	if(!infinite){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() > (sliderItemWidthNew() * perSlide) + thresholdNew();
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() <= calcFinalItemPositionNew - thresholdNew();
		
		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	}

	if(infinite && !rtl){
		// stop drag when firstItem go to lastItem on drag
		const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() > 0;
		// stop drag when lastItem go to fistItem on drag
		const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() < sliderItemWidthNew() * (slidesLength + perSlide + 1);
		if(firstTolastDrag || lastToFirstDrag){
			return false;
		}
	};
	
	// if(infinite && rtl){
	// 	// stop drag when firstItem go to lastItem on drag
	// 	const firstTolastDrag = getTranslate3d(sliderItems) - posX2New() < 0;
	// 	// stop drag when lastItem go to fistItem on drag
	// 	const lastToFirstDrag = getTranslate3d(sliderItems) - posX2New() > sliderItemWidthNew() * (slidesLength + perSlide + 1);
	// 	console.log('====================================');
	// 	console.log({
	// 		posX2New:posX2New(),
	// 		getTranslate3d:getTranslate3d(sliderItems),
	// 		firstTolastDrag,
	// 		lastToFirstDrag
	// 	});
	// 	console.log('====================================');
	// 	if(firstTolastDrag || lastToFirstDrag){
	// 		return false;
	// 	}
	// };

	console.log('====================================');
	console.log({
		get:getTranslate3d(sliderItems),
		posX2New:posX2New(),
		sum:getTranslate3d(sliderItems) - posX2New()
	});
	console.log('====================================');
	const result = () => getTranslate3d(sliderItems) - posX2New();
	// const result = () => posX2New();
	sliderItems.style["transform"] = setTranslate3d(result());
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
		console.log('===========posInitial=========================');
		console.log({
			posInitial,
			dragActionParams:caroueslDragAction(dragActionParams)
		});
		console.log('====================================');
		setPosInitial(posInitial);
		// setPosX1(caroueslDragAction(dragActionParams));
	}
};

export const dragAction = (params) => {
	let {
		e,
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
		getSliderMainWidth
	} = params;

	e = e || window.event;
	if (e.type == "touchmove") {
		const dragActionTouchmovePosX2Params = {
			e,
			posX1: getPosX1(),
			rtl
		};
		setPosX2(dragActionTouchmovePosX2(dragActionTouchmovePosX2Params));
		setPosX1(dragActionTouchmovePosX1(e));
	} else {
		const dragActionMousemoveParams = {
			e,
			posX1: getPosX1(),
			rtl
		};
		console.log('==============dragActionMousemove======================');
console.log(dragActionMousemove(dragActionMousemoveParams));
console.log('====================================');
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
		rtl
	};
	dragActionCalcPosition(dragActionCalcPositionParams);
};

export const dragEnd = (params) => {
	// let {
	// 	sliderItems,
	// 	threshold,
	// 	slidesLength,
	// 	responsive,
	// 	infinite,
	// 	slideSize,
	// 	sliderMainWidth,
	// 	setIndex,
	// 	transitionendWatcherCall,
	// 	slider,
	// 	setPosFinal,
	// 	getPosFinal,
	// 	rtl
	// } = params;

	// const perSlide = truncResponsiveItemCount(responsive);
	// const calcFinalItemPositionConst = calcFinalItemPosition({
	// 	slideSize,
	// 	slidesLength,
	// 	sliderMainWidth,
	// 	perSlide,
	// 	infinite
	// });
	// setPosFinal(getTranslate3d(sliderItems));

	// const calcIndex = calcCurrentIndex({
	// 	sliderItems,
	// 	infinite,
	// 	perSlide,
	// 	slideSize,
	// 	sliderMainWidth
	// });
	// setIndex(calcIndex);

	// if (!infinite && calcIndex > slidesLength && calcIndex < slidesLength + perSlide ||
	// 	infinite && calcIndex + perSlide === perSlide
	// ) {
	// 	sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
	// }

	// if (!infinite) {
	// 	prevBlock(slider);
	// 	nextBlock(slider);
	// }
	// if (!infinite && calcIndex === slidesLength + perSlide) {
	// 	sliderItems.style["transform"] = setTranslate3d(
	// 		getPosFinal() - sliderItems.children[0].clientWidth
	// 	);
	// }
	// if (
	// 	!infinite &&
	// 	getTranslate3d(sliderItems) <= threshold &&
	// 	getTranslate3d(sliderItems) >= 0
	// ) {
	// 	sliderItems.style["transform"] = setTranslate3d(0);
	// 	prevNone(slider);
	// 	nextBlock(slider);
	// }

	// if (!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst) {
	// 	sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
	// 	nextNone(slider);
	// 	prevBlock(slider);
	// }

	mouseEventNull();
	// transitionendWatcherCall();
};