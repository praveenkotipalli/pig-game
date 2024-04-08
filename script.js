'use strict';
//selecting elements
const score0El=document.querySelector('#score--0');
const score1El=document.getElementById('score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');

const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

//starting conditions
score0El.textContent=0;
score1El.textContent=0;
diceEl.classList.add("hidden");

let scores=[0, 0];
let currentScore=0;
let activePlayer=0;

let playing = true;

//switching player func
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        activePlayer=activePlayer===0? 1:0;
        currentScore=0;

        //changing the back ground color
        //or you can use toggle()
        //ex:
            // player0El.classList.toggle('player--active');
            // player1El.classList.toggle('player--active');
        if(player0El.classList.contains('player--active')) {
            player0El.classList.remove('player--active');
            player1El.classList.add('player--active');
        }else{
            player1El.classList.remove('player--active');
            player0El.classList.add('player--active');
        }
}


//rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
    //1.generating a random dice roll
    const dice=Math.trunc(Math.random()*6)+1;

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //3.check for rolled 1
    if(dice != 1){
        //add dice to current score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        // current0El.textContent=currentScore;
    }else{
        //switch to next player
       switchPlayer();
    }
}
});



btnHold.addEventListener('click', function () {
    if(playing){
    //1.add current score to active player's score
    // score[activePlayer]+=currentScore; 
    //or
    activePlayer===0?
    scores[0]+=currentScore:
    scores[1]+=currentScore;

    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //2.check if player's score is >=100
    //finish the game
    if(scores[activePlayer]>=100){
        playing=false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        // remove all functionalitys accept "new game";
        diceEl.classList.add('hidden');
        playing=false;
    }else{
        //switch to next player
        switchPlayer();
    }
}
});


//reseting all the initial conditions of the game;
btnNew.addEventListener('click', function(){
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    score0El.textContent=0;
    score1El.textContent=0;
    diceEl.classList.add("hidden");

    scores=[0, 0];
    currentScore=0;
    activePlayer=0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    activePlayer=0;

    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

    playing = true;
})

//how to play pop up window

const modal =document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const btnOpenModal=document.querySelector('.show-modal');
const btnCloseModal=document.querySelector('.close-modal')

const closeModal = function (){  
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    console.log("modal opend");
}


btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e){
    console.log(e.key);
    if(e.key==="Escape"){
        if(!modal.classList.contains('hidden')){
            closeModal();
        }
    }
})







