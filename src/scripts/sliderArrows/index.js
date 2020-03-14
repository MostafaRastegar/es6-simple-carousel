import {
	responsiveItemCount,
	truncResponsiveItemCount,
	getTranslate3d,
	childFider,
	addClassToElement,
	removeClassFromElement
} from '../utils';

import {
	shiftSlideIsDir,
	shiftSlideNonDir
} from './partial';
export default class SliderArrows {
	/**
	 * @name constructor
	 * @description
	 * sets the core to access to the core instance methods without inheritance
	 * initializes the arrow handler and events
	 * @param params
	 */
	constructor(params) {
		const { core } = params;
		this.setCore(core);
		this.initialize();
	}

	/**
	 * @name setCore
	 * @param core
	 */
	setCore(core) {
		this.core = core;
	}

	/**
	 * @name getCore
	 * @return {object}
	 */
	getCore() {
		return this.core;
	}

	/**
	 * @name initialize
	 * @description gets the config from core, initializes the arrow events handlers
	 */
	initialize() {
		const {
			config: {
				slider,
			},
			getSliderItems,
			setAllowShift
		} = this.core;
		const prevSelector = childFider({
			wrapper: slider,
			className: '.prev'
		});
		const nextSelector = childFider({
			wrapper: slider,
			className: '.next'
		});

		// Click events
		prevSelector.addEventListener("click", () => this.shiftSlide(-1));
		nextSelector.addEventListener("click", () => this.shiftSlide(1));

		//remove shifting class and allowSHift permission
		const itemClassParams = {
			item: getSliderItems(),
			className: 'shifting'
		};
		removeClassFromElement(itemClassParams);
		setAllowShift(true);
	}

	/**
	 * @name shiftSlide
	 * @description sifts to the next or previous sliders page, based on given direction to go to
	 * @param dir
	 * @param action
	 */
	shiftSlide(dir, action) {
		const {
			config: {
				responsive,
				rtl
			},
			getInfinite,
			getSliderItems,
			setPosInitial,
			getSlideSize,
			setIndex,
			getIndex,
			getSlidesLength,
			getSliderMainWidth,
			getSlider,
			getAllowShift,
			setAllowShift,
		} = this.core;

		const perSlide = truncResponsiveItemCount(responsive);
		if (getAllowShift()) {
			if (!action) {
				setPosInitial(getTranslate3d(getSliderItems()));
			}
			let shiftSlideParams = {
				sliderItems: getSliderItems(),
				slideSize: getSlideSize(),
				slidesLength: getSlidesLength(),
				slider: getSlider(),
				sliderMainWidth: getSliderMainWidth(),
				index: getIndex(),
				responsiveItem: responsiveItemCount(responsive),
				perSlide,
				dir,
				infinite:getInfinite(),
				rtl,
			};
			if (dir == 1) {
				setIndex(shiftSlideIsDir(shiftSlideParams));
			} else if (dir == -1) {
				setIndex(shiftSlideNonDir(shiftSlideParams));
			}
		};

		const itemClassParams = {
			item: getSliderItems(),
			className: 'shifting'
		};
		addClassToElement(itemClassParams);
		setAllowShift(false);
	};

}