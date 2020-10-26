'use strict';
(() => {
  const MAX_PRICE = 1000000;

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const advertForm = document.querySelector(`.ad-form`);
  const advertRoomNumber = advertForm.querySelector(`#room_number`);
  const advertCapacityNumber = advertForm.querySelector(`#capacity`);
  const advertTitle = advertForm.querySelector(`#title`);
  const advertPrice = advertForm.querySelector(`#price`);
  const advertTimein = advertForm.querySelector(`#timein`);
  const advertTimeout = advertForm.querySelector(`#timeout`);

  const formSelects = document.querySelectorAll(`select`);
  const formFieldsets = document.querySelectorAll(`fieldset`);

  const disabledingRoom = () => {
    const roomArray = Array.from(advertCapacityNumber);
    const lastElemRoom = roomArray[roomArray.length - 1];
    const reversRoomArray = roomArray.reverse().slice(1);

    reversRoomArray.push(lastElemRoom);
    window.util.toggleFormElememtsState(reversRoomArray, false);
    const passRoomArray = reversRoomArray.slice(advertRoomNumber.value);
    window.util.toggleFormElememtsState(passRoomArray, true);

    if (advertRoomNumber.value === `100`) {
      window.util.toggleFormElememtsState(reversRoomArray.slice(0, reversRoomArray.length - 1), true);
    }
  };

  advertForm.addEventListener(`input`, (evt) => {
    const valueLength = evt.target.value.length;
    if (evt.target === advertTitle && valueLength < MIN_TITLE_LENGTH) {
      evt.target.setCustomValidity(`Ещё  ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
    } else if (evt.target === advertTitle && valueLength > MAX_TITLE_LENGTH) {
      evt.target.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
    } else if (evt.target === advertPrice && advertPrice.value > MAX_PRICE) {
      evt.target.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}`);
    } else if (evt.target === advertTimein) {
      advertTimeout.value = advertTimein.value;
    } else if (evt.target === advertTimeout) {
      advertTimein.value = advertTimeout.value;
    } else if (evt.target === advertRoomNumber) {
      disabledingRoom();
    } else {
      evt.target.setCustomValidity(``);
    }


    for (let i = 0; i < window.adverts.TYPE_HOUSE.length; i++) {
      if (evt.target.value === window.adverts.TYPE_HOUSE[i].type) {
        advertPrice.placeholder = window.adverts.TYPE_HOUSE[i].minPrice;
      }
      if (
        evt.target.value === window.adverts.TYPE_HOUSE[i].type &&
        advertPrice.value < window.adverts.TYPE_HOUSE[i].minPrice
      ) {
        advertPrice.min = window.adverts.TYPE_HOUSE[i].minPrice;
        advertPrice.setCustomValidity(`Минимальная цена для выбранного типа ${window.adverts.TYPE_HOUSE[i].minPrice}`);
      }
    }
  });

  disabledingRoom();

  window.util.toggleFormElememtsState(formFieldsets, true);
  window.util.toggleFormElememtsState(formSelects, true);

  window.form = {
    advertForm,
    formSelects,
    formFieldsets
  };
})();
