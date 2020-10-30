'use strict';
(() => {
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);

  let isPageActive = false;

  const activatePage = () => {
    if (!isPageActive) {
      isPageActive = true;
      window.form.toggleForm(`remove`, false);
      window.pin.renderPins(window.adverts.data);
      window.pin.getMainPinAddress();
    }
  };

  const deactivatePage = () => {
    isPageActive = false;
    window.form.toggleForm(`add`, true);
  };

  pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  });

  mapPins.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && evt.target.closest(`button[data-id]`)) {
      window.card.openCard(evt);
    }
  });

  mapPins.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && evt.target.closest(`button[data-id]`)) {
      window.card.openCard(evt);
    }
  });

  window.main = {
    isPageActive,
    activatePage,
    deactivatePage
  };
})();
