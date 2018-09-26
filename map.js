'use strict';

var CARDS_AMOUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var DESCRIPTIONS = 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var MIN_LOCATION_X = 100;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var IMAGE_NUM_RANGES = [1, 2, 3, 4, 5, 6, 7, 8];
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_OFFSET_X = 570;
var PIN_OFFSET_Y = 375;

var MAP_PIN_ACTIVE_CLASS = 'map__pin--active';
var ESC_KEYCODE = 27;
var MIN_LENGTH = 30;

var TYPES_OF_HOUSES = {
  'bungalo': {
    min: 0,
    placeholder: '0',
    translate: 'Бунгало'
  },
  'flat': {
    min: 1000,
    placeholder: '1000',
    translate: 'Квартира'
  },
  'house': {
    min: 5000,
    placeholder: '5000',
    translate: 'Дом'
  },
  'palace': {
    min: 10000,
    placeholder: '10000',
    translate: 'Дворец'
  }
};

var Rooms = {
  1: {
    enabled: ['1'],
    textError: 'не более одного гостя'
  },
  2: {
    enabled: ['1', '2'],
    textError: 'не более одного или двух гостей'
  },
  3: {
    enabled: ['1', '2', '3'],
    textError: 'не более одного, двух или трёх гостей'
  },
  100: {
    enabled: ['0'],
    textError: 'не для гостей'
  }
};

var mapSection = document.querySelector('.map');
var fieldsets = document.querySelectorAll('fieldset');
var selects = document.querySelectorAll('select[name^=housing]');
var mapPinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var mainPin = document.querySelector('.map__pin--main');
var advertForm = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');
var inputAddressLoad = Math.floor(PIN_OFFSET_X + PIN_WIDTH / 2) + ', ' + Math.floor(PIN_OFFSET_Y + PIN_HEIGHT / 2);
var inputAddressActive = Math.floor(PIN_OFFSET_X + PIN_WIDTH / 2) + ', ' + Math.floor(PIN_OFFSET_Y + PIN_HEIGHT);

var activeCardId;
var currentPin = null;
var currentCard = null;

var mapForm = document.querySelector('.ad-form ');
var title = mapForm.querySelector('#title');
var timeIn = mapForm.querySelector('#timein');
var timeOut = mapForm.querySelector('#timeout');
var roomNumber = mapForm.querySelector('#room_number');
var capacity = mapForm.querySelector('#capacity');
var houseType = mapForm.querySelector('#type');
var housePrice = mapForm.querySelector('#price');
var formSubmit = mapForm.querySelector('.ad-form__submit');

