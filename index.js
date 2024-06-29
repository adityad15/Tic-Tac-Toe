const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gamer-info");
const newGame = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winPos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    })

}

initGame();  

boxes.forEach((box, index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

function swapPlayer(){
    if(currPlayer === "X"){
        currPlayer = "O";
    } else {
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkWin(){
    let ans = "";
    winPos.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
                if(gameGrid[position[0]] === "X"){
                    ans = "X";
                } else {
                    ans = "O";
                }
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGame.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !!!";
        newGame.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap player
        swapPlayer();
        //check victory
        checkWin();
    }
}

newGame.addEventListener("click", initGame);