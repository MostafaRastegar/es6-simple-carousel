import {
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	caroueslTouchStart,
	caroueslDragAction,
	dragActionTouchmovePosX2,
	dragActionTouchmovePosX1,
	dragActionMousemove,
	dragActionMousemovePosX1,
	dragActionCalcPosition,
	mouseEventNull,
	responsiveItemCount,
	calcSliderChildWidth,
	setActiveclassToCurrent,
	truncResponsiveItemCount,
	calcCurrentIndex,
	calcFirstItemPosition
} from '../utils';

export const dragStart = (params)=> {
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
        // getDotsSelector,
        // checkIndexCall,
        sliderSelector,
        setPosFinal,
        posFinal,
        getIndex,
        index,
        dragAction,
        setPosInitial,
        setPosX1,
        setAllowShift,
        // dotsSelector:getDotsSelector(),
    } = params;
    // console.trace();

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

    const setActiveclassToCurrentParams = {
        sliderItems,
        perSlide,
        infinite,
        slideSize,
        sliderMainWidth,
        // dotsSelector: getDotsSelector(),
        index,
    };
    setActiveclassToCurrent(setActiveclassToCurrentParams);

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
        prevBlock(sliderSelector);
        nextBlock(sliderSelector);
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
        prevNone(sliderSelector);
        nextBlock(sliderSelector);
    }

    if (!infinite && getTranslate3d(sliderItems) <= calcFinalItemPositionConst) {
        sliderItems.style["transform"] = setTranslate3d(calcFinalItemPositionConst);
        nextNone(sliderSelector);
        prevBlock(sliderSelector);
    }

    mouseEventNull();
    // let dragStartParams = {
    //     sliderItems,
    //     dragAction,
    //     setPosInitial,
    //     setPosX1,
    //     responsive,
    //     infinite,
    //     setAllowShift,
    //     index,
    //     // dotsSelector:getDotsSelector(),
    //     slideSize,
    //     sliderMainWidth
    // } = params;
    // checkIndexCall(dragStartParams);
};