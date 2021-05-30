let maze1 = [

  ['#','#','#','#','#','#','#','#','#'],

  ['#','+','+','+','#','+','+','+','#'],

  ['#','+','#','+','#','+','#','+','#'],

  ['+','+','#','+','0','+','#','+','#'],

  ['#','#','#','+','#','#','#','#','#'],

  ['#','#','+','+','#','#','#','#','#'],

  ['#','#','+','#','#','#','#','#','#'],

  ['#','#','#','#','#','#','#','#','#'],

];




function wayOut(maze) {

  let path = [];

  let columns = maze[0].length;
  let rows = maze.length;

  class Node {
    constructor(parent = null, position = null, step = null) {
      this.parent = parent;
      this.position = position; //[y,x]
      this.id = position[0].toString() + position[1].toString();
      this.step = step;
    }
  }

  let startNodePos;

  maze.forEach((row, i) => {

    for (let nodeIndex = 0; nodeIndex < row.length; nodeIndex++) {

      if (row[nodeIndex] === '0') {
        startNodePos = [i, nodeIndex];
        return
      }

    }
  });

  let startNode = new Node(null, startNodePos, null);

  let yetToVisitList = [];
  let visitedList = [];

  yetToVisitList.push(startNode);

  const move = [
    [-1, 0, 'up'],
    [0, -1, 'left'],
    [1, 0, 'down'],
    [0, 1, 'right']
  ];


  while (yetToVisitList.length > 0) {

    let curNode = yetToVisitList[0];

    if ((curNode.position[0] >= (rows - 1)) ||
      (curNode.position[0] <= 0) ||
      (curNode.position[1] >= (columns - 1)) ||
      (curNode.position[1] <= 0)) {
      let current = curNode;
      while (current.parent) {
        path.unshift(current.step);
        current = current.parent;
      }
      break
    }

    yetToVisitList.splice(0, 1);

    visitedList.push(curNode);



    for (let step of move) {
      var nodePosition = [(curNode.position[0] + step[0]),
        (curNode.position[1] + step[1])
      ];

      if (curNode.parent && (nodePosition[0] === curNode.parent.position[0] && nodePosition[1] === curNode.parent.position[1])) {
        continue
      }


      if ((maze[nodePosition[0]][nodePosition[1]]) === '#') {
        continue
      }

      if ((maze[nodePosition[0]][nodePosition[1]]) === '+') {
        var newNode = new Node(curNode, nodePosition, step[2]);
      }

      function inVisitedList(visitedNode, i) {
        return visitedNode.id === newNode.id;
      }

      if (visitedList.some(inVisitedList)) {
        continue
      }

      yetToVisitList.push(newNode);
    }

  }
  return path.length>0?path:'path not found';
}


wayOut(maze1);

console.log(wayOut(maze1));
