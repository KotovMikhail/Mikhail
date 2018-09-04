'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 16;
var TEXT_HEIGHT = 40;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;

var renderClouds = function (ctx, x, y, color, colorShadow) {
  ctx.fillStyle = colorShadow;
  ctx.fillRect(x + y, y * 2, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderClouds(ctx, CLOUD_X, CLOUD_Y, '#fff', 'rgba(0, 0, 0, 0.7)');
  var maxTime = getMaxElement(times);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура Вы победили', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var renderText = function (name, muliplierNumber) {
    var textX = CLOUD_X + GAP + (BAR_WIDTH + GAP) * muliplierNumber;
    var textY = CLOUD_HEIGHT - FONT_GAP;
    ctx.fillStyle = 'black';
    ctx.fillText(name, textX, textY);
  };

  var renderRect = function (time, muliplierNumber) {
    var barHeight = (MAX_BAR_HEIGHT * time) / maxTime;
    var rectY = CLOUD_HEIGHT - barHeight;
    var rectX = CLOUD_X + GAP + (BAR_WIDTH + GAP) * muliplierNumber;
    ctx.fillRect(rectX, rectY - TEXT_HEIGHT, BAR_WIDTH, barHeight);
  };

  for (var i = 0; i < names.length; i++) {

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.1);
    }
    renderRect(times[i], i);
    ctx.fillStyle = '#000';
    renderText(names[i], i);
  };
};
