// Your code here
//function to store game summary data in local storage
function storeSummary (win, loss, tie){
    localStorage.setItem("wins", win);
    localStorage.setItem("losses", loss);
    localStorage.setItem("ties", tie);
}

//functions to restore summary data
function restoreWins(){
    var storedWins = localStorage.getItem("wins");
    if(storedWins){
       return storedWins;
    }
    else {
        return 0;
    }
}

function restoreLosses(){
    var storedLosses = localStorage.getItem("losses");
    if(storedLosses){
       return storedLosses;
    }
    else {
        return 0;
    }
}

function restoreTies(){
    var storedTies = localStorage.getItem("ties");
    if(storedTies){
       return storedTies;
    }
    else {
        return 0;
    }
}

//function to clear local storage
function clearSummary(){
    localStorage.removeItem("wins");
    localStorage.removeItem("losses");
    localStorage.removeItem("ties");
}

//Ensures that the dom is loaded before the scripts
window.addEventListener("DOMContentLoaded", event =>{
const checker = new Set();
let wins = 0;
let losses = 0;
let ties = 0;

//update summary data if it exists
wins = Number(restoreWins());
losses = Number(restoreLosses());
ties = Number(restoreTies());

//update summary display
const updateSummary = () => {
    summary.children[0].innerText=`Wins:${wins}`;
    summary.children[1].innerText=`Losses:${losses}`;
    summary.children[2].innerText=`Ties:${ties}`;
}

updateSummary();

//Game grid matrix
let matrix=[["", "", ""],
            ["", "", ""],
            ["", "", ""]];

const choose = ()=>{
//Allow player to choose X or O
    const h2Elem = document.createElement("h2");
    h2Elem.id="choose";
    h2Elem.innerHTML=`<p>Choose X or O </p>
                        <div id="btns">
                            <button id="btnx">X</button>
                            <button id="btno">O</button>
                        </div>`;
    document.body.children[1].appendChild(h2Elem);
}

choose();


//function to initialize game grid
const createGameGrid = () =>{

//removes the choice block after player makes a selection
    const choice = document.getElementById("choose");
    document.body.children[1].removeChild(choice);

    const cont = document.getElementById("container");
    cont.style.backgroundImage=`url("./media/tictactoe.jpg")`;

    for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){

            const newBlock = document.createElement("div");
            newBlock.className = "block";
            newBlock.id=`r${i}c${j}`
            document.getElementById("gameBox").appendChild(newBlock);

            newBlock.setAttribute(`data-gridblock`, `${i}${j}`);
        };
    };
};

//choose X or O
let player = "";

const btnO = document.getElementById("btno");
const btnX = document.getElementById("btnx");

btnO.addEventListener("click", ()=>{
    player="O";
    createGameGrid();
});

btnX.addEventListener("click", ()=>{
    player="X";
    createGameGrid();
});


//function to check winner
const checkWinner = (matrix)=>{
    let res="";

    for (let i=0; i<3; i++){

        //check for horizontal win
        if (matrix[i][0]===matrix[i][1]&&matrix[i][0]===matrix[i][2]&&matrix[i][0]!==""){
            res="win";
            return res;
        }
        //check for vertical win
        if(matrix[0][i]===matrix[1][i]&&matrix[0][i]===matrix[2][i]&&matrix[0][i]!==""){
            res="win";
            return res;
        }
    }

        //check for diagonal win
        if(matrix[0][0]===matrix[1][1]&&matrix[1][1]===matrix[2][2]&&matrix[1][1]!==""||matrix[0][2]===matrix[1][1]&&matrix[1][1]===matrix[2][0]&&matrix[1][1]!==""){
            res="win";
            return res;
        }

        //check if tie game
        let tie = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (matrix[i][j] === "") {
                    tie = false;
                    break;
                }
            }
        }

        if (tie) {
            res = "tie";
        }

        return res;
};

