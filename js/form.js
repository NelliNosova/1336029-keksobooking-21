'use strict';
(() => {
  const MAP_TYPE_HOUSE = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalow: 0
  };

  const MAP_ERROR_TEXT = {
    rooms100NotGuests0: `Опция 100 комнат доступна только не для гостей`,
    guests0Notrooms100: `Опция "не для гостей" доступна только для 100 комнат`,
    fewerRooms: `Количество гостей не может быть больше, чем количество комнат`
  };

  const MAX_PRICE = 1000000;

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const SPECIAL_ROOM_NUMBER = 100;
  const SPECIAL_GUESTS_NUMBER = 0;

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

  const onTitleChange = () => {
    const valueLength = advertTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      advertTitle.setCustomValidity(`Ещё  ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      advertTitle.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
    } else {
      advertTitle.setCustomValidity(``);
    }
  };

  const onCapacityFieldCheck = (evt) => {
    const target = evt.target;
    const roomsValue = parseInt(advertRoomNumber.value, 10);
    const guestsValue = parseInt(advertCapacityNumber.value, 10);

    advertRoomNumber.setCustomValidity(``);
    advertCapacityNumber.setCustomValidity(``);

    if (roomsValue === SPECIAL_ROOM_NUMBER && guestsValue !== SPECIAL_GUESTS_NUMBER) {
      target.setCustomValidity(MAP_ERROR_TEXT.rooms100NotGuests0);
    } else if (roomsValue !== SPECIAL_ROOM_NUMBER && guestsValue === SPECIAL_GUESTS_NUMBER) {
      target.setCustomValidity(MAP_ERROR_TEXT.guests0Notrooms100);
    } else if (roomsValue < guestsValue) {
      target.setCustomValidity(MAP_ERROR_TEXT.fewerRooms);
    } else {
      target.setCustomValidity(``);
    }

    target.reportValidity();
  };

  const onCheckTimeChange = (evt) => {
    advertTimein.value = evt.target.value;
    advertTimeout.value = evt.target.value;
  };

  const onTypeCheck = () => {
    const typeValue = advertType.value;

    advertPrice.min = MAP_TYPE_HOUSE[typeValue];
    advertPrice.placeholder = MAP_TYPE_HOUSE[typeValue];
  };

  const onPriceCheck = () => {
    const priceValue = advertPrice.value;
    const typeValue = advertType.value;

    if (priceValue < MAP_TYPE_HOUSE[typeValue]) {
      advertPrice.setCustomValidity(`Минимaльная цена для данного типа ${MAP_TYPE_HOUSE[typeValue]} руб.`);
    } else if (priceValue > MAX_PRICE) {
      advertPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE} руб.`);
    } else {
      advertPrice.setCustomValidity(``);
    }

    advertPrice.reportValidity();
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const evtRoom = {
      target: advertRoomNumber
    };

    onCapacityFieldCheck(evtRoom);
  };

  const toggleForm = (state, bul) => {
    map.classList[state](`map--faded`);
    advertForm.classList[state](`ad-form--disabled`);
    window.util.toggleFormElementsState(formFieldsets, bul);
    window.util.toggleFormElementsState(formSelects, bul);
  };

  window.util.toggleFormElementsState(formFieldsets, true);
  window.util.toggleFormElementsState(formSelects, true);

  advertTitle.addEventListener(`change`, onTitleChange);
  advertRoomNumber.addEventListener(`change`, onCapacityFieldCheck);
  advertCapacityNumber.addEventListener(`change`, onCapacityFieldCheck);
  advertTimein.addEventListener(`change`, onCheckTimeChange);
  advertTimeout.addEventListener(`change`, onCheckTimeChange);
  advertType.addEventListener(`change`, onTypeCheck);
  advertPrice.addEventListener(`change`, onPriceCheck);
  advertForm.addEventListener(`submit`, onFormSubmit);

  window.form = {
    toggleForm
  };
})();
