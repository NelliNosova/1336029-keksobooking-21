'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;

  const statusCode = {
    OK: 200
  };

  const addIdOffer = (array) => {
    array.forEach((value, index) => {
      value.offer.offerId = index;

      return value.offer.offerId;
    });

    return array;
  };

  window.load = (onSuccessOne, onSuccessTwo, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        const data = addIdOffer(xhr.response);

        onSuccessOne(data);
        onSuccessTwo(data);
      } else {
        onError();
      }

    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
