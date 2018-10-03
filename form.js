'use strict';

(function () {

  var roomNumber = window.elements.mapForm.querySelector('#room_number');
  var capacity = window.elements.mapForm.querySelector('#capacity');
  var houseType = window.elements.mapForm.querySelector('#type');
  var timeIn = window.elements.mapForm.querySelector('#timein');
  var timeOut = window.elements.mapForm.querySelector('#timeout');
  var housePrice = window.elements.mapForm.querySelector('#price');
  var inputAddress = window.elements.mapForm.querySelector('#address');
  var options = capacity.querySelectorAll('option');
  var successPopup = window.elements.successTemplate.cloneNode(true);
  var errorPopup = window.elements.errorTemplate.cloneNode(true);
  var errorButton = errorPopup.querySelector('.error__button');
  var resetButton = window.elements.mapForm.querySelector('.ad-form__reset');


  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  houseType.addEventListener('change', function () {
    var select = window.constants.TypesOfHouses[houseType.value];
    housePrice.setAttribute('min', select.min);
    housePrice.setAttribute('placeholder', select.placeholder);
  });

  roomNumber.addEventListener('change', function () {
    var selectType = window.constants.Rooms[roomNumber.value];
    setOptions(selectType);
    setValidity(selectType);
  });

  var setOptions = function (selectType) {
    var checkValidity = function (value) {
      return selectType.enabled.indexOf(value) === -1;
    };

    options.forEach(function (option) {
      option.disabled = checkValidity(option.value);
    });
  };

  var setValidity = function (selectType) {
    var isValid = selectType.enabled.indexOf(capacity.value) !== -1;
    var customValidity = isValid ? '' : selectType.textError;
    capacity.setCustomValidity(customValidity);
  };

  capacity.addEventListener('change', function () {
    capacity.setCustomValidity('');
  });

  window.setAddress = function () {
    inputAddress.setAttribute('value', parseInt(window.elements.mainPin.style.left, 10) + ', ' + parseInt(window.elements.mainPin.style.top, 10));
  };

  window.toggleDisabled = function (isDisabled, nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE || evt.which === 1) {
      successPopup.classList.add('hidden');
      document.removeEventListener('keydown', onSuccessEscPress);
      document.removeEventListener('click', onSuccessEscPress);
    }
  };

  var onLoadSuccess = function () {
    successPopup.querySelector('.success__message');
    window.elements.mapSection.appendChild(successPopup);
  };

  var onLoadError = function (errorMessage) {
    errorPopup.querySelector('.error__message').textContent = errorMessage;
    errorButton.focus();
    errorButton.setAttribute('tabindex', '0');
    errorButton.style.border = '2px solid yellow';
    window.elements.mapSection.appendChild(errorPopup);
  };

  window.elements.mapForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.elements.mapForm), onLoadSuccess, onLoadError);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessEscPress);
    evt.preventDefault();
  });

  var featuresCeckboxes = document.querySelectorAll('input[type=checkbox]');

  var onRresetClick = function () {
    allInputs.forEach(function(element){
      if(element.hasAttribute("checked")) {
        element.removeAttribute("checked");
      }
    })
  } 


  resetButton.addEventListener('click', onRresetClick);

})();
