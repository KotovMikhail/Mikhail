'use strict';
// отображает карточку при клике на пин и закрывает карточку
(function () {
  window.activeCardId;
  window.currentPin = null;
  window.currentCard = null;

  var removeCard = function () {
    if (window.currentCard) {
      window.elements.mapSection.removeChild(window.currentCard);

      window.currentCard = null;
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onPopupEscPress);
      window.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.activeCardId = null;
      window.currentPin.blur();
    }
  };

  var removeActiveCard = function () {
    removeCard();

    if (window.currentPin) {
      window.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.activeCardId = null;
    }
  };

  var createCard = function (id) {
    window.activeCardId = id;
    window.currentCard = window.elements.mapSection.appendChild(window.getCardData(window.advert[id]));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var showCard = function (evt) {
    var target = evt.target;
    var pinButton = target.closest('.map__pin:not(.map__pin--main)');
    var buttonClose = target.className === 'popup__close';

    if (buttonClose) {
      removeActiveCard();
      document.removeEventListener('keydown', onPopupEscPress);
    }

    if (!pinButton || (window.activeCardId === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    window.currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener('click', showCard);


})();
