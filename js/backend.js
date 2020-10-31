'use strict';
(() => {
  const API_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;

  const statusCode = {
    OK: 200
  };

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, `${API_URL}/data`);
    xhr.send();
  };

  window.backend = {
    load
  };
})();
