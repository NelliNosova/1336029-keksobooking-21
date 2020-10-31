'use strict';
(() => {
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);

  let isPageActive = false;

  const onSuccess = (data) => {
    window.dataWithId = window.util.addIdToOffer(data);
    window.pin.renderPins(window.dataWithId);
  };


  const activatePage = () => {
    if (!isPageActive) {
      isPageActive = true;
      window.form.toggleForm(`remove`, false);
      window.backend.load(onSuccess, window.massages.onError);
      window.pin.getMainPinAddress();
    }
  };

  const deactivatePage = () => {
    isPageActive = false;
    window.pin.getMainPinAddress();
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
      window.card.openCard(evt, window.dataWithId);
    }
  });

  mapPins.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && evt.target.closest(`button[data-id]`)) {
      window.card.openCard(evt, window.dataWithId);
    }
  });

  window.main = {
    isPageActive,
    activatePage,
    deactivatePage
  };
})();
