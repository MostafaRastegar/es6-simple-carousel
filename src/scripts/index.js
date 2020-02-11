import "../styles/index.scss";
import slide from "./events";

const slideConfig = {
  slider: "#slider", //add user
  threshold: 50, // add user
  infinite: true, //add user
  responsive: {
    //add user
    0: {
      items: 1.5
    },
    560: {
      items: 2.5
    },
    760: {
      items: 2
    }
  }
};

slide(slideConfig);
