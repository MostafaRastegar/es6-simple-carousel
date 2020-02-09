export default {
  slider: document.getElementById('slider'),
  sliderItems: document.getElementById('slides'),
  dots: document.getElementById('dots'),
  prev: document.getElementById('prev'),
  next: document.getElementById('next'),
  threshold: 50,
  items:3,
  infinite: false,
  responsive: {
    0:{
      items:2
    },
    560:{
      items: 3
    },
    760:{
      items: 3
    }
  }
};