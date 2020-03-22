var playground = createPlayground();

var isPaused = false;

console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down');
  var currentObject = obj;

  var limit = false;
  for (let i = 0; i < currentObject.position.length; ++i) {
    let pos1 = currentObject.position[i][0],
        pos2 = currentObject.position[i][1];

    if (pos1 === 0 || (!isArrayInArray(currentObject.position, [pos1 - 1, pos2]) && !checkEntry(pos1 - 1, pos2))) {

      if (pos1 - 1 > 7) {
        console.log("Game over!");
        clearInterval(gameInterval);
        return;
      }
      limit = true;
    }
  }
  if (!limit && currentObject.state === 'falling') {
    currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)));
    playground = createPlayground();
    renderPlayground();
  } else {
    currentObject.state = 'static';
    playground = createPlayground();
    renderPlayground();
  }
}

function isArrayInArray(x, check) {
  for (let i = 0, len = x.length; i < len; i++) {
    if (x[i][0] === check[0] && x[i][1] === check[1]) {
      return true;
    }
  }
  return false;
}

function checkEntry(i, j) {
  return playground[i][j] === undefined;
}

function moveRight(obj) {
  // console.log('moving right');
  // let currentObject = getCurrentObject();
  let currentObject = obj;
  // console.log("Move right type: ", currentObject.type);

  if (Math.max.apply(Math, currentObject.position.map(position => position[1])) < 4) {
    var limit = false;
    for (let i = 0; i < currentObject.position.length; ++i) {
      let pos1 = currentObject.position[i][0],
          pos2 = currentObject.position[i][1];
      if (!isArrayInArray(currentObject.position, [pos1, pos2+1]) && !checkEntry(pos1, pos2+1)) {
        limit = true;
      }
    }
    if (!limit) {
      currentObject.position.forEach(position => (position[1] < 5 && (position[1] += 1)));
      // console.log("Here right: ", currentObject.position);
      // console.log(currentObject);
      playground = createPlayground();
      renderPlayground();
    }
    else {
      // console.log("Right element bound");
    }

  } else {
    // console.log("Limit", currentObject.position, currentObject.position[0][1], currentObject.position[1][1], currentObject.position[2][1], currentObject.position[3][1]);
    // console.log("Limit2", currentObject.position, Math.max.apply(Math, currentObject.position.map(position => position[1])));
    // console.log("Right bound limit");
  }

}

function moveLeft(obj) {
  // console.log('moving left');
  // let currentObject = getCurrentObject();
  var currentObject = obj;
  // console.log(currentObject);
  if (Math.min.apply(Math, currentObject.position.map(position => position[1])) > 0) {
    var limit = false;
    for (let i = 0; i < currentObject.position.length; ++i) {
      let pos1 = currentObject.position[i][0],
          pos2 = currentObject.position[i][1];
      if (!isArrayInArray(currentObject.position, [pos1, pos2-1]) && !checkEntry(pos1, pos2-1)) {
        limit = true;
      }
    }
    if (!limit) {
      currentObject.position.forEach(position => (position[1] > 0 && (position[1] -= 1)));

      playground = createPlayground();
      renderPlayground();
    }
    else {
      // console.log("Left element limit");
    }

  } else {
    // console.log("Left bound limit");
  }
}

function moveOnDelete(objects) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects[i].position.length; j++) {
      objects[i].position[j][0]-=1;
    }
  }
}

function checkRows() {
  console.log("Checking rows");
  // console.log(playground);
  for (let i = 0; i < playground.length; i++) {
    let coloredCount = 0;
    for (let j = 0; j < playground[i].length; j++) {
      if (!checkEntry(i, j)) {
        coloredCount++;
      }
    }
    if (coloredCount === 5) {
      // console.log("yeees");
      objects.forEach(element => {
        element.position = element.position.filter(coords => coords[0] !== i);
      });
      moveOnDelete(objects);
      playground = createPlayground();
      renderPlayground();
      return;
    }


  }
  playground = createPlayground();
  renderPlayground();
}

function pauseGame() {
  if (!isPaused) {
    console.log('pausing the game');
    clearInterval(gameInterval);
    isPaused = true;
  }
  else {
    console.log('continuing the game');
    isPaused = false;
    main();
  }

}

function createObj(type, positions) {
  console.log("Creating new object!");
  // let type = Object.keys(TYPE_COLORS)[Math.floor(Math.random() * Object.keys(TYPE_COLORS).length)];
  //
  // let positions = JSON.parse(JSON.stringify(INITIAL_POSITIONS));
  let object = {type: type, state: 'falling', position: positions};

  objects.push(object);
  return object;
  // let randomObject = Object.assign({}, possibleObjects[Math.floor(Math.random() * possibleObjects.length)]);
  // objects.push(randomObject);
}


// function rotate() {
//   console.log("Rotating the object");
//   let currentObject = getCurrentObject();
//   let pivot = currentObject.position[0];
//   pivot[1]+=1;
//   const flipMatrix = matrix => (
//       matrix[0].map((column, index) => (
//           matrix.map(row => row[index])
//       ))
//   );
//   const rotateMatrix = matrix => (
//       flipMatrix(matrix.reverse())
//   );
//   let abstractMatrix = new Array(3).map(el => new Array(3).fill(0));
//
//   let abstractMatrixL = [[0,0,0],
//                          [1, 0, 0],
//                           [1,1,1]];
//
//   abstractMatrixL = rotateMatrix(abstractMatrixL);
//
//   let positions = [];
//   for (let i = 0; i < abstractMatrixL.length; i++) {
//     for (let j = 0; j < abstractMatrixL[i].length; j++) {
//       if (abstractMatrixL[i][j] === 1) {
//         positions.push([pivot-])
//       }
//
//
//     }
//
//   }
//
//
//   playground = createPlayground();
//   renderPlayground()
// }



renderPlayground();
var gameInterval;

// interval 1 second
function main() {
  gameInterval = setInterval(() => {
    if (getCurrentObject() === undefined) {
      // let randomObject = Object.assign({}, possibleObjects[Math.floor(Math.random() * possibleObjects.length)]);
      // let type = Object.keys(TYPE_COLORS)[Math.floor(Math.random() * Object.keys(TYPE_COLORS).length)];
      // let positions = INITIAL_POSITIONS[type];
      // let type = Object.keys(TYPE_COLORS)[-1];
      // let positions = INITIAL_POSITIONS[type];
      // createObj(type, 'falling', positions);
      createObj("1", [[10,2]]);
      // createObj("L", [[9, 1], [8, 1], [8, 2], [8, 3]]);
      // createObj();
      // createObj("T", 'falling', [[9, 2], [9, 3], [9, 4], [8, 3]]);
      checkRows();
    } else {
      moveDown(getCurrentObject());
    }


    // console.log("Objects: ", objects);


    // console.log("Playground: ", playground);
    console.log("Objects: ", objects);
    playground = createPlayground();
    renderPlayground();

  }, 500);
}

main();
