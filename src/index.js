import "./styles/slider.css";
import "./styles/custom.css";
import {Slider} from "../src/scripts/index";
// import {Slider} from "../src/scripts/index.es";

const slideConfig = {
  slider:  document.querySelector(`#slider`),
  threshold: 50,
  infinite: true,
  rtl:false,
  nav: true,
  dots: true,
  autoPlay:false,
  responsive: {
    0: {
      items: 1.5
    },
    560: {
      items: 3
    },
    760: {
      items: 2.5
    }
  }
};

new Slider(slideConfig);