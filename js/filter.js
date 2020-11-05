'use strict';

(() => {
  const ANY_VALUE = `any`;
  const HIGH_PRICE = `high`;
  const NUMBER_PINS = 5;

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
      housingType.value === ANY_VALUE
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterPrice = (elem) => {
    if (
      housingPrice.value !== ANY_VALUE &&
      housingPrice.value !== HIGH_PRICE &&
      elem.offer.price <= PRICE_MAP[housingPrice.value].max &&
      elem.offer.price >= PRICE_MAP[housingPrice.value].min || housingPrice.value === ANY_VALUE
    ) {
      return true;
    } else if (
      housingPrice.value !== ANY_VALUE &&
      housingPrice.value === HIGH_PRICE &&
      elem.offer.price >= PRICE_MAP[housingPrice.value].min
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getFilterRooms = (elem) => {
    if (
      housingRooms.value !== ANY_VALUE &&
      elem.offer.rooms === parseInt(housingRooms.value, 10) ||
      housingRooms.value === ANY_VALUE
    ) {
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

  const getFilterFeatures = (array) => {
    housingFeaturesInput.forEach((elem) => {
      if (elem.checked) {
        const checkedElementFeature = elem.value;
        array = array.filter((elemFeaturesOffer) => {
          return elemFeaturesOffer.offer.features.includes(checkedElementFeature);
        });
      }
    });

    return array;
  };

  const filterData = (array) => {
    let advertsFeaturesFilter = getFilterFeatures(array);
    let filterAdverts = [];

    for (let i = 0; i < advertsFeaturesFilter.length; i++) {
      if (
        filterAdverts.length < NUMBER_PINS &&
        getFilterType(advertsFeaturesFilter[i]) &&
        getFilterPrice(advertsFeaturesFilter[i]) &&
        getFilterRooms(advertsFeaturesFilter[i]) &&
        getFilterGuests(advertsFeaturesFilter[i])
      ) {
        filterAdverts.push(advertsFeaturesFilter[i]);
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
