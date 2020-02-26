import {
	calcSliderGroupCount,
	truncResponsiveItemCount,
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	nextNone,
	prevBlock,
	nextBlock,
	prevNone,
	addClassToElement,
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
		slider,
		getSliderItems,
		nav
	} = params;

	setSliderItemsPositionAfterDotClick({
		indexItem,
		slideSize,
		sliderItems,
		slidesLength,
		sliderMainWidth,
		perSlide,
		infinite,
		slider,
		nav
	});
	const itemClassParams = {
		item:getSliderItems(),
		className:'shifting'
	};
	addClassToElement(itemClassParams);
	return {
		index: infinite ? (indexItem + perSlide + 1)  : indexItem,
		allowShift: false,
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
		slider,
		nav
	} = params;

	if (!infinite && indexItem + perSlide > slidesLength) {
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
			nextNone(slider);
			prevBlock(slider);
		}
		return true;
	}

	// after time move to watcher
	if(nav){
		nextBlock(slider);
		prevBlock(slider);
	}

	if (!infinite && nav && indexItem === 0) {
		nextBlock(slider);
		prevNone(slider);
	}

	const newItemIndex = infinite ? indexItem + perSlide + 1 : indexItem
	sliderItems.style["transform"] = setTranslate3d( newItemIndex * -slideSize);
};