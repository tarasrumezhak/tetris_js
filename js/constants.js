const TYPE_COLORS = {
  "L": 'red',
  "T": 'purple',
  "I": 'green',
  "1": 'yellow',

};

const INITIAL_POSITIONS = {
  "L": [[9, 1], [8, 1], [8, 2], [8, 3]],
  "T": [[9, 2], [9, 3], [9, 4], [8, 3]],
  "I": [[9, 2], [8, 2], [7, 2]],
  "1": [[9, 2]],
};

// const PIVOTS = {
//   "L": [[9, 1], [8, 1], [8, 2], [8, 3]],
//   "T": [[9, 2], [9, 3], [9, 4], [8, 3]],
//   "I": [[9, 2], [8, 2], [7, 2]],
//   "1": [[9, 2]],
// };

// Event keys
const DOWN  = 40;
const LEFT  = 37;
const RIGHT = 39;
const PAUSE = 32;
const ROTATE = 16;