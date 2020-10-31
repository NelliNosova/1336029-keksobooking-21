'use strict';
(() => {
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

  const toggleFormElementsState = (nodes, state) => {
    for (let elem of nodes) {
      elem.disabled = state;
    }
  };

  const addIdToOffer = (array) => {
    array.forEach((value, index) => {
      value.offer.offerId = index;

      return value.offer.offerId;
    });

    return array;
  };

  const removeAllElemArray = (array) => {
    array.forEach((elem) => {
      elem.remove();
    });

    return array;
  };

  window.util = {
    getShuffle,
    getRandomNumber,
    getRandomIndex,
    getRandomLengthArray,
    toggleFormElementsState,
    addIdToOffer,
    removeAllElemArray
  };

})();
