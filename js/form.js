'use strict';
(() => {
  const MAX_PRICE = 1000000;

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const map = document.querySelector(`.map`);

  const advertForm = document.querySelector(`.ad-form`);
  const advertRoomNumber = advertForm.querySelector(`#room_number`);
  const advertCapacityNumber = advertForm.querySelector(`#capacity`);
  const advertTitle = advertForm.querySelector(`#title`);
  const advertType = advertForm.querySelector(`#type`);
  const advertPrice = advertForm.querySelector(`#price`);
  const advertTimein = advertForm.querySelector(`#timein`);
  const advertTimeout = advertForm.querySelector(`#timeout`);

  const formSelects = document.querySelectorAll(`select`);
  const formFieldsets = document.querySelectorAll(`fieldset`);

  advertRoomNumber.addEventListener(`change`, (evt) => {
    if (evt.target.value < advertCapacityNumber.value && evt.target.value !== `100` && advertCapacityNumber.value !== `100`) {
      advertCapacityNumber.value = evt.target.value;
      advertCapacityNumber.setCustomValidity(`Количество гостей не может быть больше, чем количество комнат`);
    } else if (evt.target.value === `100`) {
      advertCapacityNumber.value = evt.target.value;
      advertCapacityNumber.setCustomValidity(`Опция 100 комнат доступна только не для гостей`);
    } else if (advertCapacityNumber.value === `100` && advertCapacityNumber.value !== evt.target.value) {
      advertCapacityNumber.value = evt.target.value;
      advertCapacityNumber.setCustomValidity(`Опция "не для гостей" доступна только для 100 комнат`);
    } else {
      advertCapacityNumber.setCustomValidity(``);
    }

    advertCapacityNumber.reportValidity();
  });

  advertCapacityNumber.addEventListener(`change`, (evt) => {
    if (evt.target.value > advertRoomNumber.value && evt.target.value !== `100` && advertRoomNumber.value !== `100`) {
      advertRoomNumber.value = evt.target.value;
      advertRoomNumber.setCustomValidity(`Количество комнат не может быть меньше, чем количество гостей`);
    } else if (evt.target.value === `100`) {
      advertRoomNumber.value = evt.target.value;
      advertRoomNumber.setCustomValidity(`Опция "не для гостей" доступна только для 100 комнат`);
    } else if (advertRoomNumber.value === `100` && advertRoomNumber.value !== evt.target.value) {
      advertRoomNumber.value = evt.target.value;
      advertRoomNumber.setCustomValidity(`Опция 100 комнат доступна только не для гостей`);
    } else {
      advertRoomNumber.setCustomValidity(``);
    }

    advertRoomNumber.reportValidity();
  });

  advertTitle.addEventListener(`change`, (evt) => {
    const valueLength = advertTitle.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      evt.target.setCustomValidity(`Ещё  ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      evt.target.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
    } else {
      evt.target.setCustomValidity(``);
    }

    evt.target.reportValidity();
  });

  advertPrice.addEventListener(`change`, (evt) => {
    if (advertPrice.value > MAX_PRICE) {
      evt.target.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}`);
    } else {
      evt.target.setCustomValidity(``);
    }

    evt.target.reportValidity();
  });

  advertTimein.addEventListener(`change`, () => {
    if (advertTimeout.value !== advertTimein.value) {
      advertTimeout.value = advertTimein.value;
      advertTimeout.setCustomValidity(`Время заезда и выезда должно совпадать`);
    } else {
      advertTimeout.setCustomValidity(``);
    }

    advertTimeout.reportValidity();
  });

  advertTimeout.addEventListener(`change`, () => {
    if (advertTimein.value !== advertTimeout.value) {
      advertTimein.value = advertTimeout.value;
      advertTimein.setCustomValidity(`Время заезда и выезда должно совпадать`);
    } else {
      advertTimein.setCustomValidity(``);
    }

    advertTimein.reportValidity();
  });

  advertType.addEventListener(`change`, (evt) => {
    for (let i = 0; i < window.adverts.TYPE_HOUSE.length; i++) {

      if (evt.target.value === window.adverts.TYPE_HOUSE[i].type) {
        advertPrice.min = window.adverts.TYPE_HOUSE[i].minPrice;
        advertPrice.placeholder = window.adverts.TYPE_HOUSE[i].minPrice;
      }

    }
  });

  advertPrice.addEventListener(`change`, (evt) => {
    const typeArray = Array.from(advertType);

    const availableLength = [];

    for (let i = 0; i < window.adverts.TYPE_HOUSE.length; i++) {
      if (parseInt(window.adverts.TYPE_HOUSE[i].minPrice, 10) <= parseInt(evt.target.value, 10)) {
        const elem = window.adverts.TYPE_HOUSE[i].type;
        console.log(window.adverts.TYPE_HOUSE[i].type);
        availableLength.push(elem);
      }
      if (
        window.adverts.TYPE_HOUSE[i].type === advertType.value &&
        parseInt(evt.target.value, 10) < parseInt(window.adverts.TYPE_HOUSE[i].minPrice, 10)
      ) {
        advertType.setCustomValidity(`Слишком маленькая цена для данного типа`);
      } else {
        advertType.setCustomValidity(``);
      }

      advertType.reportValidity();
    }

    window.util.toggleFormElementsState(typeArray, false);
    const availableType = typeArray.slice(availableLength.length);

    window.util.toggleFormElementsState(availableType, true);
  });

  const toggleForm = (state, bul) => {
    map.classList[state](`map--faded`);
    advertForm.classList[state](`ad-form--disabled`);
    window.util.toggleFormElementsState(formFieldsets, bul);
    window.util.toggleFormElementsState(formSelects, bul);
  };

  window.util.toggleFormElementsState(formFieldsets, true);
  window.util.toggleFormElementsState(formSelects, true);

  window.form = {
    advertForm,
    formSelects,
    formFieldsets,
    toggleForm
  };
})();
