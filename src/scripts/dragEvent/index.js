import {
	dragAction,
	dragEnd,
	dragStart,
} from './partial';

export default class DragEvent {

	/**
	 * @name constructor
	 * @description
	 * sets the core to access to the core instance methods without inheritance,
	 * initializes the drag events handlers
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
	 * @description gets the config from core, initializes the drag action events, and attaches to the slider
	 */
	initialize() {
		const {
			config: {
				responsive,
				threshold,
				rtl,
				nav,
			},
			getDrag,
			getInfinite,
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
			getSlideSize,
			getSliderMainWidth,
			setIndex,
			setPosFinal,
			getPosFinal,
			setAllowShift,
			transitionendWatcherCall
		} = this.core;
		
		const infinite = getInfinite();
		const sliderItems = getSliderItems();
		const drag = getDrag();

		/**
		 * @name dragEndCall
		 * @description handles the drag end event by passing the config and end point of the dragging to the dragEnd method
		 */
		const dragEndCall = () => {
			let dragStartParams = {
				sliderItems: getSliderItems(),
				slidesLength: getSlidesLength(),
				slideSize: getSlideSize(),
				sliderMainWidth: getSliderMainWidth(),
				slider: getSlider(),
				posFinal: getPosFinal(),
				threshold,
				responsive,
				infinite,
				rtl,
				nav,
				setIndex,
				setPosFinal,
				transitionendWatcherCall,
				dragAction,
				drag,
				setPosInitial,
				setPosX1,
				setAllowShift,
				index: getIndex(),
			};
			dragEnd(dragStartParams);
		};

		/**
		 * @name dragActionCall
		 * @description handles the dragging event by passing the config and current drag point to the dragAction method
		 * @param e
		 */
		const dragActionCall = (e) => {
			let dragActionParams = {
				e,
				getPosX1,
				setPosX1,
				setPosX2,
				setPosInitial,
				getSliderItems,
				threshold,
				rtl,
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

		/**
		 * @name dragStartCall
		 * @description handles the drag start event by passing config and start point of drag event to the dragStart method
		 * @param e
		 */
		const dragStartCall = (e) => {
			let dragStartParams = {
				e,
				sliderItems,
				setPosInitial,
				setPosX1,
				dragEndCall: dragEndCall,
				dragActionCall: (e) => dragActionCall(e),
				sliderMainWidth: getSliderMainWidth(),
				rtl
			};
			dragStart(dragStartParams);
		};

		// Mouse events
		sliderItems.addEventListener("mousedown", dragStartCall);
		// Touch events
		sliderItems.addEventListener("touchstart", dragStartCall);
		sliderItems.addEventListener("touchend", dragEndCall);
		sliderItems.addEventListener("touchmove", dragActionCall);

	}
}