document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]
    //The tertrominoes
    const lTetrimino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetrimino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    //randomly select a tertromino and its first rotations
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw retromino
    function draw() {
        //simply draws the given block
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    //undraw the tetromino
    function undraw() {
        //does the oppsite undraws the block
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }
      
    //make the tetromino move down every second
    //timerId = setInterval(moveDown, 1000)

    //assigne function to keycodes for movement
    function control(e) {
        //each diffrent number equals an arrow key...
        if(e.keyCode === 37) {
            moveLeft()
        } else if(e.keyCode === 38) {
            rotate()
        } else if(e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }

    }
    document.addEventListener('keyup',control)

    //move down function (move the blocks down from top of grid)
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freez function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            //start new block falling:
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }


    //move the block left, unless at the edge of gird or there is a blockage
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    }

    //move the block right
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }

        draw()
    }


    //rotate the block
    function rotate() {
        undraw()
        currentRotation ++

        //if current roation is 4 make it 0
        if(currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }


    //show next block on mini grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    

    //the blocks without rotation
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //ltetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //ztetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //ttetromino
        [0, 1, displayWidth, displayWidth+1], //otetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // itetromino
    ]

    //display the blcok in the mini-grid
    function displayShape() {
        //remove any trace of a block form the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }



    //add functionality to the button
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        }else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()* theTetrominoes.length)
            displayShape()
        }
    })

    //add score
    function addScore() {
        //once the blocks take up a certian amount of space the blocks are deleted then the score is added via + 10
        for( let i = 0; i < 199; i+=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squareRemoved = squares.splice(i, width)
                squares = squareRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    //gameover
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            //displays game over text. to the webpage (where the h3 tag for displaying the score is.)
            scoreDisplay.innerHTML = 'game over'  
            clearInterval(timerId)
        }
    }
 })