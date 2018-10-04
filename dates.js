'use strict';

(function () {
  var widthMap = window.elements.mapPinList.offsetWidth;

  var createObject = function () {
    var locationX = window.util.getRandom(0, (widthMap - window.constants.PIN_WIDTH / 2));
    var locationY = window.util.getRandom(window.constants.MIN_LOCATION_Y, window.constants.MAX_LOCATION_Y);
    return {
      author: {
        avatar: 'img/avatars/user0' + window.util.getUnique(window.constants.IMAGE_NUM_RANGES) + '.png'
      },

      offer: {
        title: window.util.getUnique(window.constants.TITLES),
        address: locationX + ', ' + locationY,
        price: window.util.getRandom(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
        type: window.constants.TYPES[window.util.getRandom(0, window.constants.TYPES.length)],
        rooms: window.util.getRandom(window.constants.MIN_ROOM, window.constants.MAX_ROOM + window.constants.MIN_ROOM),
        guests: window.util.getRandom(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS + 1),
        checkin: window.constants.CHECK_TIMES[window.util.getRandom(0, window.constants.CHECK_TIMES.length)],
        checkout: window.constants.CHECK_TIMES[window.util.getRandom(0, window.constants.CHECK_TIMES.length)],
        features: window.util.shuffleArray(window.constants.FEATURES.slice(0, window.util.getRandom(0, window.constants.FEATURES.length + 1))),
        description: window.constants.DESCRIPTIONS,
        photos: window.util.shuffleArray(window.constants.PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  var createData = function () {
    var objects = [];
    for (var i = 0; i < window.constants.CARDS_AMOUNT; i++) {
      objects.push(createObject());
    }
    return objects;
  };

  window.dates = createData();

})();
