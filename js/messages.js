'use strict';

const main = document.querySelector(`main`);
const error = document.querySelector(`#error`).content.querySelector(`.error`);
const success = document.querySelector(`#success`).content.querySelector(`.success`);

const onMessageClose = (elem) => {
  const onCloseMessageClick = () => {
    elem.remove();
  };

  const onEscMessagePress = (evt) => {
    if (evt.key === window.main.Key.ESCAPE) {
      elem.remove();
    }
  };

  document.addEventListener(`click`, onCloseMessageClick);
  document.addEventListener(`keydown`, onEscMessagePress);

  if (!elem) {
    document.removeEventListener(`click`, onCloseMessageClick);
    document.removeEventListener(`keydown`, onEscMessagePress);
  }
};

const showErrorMassage = (textError) => {
  const errorPopup = error.cloneNode(true);

  const errorMessage = errorPopup.querySelector(`.error__message`);

  errorMessage.textContent = textError;

  onMessageClose(errorPopup);
  main.insertAdjacentElement(`afterbegin`, errorPopup);
};

const showSuccessMassage = () => {
  const successPopup = success.cloneNode(true);

  main.insertAdjacentElement(`afterbegin`, successPopup);

  onMessageClose(successPopup);
};

window.messages = {
  showError: showErrorMassage,
  showSuccess: showSuccessMassage
};
