'use strict';

const ANY_VALUE = `any`;
const NUMBER_PINS = 5;

const TIME_OUT = 500;

const priceMap = {
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
    max: Infinity
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
  return housingType.value === ANY_VALUE || elem.offer.type === housingType.value;
};

const getFilterPrice = (elem) => {
  return housingPrice.value === ANY_VALUE ||
    elem.offer.price <= priceMap[housingPrice.value].max &&
    elem.offer.price >= priceMap[housingPrice.value].min;
};

const getFilterRooms = (elem) => {
  return housingRooms.value === ANY_VALUE || elem.offer.rooms === parseInt(housingRooms.value, 10);
};

const getFilterGuests = (elem) => {
  return housingGuests.value === ANY_VALUE || elem.offer.guests === parseInt(housingGuests.value, 10);
};

const getFilterFeatures = (elem) => {
  for (let i = 0; i < housingFeaturesInput.length; i++) {
    if (housingFeaturesInput[i].checked && !elem.offer.features.includes(housingFeaturesInput[i].value)) {
      return false;
    }
  }

  return true;
};

const filterData = (array) => {
  let filterAdverts = [];

  for (let i = 0; i < array.length; i++) {
    if (
      filterAdverts.length < NUMBER_PINS &&
      getFilterType(array[i]) &&
      getFilterPrice(array[i]) &&
      getFilterRooms(array[i]) &&
      getFilterGuests(array[i]) &&
      getFilterFeatures(array[i])
    ) {
      filterAdverts.push(array[i]);
    }
  }

  return filterAdverts;
};

const onFilterChange = () => {
  const filteredAdverts = filterData(window.dataWithId);

  window.card.remove();
  window.pin.remove();
  window.pin.render(filteredAdverts);
};

filter.addEventListener(`change`, window.util.debounce(onFilterChange, TIME_OUT));

window.filter = {
  getData: filterData
};
