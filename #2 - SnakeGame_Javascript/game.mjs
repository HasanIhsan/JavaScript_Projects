import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.mjs'
import { update as updateFood, draw as drawFood} from './food.mjs'
import {outsideGrid} from './grid.mjs'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime)
{
    if(gameOver)
    {
      if(confirm('you lost press ok to restart')) {
        window.location = '/'
      }
      return
    }
    window.requestAnimationFrame(main)
   
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
   
    
    lastRenderTime = currentTime

    update()
    draw()
   
}

window.requestAnimationFrame(main)


function update() 
{
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() 
{
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() 
{
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}