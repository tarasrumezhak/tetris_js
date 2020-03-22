document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    // case DOWN:
    //   if (!getCurrentObject()) {
    //     let randomObject = Object.assign({}, possibleObjects[Math.floor(Math.random() * possibleObjects.length)]);
    //     objects.push(randomObject);
    //   }
    //   moveDown(getCurrentObject());
    //   break;
    case LEFT:
      moveLeft(getCurrentObject());
      break;
    case RIGHT:
      moveRight(getCurrentObject());
      break;
    case PAUSE:
      pauseGame();
      break;
    // case ROTATE:
    //   rotate();
      break;
    default:
      break;
  }
});