var getUnique = function (titles) {
  var uniqueEl = titles[getRandom(0, titles.length)];
  titles.splice(titles.indexOf(uniqueEl), 1);
  return uniqueEl;
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var shuffleArray = function (array) {
  var finalArr = array.slice();
  for (var i = 0; i < finalArr.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = finalArr[i];
    finalArr[i] = finalArr[j];
    finalArr[j] = tmp;
  }
  return finalArr;
};

var createObject = function () {
  var locationX = getRandom(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y);
  return {
    author: {
      avatar: 'img/avatars/user0' + getUnique(IMAGE_NUM_RANGES) + '.png'
    },

    offer: {
      title: getUnique(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: TYPES[getRandom(0, TYPES.length)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM + MIN_ROOM),
      guests: getRandom(MIN_GUESTS, MAX_GUESTS + 1),
      checkin: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      checkout: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      features: shuffleArray(FEATURES.slice(0, getRandom(0, FEATURES.length + 1))),
      description: DESCRIPTIONS,
      photos: shuffleArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var createData = function () {
  var objects = [];
  for (var i = 0; i < CARDS_AMOUNT; i++) {
    objects.push(createObject());
  }
  return objects;
};

var createFragmentFeatures = function (facilities) {
  var fragmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < facilities.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    var classAdded = 'popup__feature--' + facilities[i];
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
};

var createFragmentPhotos = function (pins) {
  var fragmentPhotos = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var img = document.createElement('img');
    img.src = pins[i];
    img.width = 45;
    img.height = 40;
    img.classList.add('popup__photo');
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

var createPins = function (icons) {
  for (var i = 0; i < icons.length; i++) {
    var fragmentPins = document.createDocumentFragment();
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.children[0].src = icons[i].author.avatar;
    pinElem.dataset.id = i;
    pinElem.style.left = icons[i].location.x + 'px';
    pinElem.style.top = icons[i].location.y + 'px';
    pinElem.children[0].alt = icons[i].offer.title;
    fragmentPins.appendChild(pinElem);
    mapPinList.appendChild(fragmentPins);
  }
};

var getCardData = function (item) {
  var cardItem = cardTemplate.cloneNode(true);
  var roomPhrase = ' комнат для ';
  var roomNum = item.offer.rooms;
  var guestNum = item.offer.guests;
  var guestPhrase = guestNum === 1 ? ' гостя' : ' гостей';

  if (roomNum === 1) {
    roomPhrase = ' комната для ';
  } else if (roomNum > 1 && roomNum < 5) {
    roomPhrase = ' комнаты для ';
  }

  cardItem.querySelector('.popup__title').textContent = item.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = item.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = item.offer.price + '\u20BD' + '/ночь';
  cardItem.querySelector('.popup__type').textContent = TYPES_OF_HOUSES[item.offer.type].translate;
  cardItem.querySelector('.popup__text--capacity').textContent = roomNum + roomPhrase + ' для ' + guestNum + guestPhrase;
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ' выезд после ' + item.offer.checkout;
  var cardFeatures = cardItem.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  cardFeatures.appendChild(createFragmentFeatures(item.offer.features));
  cardItem.querySelector('.popup__description').textContent = item.offer.description;
  var cardPhotos = cardItem.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  cardPhotos.appendChild(createFragmentPhotos(item.offer.photos));
  cardItem.querySelector('.popup__avatar').src = item.author.avatar;
  mapSection.appendChild(cardItem);
  return cardItem;
};

var cardsArray = createData();

var toggleDisabled = function (isDisabled, nodes) {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = isDisabled;
  }
};

window.addEventListener('load', function () {
  toggleDisabled(true, fieldsets);
  toggleDisabled(true, selects);
  housePrice.setAttribute('placeholder', '1000');
  inputAddress.value = inputAddressLoad;
  mainPin.addEventListener('mouseup', onButtonMouseUp);
});

var onButtonMouseUp = function () {
  inputAddress.readOnly = true;
  inputAddress.value = inputAddressActive;
  mapSection.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  createPins(cardsArray);
  toggleDisabled(false, fieldsets);
  toggleDisabled(false, selects);
  removeOnButtonMouseUp();

};

var createCard = function (id) {
  activeCardId = id;
  currentCard = mapSection.appendChild(getCardData(cardsArray[id]));
  document.addEventListener('keydown', onPopupEscPress);
};

var removeCard = function () {
  if (currentCard) {
    mapSection.removeChild(currentCard);
    currentCard = null;
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCard();
    document.removeEventListener('keydown', onPopupEscPress);
    currentPin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    activeCardId = null;
    currentPin.blur();
  }
};

var checkActive = function () {
  removeCard();
  if (currentPin) {
    currentPin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    activeCardId = null;
  }
};

var showCard = function (evt) {
  var target = evt.target;
  var pinButton = target.closest('.map__pin:not(.map__pin--main)');
  var buttonClose = target.className === 'popup__close';
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  if (buttonClose) {
    checkActive();
  }

  // если нажат не маркер или активный маркер, то выйти
  if (!pinButton || (pinButton && activeCardId === pinButton.dataset.id)) {
    return;
  }

  checkActive();

  currentPin = pinButton;

  createCard(pinButton.dataset.id);

  pinButton.classList.add(MAP_PIN_ACTIVE_CLASS);
};

var removeOnButtonMouseUp = function () {
  mainPin.removeEventListener('mouseup', onButtonMouseUp);
};

mapSection.addEventListener('click', function (evt) {
  showCard(evt);
});

// 4.2 задание - - - - - - - - - - - - - - -- -

houseType.addEventListener('change', function () {

  var select = TYPES_OF_HOUSES[houseType.value];

  housePrice.setAttribute('min', select.min);
  housePrice.setAttribute('placeholder', select.placeholder);
});

var options = capacity.querySelectorAll("option");


roomNumber.addEventListener("change", function () {
  var selectType = Rooms[roomNumber.value];
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
  var customValidity = isValid ? "" : selectType.textError;
  capacity.setCustomValidity(customValidity);
};

capacity.addEventListener('change', function () {
  capacity.setCustomValidity('');
});

var onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

var onTimeOutChange = function () {
  timeIn.value = timeOut.value;
};