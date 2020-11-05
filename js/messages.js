'use strict';
(() => {
  const main = document.querySelector(`main`);
  const error = document.querySelector(`#error`).content.querySelector(`.error`);
  const success = document.querySelector(`#success`).content.querySelector(`.success`);

  const onCloseMessage = (elem) => {
    const onClickToCloseMessage = () => {
      elem.remove();
    };

    const onPressEscMessage = (evt) => {
      if (evt.key === `Escape`) {
        elem.remove();
      }
    };

    document.addEventListener(`click`, onClickToCloseMessage);
    document.addEventListener(`keydown`, onPressEscMessage);

    if (!elem) {
      document.removeEventListener(`click`, onClickToCloseMessage);
      document.removeEventListener(`keydown`, onPressEscMessage);
    }
  };

  const showErrorMassage = (textError) => {
    const errorPopup = error.cloneNode(true);

    const errorMessage = errorPopup.querySelector(`.error__message`);

    errorMessage.textContent = textError;

    onCloseMessage(errorPopup);
    main.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  const showSuccessMassage = () => {
    const successPopup = success.cloneNode(true);

    main.insertAdjacentElement(`afterbegin`, successPopup);

    onCloseMessage(successPopup);
  };

  window.messages = {
    showErrorMassage,
    showSuccessMassage
  };
})();
