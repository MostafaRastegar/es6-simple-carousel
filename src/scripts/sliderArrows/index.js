import {
	responsiveItemCount,
	truncResponsiveItemCount,
	getTranslate3d,
	sliderItemsAddClass,
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
			getSliderSelector,
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
				sliderSelector: getSliderSelector(),
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
		} = this.core;
		const prevSelector = document.querySelector(`${slider} .prev`);
		const nextSelector = document.querySelector(`${slider} .next`);

		// Click events
		prevSelector.addEventListener("click", () => this.shiftSlide(-1));
		nextSelector.addEventListener("click", () => this.shiftSlide(1));
	}
}