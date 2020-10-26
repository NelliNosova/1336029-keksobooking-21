'use strict';
(() => {
  let isPageActive = false;

  const activatePage = () => {
    if (!isPageActive) {
      isPageActive = true;
      window.main.map.classList.remove(`map--faded`);
      window.form.advertForm.classList.remove(`ad-form--disabled`);
      window.util.toggleFormElememtsState(window.form.formFieldsets, false);
      window.util.toggleFormElememtsState(window.form.formSelects, false);
      window.pin.renderPins(window.adverts.adverts);
      window.pin.getMainPinAddress();
    }

  };

  const deactivatePage = () => {
    isPageActive = false;
    window.main.map.classList.add(`map--faded`);
    window.form.advertForm.classList.add(`ad-form--disabled`);
    window.util.toggleFormElememtsState(window.form.formFieldsets, true);
    window.util.toggleFormElememtsState(window.form.formSelects, true);

  };

  window.togglePage = {
    isPageActive,
    activatePage,
    deactivatePage
  };
})();
