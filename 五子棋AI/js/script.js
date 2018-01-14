var chessBorad = [];
var over = false;
//贏法數組
var wins = [];
//贏法的統計數組
var myWin = [];
var computerWin = [];
var me = true;
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
for (var i = 0; i < 15; i++) {
  chessBorad[i] = [];
  for (var j = 0; j < 15; j++) {
    chessBorad[i][j] = 0;
  }
}
for (var i = 0; i < 15; i++) {
  wins[i] = [];
  for (var j = 0; j < 15; j++) {
    wins[i][j] = [];
  }
}
//贏法種類
var count = 0;
//所有的橫線
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    //  wins[0][0][0] = true;
    //  wins[0][1][0] = true;
    //  wins[0][2][0] = true;
    //  wins[0][3][0] = true;
    //  wins[0][4][0] = true;
    for (var k = 0; k < 5; k++) {
      wins[i][j + k][count] = true;
    }
    count++;
  }
}
//所有的直線
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[j + k][i][count] = true;
    }
    count++;
  }
}
//所有的斜線
for (var i = 0; i < 11; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j + k][count] = true;
    }
    count++;
  }
}
//所有的反斜線
for (var i = 0; i < 11; i++) {
  for (var j = 14; j > 3; j--) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j - k][count] = true;
    }
    count++;
  }
}
console.log(count);

for (var i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
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
  if (over) {
    return;
  }
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
    for (var k = 0; k < count; k++) {
      if (wins[i][j][k]) {
        myWin[k]++;
        computerWin[k] = 6;
        if (myWin[k] == 5) {
          alert('你贏了');
          over = true;
        }
      }
    }
  } else {
    alert('非法定位置');
  }

};