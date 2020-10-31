'use strict';
(() => {
  const error = document.querySelector(`#error`).content.querySelector(`.error`);

  const onError = (textError) => {
    const errorPopup = error.cloneNode(true);

    const errorMessage = errorPopup.querySelector(`.error__message`);

    errorMessage.textContent = textError;

    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  window.massages = {
    onError
  };
})();
