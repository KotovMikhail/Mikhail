'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var GAP = 50;

var FONT_GAP = 10;
var TEXT_HEIGHT = 40;
var TEXT_COLOR = 'black';
var TEXT_OFFSET_X = 120;
var TEXT_OFFSET_Y = 20;
var TEXT_STYLE = '16px PT Mono';

var renderClouds = function (ctx, x, y) {
  ctx.fillStyle = CLOUD_COLOR_SHADOW;
  ctx.fillRect(x + y, y * 2, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = CLOUD_COLOR;
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
  renderClouds(ctx, CLOUD_X, CLOUD_Y);
  ctx.font = TEXT_STYLE;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Ура Вы победили', TEXT_OFFSET_X, TEXT_OFFSET_Y * 2);
  ctx.fillText('Список результатов:', TEXT_OFFSET_X, TEXT_OFFSET_Y * 3);

  var maxTime = getMaxElement(times);

  var renderText = function (playerName, multNum) {
    var textX = CLOUD_X + GAP + (BAR_WIDTH + GAP) * multNum;
    var textY = CLOUD_HEIGHT - FONT_GAP;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(playerName, textX, textY);
  };

  var renderRect = function (playerTime, multNum) {
    var barHeight = (MAX_BAR_HEIGHT * playerTime) / maxTime;
    var rectY = CLOUD_HEIGHT - barHeight;
    var rectX = CLOUD_X + GAP + (BAR_WIDTH + GAP) * multNum;
    ctx.fillRect(rectX, rectY - TEXT_HEIGHT, BAR_WIDTH, barHeight);
  };

  var renderSaturation = function (playerName) {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.1);
    if (playerName === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    return ctx.fillStyle;
  };

  for (var i = 0; i < names.length; i++) {
    renderSaturation(names[i]);
    renderRect(times[i], i);
    renderText(names[i], i);
  };
};
