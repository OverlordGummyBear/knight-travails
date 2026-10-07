
function possibleMoves(x, y){
    let moves = []

    let possibleMoves = [[2,1], [2,-1], [-2,1], [-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

    for(let i = 0; i < possibleMoves.length; i++){
        let newX = x + possibleMoves[i][0];
        let newY = y + possibleMoves[i][1];

        if(0 <= newX && newX <= 7 && 0 <= newY && newY <= 7)
            moves.push([newX, newY])
    }

    return moves
}

function knightMoves(start, end){
    //checking whether any x or y in a coordinate is lower or above the bound
    if(!(0 <= start[0] && start[0] <= 7 && 0 <= start[1] && start[1] <= 7)
        || !(0 <= end[0] && end[0] <= 7 && 0 <= end[1] && end[1] <= 7)
    )
        throw new Error("coordinates cannot be lower than [0,0] or higher than [7,7]");
    
    let parent = 0;
    let visited = new Set([]); //make sure the same nodes are not processed again

    let moveTree = []; //keep a track of coordinates and parents of each square processed
    let queue = [[start, -1]] //populate queue with start coordinates

    while(queue.length > 0){
        let currentNode = queue.shift();

        moveTree.push([currentNode[0], currentNode[1]])
        visited.add(`${currentNode[0][0]},${currentNode[0][1]}`)

        //Break if the end node is reached (shortest path has been found)
        if(currentNode[0][0] === end[0] && currentNode[0][1] === end[1]){
            break;
        }

        //Generate all possible moves in the current position
        let potentialMoves = possibleMoves(currentNode[0][0], currentNode[0][1]);

        //Add each possible move if the square haven't been visited
        potentialMoves.forEach(move => {
            if(!visited.has(`${move[0]},${move[1]}`))
                queue.push([move, parent])
        });

        parent++;
    }

    //Retrace the coordinate of the shortest path
    let shortestPath = [];
    let currentNodeInShortestPath = moveTree[moveTree.length-1];
    let nodeCoordinates = currentNodeInShortestPath[0]
    let nodeParent = currentNodeInShortestPath[1];

    while(nodeParent !== -1){
        shortestPath.unshift(nodeCoordinates)

        currentNodeInShortestPath = moveTree[nodeParent];
        nodeCoordinates = currentNodeInShortestPath[0];
        nodeParent = currentNodeInShortestPath[1];
    }

    //Add the start square to the shortestPath array
    shortestPath.unshift(moveTree[0][0])

    return shortestPath;
}

let knight0077 = knightMoves([0,0],[7,7]);
console.log("Knight reach a total of " + knight0077.length + " squares from [0,0] to [7,7]")
console.log(knight0077);