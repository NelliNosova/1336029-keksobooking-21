'use strict';
(() => {
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);

  const error = document.querySelector(`#error`).content.querySelector(`.error`);

  let isPageActive = false;

  const errorHandler = () => {
    const errorPopup = error.cloneNode(true);

    const errorMessage = errorPopup.querySelector(`.error__message`);

    errorMessage.textContent = `Ошибка загрузки объявлений об аренде`;

    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  const activatePage = () => {
    if (!isPageActive) {
      isPageActive = true;
      window.form.toggleForm(`remove`, false);
      window.load(window.pin.renderPins, pinsListener, errorHandler);
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

  const pinsListener = (findCard) => {

    mapPins.addEventListener(`mousedown`, (evt) => {
      if (evt.button === 0 && evt.target.closest(`button[data-id]`)) {
        window.card.openCard(evt, findCard);
      }
    });

    mapPins.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && evt.target.closest(`button[data-id]`)) {
        window.card.openCard(evt, findCard);
      }
    });
  };


  window.main = {
    isPageActive,
    activatePage,
    deactivatePage
  };
})();
