import {
    getTranslate3d,
    calcFinalItemPosition,
    setTranslate3d,
    // switchInfiniteResponsiveCount,
    // truncResponsiveItemCount,
    // calcSliderChildWidth,
    // responsiveItemCount
} from './utils';

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
        infinite,
        threshold
    } = params;

    // stop scroll when firstItem go to lastItem on drag
    if (getTranslate3d(sliderItems) - posX2 > -sliderItemWidth * countItem + threshold) {
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
        threshold
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

export const dragStart = params => {
    let {e,sliderItems,dragEnd,dragAction} = params;
    e = e || window.event;
    e.preventDefault();
    const posInitial = getTranslate3d(sliderItems);
    if (e.type == "touchstart") {
        return{
            posInitial,
            posX1: caroueslTouchStart(e)
        };
    } else {
        const dragActionParams = {
            e,
            dragEnd,
            dragAction
        };
        return {
            posInitial,
            posX1 :caroueslDragAction(dragActionParams)
        };
    }
};