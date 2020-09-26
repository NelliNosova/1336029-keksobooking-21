'use strict';
const getShuffle = (array) => {
  for (let ShufI = array.length - 1; ShufI > 0; ShufI--) {
    let ShufJ = Math.floor(Math.random() * (ShufI + 1));
    [array[ShufI], array[ShufJ]] = [array[ShufJ], array[ShufI]];
  }
  return array;
};


let imageIndex = [];
for (let imgI = 1; imgI <= 8; imgI++) {
  imageIndex.push(imgI);
}

let shuffleImageIndex = getShuffle(imageIndex);

let getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let getRandomIndex = (array) => {
  return getRandomNumber(0, array.length);
};

const TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalow'];


const CHECKIN = ['12:00', '13:00', '14:00'];

const CHECKOUT = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

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


const ADVTS = [];
for (var i = 0; i < 8; i++) {
  const ADVT = {
    'author': {
      'avatar': `img/avatars/user0${shuffleImageIndex[0]}.png`,
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
      'x': getRandomNumber(130, 631), /* случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. */
      'y': getRandomNumber(130, 631)
  }
  };

  ADVTS.push(ADVT);
}

console.log(ADVTS)
