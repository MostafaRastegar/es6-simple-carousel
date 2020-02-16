import {
	setActiveclassToCurrent,
	truncResponsiveItemCount,
    sliderItemsRemoveClass,
    prevNone,
    nextBlock
} from '../utils';


export const checkIndex = (params) => {

    const {
        responsive,
        infinite,
        index,
        sliderItems,
        dotsSelector,
        slideSize,
        sliderMainWidth,
        setAllowShift
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

    if (!infinite && index === 0) {
        prevNone(sliderSelector);
        nextBlock(sliderSelector);
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
    // const currentDataPage = parseInt(sliderItems.children[infinite ? index : index -1].getAttribute("data-page"));
    // const currentDot = dotsSelector.children[currentDataPage-1];
    // dotsSelector.children.forEach(child => {
    // 	child.classList.remove("active");
    // });
    // currentDot.classList.add("active");
};
