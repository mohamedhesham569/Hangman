import wordList from "../src/word.js"

const Keyboard = document.getElementById("keyboard");
const HintDisplay = document.querySelector(".hint")
const gusses = document.querySelector(".gusses")
const Incorrect=document.querySelector(".incorrect-gusses")
const Hangman=document.querySelector(".hang-image img")
const popUp=document.querySelector(".pop-up")
const playAgain = document.querySelector(".play-again")


let Curuntword;
let Count;
let correctletters;


const Reset =()=>{
    Count=0;
    correctletters=[];
    gusses.innerHTML=Curuntword.split("").map(()=>`<li class="letter m-2 w-4"></li>`).join(" ");
    popUp.classList.remove("show");
    Hangman.src=`../images/hangman-${Count}.svg`;
    Incorrect.innerText=`${Count}/6`
    Keyboard.querySelectorAll("button").forEach(btn => btn.disabled=false)
}

const getword=()=>{
    const  {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(word,hint)
    Curuntword=word
    HintDisplay.innerText=hint;
    Reset()
    

}

const gameover=(isVictory)=>{
    setTimeout(()=>{
        const modeltext=isVictory? `you found the word :`:`the correct word was :`;
        popUp.querySelector(".pop-image img").src=isVictory?`../images/victory.gif`:`../images/lost.gif`;
        popUp.querySelector("h4").innerText=isVictory?`congrats!`:`game over!`;
        popUp.querySelector("p").innerHTML=`${modeltext} <b>${Curuntword}</b>`;
        popUp.classList.add("show")
    }
    ,300)
}

const initgame=(button,Clickedletter)=>{
    if(Curuntword.includes(Clickedletter)){
        [...Curuntword].forEach((letter,index)=>{
            if(letter===Clickedletter){
                correctletters.push(letter)
                gusses.querySelectorAll("li")[index].innerText=letter
                gusses.querySelectorAll("li")[index].classList.add("gussed")
            }}
            
        )
    button.disabled=true
    console.log(correctletters.length)
    }
        else{
            Count++;
            Hangman.src=`../images/hangman-${Count}.svg`
        }
        Incorrect.innerText=`${Count}/6`

        if(Count==6){gameover(false)}
        if(correctletters.length==Curuntword.length){gameover(true)}
    }

for(let i=97;i<=122;i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    Keyboard.appendChild(button)
    button.addEventListener("click",e=> initgame(e.target ,String.fromCharCode(i)))
}
// console.log(Math.random())
getword()
playAgain.addEventListener("click",getword)