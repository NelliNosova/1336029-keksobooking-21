'use strict';

const mapPins = document.querySelector(`.map__pins`);
const pinMain = document.querySelector(`.map__pin--main`);
const advertForm = document.querySelector(`.ad-form`);
const resetButton = document.querySelector(`.ad-form__reset`);

let isPageActive = false;

const onSuccessLoad = (data) => {
  window.dataWithId = window.util.addIdToOffer(data);

  window.pin.render(window.filter.getData(window.dataWithId));
};

const activatePage = () => {
  if (!isPageActive) {
    isPageActive = true;
    window.form.toggle(`remove`, false);
    window.backend.load(onSuccessLoad, window.messages.showError);
    window.pin.getMainAddress(isPageActive);
  }
};

const deactivatePage = () => {
  const card = document.querySelector(`.map__card`);
  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const photoPreview = document.querySelector(`.ad-form__photo img`);
  const checkboxes = document.querySelectorAll(`input[type=checkbox]`);

  isPageActive = false;

  avatarPreview.src = `img/muffin-grey.svg`;
  window.util.toggleFormElementsChecked(checkboxes);
  window.util.checkRemove(card);
  window.util.checkRemove(photoPreview);

  window.pin.remove();
  window.pin.getMainAddress(isPageActive);
  window.form.toggle(`add`, true);
};

pinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

pinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.util.Key.ENTER) {
    activatePage();
  }
});

mapPins.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0 && evt.target.closest(`button[data-id]`)) {
    window.card.open(evt);
  }
});

mapPins.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.util.Key.ENTER && evt.target.closest(`button[data-id]`)) {
    window.card.open(evt);
  }
});

resetButton.addEventListener(`click`, () => {
  advertForm.reset();
  window.form.onTypeCheck();
  window.pin.resetMainAddress();
  deactivatePage();
});

window.main = {
  isPageActive,
  activatePage,
  deactivatePage
};
