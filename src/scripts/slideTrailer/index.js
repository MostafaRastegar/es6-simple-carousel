import {
	setSliderItemsPosition,
	setSliderItemsChildWidth,
	setActiveclassToCurrent
} from '../utils';

import {
	setPageNumberOnChild,
	cloneNodeGenerator
} from './partial';

export default class SliderTrailer {

	constructor(params) {
		const { core } = params;
		this.setCore(core);
		this.initialize();
	}

	setCore(core) {
		this.core = core;
	}
	getCore() {
		return this.core;
	}

	initialize() {
		const {
			config: {
				infinite,
				responsive,
			},
			getSliderItems,
			getSliderItemWidth,
			getPerSlide,
			getSlideSize,
			getSliderMainWidth,
			getIndex,
			getSliderSelector,
		} = this.core;

		const sliderItems = getSliderItems();
		const slideSize = getSlideSize();
		const sliderItemWidth = getSliderItemWidth();
		const sliderSelector = getSliderSelector();
		const perSlide = getPerSlide();
		const sliderMainWidth = getSliderMainWidth();

		// init slider position
		setSliderItemsPosition({
			indexItem: perSlide, // user init slide index (feature)
			sliderItemWidth,
			sliderItems
		});
		setPageNumberOnChild({ sliderItems, responsive });
		setSliderItemsChildWidth({
			sliderItems,
			slider: sliderSelector,
			responsive,
		});
		// Clone first and last slide
		if (infinite) {
			const cloneNodeGeneratorParams = {
				perSlide,
				sliderItems
			};
			cloneNodeGenerator(cloneNodeGeneratorParams);
		}
		setActiveclassToCurrent({
			sliderItems,
			perSlide,
			slideSize,
			sliderMainWidth,
			index: getIndex(),
			infinite,
		});
		// add loaded class to main slide
		sliderSelector.classList.add("loaded");
		// Transition events

	}
}