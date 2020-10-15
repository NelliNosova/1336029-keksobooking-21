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

const NEW_PIN_SIZE = 65;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_PIN_X = 0;
const MIN_PIN_Y = 130;
const MAX_PIN_Y = 630;

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;


const map = document.querySelector(`.map`);
const filter = document.querySelector(`.map__filters-container`);
const filterForm = filter.querySelector(`.map__filters`);
const filterFormSelects = filterForm.querySelectorAll(`select`);
const filterFormFieldsets = filterForm.querySelectorAll(`fieldset`);


const mapPins = document.querySelector(`.map__pins`);
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const advertForm = document.querySelector(`.ad-form`);
const formAddress = advertForm.querySelector(`#address`);
const advertFormFieldsets = advertForm.querySelectorAll(`fieldset`);
const pinMain = document.querySelector(`.map__pin--main`);


const addDisabled = (array) => {
  for (let elem of array) {
    elem.setAttribute(`disabled`, ``);
  }
};

const removeDisabled = (array) => {
  for (let elem of array) {
    elem.removeAttribute(`disabled`);
  }
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
        features: getRandomLengthArray(FEATURES),
        description: `описательное описание`,
        photos: getRandomLengthArray(PHOTOS)
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

const createPin = (advert) => {
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
    fragment.appendChild(createPin(adverts[i]));
  }

  mapPins.appendChild(fragment);
};

const defineType = (type) => {
  switch (type) {
    case `flat`:
      type = `Квартира`;
      break;
    case `bungalow`:
      type = `Бунгало`;
      break;
    case `house`:
      type = `Дом`;
      break;
    case `palace`:
      type = `Дворец`;
  }

  return type;
};

const defineRoomsHosts = (rooms, guests) => {
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
  const {author, offer} = advert;
  const {avatar} = author;
  const {
    title,
    address,
    price,
    checkin,
    checkout,
    description,
    type,
    rooms,
    guests,
    features,
    photos
  } = offer;

  const cardElement = card.cloneNode(true);
  const titleElement = cardElement.querySelector(`.popup__title`);
  const addressElement = cardElement.querySelector(`.popup__text--address`);
  const priceElement = cardElement.querySelector(`.popup__text--price`);
  const timeElement = cardElement.querySelector(`.popup__text--time`);
  const descriptionElement = cardElement.querySelector(`.popup__description`);
  const featuresElement = cardElement.querySelector(`.popup__features`);
  const typeElement = cardElement.querySelector(`.popup__type`);
  const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
  const photosElement = cardElement.querySelector(`.popup__photos`);
  const avatarElement = cardElement.querySelector(`.popup__avatar`);

  titleElement.textContent = title;
  addressElement.textContent = address;
  priceElement.textContent = `${price}₽/ночь`;
  timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  descriptionElement.textContent = description;
  typeElement.textContent = defineType(type);
  capacityElement.textContent = defineRoomsHosts(rooms, guests);
  avatarElement.src = avatar;

  featuresElement.innerHTML = ``;
  photosElement.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--${features[i]}`;
    featuresElement.appendChild(featureElement);
  }

  for (let i = 0; i < photos.length; i++) {
    const photoElement = document.createElement(`img`);
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photoElement.classList.add(`popup__photo`);
    photoElement.src = photos[i];
    photoElement.alt = `Фото объекта`;
    photosElement.appendChild(photoElement);
  }

  return cardElement;
};

const renderCard = (advert) => {
  const newCard = createdCard(advert);
  map.insertBefore(newCard, filter);
};

const getFormActive = (evt) => {
  if (evt.which === 1) {
    map.classList.remove(`map--faded`);
    advertForm.classList.remove(`ad-form--disabled`);
    removeDisabled(advertFormFieldsets);
    removeDisabled(filterFormSelects);
    removeDisabled(filterFormFieldsets);
  }
};

const getNewAddress = () => {
  const pinAddressCoor = formAddress.getBoundingClientRect();
  const newAddressCoorX = Math.round(pinAddressCoor.x - NEW_PIN_SIZE / 2);
  const newAddressCoorY = Math.round(pinAddressCoor.y - NEW_PIN_SIZE);
  formAddress.value = `${newAddressCoorX}, ${newAddressCoorY}`;
};

pinMain.addEventListener(`mousedown`, (evt) => {
  getFormActive(evt);
  getNewAddress();
});

const adverts = getAdverts(ADVERT_NUMBER);
getNewAddress();
addDisabled(advertFormFieldsets);
addDisabled(filterFormSelects);
addDisabled(filterFormFieldsets);
renderPins(adverts);

// renderCard(adverts[0]);
