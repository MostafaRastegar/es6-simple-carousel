"use strict";

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSDOM = require('jsdom').JSDOM;

test('responsiveItemCount 0:{items:2.5} to equal 2.5', function () {
  var config = {
    0: {
      items: 2.5
    },
    560: {
      items: 3
    },
    760: {
      items: 2.5
    }
  };
  expect((0, _utils.responsiveItemCount)(config)).toBe(2.5);
});
test('truncResponsiveItemCount 0:{items:2.5} to equal 2', function () {
  var config = {
    0: {
      items: 2.5
    },
    560: {
      items: 3
    },
    760: {
      items: 2.5
    }
  };
  expect((0, _utils.truncResponsiveItemCount)(config)).toBe(2);
});
test('calcFinalItemPosition to equal  -2673', function () {
  var config = {
    slideSize: 486,
    slidesLength: 8,
    sliderMainWidth: 1215,
    perSlide: 2,
    infinite: false
  };
  expect((0, _utils.calcFinalItemPosition)(config)).toBe(-2673);
});
test('calcFirstItemPosition to equal  -0,-1458', function () {
  var config = {
    slideSize: 486,
    perSlide: 2
  };
  var infiniteFalse = false;
  var infiniteTrue = true;

  if (infiniteFalse === false) {
    expect((0, _utils.calcFirstItemPosition)(_objectSpread(_objectSpread({}, config), {}, {
      infinite: false
    }))).toBe(-0);
  }

  if (infiniteTrue) {
    expect((0, _utils.calcFirstItemPosition)(_objectSpread(_objectSpread({}, config), {}, {
      infinite: true
    }))).toBe(-1458);
  }
});
test('calcSliderGroupCount 0:{items:2.5} to equal 4', function () {
  var config = {
    responsive: {
      0: {
        items: 2.5
      },
      560: {
        items: 3
      },
      760: {
        items: 2.5
      }
    },
    slidesLength: 8
  };
  expect((0, _utils.calcSliderGroupCount)(config)).toBe(4);
});
test('calcSliderChildWidth by responsiveItemCount: 2.5 to equal 486', function () {
  var jsdom = new JSDOM('<!DOCTYPE html><html>...');
  Object.defineProperty(jsdom.window.HTMLHtmlElement.prototype, 'clientWidth', {
    value: 1215
  });
  var config = {
    responsiveItemCount: 2.5,
    slider: jsdom.window.document.documentElement
  };
  expect((0, _utils.calcSliderChildWidth)(config)).toBe(486);
});
test('directionSetter rtl to equal -10,10', function () {
  var config = {
    input: 10
  };
  var rtlFalse = false;
  var rtlTrue = true;

  if (rtlFalse === false) {
    expect((0, _utils.directionSetter)(_objectSpread(_objectSpread({}, config), {}, {
      rtl: false
    }))).toBe(10);
  }

  if (rtlTrue) {
    expect((0, _utils.directionSetter)(_objectSpread(_objectSpread({}, config), {}, {
      rtl: true
    }))).toBe(-10);
  }
});
test('setTranslate3d 210 to equal translate3d(210px,0px,0px)', function () {
  expect((0, _utils.setTranslate3d)(210)).toBe('translate3d(210px,0px,0px)');
}); // test('getTranslate3d translate3d(210.5px,0px,0px) to equal 210.5', () => {
//   const jsdom = new JSDOM('<!DOCTYPE html><html>...');
//   Object.defineProperty(jsdom.window.HTMLHtmlElement.prototype, 'style', {value: 'transform: translate3d(210.5px, 0px, 0px)'}); 
//   expect(getTranslate3d(jsdom.window.document.documentElement)).toBe(210.5);
// });

test('switchInfiniteResponsiveCount to equal  10,0', function () {
  var infiniteFalse = false;
  var infiniteTrue = true;

  if (infiniteFalse === false) {
    expect((0, _utils.switchInfiniteResponsiveCount)(10, infiniteFalse)).toBe(0);
  }

  if (infiniteTrue) {
    expect((0, _utils.switchInfiniteResponsiveCount)(10, infiniteTrue)).toBe(10);
  }
});
test('vdomArrayConvertor to equal  [1,2],[1,2]', function () {
  var arr = ['a', 'b'];
  var obj = {
    'a': 1,
    'b': 2
  };

  if (arr) {
    expect((0, _utils.vdomArrayConvertor)(arr)).toStrictEqual(['a', 'b']);
  }

  if (obj) {
    expect((0, _utils.vdomArrayConvertor)(obj)).toStrictEqual([1, 2]);
  }
});