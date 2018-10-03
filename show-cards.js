'use strict';
// отображает карточку при клике на пин и закрывает карточку
(function () {
  var activeCardId;
  var currentPin = null;
  var currentCard = null;

  var removeCard = function () {
    if (currentCard) {
      window.elements.mapSection.removeChild(currentCard);
      currentCard = null;
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onPopupEscPress);
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      activeCardId = null;
      currentPin.blur();
    }
  };

  var removeActiveCard = function () {
    removeCard();

    if (currentPin) {
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      activeCardId = null;
    }
  };

  var createCard = function (id) {
    activeCardId = id;
    currentCard = window.elements.mapSection.appendChild(window.getCardData(window.advert[id]));
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

    if (!pinButton || (activeCardId === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener('click', showCard);


})();
