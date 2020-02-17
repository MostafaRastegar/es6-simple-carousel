import {
	dotsItemsGenerator,
	dotsItemsClick,
	truncResponsiveItemCount
} from '../utils';

export default class SliderDots {
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

	setDotsSelector(dotsSelector){ this.dotsSelector = dotsSelector; };
	getDotsSelector(){ return this.dotsSelector;};
	initialize(){
		const {
			config:{
				slider,
				infinite,
				responsive,
			},
			getSlidesLength,
			getSliderItemWidth,
			getSliderMainWidth,
			getSliderItems,
			getSlider,
			getSlideSize,
			setIndex,
			getIndex,
			setAllowShift,
			setPosInitial,
		} = this.core;

		const sliderItems = getSliderItems();
		// const index = getIndex();
		
		// const sliderDotsSelector = document.querySelector(`${slider} .dots`);
		// this.setDotsSelector(sliderDotsSelector);
		const dotsSelector =  document.querySelector(`${slider} .dots`);

		//generate dots items
		const dotsItemsParams = {
			slidesLength: getSlidesLength(),
			responsive,
			dotsSelector,
			sliderItems
		};
		dotsItemsGenerator(dotsItemsParams);
		// dots item click for transition on active index
		dotsSelector.children.forEach((item) => {
			item.addEventListener("click", () => {
				const dotIndex = parseInt(item.getAttribute('data-dot-index'));
				const indexItem = truncResponsiveItemCount(responsive) * (dotIndex - 1);
				const dotsItemsClickParams = {
					indexItem,
					sliderItemWidth: getSliderItemWidth(),
					sliderMainWidth: getSliderMainWidth(),
					sliderItems,
					sliderSelector: getSlider(),
					slideSize: getSlideSize(),
					slidesLength: getSlidesLength(),
					perSlide: truncResponsiveItemCount(responsive),
					infinite,
					dotIndex,
					responsive,
				};
				const {
					index,
					allowShift,
					posInitial
				} = dotsItemsClick(dotsItemsClickParams);
				setIndex(index);
				setAllowShift(allowShift);
				setPosInitial(posInitial);
			});
		});
	}
}