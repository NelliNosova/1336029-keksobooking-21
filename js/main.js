'use strict';

const MAIN_PIN_LEFT = 570;
const MAIN_PIN_TOP = 374;
const mapPins = document.querySelector(`.map__pins`);
const pinMain = document.querySelector(`.map__pin--main`);
const resetButton = document.querySelector(`.ad-form__reset`);

let isPageActive = false;

const onSuccessLoad = (data) => {
  window.dataWithId = window.util.addIdToOffer(data);

  window.pin.renderPins(window.filter.filterData(window.dataWithId));
};

const activatePage = () => {
  if (!isPageActive) {
    isPageActive = true;
    window.form.toggleForm(`remove`, false);
    window.backend.load(onSuccessLoad, window.messages.showErrorMassage);
    window.pin.getMainPinAddress();
  }
};

const checkRemove = (elem) => {
  if (elem) {
    elem.remove();
  }
};

const deactivatePage = () => {
  const card = document.querySelector(`.map__card`);
  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const photoPreview = document.querySelector(`.ad-form__photo img`);

  isPageActive = false;

  checkRemove(card);
  checkRemove(avatarPreview);
  checkRemove(photoPreview);

  window.pin.removePins();
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
    window.card.openCard(evt);
  }
});

mapPins.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter` && evt.target.closest(`button[data-id]`)) {
    window.card.openCard(evt);
  }
});

resetButton.addEventListener(`click`, () => {
  pinMain.style.left = `${MAIN_PIN_LEFT}px`;
  pinMain.style.top = `${MAIN_PIN_TOP}px`;

  deactivatePage();
});

window.main = {
  isPageActive,
  activatePage,
  deactivatePage
};
