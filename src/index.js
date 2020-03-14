import "./styles/slider.css";
import "./styles/custom.css";
import {Slider} from "../src/scripts/index";
// import {Slider} from "../src/scripts/index.es";

const slideConfig = {
  slider:  document.querySelector(`#slider`),
  threshold: 50,
  infinite: false,
  rtl:true,
  nav: true,
  dots: true,
  autoPlay:false,
	drag: true,
	nextSpeed: 5000,
  responsive: {
    0: {
      items: 2.5
    },
  }
};

const newSlider = new Slider(slideConfig);