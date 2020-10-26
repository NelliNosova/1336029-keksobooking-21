'use strict';
(() => {
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;

  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filter = document.querySelector(`.map__filters-container`);

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
    typeElement.textContent = defineType(type.type);
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
    const openedCard = window.main.map.querySelector(`.popup`);

    if (openedCard) {
      openedCard.remove();
    }

    const newCard = createdCard(advert);
    window.main.map.insertBefore(newCard, filter);
    closeCard();
  };

  const openCard = (evt) => {
    const buttonId = evt.target.closest(`button[data-id]`).dataset.id;
    const currentOffer = window.adverts.adverts.find((advert) => {
      return advert.offer.offerId === buttonId;
    });

    window.card.renderCard(currentOffer);
  };

  const closeCard = () => {
    const openedCard = window.main.map.querySelector(`.popup`);
    const closeCardButton = openedCard.querySelector(`.popup__close`);

    const pressEscToCloseCard = (evt) => {
      if (evt.key === `Escape`) {
        removeCard();
      }
    };

    const removeCard = () => {
      openedCard.remove();
      document.removeEventListener(`keydown`, pressEscToCloseCard);
    };

    closeCardButton.addEventListener(`mousedown`, () => {
      removeCard();
    });

    closeCardButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        removeCard();
      }
    });

    document.addEventListener(`keydown`, pressEscToCloseCard);
  };

  window.card = {
    renderCard,
    openCard,
    closeCard
  };
})();
