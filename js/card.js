'use strict';

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const ROOMS_ENDING = [`комната`, `комнаты`, `комнат`];
const GUESTS_ENDING = [`гостя`, `гостей`, `гостей`];

const typeMap = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const map = document.querySelector(`.map`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filter = document.querySelector(`.map__filters-container`);

let currentCard = null;

const defineRoomsHosts = (rooms, guests) => {
  let stringRoomsHosts = ``;
  stringRoomsHosts =
    `${rooms} ${window.util.defineEnding(rooms, ROOMS_ENDING)}
    для ${guests} ${window.util.defineEnding(guests, GUESTS_ENDING)}`;

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

  if (offer) {
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
    typeElement.textContent = typeMap[type];
    capacityElement.textContent = defineRoomsHosts(rooms, guests);
    avatarElement.src = avatar;

    featuresElement.innerHTML = ``;
    photosElement.innerHTML = ``;

    features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.className = `popup__feature popup__feature--${feature}`;
      featuresElement.appendChild(featureElement);
    });

    photos.forEach((photo) => {
      const photoElement = document.createElement(`img`);
      photoElement.width = PHOTO_WIDTH;
      photoElement.height = PHOTO_HEIGHT;
      photoElement.classList.add(`popup__photo`);
      photoElement.src = photo;
      photoElement.alt = `Фото объекта`;
      photosElement.appendChild(photoElement);
    });

    window.util.getEmptyElem(title, titleElement);
    window.util.getEmptyElem(address, addressElement);
    window.util.getEmptyElem(price, priceElement);
    window.util.getEmptyElem(checkin, timeElement);
    window.util.getEmptyElem(checkout, timeElement);
    window.util.getEmptyElem(description, typeElement);
    window.util.getEmptyElem(avatar, avatarElement);
    window.util.getEmptyParent(featuresElement);
    window.util.getEmptyParent(photosElement);

    currentCard = cardElement;
  } else {
    cardElement.remove();
  }

  return cardElement;
};

const onEscCardPress = (evt) => {
  if (evt.key === window.util.Key.ESCAPE) {
    closeCard();
  }
};

const renderCard = (advert) => {
  if (currentCard) {
    currentCard.remove();
  }

  document.addEventListener(`keydown`, onEscCardPress);

  const newCard = createdCard(advert);
  map.insertBefore(newCard, filter);

  const closeCardButton = map.querySelector(`.popup__close`);

  closeCardButton.addEventListener(`mousedown`, () => {
    closeCard();
  });

  closeCardButton.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.util.Key.ENTER) {
      closeCard();
    }
  });
};


const removeCard = () => {
  const openedCard = document.querySelector(`.map__card`);

  if (openedCard) {
    openedCard.remove();
  }
};

const openCard = (evt) => {
  const currentPin = evt.target.closest(`button[data-id]`);
  const activePin = map.querySelector(`.map__pin--active`);
  const buttonId = parseInt(currentPin.dataset.id, 10);

  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }

  currentPin.classList.add(`map__pin--active`);

  const currentOffer = window.dataWithId.find((advert) => {
    return advert.offer.offerId === buttonId;
  });

  renderCard(currentOffer);
};

const closeCard = () => {
  const activePin = map.querySelector(`.map__pin--active`);

  if (currentCard) {
    activePin.classList.remove(`map__pin--active`);
    currentCard.remove();
    document.removeEventListener(`keydown`, onEscCardPress);
  }
};

window.card = {
  open: openCard,
  remove: removeCard
};
