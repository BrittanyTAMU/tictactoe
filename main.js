// create the variables youll need
// select the cells class and assign it to the variable cells
// select the statusText ID and assign it to the variable statusText
// select the restart ID and assign it to the variable restart

const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('#statusText')
const restart = document.querySelector('#restart')

// create a const of all winning conditions, the winning conditions is a 2 array indicies
// if all 3 cells have the same character we will need to check that
// the first row will have index of [0,1,2]. The next row is [3,4,5], 
// and the last row has an index of [6,7,8]. 
// Then check horizontal with the index of [0,3,6], [1,4,7], [2,5,8]. 
// and then diagonal with an index of [0,4,8] and [2,4,6]

const winConditions = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// create an array of placeholders, name a variable called options. create 9 empty string for each cell.
let options = ['','','','','','','','','' ]
// create a var to keeptrack of currentPlayer
let currentPlayer = 'X'
// create a var to keeptrack of if the game is running
let running = false

// start the game by running the initializeGame func called below:
initializeGame()

// create a func to start the Game, name it initializeGame
// add addEventListener to the cells use forEach cell to add an addEventListener to each cell if its clicked on and run the func cellClicked
// add addEventListener to the restart button and run the restartGame function
// update the variable statusText which tells you whos turn it is or if someone won
// when the game is initialized, change the running var to true

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restart.addEventListener('click', restartGame)
    statusText.textContent = `${currentPlayer}'s turn`
    running=true

}

// create a func to , name it cellClicked
// when we click on a cell, we need to create a var called cellindex, set it equals to "this.getAttribute"  "this" referes to whatever cells we clicked on and getAttribute will just grab the cell index from the div tags in the html
// we have the index Number, now check to see if that index number within our options rray is not empty, we'll only want to update a cell if theres nothing there
// if our options array at cellindex doesnt equal an empty space or the game isnt running then return and not do anything

// else, run the updateCell function and pass in "this" and "cellindex" as an arguement. 
// also run the checkWinner function 

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex')
    if(options[cellIndex] != "" || !running){
        return
    }
    updateCell(this, cellIndex)
    
    checkWinner()

}

//  create a func to updateCell Game, name it updateCell
// take options at the index parameter and set it equal to currentPlayer. becuase we need to update our placeholders
// then change the text content of the cells(whichever cell we clicked on orginally) to current player

function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer

}

// create a func to change the player after current player has moved, name it changePlayer
// take the current player and pass in a ternary operator where if change player is equal to X, we will reassign our current player with O. if Not, reassign it using X
// change the text of the statusText to describe whos turn it it

function changePlayer(){
    currentPlayer = (currentPlayer === 'X') ? 'O': 'X'
    statusText.textContent = `${currentPlayer}'s turn`

}

//  create a func to checkWinner, name it checkWinner
// create a temp variable of roundWon and set it equal to false,
// if someone wins itll flip to true
// create a for loop to iterate over all the winConditions within the array of winConditions
// let i = 0, and well continue that as long as i is less that winConditions length, and well increase by 1
// store each array in the winConditions as a temp var called condition
// each row will have 3 index's, so create 3 vars for each row and name it cellA, cellB, cellC
// where cellA equals the options at condition index 0 (condition[0])
// where cellB equals the options at condition index 1 (condition[0])
// where cell equals the options at condition index 2 (condition[0])
// basically, if the row is not spaces and they're all contain the same letter (either X or O) then we will have a winner
// if there is no winner in that row, run the next set of conditions (cellB) and check for a winner in that row
// repeat the process for each set of win conditions
// check for empty spaces by running an if statement so if cellA/cellB or cellC = '' continue to skip the iteration
// if there are no empty spaces then the spaces are full, lets check if the cells are all the same Character, so run another if function
// if cellA/cellB and CellC equal each other, run function roundWon to be true and break the iteration
// if roundWon is true, update the statusText to tell the user which player is the Winner and set running to false to stop the Game
// else if the roundWon isnt true, and its a draw, check if the options with the includes method and check for any spaces, basically, does our array not include any spaces, if thats true, then update the statusText to Draw! and running = false.
// otherwise run the function changePlayer 



function checkWinner(){
    let roundWon = false

    for(let i = 0; i< winConditions.length; i++){
        const condition = winConditions [i]
        const cellA = options [ condition[0]]
        const cellB = options [ condition[1]]
        const cellC = options [ condition[2]]

        if(cellA === ''|| cellB === '' || cellC === ''){
            continue
        }

        if(cellA === cellB && cellB === cellC){
            roundWon = true
            break
        }

    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`
        running = false
    }
    else if((!options.includes(''))){
        statusText.textContent = `Draw!`
        running = false
    }
    else{
        changePlayer()
    }

}

//  create a func to restart the Game, name it restartGame
// take current player as default (X)
// reset our options as the empty strings
// reset our statusText to say currentPlayer turns
// clear each cell with the forEach method fr each cell change the textContent to an empty string
// set running to true
function restartGame(){
    currentPlayer = 'X'
    options = ['','','','','','','','','' ]
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = '')
    running = true
}