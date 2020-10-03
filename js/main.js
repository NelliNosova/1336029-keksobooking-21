'use strict';
const TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN = ['12:00', '13:00', '14:00'];

const CHECKOUT = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const ADVER_NUMBER = 8;
const ROUND_PRICE = 10000;
const MIN_PHYS_OBJ = 1;
const MAX_GUESTS = 20;

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_PIN_X = 0;
const MIN_PIN_Y = 130;
const MAX_PIN_Y = 630;

const map = document.querySelector('.map');
const mapPins = document.querySelector('.map__pins');

const getShuffle = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomIndex = (array) => {
  let arrayIndex = getRandomNumber(0, (array.length - 1));
  return array[arrayIndex];
};

const randomLengthArray = (array) => {
  let newArray = [];
  let shuffledArray = getShuffle(array);
  let randomLength = getRandomNumber(0, array.length);

  for(let i = 0; i < randomLength; i++) {
    let newObj = shuffledArray[i];
    newArray.push(newObj);
  }
  return newArray;
};

const getAdverts = (number) => {
  const adverts = [];
  const getPinX = () => getRandomNumber(MIN_PIN_X, mapPins.offsetWidth);
  const getPinY = () => getRandomNumber(MIN_PIN_Y, MAX_PIN_Y);

  for (let i = 1; i <= number; i++) {
    const pinX = getPinX();
    const pinY = getPinY();
    const advert = {
      author: {
        avatar: `img/avatars/user0${i}.png`,
    },
    offer: {
        title: `Заголовок, тут, будет, наверное`,
        address: `${pinX}, ${pinY}`,
        price: Math.round(Math.random() * ROUND_PRICE),
        type: getRandomIndex(TYPE_HOUSE),
        rooms: getRandomNumber(MIN_PHYS_OBJ, ADVER_NUMBER),
        guests: getRandomNumber(MIN_PHYS_OBJ, MAX_GUESTS),
        checkin: getRandomIndex(CHECKIN),
        checkout: getRandomIndex(CHECKOUT),
        features: randomLengthArray(FEATURES),
        description: `описательное описание`,
        photos: randomLengthArray(PHOTOS)
    },
    location: {
        x: pinX,
        y: pinY
    }
    };
    adverts.push(advert);
  }

  return adverts;
};

const craetedPin = (advert) => {
  const pin = document.querySelector('#pin').content.querySelector('.map__pin');
  const pinElement = pin.cloneNode(true);
  const pinImg = pinElement.querySelector('img');

  pinElement.style.left = `${advert.location.x - PIN_WIDTH/2}px`;
  pinElement.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pinElement;
};

const renderPins = (adverts) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    fragment.appendChild(craetedPin(adverts[i]));
  }
  mapPins.appendChild(fragment);

};

map.classList.remove('map--faded');
const adverts = getAdverts(ADVER_NUMBER);
renderPins(adverts);
