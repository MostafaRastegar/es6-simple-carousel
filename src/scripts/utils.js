// import config from "./config";
export const carouselPositionLeft = (sliderItems) => sliderItems.offsetLeft;

export const caroueslTouchStart = (e) => {
	return e.touches[0].clientX;
};

export const caroueslDragAction = (params) => {
  const {
    e,
    dragEnd,
    dragAction
  } = params;
	document.onmouseup = dragEnd;
	document.onmousemove = dragAction;
	return e.clientX;
};

export const dragActionTouchmovePosX2 = (params) => {
  const {
    e,posX1
  } = params;
  return posX1 - e.touches[0].clientX;
};

export const dragActionTouchmovePosX1 = (e) => {
  return e.touches[0].clientX;
};

export const dragActionMousemove = (params) => {
  const {posX1,e} = params;
  return posX1 - e.clientX;
};

export const dragActionMousemovePosX1 = (e) => {
  return e.clientX;
};

export const dragActionCalcPosition = (params) => {
  const {sliderItems,posX2} = params;
  sliderItems.style["left"] = carouselPositionLeft(sliderItems) - posX2 + "px";
};

export const dragEndCalcPosition = (params) => {
  const {sliderItems,posInitial} = params;
  sliderItems.style["left"] = posInitial + "px";
};

export const mouseEventNull = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};

export const sliderItemsAddClass = (sliderItems) => {
  sliderItems.classList.add("shifting");
};

export const sliderItemsRemoveClass = (sliderItems) => {
  sliderItems.classList.remove("shifting");
};