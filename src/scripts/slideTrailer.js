import {
	setSliderItemsPosition,
	setPageNumberOnChild,
	setSliderItemsChildWidth,
	cloneNodeGenerator,
	setActiveclassToCurrent
	
} from './utils';

export default class SliderTrailer {
	// core = null;
	// dotsSelector = null;

	constructor(params) {
		const { core } = params;
		this.setCore(core);
		this.initialize();
	}

	setCore(core){
		this.core = core;
	}
	getCore() {
		return this.core;
	}


	initialize(){
		const {
			config:{
				slider,
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
		
		// init slider position
		setSliderItemsPosition({
			indexItem: getPerSlide(), // user init slide index (feature)
			sliderItemWidth:getSliderItemWidth(),
			sliderItems:getSliderItems()
		});
		setPageNumberOnChild({ sliderItems:getSliderItems(), responsive });
		setSliderItemsChildWidth({
			sliderItems:getSliderItems(),
			slider: getSliderSelector(),
			responsive,
		});
		// Clone first and last slide
		if (infinite) {
			const cloneNodeGeneratorParams = {
				perSlide:getPerSlide(),
				sliderItems:getSliderItems()
			};
			cloneNodeGenerator(cloneNodeGeneratorParams);
		}
		setActiveclassToCurrent({
			sliderItems:getSliderItems(),
			perSlide:getPerSlide(),
			slideSize:getSlideSize(),
			sliderMainWidth:getSliderMainWidth(),
			index: getIndex(),
			infinite,
		});
		// add loaded class to main slide
    getSliderSelector().classList.add("loaded");
    

	}
}