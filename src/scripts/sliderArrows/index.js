import {
	responsiveItemCount,
	truncResponsiveItemCount,
	getTranslate3d,
	sliderItemsAddClass,
	childFider,
	sliderItemsRemoveClass
} from '../utils';

import {
	shiftSlideIsDir,
	shiftSlideNonDir
} from './partial';
export default class SliderArrows {
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

	shiftSlide(dir, action) {
		const {
			config: {
				infinite,
				responsive,
			},
			getSliderItems,
			getPosInitial,
			setPosInitial,
			getSlideSize,
			setIndex,
			getIndex,
			getSlidesLength,
			getSliderMainWidth,
			getSlider,
			getAllowShift,
			setAllowShift,
			updateLog
		} = this.core;

		const perSlide = truncResponsiveItemCount(responsive);
		if (getAllowShift()) {
			if (!action) {
				setPosInitial(getTranslate3d(getSliderItems()));
			}
			let shiftSlideParams = {
				sliderItems: getSliderItems(),
				posInitial: getPosInitial(),
				slideSize: getSlideSize(),
				slidesLength: getSlidesLength(),
				slider: getSlider(),
				sliderMainWidth: getSliderMainWidth(),
				index: getIndex(),
				responsiveItem: responsiveItemCount(responsive),
				perSlide,
				dir,
				infinite,
			};
			if (dir == 1) {
				setIndex(shiftSlideIsDir(shiftSlideParams));
			} else if (dir == -1) {
				setIndex(shiftSlideNonDir(shiftSlideParams));
			}
		}
		setAllowShift(sliderItemsAddClass(getSliderItems()));
		// updateLog();
	};

	initialize() {
		const {
			config: {
				slider,
			},
			getSliderItems,
			setAllowShift	
		} = this.core;
		const prevSelector = childFider({
			wrapper:slider,
			className:'.prev'
		  });
		const nextSelector = childFider({
			wrapper:slider,
			className:'.next'
		  });

		// Click events
		prevSelector.addEventListener("click", () => this.shiftSlide(-1));
		nextSelector.addEventListener("click", () => this.shiftSlide(1));
		setAllowShift(sliderItemsRemoveClass(getSliderItems()));
		// setAllowShift();
	}
}