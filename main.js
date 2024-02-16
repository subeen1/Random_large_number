//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Rest버튼을 누르면 게임이 리센된다
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~ 100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button"); //getElementById를 할 때 스펠링 에러가 제일 많이 난다. 그러나 그냥 id값을 복사해서 붙여라
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play); //함수도 매개변수로 넘길 수 있다.
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = ""; //이 함수이름을 선언하지 안항도 될 느낌 (선언하면 메모리 차지됨), 이 함수가 다른 곳에 사용되지 않을 때 함수 이름을 선언안해도된다.
});

//랜덤번호지정
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; //Math.Random은 0~1 사이 숫자를 변환시킨다. 즉 1은 포함이 되지 않는다. 여기서 *100을 했으니깐 100은 포함이 되지 않는다. 그래서 +1를 적어야 100도 값에 포함이 된다.
  console.log("정담", computerNum);
}

//유저가 입력한 값을 play 함수로 들고와야한다.
function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
    return;
  }
  chances--;
  chanceArea.textContent = `남은기회:${chances}번`;
  console.log("chance", chances); //찬스 카운터를 보기위해서
  if (userValue < computerNum) {
    resultArea.textContent = "Up!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!!";
  } else {
    resultArea.textContent = "맞추셨습니다!!";
    gameOver = true;
  }
  history.push(userValue);
  console.log(history);
  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  //user reset창이 깨끗하게 정리되고
  userInput.value = "";
  //새로운 번호가 생성되고
  pickRandomNum();
  resultArea.textContent = "결과값이 여기 나옵니다.";
}

//콘솔창에 나왔던 결과값을 웹사이트롤 옮겨보자
pickRandomNum();
