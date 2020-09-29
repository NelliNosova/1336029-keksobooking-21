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

let map = document.querySelector('.map');
let mapPins = document.querySelector('.map__pins');
let pin = document.querySelector('#pin').content.querySelector('.map__pin');
let pinImg = pin.querySelector('img');
let pinLists = document.querySelector('.map--faded');

let mapPinsWidth = mapPins.offsetWidth;
let pinWidth = 40;


map.classList.remove('map--faded');

const getShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let imageIndex = [];
let randomIndex = (number) => {
  for (let i = 1; i <= number; i++) {
    imageIndex.push(i);
  }
};

randomIndex(8);

let shuffleImageIndex = getShuffle(imageIndex);

let getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let getRandomIndex = (array) => {
  return getRandomNumber(0, array.length);
};

let getFeatures = () => {
  let featuresArray = [];
  let shuffleFeatures = getShuffle(FEATURES);

  for (let featuresI = 0; featuresI <= getRandomIndex(getRandomIndex); featuresI++) {
    let feature = shuffleFeatures[featuresI];
    featuresArray.push(feature);
  }
  return featuresArray;

};

let featuresItem = getFeatures();

let getPhotos = () => {
  let photosArray = [];
  let shufflePhotos = getShuffle(PHOTOS);

  for (let photosI = 0; photosI <= getRandomIndex(getRandomIndex); photosI++) {
    let photo = shufflePhotos[photosI];
    photosArray.push(photo);
  }
  return photosArray;

};

let photosItem = getPhotos();

let pinX = () => getRandomNumber(0 + pinWidth, mapPinsWidth - pinWidth);
let pinY = () => getRandomNumber(130 + pinWidth, 631 - pinWidth);

const advtes = [];

let getAdvtes = (number) => {
  for (let i = 0; i < number; i++) {
    const advt = {
      'author': {
        'avatar': `img/avatars/user0${shuffleImageIndex[i]}.png`,
    },
    'offer': {
        'title': `Заголовок, тут, будет, наверное`,
        'address': '600, 350',
        'price': Math.round(Math.random() * 10000),
        'type': getRandomIndex(TYPE_HOUSE),
        'rooms': getRandomNumber(1, 8),
        'guests': getRandomNumber(1, 20),
        'checkin': getRandomIndex(CHECKIN),
        'checkout': getRandomIndex(CHECKOUT),
        'features': featuresItem,
        'description': `описательное описание`,
        'photos': photosItem
    },
    'location': {
        'x': pinX,
        'y': pinY
    }
    };
    advtes.push(advt);
  }
  return advtes;
};
getAdvtes(8);


let renderPin = () => {
  let pinElement = pin.cloneNode(true);

  for (let i = 0; i < 8; i++) {
    getAdvtes();
    pin.style.left =`${getRandomNumber(0 + pinWidth, mapPinsWidth - pinWidth)}px`;
    pin.style.top = `${getRandomNumber(130 + pinWidth, 631 - pinWidth)}px`;
    pinImg.src = advtes[i].author.avatar;
    pinImg.alt = advtes[i].offer.title;
    console.log(advtes[i].author.avatar);
  }
  return pinElement;
};

renderPin(8);


let getPin = (number) => {
  let pinFragment = document.createDocumentFragment();
    for (let i = 0; i < number; i++) {
      pinFragment.appendChild(renderPin(advtes[i].location));
    }
    mapPins.appendChild(pinFragment);

};

const pins = getPin(8);
console.log(pins);
