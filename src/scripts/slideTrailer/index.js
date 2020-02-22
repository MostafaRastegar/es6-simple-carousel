import {
	setSliderItemsPosition,
	setSliderItemsChildWidth,
	setActiveclassToCurrent
} from '../utils';

import {
	setPageNumberOnChild,
	cloneNodeGenerator,
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
				slider,
			},
			getSliderItems,
			getSliderItemWidth,
			getPerSlide,
			getSlideSize,
			getSliderMainWidth,
			getIndex,
			setIndex,
			getSlider,
			sliderArrows
		} = this.core;

		const sliderItems = getSliderItems();
		const slideSize = getSlideSize();
		const sliderItemWidth = getSliderItemWidth();
		const perSlide = getPerSlide();
		const sliderMainWidth = getSliderMainWidth();

		// init slider position
		setIndex(setSliderItemsPosition({
			indexItem: infinite ? perSlide + 1: 0, // user init slide index (feature)
			sliderItemWidth,
			sliderItems
		}));
		setPageNumberOnChild({ sliderItems, responsive });
		setSliderItemsChildWidth({
			sliderItems,
			slider,
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

		// if(!nav){

		// }

		setActiveclassToCurrent({
			sliderItems,
			perSlide,
			slideSize,
			sliderMainWidth,
			index: getIndex(),
			infinite,
		});
		// add loaded class to main slide
		slider.classList.add("loaded");
		// Transition events
	}
}