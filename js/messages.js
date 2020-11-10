'use strict';

const main = document.querySelector(`main`);
const error = document.querySelector(`#error`).content.querySelector(`.error`);
const success = document.querySelector(`#success`).content.querySelector(`.success`);


const onMessageClose = (elem) => {
  const onClose = () => {
    elem.remove();
    document.removeEventListener(`click`, onCloseMessageClick);
    document.removeEventListener(`keydown`, onEscMessagePress);
  };

  const onCloseMessageClick = () => {
    onClose();
  };

  const onEscMessagePress = (evt) => {
    if (evt.key === window.util.Key.ESCAPE) {
      onClose();
    }
  };

  document.addEventListener(`click`, onCloseMessageClick);
  document.addEventListener(`keydown`, onEscMessagePress);
};

const showErrorMessage = (textError) => {
  const errorPopup = error.cloneNode(true);

  const errorMessage = errorPopup.querySelector(`.error__message`);

  errorMessage.textContent = textError;

  onMessageClose(errorPopup);
  main.insertAdjacentElement(`afterbegin`, errorPopup);
};

const showSuccessMessage = () => {
  const successPopup = success.cloneNode(true);

  main.insertAdjacentElement(`afterbegin`, successPopup);

  onMessageClose(successPopup);
};

window.messages = {
  showError: showErrorMessage,
  showSuccess: showSuccessMessage
};
