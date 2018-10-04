'use strict';

(function () {
  window.constants = {
    CARDS_AMOUNT: 8,
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    DESCRIPTIONS: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    CHECK_TIMES: ['12:00', '13:00', '14:00'],
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOM: 1,
    MAX_ROOM: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 5,
    MIN_LOCATION_Y: 100,
    MAX_LOCATION_Y: 630,
    IMAGE_NUM_RANGES: [1, 2, 3, 4, 5, 6, 7, 8],
    PIN_HEIGHT: 65,
    PIN_WIDTH: 65,
    PIN_ARROW_HEIGHT: 22,
    MAP_PIN_ACTIVE_CLASS: 'map__pin--active',
    ESC_KEYCODE: 27,
    AVATAR_WIDTH: 45,
    AVATAR_HEIGHT: 40,
    TIMEOUT: 10000,
    TypesOfHouses: {
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
    },
    Rooms: {
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
    }
  };


})();
