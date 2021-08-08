const div = document.querySelector("#container");
const oneButton = document.querySelector('#pOne');
const twoButton = document.querySelector('#pTwo');
const resetButton = document.querySelector('#reset');
const resetScores = document.querySelector('#resetScores');
const table = document.querySelector('#scoresTable')
const select= document.querySelector('#plays');
const tbody = document.querySelector('tbody')

const heading = document.querySelector('h2');
const p1Dis = document.querySelector('#p1Disp');
const p2Dis = document.querySelector('#p2Disp');  


let playerOneScore = 0;
let playerTwoScore = 0;
let isGameOver = true;
let selectValue = 0;
let gameNumber = 1;

select.addEventListener('change', function (){
    selectValue = select.options[select.selectedIndex].value;
    //createElem(gameNumber, 'AS', 'AS', 'PQ', 12);
    reset();
})


// div which controls all the buttons
div.addEventListener('click', function (evt) {

    if (parseInt(selectValue) === 0){
        isGameOver = true;
    }
    // incrementing the player value
    if (!isGameOver){
        switch (evt.target.id){
            case 'pOne':
                playerOneScore ++;
                if (playerOneScore === parseInt(selectValue)){
                    
                    oneButton.disabled = true;
                    twoButton.disabled = true; 
                    isGameOver = true;
                    setValue();
                    // adding new highscore
                     
                    addHighScore('p1', playerOneScore, playerTwoScore);
                }
                break;
            case 'pTwo':
                playerTwoScore ++;
                if (playerTwoScore === parseInt(selectValue)){
                    
                    oneButton.disabled = true;
                    twoButton.disabled = true; 
                    isGameOver = true;

                    setValue();
                    addHighScore('p2', playerOneScore, playerTwoScore);
                }
                break;
        }
        setValue();
    }
    
});


function setValue(){
    p1Dis.innerText = playerOneScore;
    p2Dis.innerText = playerTwoScore;

    if (isGameOver=== true && playerOneScore === parseInt(selectValue)){
        p1Dis.classList.add('has-text-success');
        p2Dis.classList.add('has-text-danger');


    }
    else if (isGameOver=== true && playerTwoScore === parseInt(selectValue)){
        p1Dis.classList.add('has-text-danger');
        p2Dis.classList.add('has-text-success');

    }

    else {
        p1Dis.classList.remove('has-text-success', 'has-text-danger');
        p2Dis.classList.remove('has-text-success', 'has-text-danger');
    }

}

table.addEventListener('dblclick', function(evt){
   // console.dir(evt.target.parentElement)
   if (evt.target.parentElement.tagName.toLowerCase()==="tr" && evt.target.parentElement.parentElement.tagName.toLowerCase() === 'tbody'){
    evt.target.parentElement.remove();
    gameNumber--;
   }
    
})

resetButton.addEventListener('click', reset);

function addScores() {
    const tableInput = document.createElement('tr');
    tableInput.appendChild()

}

function reset() {
    playerOneScore = 0;
    playerTwoScore = 0; 
    oneButton.disabled = false;
    twoButton.disabled = false; 
    isGameOver = false;
    setValue();
}

const createElem = (gameNum,  winner, pl1, pl2, pts) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); // game number value
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    th.innerText = `${gameNum}`;
    td1.append(`${winner}`);
    td2.append(`${pl1}`);
    td3.append(`${pl2}`);
    td4.append(`${pts}`);
    tr.append(th, td1, td2, td3, td4);
    tbody.appendChild(tr);
    console.log("created!")

};

resetScores.addEventListener('click', (evt)=>{
    evt.preventDefault();
    const tableElems = document.querySelectorAll('tbody tr')
    for (let elem of tableElems){
        elem.remove();
    }
})

function addHighScore(win, pl1, pl2){
    let player1 = prompt("Enter Player One Name: ");
    let player2 = prompt("Enter Player Two Name: ");
    let winner = win === 'p1' ? player1 : player2;
    if(!winner) winner = win === 'p1' ? 'player1' : 'player2';
    createElem(gameNumber, winner, pl1, pl2, selectValue);
    //return [player1, player2];
};