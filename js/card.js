'use strict';
(() => {
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;

  const map = document.querySelector(`.map`);
  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filter = document.querySelector(`.map__filters-container`);
  let currentCard = null;

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

  const defineEnding = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
    txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

  const defineRoomsHosts = (rooms, guests) => {
    let stringRoomsHosts = ``;
    stringRoomsHosts =
      `${rooms} ${defineEnding(rooms, [`комната`, `комнаты`, `комнат`])}
      для ${guests} ${defineEnding(guests, [`гостя`, `гостей`, `гостей`])}`;

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

    currentCard = cardElement;
    return cardElement;
  };

  const onPressEscCard = (evt) => {
    if (evt.key === `Escape`) {
      closeCard();
    }
  };

  const renderCard = (advert) => {

    if (currentCard) {
      currentCard.remove();
    }

    document.addEventListener(`keydown`, onPressEscCard);

    const newCard = createdCard(advert);
    map.insertBefore(newCard, filter);

    const closeCardButton = map.querySelector(`.popup__close`);

    closeCardButton.addEventListener(`mousedown`, () => {
      closeCard();
    });

    closeCardButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        closeCard();
      }
    });

  };

  const openCard = (evt) => {
    const buttonId = evt.target.closest(`button[data-id]`).dataset.id;

    const currentOffer = window.adverts.data.find((advert) => {
      return advert.offer.offerId === buttonId;
    });

    window.card.renderCard(currentOffer);
  };

  const closeCard = () => {
    if (currentCard) {
      currentCard.remove();
      document.removeEventListener(`keydown`, onPressEscCard);
    }
  };

  window.card = {
    renderCard,
    openCard,
    closeCard
  };
})();
