'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);

  window.main = {
    map,
    mapPins,
    pinMain
  };
})();
