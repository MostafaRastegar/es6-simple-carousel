import {
	setTranslate3d,
	calcFinalItemPosition,
	nextNone,
	prevBlock,
	nextBlock,
	prevNone,
	calcFirstItemPosition,
	directionSetter
} from '../utils';

/**
 * @name shiftSlideIsDir
 * @description handles the navigation of the slider to go to the next slide, if the slider trailer is not passing the permitted range
 * @param params
 * @return {number}
 */
//@todo: function name is not clear, shiftSlider or goToNextSlide
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
		slider,
		rtl
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


	/**
	 * for limited responsive sliders, if the next index is passing the permitted range
	 * the next arrow button should be hidden
	 */
	if (!infinite && newIndex + perSlide - 1 >= newSlidesLength && responsiveItem !== 1) {
		const result = directionSetter({
			rtl,
			input: calcFinalItemPosition(calcFinalItemPositionParams)

		});
		sliderItems.style["transform"] = setTranslate3d(result);

		nextNone(slider);
		prevBlock(slider);

		return newIndex;
	}

	// if (!infinite && newIndex * perSlide >= slidesLength) {
	//   sliderItems.style.transform = setTranslate3d(
	//     calcFinalItemPosition(calcFinalItemPositionParams),
	//   );
	//   nextNone(slider);
	//   prevBlock(slider);
	// }

	/**
	 * for limited sliders, if slider reaches to the last item, the next button should be hidden
	 */
	// when perSlide === 1
	if (!infinite && newIndex === newSlidesLength) {
		nextNone(slider);
		prevBlock(slider);
	}

	const result = directionSetter({
		rtl,
		input: newIndex * -slideSize
	});

	sliderItems.style["transform"] = setTranslate3d(result);
	return newIndex;
};

/**
 * @name shiftSlideNonDir
 * @description handles the navigation of the slider to go to the previous slide, if the slider trailer is not passing the permitted range
 * @param params
 * @return {number}
 */
export const shiftSlideNonDir = params => {
	const {
		sliderItems,
		slideSize,
		index,
		perSlide,
		infinite,
		slider,
		rtl
	} = params;
	const newIndex = index - perSlide;
	const infinitePerSlide = infinite ? perSlide : 0;

	/**
	 * for limited sliders, if the prev index is passing the permitted range
	 * the prev arrow button should be hidden
	 */
	if (!infinite && index - infinitePerSlide <= perSlide && index !== -1) {
		const calcFirstItemPositionParams = { slideSize, perSlide, infinite };
		const result = directionSetter({
			rtl,
			input: calcFirstItemPosition(calcFirstItemPositionParams)
		});
		sliderItems.style["transform"] = setTranslate3d(result);
		nextBlock(slider);
		prevNone(slider);
		return newIndex;
	}

	const result = directionSetter({
		rtl,
		input: -newIndex * slideSize
	});
	sliderItems.style["transform"] = setTranslate3d(result);
	return newIndex;
};

// export const shiftFirstToEnd = params => {
// 	const { sliderItems, slidesLength, slideSize, newIndex,rtl } = params;
// 	const result = directionSetter({
// 		rtl,
// 		input: -((slidesLength + newIndex) * slideSize)
// 	});
// 	sliderItems.style["transform"] = setTranslate3d(result);
// 	return slidesLength + newIndex;
// };

// export const shiftEndToFirst = params => {
// 	const { sliderItems, slideSize, newIndex, slidesLength,rtl } = params;
// 	const result = directionSetter({
// 		rtl,
// 		input: -(newIndex - slidesLength) * slideSize
// 	});
// 	sliderItems.style["transform"] = setTranslate3d(result);
// 	return newIndex - slidesLength;
// };