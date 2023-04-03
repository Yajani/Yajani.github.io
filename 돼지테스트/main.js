import * as foodList from '../돼지테스트/random.js';


const {korea,China,Japan,Western,all} = {...foodList};


const $level = document.querySelector('.levelselect'); //코스 선택하면 카테고리 보이기
const $catalog = [...document.querySelectorAll('.kind li button')];
const $catalog_2 = document.querySelector('.kind');
let selectedCourse = []; // 코스 선택

let count = 0;
const $score = document.querySelector('.score');
const $correct = document.querySelector('.correct'); //정답유무 표시란

const $inputAnswer = document.getElementById('answer');
let score = makeGameData().score;

const startBtn = document.querySelector('.start');
const $timer = document.querySelector('.timer');
const $imgbox = document.querySelector('.imgbox');
const $realimg = document.querySelector('.imgbox .randomimg');
const $pig = document.querySelector('.eatingPig'); //포크를든 돼지

//fade 효과 적용하기 
let $fade = document.querySelector('.fadeffect');

let randomNumbers = [];

var timeSurv;
let countLife = 3;

const $pigLife = document.querySelectorAll('.piglife');
const $crownPig = document.querySelector('.animated-entity-symbol');
const $boomPig = document.querySelector('.animated-entity-symbol2');
const $pigs = document.querySelector('.pigs');


function makeGameData() {
  const $timeSelect = document.querySelector('.timeSelect');

  return {
    timeSelect: $timeSelect.onchange = () => {
      const $timeSelect = document.querySelector('.timeSelect').value;
      return $timeSelect;
    }, //선택된 제한시간
    timeImgSecond: 3,
    timeSecond: null,
    score: 0,
  };
}


$level.onclick = function () { // 코스 선택
$catalog.forEach(($li) => { // 코스들 보이기
  $li.style.visibility = 'visible';
});
}

$catalog.forEach(($btn) => { // 선택해야할 코스들

$btn.onclick = function () {
  $catalog.forEach(($li) => {
    $li.style.cssText = `visibility = hidden; z-index: -1;`;
    $catalog_2.style.cssText = `z-index : -1;`;

  });

  if ($btn.getAttribute('id') === 'korea') {
    selectedCourse = korea;
    $level.disabled = true;

  } else if ($btn.getAttribute('id') === 'japan') {
    selectedCourse = Japan;
    $level.disabled = true;

  } else if ($btn.getAttribute('id') === 'western') {
    selectedCourse = Western;
    $level.disabled = true;

  } else if ($btn.getAttribute('id') === 'total') {
    selectedCourse = korea.concat(Japan, China, Western);
    $level.disabled = true;

  } else {
    selectedCourse = China;
    $level.disabled = true;

  }
  return false;
}
});
startGameBtn();

function startGameBtn() {
let timeImgSecond = 3;

startBtn.onclick = function () { // start버튼 누르면 사라지는 함수
  startBtn.classList.add('hidden'); // start버튼 숨기기
  $pigs.classList.add('show');
  $timer.style.display = 'block'; // 남은시간 보여주기
  $level.disabled = true;
  const $timeSelectt = document.querySelector('.timeSelect')
  $timeSelectt.disabled = true;
  //시작버튼 누르면 돼지 밑으로 내리기 
  $pig.style.cssText = '  margin-top: 300px;';

  window.scrollTo({ // 시작버튼 누르면 스크롤 자동으로 내려주기
    top: document.body.scrollHeight, // <- 페이지 총 Height
    behavior: "smooth"
  });



  let timeImgStart = timeImgSecond;
  let timeImg = setInterval(function () { // 사진박스 3,2,1 카운트 다운
    $imgbox.textContent = timeImgStart;
    $imgbox.setAttribute('value', timeImgStart);
    timeImgStart--;
    if (timeImgStart === -1) { // 0초가 되면 랜덤 음식 사진 보여주기
      $imgbox.textContent = '';
      clearInterval(timeImg); // 0초가 되면 함수 종료
    }
    return timeImgStart;
  }, 1000); // 사진박스 카운트 다운 함수 end

  setTimeout(() => { // 처음에 4초뒤 랜덤한 이미지 보여주기
    let $newImg = document.createElement('img');
    $newImg.setAttribute('id', 'foodimg');
    $imgbox.appendChild($newImg);
    imgMatch(selectedCourse); // 랜덤 음식 사진 보여주는 함수
  }, 4000);
  setTimeout(() => { // 3초후 남은시간 카운트다운
    timeAttack();
  }, 3000);

}
}


