'use strict';
(() => {
  const TYPE_HOUSE = [
    {
      type: `palace`,
      minPrice: `10000`
    },
    {
      type: `flat`,
      minPrice: `1000`
    },
    {
      type: `house`,
      minPrice: `5000`
    },
    {
      type: `bungalow`,
      minPrice: `0`
    }
  ];

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

  const MIN_PIN_X = 0;
  const MIN_PIN_Y = 130;
  const MAX_PIN_Y = 630;

  const mapPins = document.querySelector(`.map__pins`);

  const getAdverts = (number) => {
    const adverts = [];
    const getPinX = () => window.util.getRandomNumber(MIN_PIN_X, mapPins.offsetWidth);
    const getPinY = () => window.util.getRandomNumber(MIN_PIN_Y, MAX_PIN_Y);

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
          type: window.util.getRandomIndex(TYPE_HOUSE),
          rooms: window.util.getRandomNumber(MIN_PHYS_OBJ, ADVERT_NUMBER),
          guests: window.util.getRandomNumber(MIN_PHYS_OBJ, MAX_GUESTS),
          checkin: window.util.getRandomIndex(CHECKIN),
          checkout: window.util.getRandomIndex(CHECKOUT),
          features: window.util.getRandomLengthArray(FEATURES),
          description: `описательное описание`,
          photos: window.util.getRandomLengthArray(PHOTOS),
          offerId: `a${i - 1}`
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

  const adverts = getAdverts(ADVERT_NUMBER);

  window.adverts = {
    MIN_PIN_X,
    MIN_PIN_Y,
    MAX_PIN_Y,
    TYPE_HOUSE,
    data: adverts
  };

})();
