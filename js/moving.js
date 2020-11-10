'use strict';

const MIN_PIN_X = 0;
const MIN_PIN_Y = 130;
const MAX_PIN_Y = 630;

const pinCorrectX = window.pin.MAIN_PIN_SIZE / 2;
const minMainPinX = MIN_PIN_X - pinCorrectX;
const pinCorrectY = window.pin.MAIN_PIN_SIZE + window.pin.MAIN_PIN_TAIL;
const minMainPinY = MIN_PIN_Y - pinCorrectY;
const maxMainPinY = MAX_PIN_Y - pinCorrectY;

const mapPins = document.querySelector(`.map__pins`);
const pinMain = document.querySelector(`.map__pin--main`);

pinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let pinMainTop;
    let pinMainLeft;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMainTop = pinMain.offsetTop - shift.y;
    pinMainLeft = pinMain.offsetLeft - shift.x;

    if (pinMainTop < minMainPinY) {
      pinMain.style.top = `${minMainPinY}px`;
    } else if (pinMainTop > maxMainPinY) {
      pinMain.style.top = `${maxMainPinY}px`;
    } else {
      pinMain.style.top = `${pinMainTop}px`;
    }

    if (pinMainLeft < minMainPinX) {
      pinMain.style.left = `${minMainPinX}px`;
    } else if (pinMainLeft > mapPins.offsetWidth - pinCorrectX) {
      pinMain.style.left = `${mapPins.offsetWidth - pinCorrectX}px`;
    } else {
      pinMain.style.left = `${pinMainLeft}px`;
    }

    window.pin.getMainAddress(window.main.isPageActive);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
