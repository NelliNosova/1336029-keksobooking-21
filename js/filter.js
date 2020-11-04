'use strict';

(() => {
  const ANY_VALUE = `any`;
  const HIGH_PRICE = `high`;

  const PRICE_MAP = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: 1000000
    }
  };

  const filter = document.querySelector(`.map__filters-container`);
  const housingType = filter.querySelector(`#housing-type`);
  const housingPrice = filter.querySelector(`#housing-price`);
  const housingRooms = filter.querySelector(`#housing-rooms`);
  const housingGuests = filter.querySelector(`#housing-guests`);
  const housingFeatures = filter.querySelector(`#housing-features`);
  const housingFeaturesInput = housingFeatures.querySelectorAll(`input[name="features"]`);

  const getFilterType = (elem) => {
    if (
      housingType.value !== ANY_VALUE &&
      elem.offer.type === housingType.value ||
      housingType.value === ANY_VALUE) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterPrice = (elem) => {
    if (
      housingPrice.value !== ANY_VALUE &&
      elem.offer.price <= PRICE_MAP[housingPrice.value].max &&
      elem.offer.price >= PRICE_MAP[housingPrice.value].min || housingPrice.value === ANY_VALUE
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterRooms = (elem) => {
    if (housingRooms.value !== ANY_VALUE && elem.offer.rooms === parseInt(housingRooms.value, 10)) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterGuests = (elem) => {
    if (
      housingGuests.value !== ANY_VALUE && elem.offer.guests === parseInt(housingGuests.value, 10) ||
      housingGuests.value === ANY_VALUE
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterFeatures = (elem) => {
    const housingFeaturesArray = Array.from(housingFeaturesInput);
    const housingFeaturesChecked = [];

    for (let i = 0; i < housingFeaturesInput.length; i++) {
      if (housingFeaturesArray[i].checked) {
        housingFeaturesChecked.push(housingFeaturesArray[i].value);
      }
    }

    for (let j = 0; j < housingFeaturesChecked.length; j++) {
      if (
        housingFeaturesChecked.length !== 0 &&
        elem.offer.features.includes(housingFeaturesChecked[j])
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const filterData = (array) => {
    let filterAdverts = [];

    for (let i = 0; i < array.length; i++) {
      if (
        getFilterType(array[i]) &&
        getFilterPrice(array[i]) &&
        getFilterRooms(array[i]) &&
        getFilterGuests(array[i])
      ) {
        filterAdverts.push(array[i]);
      }
    }

    return filterAdverts;
  };

  const onFilterChange = () => {
    const filteredAdverts = filterData(window.dataWithId);

    window.card.removeCard();
    window.pin.removePins();
    window.pin.renderPins(filteredAdverts);
  };

  housingType.addEventListener(`change`, onFilterChange);
  housingPrice.addEventListener(`change`, onFilterChange);
  housingRooms.addEventListener(`change`, onFilterChange);
  housingGuests.addEventListener(`change`, onFilterChange);
  housingFeatures.addEventListener(`change`, onFilterChange);
})();
