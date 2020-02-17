import {
	calcSliderGroupCount,
	truncResponsiveItemCount,
	sliderItemsAddClass,
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	nextNone,
	prevBlock,
	nextBlock,
	prevNone,
} from '../utils';

export const dotsItemsGenerator = params => {
	const { slidesLength, dotsSelector, responsive } = params;
	for (let i = 0; i < calcSliderGroupCount({ responsive, slidesLength }); i++) {
		dotsSelector.innerHTML += `<li class="dots-item${!i ?
			" active" : ""}" data-dot-index="${i + 1}">${i + 1}</li>`;
	}
	return dotsSelector;
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
		sliderSelector,
		nav
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
		sliderSelector,
		nav
	});
	return {
		index: newDotIndex,
		allowShift: sliderItemsAddClass(sliderItems),
		posInitial: getTranslate3d(sliderItems)
	};
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
		sliderSelector,
		nav
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
		if(nav){
			nextNone(sliderSelector);
			prevBlock(sliderSelector);
		}
		return true;
	}

	if(nav){
		nextBlock(sliderSelector);
		prevBlock(sliderSelector);
	}

	if (nav && indexItem === 0) {
		nextBlock(sliderSelector);
		prevNone(sliderSelector);
	}
	sliderItems.style["transform"] = setTranslate3d((infinite ? indexItem + perSlide : indexItem) * -slideSize);
};