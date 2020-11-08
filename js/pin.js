'use strict';

const NUMBER_PINS = 5;

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const MAIN_PIN_SIZE = 65;
const MAIN_PIN_TAIL = 22;
const MAIN_PIN_LEFT = 570;
const MAIN_PIN_TOP = 374;

const mapPins = document.querySelector(`.map__pins`);
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinMain = document.querySelector(`.map__pin--main`);
const advertAddress = document.querySelector(`#address`);

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

  for (let i = 0; i < adverts.length && i < NUMBER_PINS; i++) {
    const newElement = createPin(adverts[i]);

    fragment.appendChild(newElement);
  }

  mapPins.appendChild(fragment);
};

const removePins = () => {
  const pins = document.querySelectorAll(`button[data-id]`);
  pins.forEach((elem) => {
    elem.remove();
  });

  return pins;
};

const getMainPinAddress = (bull) => {
  const pinX = parseInt(pinMain.style.left, 10);
  const pinY = parseInt(pinMain.style.top, 10);
  const x = Math.round(pinX + MAIN_PIN_SIZE / 2);

  const y = Math.round(
      bull ? pinY + MAIN_PIN_SIZE + MAIN_PIN_TAIL : pinY + MAIN_PIN_SIZE / 2
  );

  advertAddress.value = `${x}, ${y}`;
};

const resetMainPinAddress = () => {
  pinMain.style.left = `${MAIN_PIN_LEFT}px`;
  pinMain.style.top = `${MAIN_PIN_TOP}px`;
};

getMainPinAddress(window.main.isPageActive);

window.pin = {
  MAIN_PIN_SIZE,
  MAIN_PIN_TAIL,
  render: renderPins,
  remove: removePins,
  getMainAddress: getMainPinAddress,
  resetMainAddress: resetMainPinAddress
};
