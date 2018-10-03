'use strict';
(function () {
  window.widthMap = window.elements.mapPinList.offsetWidth;
  var inputAddress = window.elements.mapForm.querySelector('#address');
  var errorPopup = window.elements.errorTemplate.cloneNode(true);
  var errorButton = errorPopup.querySelector('.error__button');

  window.elements.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftPin = window.constants.PIN_WIDTH / 2 + window.elements.mainPin.offsetLeft;
      var topPin = window.constants.PIN_HEIGHT + window.constants.PIN_ARROW_HEIGHT + window.elements.mainPin.offsetTop;

      if (window.elements.mainPin.offsetLeft - shift.x < 0) {
        window.elements.mainPin.style.left = 0 + 'px';
      } else if (window.elements.mainPin.offsetLeft - shift.x > window.widthMap - window.constants.PIN_WIDTH) {
        window.elements.mainPin.style.left = window.widthMap - window.constants.PIN_WIDTH + 'px';
      } else {
        window.elements.mainPin.style.left = (window.elements.mainPin.offsetLeft - shift.x) + 'px';
      }

      if (window.elements.mainPin.offsetTop - shift.y > window.constants.MAX_LOCATION_Y) {
        window.elements.mainPin.style.top = window.constants.MAX_LOCATION_Y + 'px';
      } else if (window.elements.mainPin.offsetTop - shift.y < window.constants.MIN_LOCATION_Y) {
        window.elements.mainPin.style.top = window.constants.MIN_LOCATION_Y + 'px';
      } else {
        window.elements.mainPin.style.top = (window.elements.mainPin.offsetTop - shift.y) + 'px';
      }

      if (!window.elements.mapSection.classList.contains('map--faded')) {
        inputAddress.setAttribute('value', Math.floor(leftPin) + ', ' + Math.floor(topPin));
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });



  var createPins = function (icons) {
    for (var i = 0; i < icons.length; i++) {
      var pinElem = window.elements.pinTemplate.cloneNode(true);
      pinElem.children[0].src = icons[i].author.avatar;
      pinElem.dataset.id = i;
      pinElem.style.left = icons[i].location.x + 'px';
      pinElem.style.top = icons[i].location.y + 'px';
      pinElem.children[0].alt = icons[i].offer.title;
      window.elements.fragmentPins.appendChild(pinElem);
    }
    window.elements.mapPinList.appendChild(window.elements.fragmentPins);
  };

  var onButtonMouseUp = function () {
    window.elements.mapSection.classList.remove('map--faded');
    window.elements.advertForm.classList.remove('ad-form--disabled');
    createPins(window.advert);
    window.toggleDisabled(false, window.elements.fieldsets);
    window.toggleDisabled(false, window.elements.filterSelects);
    removeOnButtonMouseUp();
    window.setAddress();
  };

  window.addEventListener('load', function () {
    window.toggleDisabled(true, window.elements.fieldsets);
    window.toggleDisabled(true, window.elements.filterSelects);
    window.elements.mainPin.addEventListener('mouseup', onButtonMouseUp);
    window.setAddress();
  });

  var removeOnButtonMouseUp = function () {
    window.elements.mainPin.removeEventListener('mouseup', onButtonMouseUp);
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE || evt.which === 1) {
      console.log('клик')
      errorPopup.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onMessageEscPress);
    }
  };

  var onButtonErrorClick = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE || evt.which === 1) {
      errorPopup.classList.add('hidden');
      errorButton.removeEventListener('click', onButtonErrorClick)
    }
  };
  
  var onLoadSuccess = function (advert) {
    window.advert = advert;
  };

  var onLoadError = function (errorMessage) {
    errorPopup.querySelector('.error__message').textContent = errorMessage;
    errorButton.addEventListener('click', onButtonErrorClick);
    errorButton.focus();
    errorButton.setAttribute('tabindex', '0');
    errorButton.style.border = '2px solid yellow';

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onButtonErrorClick);
    window.elements.mapSection.appendChild(errorPopup);
  }

  window.backend.load(onLoadSuccess, onLoadError);

})();
