'use strict';
(() => {
  const main = document.querySelector(`main`);
  const error = document.querySelector(`#error`).content.querySelector(`.error`);
  const success = document.querySelector(`#success`).content.querySelector(`.success`);

  const onError = (textError) => {
    const errorPopup = error.cloneNode(true);

    const errorMessage = errorPopup.querySelector(`.error__message`);
    const errorButton = errorPopup.querySelector(`.error__button`);

    errorMessage.textContent = textError;

    errorButton.addEventListener(`click`, () =>{
      errorPopup.remove();
    });

    main.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  const onSuccess = () => {
    const successPopup = success.cloneNode(true);

    main.insertAdjacentElement(`afterbegin`, successPopup);

    document.addEventListener(`click`, () => {
      successPopup.remove();
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        successPopup.remove();
      }
    });
  };

  window.massages = {
    onError,
    onSuccess
  };
})();