//let the computer play in an open space
const computerMove = (matrix, computer)=>{
    let player ="";

    if (computer==="X"){
        player = "O";
    }

    if (computer==="O"){
        player = "X";
    }

    let done=false;

    while(!done){

        //check if middle block is available
        if(matrix[1][1]===""){
            matrix[1][1]=computer;
            checker.add(`11`);
            done=true;
            return [1,1];
        }

        for (let i=0; i<3; i++){
                //check if 1 more move to win horizontal

                    console.log("horizontal case");

                    if (matrix[i][1]===matrix[i][2]&&matrix[i][1]===computer&&matrix[i][0]===""){
                        matrix[i][0]=computer;
                        checker.add(`${i}${0}`);
                        done=true;
                        return [i,0];
                    }

                    else if (matrix[i][0]===matrix[i][2]&&matrix[i][0]===computer&&matrix[i][1]===""){
                        matrix[i][1]=computer;
                        checker.add(`${i}${1}`);
                        done=true;
                        return [i,1];
                    }

                    else if(matrix[i][0]===matrix[i][1]&&matrix[i][0]===computer&&matrix[i][2]===""){
                        matrix[i][2]=computer;
                        checker.add(`${i}${2}`);
                        done=true;
                        return [i,2];
                    }


                //check if 1 more move to win vertical

                    console.log("vertical case");

                    if (matrix[1][i]===matrix[2][i]&&matrix[1][i]===computer&&matrix[0][i]===""){
                        matrix[0][i]=computer;
                        checker.add(`${0}${i}`);
                        done=true;
                        return [0,i];
                    }
                    else if (matrix[0][i]===matrix[2][i]&&matrix[0][i]===computer&&matrix[1][i]===""){
                        matrix[1][i]=computer;
                        checker.add(`${1}${i}`);
                        done=true;
                        return [1,i];
                    }

                    else if(matrix[0][i]===matrix[1][i]&&matrix[0][i]===computer&&matrix[2][i]===""){
                        matrix[2][i]=computer;
                        checker.add(`${2}${i}`);
                        done=true;
                        return [2,i];
                    }

        }

        //check if 1 more move to win diagonally

                    console.log("diagonal case");


                    if (matrix[0][0]===matrix[1][1]&&matrix[0][0]===computer&&matrix[2][2]===""){
                        matrix[2][2]=computer;
                        checker.add(`22`);
                        done=true;
                        return [2,2];
                    }

                    if (matrix[1][1]===matrix[2][2]&&matrix[1][1]===computer&&matrix[0][0]===""){
                        matrix[0][0]=computer;
                        checker.add(`00`);
                        done=true;
                        return [0,0];
                    }

                    if(matrix[0][0]===matrix[2][2]&&matrix[0][0]===computer&&matrix[1][1]===""){
                        matrix[1][1]=computer;
                        checker.add(`11`);
                        done=true;
                        return [1,1];
                    }

                    if(matrix[0][2]===matrix[1][1]&&matrix[0][2]===computer&&matrix[2][0]===""){
                        matrix[2][0]=computer;
                        checker.add(`20`);
                        done=true;
                        return [2,0];
                    }

                    if(matrix[1][1]===matrix[2][0]&&matrix[2][0]===computer&&matrix[0][2]===""){
                        matrix[0][2]=computer;
                        checker.add(`02`);
                        done=true;
                        return [0,2];
                    }


                    if(matrix[0][2]===matrix[2][0]&&matrix[0][2]===computer&&matrix[1][1]===""){
                        matrix[1][1]=computer;
                        checker.add(`11`);
                        done=true;
                        return [1,1];
                    }

            //check if opponent is going to win

            for(let i=0; i<3; i++){

                //horizontal
                    console.log("opponent horizontal case");

                    if (matrix[i][1]===matrix[i][2]&&matrix[i][1]===player&&matrix[i][0]===""){
                            matrix[i][0]=computer;
                            checker.add(`${i}${0}`);
                            done=true;
                            return [i,0];
                        }

                    else if (matrix[i][0]===matrix[i][2]&&matrix[i][0]===player&&matrix[i][1]===""){
                        matrix[i][1]=computer;
                        checker.add(`${i}${1}`);
                        done=true;
                        return [i,1];
                    }

                    else if(matrix[i][0]===matrix[i][1]&&matrix[i][0]===player&&matrix[i][2]===""){
                        matrix[i][2]=computer;
                        checker.add(`${i}${2}`);
                        done=true;
                        return [i,2];
                    }


                //vertical
                    console.log("opponent vertical case");

                        if (matrix[1][i]===matrix[2][i]&&matrix[1][i]===player&&matrix[0][i]===""){
                            matrix[0][i]=computer;
                            checker.add(`${0}${i}`);
                            done=true;
                            return [0,i];
                        }
                        else if (matrix[0][i]===matrix[2][i]&&matrix[0][i]===player&&matrix[1][i]===""){
                            matrix[1][i]=computer;
                            checker.add(`${1}${i}`);
                            done=true;
                            return [1,i];
                        }

                        else if(matrix[0][i]===matrix[1][i]&&matrix[0][i]===player&&matrix[2][i]===""){
                            matrix[2][i]=computer;
                            checker.add(`${2}${i}`);
                            done=true;
                            return [2,i];
                        }
            }

            //diagonal cases for blocking opponent

                console.log("opponent diagonal case");

                if (matrix[0][0]===matrix[1][1]&&matrix[0][0]===player&&matrix[2][2]===""){
                    matrix[2][2]=computer;
                    checker.add(`22`);
                    done=true;
                    return [2,2];
                }

                if (matrix[1][1]===matrix[2][2]&&matrix[1][1]===player&&matrix[0][0]===""){
                    matrix[0][0]=computer;
                    checker.add(`00`);
                    done=true;
                    return [0,0];
                }

                if(matrix[0][0]===matrix[2][2]&&matrix[0][0]===player&&matrix[1][1]===""){
                    matrix[1][1]=computer;
                    checker.add(`11`);
                    done=true;
                    return [1,1];
                }

                if(matrix[0][2]===matrix[1][1]&&matrix[0][2]===player&&matrix[2][0]===""){
                    matrix[2][0]=computer;
                    checker.add(`20`);
                    done=true;
                    return [2,0];
                }

                if(matrix[1][1]===matrix[2][0]&&matrix[2][0]===player&&matrix[0][2]===""){
                    matrix[0][2]=computer;
                    checker.add(`02`);
                    done=true;
                    return [0,2];
                }


                if(matrix[0][2]===matrix[2][0]&&matrix[0][2]===player&&matrix[1][1]===""){
                    matrix[1][1]=computer;
                    checker.add(`11`);
                    done=true;
                    return [1,1];
                }


        //make a random move in an available space
        const xCoord = Math.floor(Math.random()*3);
        const yCoord = Math.floor(Math.random()*3);

        console.log("random case");

        //console.log([xCoord, yCoord]);
        if (matrix[xCoord][yCoord]===""&&!checker.has(`${xCoord}${yCoord}`)){
            matrix[xCoord][yCoord]=computer;
            done=true;
            checker.add(`${xCoord}${yCoord}`);
            return[xCoord, yCoord];
        }
    }
};

