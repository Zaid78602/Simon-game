let gameSeq = [];
let userSeq = [];

let color = ["red", "green", "blue", "yellow"];

let started = false;
let highScore = 0;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-btn");

// document.addEventListener("keypress", function(){
//     if(started == false){
//         console.log("game started");
//         started = true;
//         levelUp();
//     }
// });

startBtn.addEventListener("click", () => {
    if(started == false){
        started = true;
        levelUp();
    }
});

function gameflash(randBtn){
    randBtn.classList.add("white");
    setTimeout(function(){
        randBtn.classList.remove("white");
    },250);
}

function userflash(randBtn){
    randBtn.classList.add("black");
    setTimeout(function(){
        randBtn.classList.remove("black");
    },250);
}

function levelUp(){
    userSeq = [];
    if(highScore<level){
        highScore = level;
    }
    level++;
    h2.innerText = `Level ${level}  (Highscore: ${highScore})`;

    let randIdx = Math.floor(Math.random() * 4); 
    let randClr = color[randIdx];
    let randBtn = document.querySelector(`.${randClr}`)
    gameSeq.push(randClr);
    console.log(gameSeq)
    gameflash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press Start button to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    let userClr = btn.getAttribute("id");
    userSeq.push(userClr);
    

    checkAns(userSeq.length-1);
}
 
let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = false;
    gameSeq= [];
    userSeq = [];
    level = 0;
}