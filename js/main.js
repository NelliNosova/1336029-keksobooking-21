'use strict';

const TYPE_HOUSE = [`palace`, `flat`, `house`, `bungalow`];

const CHECKIN = [`12:00`, `13:00`, `14:00`];

const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const ADVERT_NUMBER = 8;
const ROUND_PRICE = 10000;
const MIN_PHYS_OBJ = 1;
const MAX_GUESTS = 20;

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_PIN_X = 0;
const MIN_PIN_Y = 130;
const MAX_PIN_Y = 630;

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;


const map = document.querySelector(`.map`);
const filter = document.querySelector(`.map__filters-container`);
const mapPins = document.querySelector(`.map__pins`);
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);


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

const randomLengthArray = (array) => {
  const newArray = [];
  const shuffledArray = getShuffle(array);
  const randomLength = getRandomNumber(0, array.length);

  for (let i = 0; i < randomLength; i++) {
    const newObj = shuffledArray[i];
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
        rooms: getRandomNumber(MIN_PHYS_OBJ, ADVERT_NUMBER),
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

const createdPin = (advert) => {
  const pinElement = pin.cloneNode(true);
  const pinImg = pinElement.querySelector(`img`);

  pinElement.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pinElement;
};

const renderPins = (adverts) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    fragment.appendChild(createdPin(adverts[i]));
  }

  mapPins.appendChild(fragment);
};

const renderType = (type) => {
  if (type === `flat`) {
    type = `Квартира`;
  } else if (type === `bungalow`) {
    type = `Бунгало`;
  } else if (type === `house`) {
    type = `Дом`;
  } else if (type === `palace`) {
    type = `Дворец`;
  }

  return type;
};

const renderRoomsHosts = (rooms, guests) => {
  let stringRoomsHosts = ``;

  if (rooms === 1) {
    stringRoomsHosts = `${rooms} комната для ${guests} гостей`;
  } else if (rooms >= 5) {
    stringRoomsHosts = `${rooms} комнат для ${guests} гостей`;
  } else {
    stringRoomsHosts = `${rooms} комнаты для ${guests} гостей`;
  }

  return stringRoomsHosts;
};


const createdCard = (advert) => {
  const cardElement = card.cloneNode(true);
  const title = cardElement.querySelector(`.popup__title`);
  const address = cardElement.querySelector(`.popup__text--address`);
  const price = cardElement.querySelector(`.popup__text--price`);
  const time = cardElement.querySelector(`.popup__text--time`);
  const description = cardElement.querySelector(`.popup__description`);
  const features = cardElement.querySelector(`.popup__features`);
  const type = cardElement.querySelector(`.popup__type`);
  const capacity = cardElement.querySelector(`.popup__text--capacity`);
  const photos = cardElement.querySelector(`.popup__photos`);
  const avatar = cardElement.querySelector(`.popup__avatar`);

  title.textContent = advert.offer.title;
  address.textContent = advert.offer.address;
  price.textContent = `${advert.offer.price}₽/ночь`;
  time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  description.textContent = advert.offer.description;
  type.textContent = renderType(advert.offer.type);
  capacity.textContent = renderRoomsHosts(advert.offer.rooms, advert.offer.guests);
  avatar.src = advert.author.avatar;

  features.innerHTML = ``;
  photos.innerHTML = ``;

  for (let i = 0; i < advert.offer.features.length; i++) {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature`;
    featureElement.classList.add(`popup__feature--${advert.offer.features[i]}`);
    features.appendChild(featureElement);
  }

  for (let i = 0; i < advert.offer.photos.length; i++) {
    const photoElement = document.createElement(`img`);
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photos.style.display = `flex`;
    photos.style.justifyContent = `space-around`;
    photoElement.src = advert.offer.photos[i];
    photoElement.alt = `Фото объекта`;
    photos.appendChild(photoElement);
  }

  return cardElement;
};

const renderCard = (advert) => {
  const newCard = createdCard(advert);
  map.insertBefore(newCard, filter);
};

map.classList.remove(`map--faded`);
const adverts = getAdverts(ADVERT_NUMBER);
renderPins(adverts);
renderCard(adverts[0]);
