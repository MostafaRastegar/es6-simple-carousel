import {
	calcSliderGroupCount,
	getTranslate3d,
	calcFinalItemPosition,
	setTranslate3d,
	nextNone,
	prevBlock,
	nextBlock,
	prevNone,
	addClassToElement,
	directionSetter,
} from '../utils';

/**
 * @name dotsItemsGenerator
 * @description generates dots to navigate through the pages of the slider
 * @param params
 * @return {*}
 */
export const dotsItemsGenerator = params => {
	const { slidesLength, dotsSelector, responsive } = params;
	for (let i = 0; i < calcSliderGroupCount({ responsive, slidesLength }); i++) {
		dotsSelector.innerHTML += `<li class="dots-item${!i ?
			" active" : ""}" data-dot-index="${i + 1}">${i + 1}</li>`;
	}
	return dotsSelector;
};

/**
 * @name dotsItemsClick
 * @description calculates the position of the page that is related to the clicked dot, to go to that page
 * @param params
 * @return {{allowShift: boolean, index: *, posInitial: number}}
 */
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
		nav,
		rtl,
		item
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
		nav,
		rtl
	});
	
	const isActive = item.classList.contains('active');
	let allowShift = true;
	if(!isActive){
		const itemClassParams = {
			item:getSliderItems(),
			className:'shifting'
		};
		addClassToElement(itemClassParams);
		allowShift = false;
	}
	return {
		index: infinite ? (indexItem + perSlide + 1)  : indexItem,
		allowShift: allowShift,
		posInitial: getTranslate3d(sliderItems)
	};
};

/**
 * @name setSliderItemsPositionAfterDotClick
 * @description
 * make slider trailer move to the calculated position,
 * actives the related dot item, and also makes the next or previous arrow buttons hidden,
 * if trailer reaches to the void areas
 * @param params
 * @return {boolean}
 */
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
		nav,
		rtl
	} = params;

	/**
	 * for limited sliders that are passing the permitted range and reaching to the ending borders
	 * calculates the position based on direction, and hides the next arrow button
	 */
	if (!infinite && indexItem + perSlide >= slidesLength) {
		const calcFinalItemPositionParams = {
			slideSize,
			slidesLength,
			sliderMainWidth,
			perSlide,
			infinite
		};
		const result = directionSetter({
			rtl,
			input: calcFinalItemPosition(calcFinalItemPositionParams)
		});
		sliderItems.style["transform"] = setTranslate3d(result);
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

	/**
	 * for limited sliders that are reaching to the starting border, hides the previous arrow button
	 */
	if (!infinite && nav && indexItem === 0) {
		nextBlock(slider);
		prevNone(slider);
	}

	const newItemIndex = infinite ? indexItem + perSlide + 1 : indexItem;
	const result = directionSetter({
		rtl,
		input:newItemIndex * -slideSize
	});
	sliderItems.style["transform"] = setTranslate3d(result);
};