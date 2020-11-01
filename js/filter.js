'use strict';
(() => {
  const filter = document.querySelector(`.map__filters-container`);
  const housingType = filter.querySelector(`#housing-type`);

  const getFilterType = (adverts) => {
    let filterAdverts = window.dataWithId;

    if (housingType.value !== `any`) {
      filterAdverts = adverts.filter((elem) => {
        return elem.offer.type === housingType.value;
      });
    }

    return filterAdverts;
  };


  housingType.addEventListener(`change`, () => {
    const pins = document.querySelectorAll(`button[data-id]`);
    const card = document.querySelector(`.map__card`);

    if (card) {
      card.remove();
    }

    window.util.removeAllElemArray(pins);
    window.pin.renderPins(getFilterType(window.dataWithId));
  });

})();
