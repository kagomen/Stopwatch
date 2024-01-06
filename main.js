'use strict';

const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let startTime;
let timeoutId;
let elapsedTime = 0; // ストップ時のタイムを記録

function countUp() {
  const d = new Date(Date.now() - startTime + elapsedTime); // 経過時間
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  timer.textContent = `${m}:${s}.${ms}`;

  //10ミリ秒毎にcountUpを実行
  timeoutId = setTimeout(() => {
    countUp();
  }, 10);
}

//スタートクリック
start.addEventListener('click', () => {
  setButtonStateRunning();  //ボタンの挙動
  startTime = Date.now();  //開始時刻を記録
  countUp();
});

//ストップクリック
stop.addEventListener('click', () => {
  setButtonStateStopped();
  clearTimeout(timeoutId); //setTimeout()が返す値を引数にしてタイマーを止める
  elapsedTime += Date.now() - startTime; //スタートストップが何度繰り返されても大丈夫なよう記録タイムを足し上げる
});

//リセットクリック
reset.addEventListener('click', () => {
  setButtonStateInitial();
  timer.textContent = '00:00.000';
  elapsedTime = 0;
});


//================ボタンの挙動================
//初期状態
function setButtonStateInitial() {
  start.disabled = false; //disable無効＝ボタン有効
  stop.disabled = true; //disable有効＝ボタン無効
  reset.disabled = true;
}
//タイマーが動いてる時
function setButtonStateRunning() {
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
}
//タイマーがストップした時
function setButtonStateStopped() {
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
}