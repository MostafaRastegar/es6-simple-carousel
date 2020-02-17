import "./styles/slider.css";
import "./styles/custom.css";
import {Slider} from "./scripts/index";

const slideConfig = {
  slider: "#slider",
  threshold: 50,
  infinite: true,
  nav: true,
  dots: true,
  responsive: {
    0: {
      items: 1.5
    },
    560: {
      items: 3
    },
    760: {
      items: 2
    }
  }
};

new Slider(slideConfig);