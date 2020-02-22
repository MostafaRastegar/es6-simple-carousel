import {
  calcSliderChildWidth,
  responsiveItemCount,
  truncResponsiveItemCount,
  switchInfiniteResponsiveCount,
  checkIndex,
  elementCreator,
  childFider,
  prevNone
} from "./utils";

import {shiftSlideIsDir} from './sliderArrows/partial';

import SliderDots from './sliderDots/index';
import SliderTrailer from './slideTrailer/index';
import SliderArrows from './sliderArrows/index';
import DragEvent from "./dragEvent/index";

class SliderCore {


    constructor(config) {
        this.setConfig(config);
        this.initialize();
    };

    setConfig = config => { this.config = config };
    getConfig = () => this.config;

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
            nav,
            dots,
            autoPlay
        } = this.getConfig();
        //----------- start init variables  -----
        this.setSlider(slider);

        const sliderClienWidth = this.getSlider().clientWidth;
        this.setSliderMainWidth(sliderClienWidth);
        
        let sliderSlidesSelector = childFider({
          wrapper:slider,
          className:'.slides'
        });
        this.setSliderItems(sliderSlidesSelector);

        const sliderChildWidth = calcSliderChildWidth({
            responsiveItemCount: responsiveItemCount(responsive),
            slider:this.getSlider()
        });
        this.setSlideSize(sliderChildWidth);

        const sliderItemWidth = calcSliderChildWidth({
            responsiveItemCount: responsiveItemCount(responsive),
            slider:this.getSlider()
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

		if(nav){
			elementCreator({tag:'Span',wrapper:slider,className:'control next'});
			elementCreator({tag:'Span',wrapper:slider,className:'control prev'});
      this.sliderArrows = new SliderArrows({core: this});
      const index = this.getIndex();
      if (!infinite && index === 0) {
        prevNone(slider);
      }
    }
    
		if(dots){
			elementCreator({tag:'Ul',wrapper:slider,className:'dots'});
      this.sliderDots = new SliderDots({core: this});
    }

    if(autoPlay){
      // const sliderArrows = new SliderArrows({core: this});
      setInterval(()=>this.next(),3000);

    }
    
    this.sliderTrailer = new SliderTrailer({core: this});
    this.dragEvent = new DragEvent({core: this});
    
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
      
    next(){
      const {
        sliderItems,
        index,
        perSlide,
        slideSize,
        slidesLength,
        sliderMainWidth,
        config:{
          infinite,
          slider,
          responsive
        }
      } = this;
      childFider({
        wrapper:slider,
        className:".slides"
      }).classList.add('shifting')
      this.setIndex(shiftSlideIsDir({
        sliderItems,
        index,
        perSlide,
        slideSize,
        slidesLength,
        sliderMainWidth,
        responsiveItem:responsiveItemCount(responsive),
        infinite,
        slider,
      }))
    }
    checkIndexCall = () => {
      const {
        config: {
          slider,
          infinite,
          responsive,
          dots,
          nav
        },
        index,
        setIndex,
        dragAction,
        setPosInitial,
        setPosX1,
        setAllowShift,
        sliderItems,
        slideSize,
        sliderMainWidth,
        slidesLength,
        sliderItemWidth
      } = this;
      checkIndex({
        slider,
        infinite,
        responsive,
        dots,
        nav,
        sliderItems,
        dragAction,
        setPosInitial,
        setPosX1,
        setAllowShift,
        index,
        slideSize,
        sliderMainWidth,
        slidesLength,
        sliderItemWidth,
        setIndex
      });
    }

};

export default SliderCore;