//Show winner message
const displayWinner = ()=>{

    //updates wins, ties and losses
    const summary = document.getElementById("summary");

    updateSummary();

    storeSummary(wins, losses, ties);

    if(checkWinner(matrix)==="win" && !checker.has("gameover")){
        const newh2 = document.createElement("h2");
        newh2.id="winnerDisplay";
        newh2.innerText=`${winner} wins!`;
        const divCont = document.getElementById("container");
        document.body.insertBefore(newh2,divCont);
        checker.add("gameover");

        //remove the eventlistener
        gbox.removeEventListener("click",gameChecker);
    }

    if(checkWinner(matrix)==="tie" && !checker.has("gameover")){

        const newh2 = document.createElement("h2");
        newh2.id="winnerDisplay";
        newh2.innerText=`Tie!`;
        const divCont = document.getElementById("container");
        document.body.insertBefore(newh2,divCont);
        checker.add("gameover");
        //remove the eventlistener
        gbox.removeEventListener("click",gameChecker);
    }
}

//function controlling gameplay
const gameChecker = (e)=>{

        let selected = e.target.dataset.gridblock;
        const updatePlay = document.getElementById(`r${selected[0]}c${selected[1]}`);

        if(player==="X" && matrix[selected[0]][selected[1]]===""){
            updatePlay.style.backgroundImage = `url("./media/X.jpg")`;
            updatePlay.style.backgroundRepeat=`no-repeat`;
            updatePlay.style.backgroundPosition=`center`;
            matrix[selected[0]][selected[1]]="X";
            checker.add(`${selected[0]}${selected[1]}`);

            if(checkWinner(matrix)==="win"){
                winner="X";
                wins+=1;
                displayWinner();
            }

            else if(checkWinner(matrix)==="tie"){
                ties+=1;
                displayWinner();
            }

            else{
                const compMove = computerMove(matrix, "O");
                //console.log(compMove);

                const compUpdatePlay = document.getElementById(`r${compMove[0]}c${compMove[1]}`);
                compUpdatePlay.style.backgroundImage = `url("./media/O.jpg")`;
                compUpdatePlay.style.backgroundRepeat=`no-repeat`;
                compUpdatePlay.style.backgroundPosition=`center`;

                if(checkWinner(matrix)==="win"){
                    winner="O";
                    losses+=1;
                    displayWinner();
                }
                else if (checkWinner(matrix)==="tie") {
                    displayWinner();
                }
            }
        }

        if(player==="O" && matrix[selected[0]][selected[1]]===""){
            updatePlay.style.backgroundImage = `url("./media/O.jpg")`;
            updatePlay.style.backgroundRepeat=`no-repeat`;
            updatePlay.style.backgroundPosition=`center`;
            matrix[selected[0]][selected[1]]="O";
            checker.add(`${selected[0]}${selected[1]}`);

            if(checkWinner(matrix)==="win"){
                winner="O";
                wins+=1;
                displayWinner();
            }

            else if(checkWinner(matrix)==="tie"){
                ties+=1;
                displayWinner();
            }

            else {
                const compMove = computerMove(matrix, "X");
                //console.log(compMove);

                const compUpdatePlay = document.getElementById(`r${compMove[0]}c${compMove[1]}`);
                compUpdatePlay.style.backgroundImage = `url("./media/X.jpg")`;
                compUpdatePlay.style.backgroundRepeat=`no-repeat`;
                compUpdatePlay.style.backgroundPosition=`center`;

                if(checkWinner(matrix)==="win"){
                    winner="X";
                    losses+=1;
                    displayWinner();
                }

                else if (checkWinner(matrix)==="tie") {
                    displayWinner();
                }
            }

        }
    }

    //Check for when a player clicks in a box
        const gbox = document.getElementById("gameBox");
        let winner = "";
            gbox.addEventListener("click",gameChecker);



    //Start a new game
    const newGame = document.getElementById("newgame");
    newGame.addEventListener("click", ()=>{

        checker.clear();

        matrix=[["", "", ""],
                ["", "", ""],
                ["", "", ""]];

        // remove win message
        const h2Ele = document.getElementById("winnerDisplay");
        if(h2Ele){
            document.body.removeChild(h2Ele);
        }


        const cont = document.getElementById("container");
        cont.style.backgroundImage=``;

        //remove old game grid
        const temp=document.getElementById("gameBox");
        while (temp.firstChild) {
            temp.removeChild(temp.firstChild);
        }

        //reinitialise game event listener

        //choose X or O
        if(document.body.children[1].firstChild===null){
            choose();
        }


        const btnO = document.getElementById("btno");
        const btnX = document.getElementById("btnx");

        btnO.addEventListener("click", ()=>{
            player="O";
            createGameGrid();
        });

        btnX.addEventListener("click", ()=>{
            player="X";
            createGameGrid();
        });


        gbox.addEventListener("click",gameChecker);

    });

    //Give up
    const giveUp = document.getElementById("giveup");
    giveUp.addEventListener("click", ()=>{

        if (!checker.has("gameover")){
            const newh2 = document.createElement("h2");
            newh2.id="winnerDisplay";
            newh2.innerText=`You give up...Computer wins!`;
            const divCont = document.getElementById("container");
            document.body.insertBefore(newh2,divCont);
            checker.add("gameover");
            //remove the eventlistener
            gbox.removeEventListener("click",gameChecker);
        }
    });
    //reset summary scores
    const reset = document.getElementById("reset");
    reset.addEventListener("click", ()=>{
        clearSummary();
        wins = 0;
        losses = 0;
        ties = 0;
        updateSummary();
    });
});
