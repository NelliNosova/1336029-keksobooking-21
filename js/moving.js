'use strict';
(() => {
  const PIN_MAIN_TOP = 570;
  const PIN_MAIN_LEFT = 375;

  let isDragged = false;

  window.main.pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      isDragged = true;

      let pinMainTop = PIN_MAIN_TOP;
      let pinMainLeft = PIN_MAIN_LEFT;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainTop = window.main.pinMain.offsetTop - shift.y;
      pinMainLeft = window.main.pinMain.offsetLeft - shift.x;

      if (pinMainTop < window.adverts.MIN_PIN_Y) {
        window.main.pinMain.style.top = `${window.adverts.MIN_PIN_Y}px`;
      } else if (pinMainTop > window.adverts.MAX_PIN_Y) {
        window.main.pinMain.style.top = `${window.adverts.MAX_PIN_Y}px`;
      } else {
        window.main.pinMain.style.top = `${pinMainTop}px`;
      }

      if (pinMainLeft < window.adverts.MIN_PIN_X - window.pin.MAIN_PIN_SIZE / 2) {
        window.main.pinMain.style.left = `${window.adverts.MIN_PIN_X - window.pin.MAIN_PIN_SIZE / 2}px`;
      } else if (pinMainLeft > window.main.mapPins.offsetWidth - window.pin.MAIN_PIN_SIZE / 2) {
        window.main.pinMain.style.left = `${window.main.mapPins.offsetWidth - window.pin.MAIN_PIN_SIZE / 2}px`;
      } else {
        window.main.pinMain.style.left = `${pinMainLeft}px`;
      }

      window.pin.getMainPinAddress();

    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (isDragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          window.main.pinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        window.main.pinMain.addEventListener(`click`, onClickPreventDefault);
      };
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.moving = {
    isDragged
  };
})();
