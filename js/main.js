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

const SPACE = ` `;

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const features = card.querySelector(`.popup__features`);
const featuresItem = features.querySelector(`popup__feature`);

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

const createdFeature = (advert) => {
  const featureElement = document.createElement(`li`);
  featureElement.className = `popup__feature`;

  if (advert.offer.features === `wifi`) {
    featureElement.classList.add(`popup__feature--wifi`);
  } else if (advert.offer.features === `dishwasher`) {
    featureElement.classList.add(`popup__feature--dishwasher`);
  } else if (advert.offer.features === `parking`) {
    featureElement.classList.add(`popup__feature--parking`);
  } else if (advert.offer.features === `washer`) {
    featureElement.classList.add(`popup__feature--washer`);
  } else if (advert.offer.features === `elevator`) {
    featureElement.classList.add(`popup__feature--elevator`);
  } else if (advert.offer.features === `conditioner`) {
    featureElement.classList.add(`popup__feature--conditioner`);
  }

  return featureElement;
};

const renderFeature = (array) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createdFeature(array[i]));
  }

  features.appendChild(fragment);
};

const createdCard = (advert) => {
  const cardElement = card.cloneNode(true);
  const title = card.querySelector(`.popup__title`);
  const address = card.querySelector(`.popup__text--address`);
  const price = card.querySelector(`.popup__text--price`);
  const type = card.querySelector(`.popup__type`);
  const capacity = card.querySelector(`.popup__text--capacity`);
  const time = card.querySelector(`.popup__text--time`);
  const description = card.querySelector(`.popup__description`);

  title.textContent = advert.offer.title;
  address.textContent = advert.offer.address;
  price.textContent = `${advert.offer.price}₽/ночь`;
  features.textContent = advert.offer.features;
  description.textContent = advert.offer.description;

  if (advert.offer.type === `flat`) {
    type.textContent = `Квартира`;
  } else if (advert.offer.type === `bungalow`) {
    type.textContent = `Бунгало`;
  } else if (advert.offer.type === `house`) {
    type.textContent = `Дом`;
  } else if (advert.offer.type === `palace`) {
    type.textContent = `Дворец`;
  }

  if (advert.offer.rooms === 1) {
    capacity.textContent = `${advert.offer.rooms} комната для ${advert.offer.guests} гостей`;
  } else if (advert.offer.rooms >= 5) {
    capacity.textContent = `${advert.offer.rooms} комнат для ${advert.offer.guests} гостей`;
  } else {
    capacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  }

  time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;


  return cardElement;
};

const renderCard = (adverts) => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(createdCard(adverts[0]));
  mapPins.insertAdjacentHTML(`afterend`, fragment);
};

map.classList.remove(`map--faded`);
const adverts = getAdverts(ADVERT_NUMBER);
renderPins(adverts);
renderFeature(adverts);
renderCard(adverts);


// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
// Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
// Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
