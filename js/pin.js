'use strict';
(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const MAIN_PIN_SIZE = 65;
  const MAIN_PIN_TAIL = 22;

  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const advertAddress = window.form.advertForm.querySelector(`#address`);

  const createPin = (advert) => {
    const pinElement = pin.cloneNode(true);
    const pinImg = pinElement.querySelector(`img`);

    pinElement.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${advert.location.y - PIN_HEIGHT}px`;
    pinImg.src = advert.author.avatar;
    pinImg.alt = advert.offer.title;
    pinElement.dataset.id = advert.offer.offerId;
    return pinElement;
  };

  const renderPins = (adverts) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < adverts.length; i++) {

      const newElement = createPin(adverts[i]);
      fragment.appendChild(newElement);
    }

    window.main.mapPins.appendChild(fragment);

  };

  const getMainPinAddress = () => {
    const pinX = parseInt(window.main.pinMain.style.left, 10);
    const pinY = parseInt(window.main.pinMain.style.top, 10);

    const x = Math.round(pinX + MAIN_PIN_SIZE / 2);
    const y = Math.round(
        window.togglePage.isPageActive ? pinY + MAIN_PIN_SIZE + MAIN_PIN_TAIL : pinY + MAIN_PIN_SIZE / 2
    );
    advertAddress.value = `${x}, ${y}`;
  };


  window.main.pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.togglePage.activatePage();
    }
  });

  window.main.pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.togglePage.activatePage();
    }
  });

  window.main.mapPins.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && evt.target.closest(`button[data-id]`)) {
      window.card.openCard(evt);
    }
  });

  window.main.mapPins.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && evt.target.closest(`button[data-id]`)) {
      window.card.openCard(evt);
    }
  });

  getMainPinAddress();

  window.pin = {
    renderPins,
    getMainPinAddress
  };

})();
