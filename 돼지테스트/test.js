
// import * as Korean from '../돼지테스트/foodlist1';

let China;
let Japan;
let Western;

// const answer = document.getElementById('answer').value;

// random img
const imgs = [
    "갈비찜.jpg",
    "갈비탕.jpg",
    "계란말이.jgg",
    "고추장찌개.jpg",
    "곱창.jpg",
    "김치찌개.jpg",
    "냉면.jpg",
    "닭갈비.jpg",
    "닭강정.jpg",
    "닭도리탕.jpg",
    "물회.jpg",
    "백숙.jpg",
    "보쌈.jpg",
    "부대찌개.jpg",
    "뼈해장국.jpg",
    "삼겹살.jpg",
    "순대국.jpg",
    "쌈밥.jpg",
    "잡채.jpg",
    "재첩국.jpg",
    "제육볶음.jpg",
    "족발.jpg",
    "치킨.jpg",
    "콩나물국.jpg",
];


function showimg () {
    let randomImg = Math.floor(Math.random() * imgs.length );
    let randomBox = document.getElementById("foodimg");

    randomBox.src = `${randomImg}`;
    const foodImge = document.querySelector(".imgbox");
    foodImge.appendChild(krimg);
}
