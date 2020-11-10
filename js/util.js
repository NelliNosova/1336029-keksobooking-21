'use strict';
const Key = {
  ENTER: `Enter`,
  ESCAPE: `Escape`
};

const getShuffle = (array) => {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomIndex = (array) => {
  const arrayIndex = getRandomNumber(0, (array.length - 1));

  return array[arrayIndex];
};

const getRandomLengthArray = (array) => {
  const newArray = [];
  const shuffledArray = getShuffle(array);
  const randomLength = getRandomNumber(0, array.length);

  for (let i = 0; i < randomLength; i++) {
    const newObj = shuffledArray[i];
    newArray.push(newObj);
  }

  return newArray;
};

const getEmptyParent = (elem) => {
  if (!elem.hasChildNodes()) {
    elem.style.display = `none`;
  }
};

const getEmptyElem = (elemContent, elem) => {
  const array = Array.from(elemContent);
  if (array.length === 0) {
    elem.style.display = `none`;
  }
};

const defineEnding = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
  txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

const toggleFormElementsState = (nodes, state) => {
  for (let elem of nodes) {
    elem.disabled = state;
  }
};

const toggleFormElementsChecked = (nodes) => {
  for (let elem of nodes) {
    elem.checked = false;
  }
};

const checkRemove = (elem) => {
  if (elem) {
    elem.remove();
  }
};

const addIdToOffer = (array) => {
  array.forEach((value, index) => {
    value.offer.offerId = index;

    return value.offer.offerId;
  });

  return array;
};

const debounce = (cb, time) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, time);
  };
};

window.util = {
  Key,
  getShuffle,
  getRandomNumber,
  getRandomIndex,
  getRandomLengthArray,
  getEmptyParent,
  getEmptyElem,
  defineEnding,
  toggleFormElementsState,
  toggleFormElementsChecked,
  checkRemove,
  addIdToOffer,
  debounce
};
