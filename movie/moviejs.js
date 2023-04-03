const Moviee = [
  {
    movie: '광해',
    img: './movie/광해.jpg'
  },
  {
    movie: '국가대표',
    img: './movie/국가대표.jpg'
  },
  {
    movie: '나홀로집에',
    img: './movie/나홀로집에.jpg'
  },
  {
    movie: '써니',
    img: './movie/써니.jpg'
  },
  {
    movie: '인턴',
    img: './movie/인턴.jpg'
  }];


  const animation = [
    {
      movie: '코코',
      img: './movie/코코.jpg'
    },
  
    {
      movie: '토이스토리',
      img: './movie/토이스토리.jpg'
    },
    {
      movie: '알라딘',
      img: './movie/알라딘.jpg'
    },
    {
      movie: '겨울왕국',
      img: './movie/겨울왕국.jpg'
    },
    {
      movie: '포뇨',
      img: './movie/포뇨.jpg'
    },
    {
      movie: '토토로',
      img: './movie/토토로.jpg'
    },

  ];
  
  const romance = [
    {
      movie: '500일의 썸머',
      img: './movie/500일의썸머.jpg'
    },
    {
      movie: '이터널선샤인',
      img: './movie/이터널선샤인.jpg'
    },
    {
      movie: '키싱부스',
      img: './movie/키싱부스.jpg'
    },
    {
      movie: '건축학개론',
      img: './movie/건축학개론.jpg'
    },
    {
      movie: '노트북',
      img: './movie/노트북.jpg'
    },
    {
      movie: '타이타닉',
      img: './movie/타이타닉.jpg'
    },
    {
      movie: '어바웃타임',
      img: './movie/어바웃타임.jpg'
    },
    {
      movie: '라붐',
      img: './movie/라붐.jpg'
    },
    {
      movie: '라라랜드',
      img: './movie/라라랜드.jpg'
    },
    {
      movie: '미비포유',
      img: './movie/미비포유.jpg'
    }
  ];

  const fantage = [
    {
      movie: '부산행',
      img: './movie/부산행.jpg'
    },
    {
      movie: '스타워즈',
      img: './movie/스타워즈.jpg'
    },
    {
      movie: '트랜스포머',
      img: './movie/트랜스포머.jpg'
    },
    {
      movie: '해리포터',
      img: './movie/해리포터.jpg'
    },
    {
      movie: '어벤져스',
      img: './movie/어벤져스.jpg'
    },
    {
      movie: '이티',
      img: './movie/이티.jpg'
    },
    {
      movie: '아바타',
      img: './movie/아바타.jpg'
    },
    {
      movie: '아이언맨',
      img: './movie/아이언맨.jpg'
    },
    {
      movie: '늑대소년',
      img: './movie/늑대소년.jpg'
    }
  ];

  const noir = [
    {
      movie: '기생충',
      img: './movie/기생충.jpg'
    },
    {
      movie: '레옹',
      img: './movie/레옹.jpg'
    },
    {
      movie: '범죄와의전쟁',
      img: './movie/범죄와의전쟁.jpg'
    },
    {
      movie: '아저씨',
      img: './movie/아저씨.jpg'
    },
    {
      movie: '암살',
      img: './movie/암살.jpg'
    },
    {
      movie: '엑시트',
      img: './movie/엑시트.jpg'
    },
    {
      movie: '킹스맨',
      img: './movie/킹스맨.jpg'
    },
    {
      movie: '조커',
      img: './movie/조커.jpg'
    }
  ];



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

const $pigLife = document.querySelectorAll('.piglife');//목숨 개 
const $crownPig = document.querySelector('.animated-entity-symbol'); //다 맞았을때 이미지 
const $boomPig = document.querySelector('.animated-entity-symbol2');//오답일때 폭탄
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
      selectedCourse = romance;
      $level.disabled = true;

    } else if ($btn.getAttribute('id') === 'japan') {
      selectedCourse = noir;
      $level.disabled = true;

    } else if ($btn.getAttribute('id') === 'western') {
      selectedCourse = fantage;
      $level.disabled = true;

    } else if ($btn.getAttribute('id') === 'total') {
      selectedCourse = Moviee.concat(romance,noir,fantage,animation);
      $level.disabled = true;

    } else {
      selectedCourse = animation;
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

  $correct.textContent = '정답입니다!!';
    score++;
    $score.textContent = '  ' + score + ' 점';
    $inputAnswer.value = '';
    //정답일때 돼지가 앙
    if (score < 5) {
  $imgbox.animate([
    // {transform : 'scale(0.2)'},
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
  //10회 미만으로 맞췄을때 실행
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
    }
 // 입력하세요 없애기
    $inputAnswer.focus(); // 시작 버튼 누르면 input 커서 위치

  }, 1000);
}