"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageNumberOnChild = exports.cloneNodeInsertBefore = exports.cloneNodeGenerator = exports.cloneNodeAppendChild = exports.addCloneClass = void 0;

var _utils = require("../utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var setPageNumberOnChild = function setPageNumberOnChild(params) {
  var sliderItems = params.sliderItems,
      responsive = params.responsive;
  var perSlide = (0, _utils.truncResponsiveItemCount)(responsive);
  var newArrChild = [];
  (0, _utils.vdomArrayConvertor)(sliderItems.children).forEach(function (item, itemIndex) {
    item.setAttribute('data-page', Math.trunc(itemIndex / perSlide) + 1);
    newArrChild.push(item.getAttribute('data-page'));
  });
  return newArrChild;
};

exports.setPageNumberOnChild = setPageNumberOnChild;

var addCloneClass = function addCloneClass(item) {
  item.classList.add('clone');
  return item;
};

exports.addCloneClass = addCloneClass;

var cloneNodeGenerator = function cloneNodeGenerator(params) {
  var perSlide = params.perSlide,
      sliderItems = params.sliderItems;
  var sliderItemsChildren = (0, _utils.vdomArrayConvertor)(sliderItems.children);

  var deepCloneSliderItemsChildren = _toConsumableArray(sliderItemsChildren);

  var cloneNodeParams = {
    perSlide: perSlide,
    deepCloneSliderItemsChildren: deepCloneSliderItemsChildren,
    sliderItems: sliderItems
  };
  cloneNodeAppendChild(cloneNodeParams);
  cloneNodeInsertBefore(cloneNodeParams);
};

exports.cloneNodeGenerator = cloneNodeGenerator;

var cloneNodeAppendChild = function cloneNodeAppendChild(params) {
  var perSlide = params.perSlide,
      deepCloneSliderItemsChildren = params.deepCloneSliderItemsChildren,
      sliderItems = params.sliderItems;
  var newArrChild = [];
  deepCloneSliderItemsChildren.forEach(function (element, index) {
    if (index <= perSlide) {
      var cln = element.cloneNode(true);
      addCloneClass(cln);
      newArrChild.push(index);
      sliderItems.appendChild(cln);
    }
  });
  return newArrChild;
};

exports.cloneNodeAppendChild = cloneNodeAppendChild;

var cloneNodeInsertBefore = function cloneNodeInsertBefore(params) {
  var perSlide = params.perSlide,
      deepCloneSliderItemsChildren = params.deepCloneSliderItemsChildren,
      sliderItems = params.sliderItems;
  var itemsChildrenLength = deepCloneSliderItemsChildren.length - perSlide - 1;
  deepCloneSliderItemsChildren.forEach(function (element, index) {
    if (index >= itemsChildrenLength) {
      var cln = element.cloneNode(true);
      addCloneClass(cln);
      sliderItems.insertBefore(cln, deepCloneSliderItemsChildren[0]);
    }
  });
};

exports.cloneNodeInsertBefore = cloneNodeInsertBefore;