function imgMatch(selectedCourse) {
//사진 랜덤 함수
//이미지랜덤 숫자
//이미지 보이기 

const random = rdimg();
const selectedFood = selectedCourse[random].img;
var arrUrl = selectedFood.split("/");
var FileNameplus = arrUrl[arrUrl.length - 1]; //나누어진 배열의 맨 끝이 파일명
var arSplitFileName = FileNameplus.split("."); //파일명을 다시 "."로 나누어 확장자랑 쪼갬
const $inputAnswer = document.getElementById('answer');
var FileName = arSplitFileName[0]; //파일이름

$inputAnswer.onkeyup = (e) => {
  if (e.key === 'Enter') {
    if (FileName === document.getElementById('answer').value) {
      corrected();

    } else {
      $inputAnswer.value = '';
      --countLife;
      $pigLife[countLife].remove();
      $timer.textContent = `남은시간 : ${makeGameData().timeSelect()}`;
      clearInterval(timeSurv);
      timeAttack();
      imgMatch(selectedCourse);
      if (countLife === 0) {
        $inputAnswer.disabled = true;
        failed();
      }
    }
  }
};
}

function rdimg() { // 랜덤 숫자 리턴 함수
  let foodimg ;
  while(true){
   foodimg = Math.round(Math.random() * selectedCourse.length);
    if(randomNumbers.includes(foodimg)){
      // console.log(foodList+'중복으로 다시');
      continue;
    }else{
      let objImg = document.getElementById('foodimg');
      // console.log(foodimg+'중복제거');
  objImg.setAttribute('src', selectedCourse[foodimg].img);
      randomNumbers.push(foodimg);
      return foodimg;
    }
  }
   // 랜덤이미지 생성
  }
  

function corrected() { // 정답일때 나오는 함수
  //정답일때 돼지가 앙


$correct.textContent = '정답입니다!!';
  score++;
  $score.textContent = '  ' + score + ' 점';
  $inputAnswer.value = '';

//10회 미만으로 맞췄을때 실행
  if (score < 5) {
    $imgbox.animate([
      {
        transform: 'rotateX(360deg)'
      },
      {
        transform: 'translate(-400px, -300px)'
      },
      {
        transform: 'transition : 1s'
      },
      {
        width: '30px',
        height: '30px'
      },
      {
        border: 'none',
        padding: '0'
      }
    ], 1000);
    
    $pig.animate([
      {
        transform: 'rotateX(30deg)'
      },
      {
        transform: 'rotateY(30deg)'
      },
      {
        transform: 'rotateX(30deg)'
      },
      {
        transform: 'rotateY(30deg)'
      },
    ], 1000);
  
  imgMatch(selectedCourse);
      $timer.textContent = `남은시간 : ${makeGameData().timeSelect()}`;
    clearInterval(timeSurv);
    timeAttack();
  } else {
    let objImg = document.getElementById('foodimg');
    objImg.setAttribute('src', '../돼지테스트/기본.png');
    $crownPig.setAttribute('style',  'z-index: 3; visibility: visible');
  $timer.textContent = `남은시간 :`;
  clearInterval(timeSurv);
  $inputAnswer.readOnly = true;
  }
    //정답일때 돼지가 앙
  

  
}

function failed() { // 틀렸을때 나오는 함수
let $newImg = document.createElement('img');
    $newImg.setAttribute('id', 'foodimg');
    $imgbox.appendChild($newImg);
    let objImg = document.getElementById('foodimg');
objImg.setAttribute('src', '../돼지테스트/기본.png');
$boomPig.setAttribute('style', 'z-index: 3; visibility: visible');
$inputAnswer.value = '';
$score.innerHTML = '땡!!!!<br>' + '점수: ' + score + '점';
$timer.textContent = '';
clearInterval(timeSurv);
$score.style.cssText = `z-index = 100; font-weight: 700; font-size: 40px; background:white;`;
}

function timeAttack() { // 남은시간 카운트 다운해주는 함수
const $time = makeGameData().timeSelect();
let tim = $time;
// 1초씩 남은시간 깍이는 함수
timeSurv = setInterval(function () { // 난이도에 따라 타이머 설정
  $timer.setAttribute('value', tim);
  tim--;
  $timer.textContent = `남은시간 : ${tim}`;
  if (tim === 0) {
    $inputAnswer.textContent = '';
    $inputAnswer.value = '';
      --countLife;
      $pigLife[countLife].remove();
      $timer.textContent = `남은시간 : ${makeGameData().timeSelect()}`;
      clearInterval(timeSurv);
      timeAttack();
      imgMatch(selectedCourse);
      if (countLife === 0) {
        $inputAnswer.disabled = true;
        failed();
      }
  }// 입력하세요 없애기
  $inputAnswer.focus(); // 시작 버튼 누르면 input 커서 위치

}, 1000);
}