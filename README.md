# es6-simple-carousel

A light and simple pure javascript carousel.It is usable in the javascript base projects (like reactjs,vuejs,angular).


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run dist
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)

When you run `npm run dist` created module on dist folder. you can use from index.es.js on your project.


### 1. Getting Started
* add Slider from es6-simple-carousel on your page.


```jsx
// ...
import { Slider } from 'es6-simple-carousel';
import 'es6-simple-carousel/dist/styles/slider.css',
// optional
import 'es6-simple-carousel/dist/styles/custom.css',
//...
```
### 2. config your slider
add config on Slider class.

```jsx
const slideConfig = {
  slider:  document.querySelector(`#slider`),
  threshold: 50,
  infinite: true,
  nav: true,
  dots: true,
  autoPlay:false,
  responsive: {
    0: {
      items: 1.5
    },
    560: {
      items: 2
    },
    760: {
      items: 3
    }
  }
};

new Slider(slideConfig);
// ....
```
on html page
```html
  <div class="container">
    <div id="slider" class="slider">
      <div class="wrapper">
        <div class="slides">
          <span class="slide">Slide 1</span>
          <span class="slide">Slide 2</span>
          <span class="slide">Slide 3</span>
          <span class="slide">Slide 4</span>
          <span class="slide">Slide 5</span>
        </div>
      </div>
    </div>
  </div>

```

