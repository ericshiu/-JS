var chessBorad = [];
var me = true;
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
for (var i = 0; i < 15; i++) {
  chessBorad[i] = [];
  for (var j = 0; j < 15; j++) {
    chessBorad[i][j] = 0;
  }
}

context.strokeStyle = '#BFBFBF';

var bg = new Image();
bg.src = "img/bg_img.jpg";
bg.onload = function() {
  context.drawImage(bg, 0, 0, 450, 450);
  drawChessBoard();
};

//畫棋盤
var drawChessBoard = function() {
  for (var i = 0; i < 15; i++) {
    //橫線
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, 435);
    context.stroke();
    //直線
    context.moveTo(15, 15 + i * 30);
    context.lineTo(435, 15 + i * 30);
    context.stroke();
  }
};
//畫上棋子
var oneStep = function(i, j, me) {
  context.beginPath();
  context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
  context.closePath();
  var gredient = context.createLinearGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
  if (me) {
    gredient.addColorStop(0, '#0A0A0A');
    gredient.addColorStop(1, '#636766');
  } else {
    gredient.addColorStop(0, '#D1D1D1');
    gredient.addColorStop(1, '#F9F9F9');
  }
  context.fillStyle = gredient;
  context.fill();
};
//實現下棋
chess.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x / 30);
  var j = Math.floor(y / 30);
  if (chessBorad[i][j] == 0) {
    oneStep(i, j, me);
    if (me) {
      chessBorad[i][j] = 1;
    } else {
      chessBorad[i][j] = 2;
    }
    me = !me;
  } else {
    alert('非法定位置');
  }

};