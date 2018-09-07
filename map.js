'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// {
//   "author": {
//     "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },

//   "offer": {
//     "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
//     "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//     "price": число, случайная цена от 1000 до 1 000 000
//     "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//     "rooms": число, случайное количество комнат от 1 до 5
//     "guests": число, случайное количество гостей, которое можно разместить
//     "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//     "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//     "description": пустая строка,
//     "photos": массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
//   },

//   "location": {
//     «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//     «y»: случайное число, координата y метки на карте от 130 до 630.
//   }
// }

// 1) 
var COUNT = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
// var CHECK_OUT = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1000;
var MAX_PRCIE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var IMAGE_NUM_RANGE = [1, 2, 3, 4, 5, 6, 7, 8];

var getUnique = function (arr) {
  var uniqueEl = arr[getRandom(0, (arr.length))];
  console.log(arr.indexOf(uniqueEl));
  arr.splice(arr.indexOf(uniqueEl), 1);
  // for (var i = 1; i < imageNumber; i++) {
  //   var img = 'img/avatars/user0' + IMAGE_NUM_RANGE[i] + '.png';
  // }
  console.log('number:' + uniqueEl + ' final arr: ' + arr);
  return uniqueEl;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * max + min);
}

function getTitle(titleArray) {
  return titleArray;
};

function getRandStringsArr() {
  var finalArr = FEATURES;
  finalArr.length = getRandom(0, FEATURES.length - 1);
  console.log(finalArr);
  return finalArr;
}

var arr = [1, 2, 3, 4, 5];

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

arr.sort(compareRandom);

var createObjects = function () {

  var obj = {
    author: {
      avatar: 'img/avatars/user0' + getUnique(IMAGE_NUM_RANGE) + '.png'
    },

    offer: {
      title: getUnique(TITLE),
      address: obj.location.x + ',' + obj.location.y,
      price: getRandom(MIN_PRICE, MAX_PRCIE),
      type: TYPE[getRandom(0, TYPE.length - 1)],
      rooms: getRandom(1, 5),
      guests: getRandom(1, 1000),
      checkin: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandom(0, CHECK_TIME.length - 1)],
      features: getRandStringsArr(),
      description: '',
      photos: PHOTOS,
    },
    location: {
      x: getX(),
      y: getRandom(130, 630)
    }
  }

  return obj;

};
createObjects();
