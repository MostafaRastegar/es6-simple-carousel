import {
  calcSliderChildWidth,
  responsiveItemCount,
  truncResponsiveItemCount,
  switchInfiniteResponsiveCount,
  checkIndex
} from "./utils";

import SliderDots from './sliderDots/index';
import SliderTrailer from './slideTrailer/index';
import SliderArrows from './sliderArrows/index';
import DragEvent from "./dragEvent/index";

class SliderCore {
    config = {};
    sliderSelector = null;
    posX1 = 0;
    posX2 = 0;
    // responsive = null;
    infinite = false;
    threshold = 0;
    slider = null;
    sliderItems = null;
    posInitial = 0;
    posFinal = 0;
    slidesLength = 0;
    sliderMainWidth = 0;
    orginSlider = [];
    slideSize = 0;
    sliderItemWidth = 0;
    index = 0;
      allowShift = true;
      perSlide = 0;

    constructor(config) {
        this.setConfig(config);
        this.initialize();
    };

    setConfig = config => { this.config = config };
    getConfig = () => this.config;

    setSliderSelector = sliderSelector => { this.sliderSelector = sliderSelector };
    getSliderSelector = () => this.sliderSelector;

    setSlider = slider => { this.slider = slider };
    getSlider = () => this.slider;

    setPosX1 = posX1 => { this.posX1 = posX1 };
    getPosX1 = () => this.posX1;

    setPosX2 = posX2 => { this.posX2 = posX2 };
    getPosX2 = () => this.posX2;
  
    setPerSlide = perSlide => { this.perSlide = perSlide };
    getPerSlide = () => this.perSlide;


    setSliderItems = sliderItems => { this.sliderItems = sliderItems };
    getSliderItems = () => this.sliderItems;

    setPosInitial = posInitial => { this.posInitial = posInitial };
    getPosInitial = () => this.posInitial;

    setPosFinal = posFinal => { this.posFinal = posFinal };
    getPosFinal = () => this.posFinal;

    setSlidesLength = slidesLength => { this.slidesLength = slidesLength };
    getSlidesLength = () => this.slidesLength;

    setSliderMainWidth = sliderMainWidth => { this.sliderMainWidth = sliderMainWidth };
    getSliderMainWidth = () => this.sliderMainWidth;


    setOrginSlider = orginSlider => { this.orginSlider = orginSlider };
    getOrginSlider = () => this.orginSlider;

    setSlideSize = slideSize => { this.slideSize = slideSize };
    getSlideSize = () => this.slideSize;

    setSliderItemWidth = sliderItemWidth => { this.sliderItemWidth = sliderItemWidth };
    getSliderItemWidth = () => this.sliderItemWidth;

    setIndex = index => { this.index = index };
    getIndex = () => this.index;

    setAllowShift = allowShift => { this.allowShift = allowShift };
    getAllowShift = () => this.allowShift;

    updateLog = () => {
      console.log(this.index)
    }

    initialize = () => {
        const {
            slider,
            infinite,
            responsive,
        } = this.getConfig();
        //----------- start init variables  -----
        this.setSlider(slider);

        const sliderSelector = document.querySelector(`${slider}`);
        this.setSliderSelector(sliderSelector);

        const sliderClienWidth = this.getSliderSelector().clientWidth;
        this.setSliderMainWidth(sliderClienWidth);

        const sliderSlidesSelector = document.querySelector(`${slider} .slides`);
        this.setSliderItems(sliderSlidesSelector);

        const sliderChildWidth = calcSliderChildWidth({
            responsiveItemCount: responsiveItemCount(responsive),
            slider:this.getSliderSelector()
        });
        this.setSlideSize(sliderChildWidth);

        const sliderItemWidth = calcSliderChildWidth({
            responsiveItemCount: responsiveItemCount(responsive),
            slider:this.getSliderSelector()
        });
        this.setSliderItemWidth(sliderItemWidth);

        // init slider for start
        const slides = this.getSliderItems().children;
        this.setSlidesLength(slides.length);

        // change name to perSlide
        const perSlide = switchInfiniteResponsiveCount(
            truncResponsiveItemCount(responsive),
            infinite
    );
    this.setPerSlide(perSlide);
    this.setIndex(perSlide);
    
    this.sliderTrailer = new SliderTrailer({core: this});
    this.dragEvent = new DragEvent({core: this});
    this.sliderDots = new SliderDots({core: this});
    this.sliderArrows = new SliderArrows({core: this});

    sliderSlidesSelector.addEventListener("transitionend", this.checkIndexCall);

        // window.onresize = () => {
        //   sliderItems = orginSlider;
        //   sliderItems.innerHTML = slideItemGenerator(orginSlider);
        //   sliderItemWidth = slideSize = sliderClientWidth(slider);
        //   setSliderItemsChildWidth(orginSlider);
        //   const setSliderItemsPositionParams = {
        //     indexItem: index,
        //     sliderItemWidth,
        //     sliderItems: orginSlider
        //   };
        //   setSliderItemsPosition(setSliderItemsPositionParams);
        // };

    }

    checkIndexCall = () => {
      const {
        config: {
          slider,
          infinite,
          responsive,
        },
        index,
        dragAction,
        setPosInitial,
        setPosX1,
        setAllowShift,
        sliderItems,
        slideSize,
        sliderMainWidth
      } = this;
      checkIndex({
        slider,
        infinite,
        responsive,
        sliderItems,
        dragAction,
        setPosInitial,
        setPosX1,
        setAllowShift,
        index,
        slideSize,
        sliderMainWidth
      });
    }

};

export default SliderCore;