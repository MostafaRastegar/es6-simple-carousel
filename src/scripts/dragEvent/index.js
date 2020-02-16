import {
	setActiveclassToCurrent,
	truncResponsiveItemCount,
} from '../utils';

import {
	dragAction,
	dragEnd,
	dragStart
} from './partial';

// import {checkIndexCall} from '../slideTrailer/partial';

export default class DragEvent {

	constructor(params) {
		const { core } = params;
		this.setCore(core);
		this.initialize();
		console.log('===================asdsad=================');
		console.log(core);
		console.log('====================================');
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
				threshold
			},
			getSliderItems,
			setPosInitial,
			setPosX1,
			getPosX1,
			setPosX2,
			getPosX2,
			getSlider,
			getPerSlide,
			getSlidesLength,
			getIndex,
			// getDotsSelector,
			getSlideSize,
			getSliderMainWidth,
			setIndex,
			getSliderSelector,
			setPosFinal,
			getPosFinal,
			setAllowShift
		} = this.core;


		const dragEndCall = () => {
			let dragStartParams = {
				sliderItems:getSliderItems(),
				slidesLength:getSlidesLength(),
				slideSize:getSlideSize(),
				sliderMainWidth:getSliderMainWidth(),
				sliderSelector:getSliderSelector(),
				posFinal:getPosFinal(),
				threshold,
				responsive,
				infinite,
				setIndex,
				// getDotsSelector,
				setPosFinal,
				// checkIndexCall,
				dragAction,
				setPosInitial,
				setPosX1,
				setAllowShift,
				index:getIndex(),
				// dotsSelector:getDotsSelector(),
			};
			dragEnd(dragStartParams);
		};

		const dragActionCall = (e) => {
			let dragActionParams = {
				e,
				getPosX1,
				setPosX1,
				setPosX2,
				setPosInitial,
				getSliderItems,
				threshold,
				getPosX2,
				getSlidesLength,
				getPerSlide,
				responsive,
				getSlider,
				infinite,
				getSlideSize,
				getSliderMainWidth
			};
			dragAction(dragActionParams);
		};

		const dragStartCall = (e) => {
			// debugger;
			let dragStartParams = {
				e,
				sliderItems: getSliderItems(),
				setPosInitial,
				setPosX1,
				dragEndCall: dragEndCall,
				dragActionCall: (e) => dragActionCall(e),
			};
			dragStart(dragStartParams);
		};

		// Mouse events
		getSliderItems().onmousedown = dragStartCall;
		// Touch events
		getSliderItems().addEventListener("touchstart", dragStartCall);
		getSliderItems().addEventListener("touchend", dragEndCall);
		getSliderItems().addEventListener("touchmove", dragActionCall);
	}
}