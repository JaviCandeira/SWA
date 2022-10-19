export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}    

export type Match<T> = {
    matched: T,
    positions: Position[]
}    

export type Board<T> = {
    width : number,
    height : number,
    content : T[][]
};

export type Effect<T> = {
    kind: string,
    match?: Match<T>,
    board?: Board<T>
};

export type MoveResult<T> = {
    board: Board<T>,
    effects: Effect<T>[]
}    

function getMatches<T>(board: Board<T>): Match<T>[] {
    const matches: Match<T>[] = [], match:Match<T> = { matched: undefined, positions: [] };
    for (let row = 0; row < board.height; row++) {
        for (let col = 0; col < board.width -1; col++) {
            if (board.content[row][col] === board.content[row][col+1]) {
                if(match.positions.length > 0 ? (!(JSON.stringify(match.positions[match.positions.length-1]) === JSON.stringify({row: row, col: col}))) : true) {
                    match.positions.push({row: row, col: col});
                }
                match.matched = board.content[row][col];
                match.positions.push({row: row, col: col+1});
            } else{
                match.positions.length <3 ? match.positions = [] : (matches.push({...match}), match.positions = [])
            }
        }
        match.positions.length <3 ? match.positions = [] : (matches.push({...match}), match.positions = [])
    }
    for (let col = board.width -1; col >= 0; col--) {
        for (let row = 0; row < board.height -1; row++) {
            if (board.content[row][col] === board.content[row+1][col]) {
                if(match.positions.length > 0 ? (!(JSON.stringify(match.positions[match.positions.length-1]) === JSON.stringify({row: row, col: col}))) : true) {
                    match.positions.push({row: row, col: col});
                }
                match.matched = board.content[row+1][col];
                match.positions.push({row: row+1, col: col});
            } else{
                match.positions.length <3 ? match.positions = [] : (matches.push({...match}), match.positions = [])
            }
        }
        match.positions.length <3 ? match.positions = [] : (matches.push({...match}), match.positions = [])
    }
    return matches;
}

function handleMatches<T>(matches : Match<T>[],nBoard:Board<T>, generator : Generator<T>, effects : Effect<T>[]) {
    matches.forEach(match => {
        effects.push({kind: 'Match', match: match})
        match.positions.forEach(position => {
            nBoard.content[position.row][position.col] = null;
        });
    });
    for (let i : number = nBoard.height -1; i >= 0; i--) {
        for (let j : number = 0; j < nBoard.width; j++) {
            if(!nBoard.content[i][j]) {
                for (let k : number = i; k > 0; k--) {
                    nBoard.content[i][j] = nBoard.content[k-1][j];
                    nBoard.content[k-1][j] = null;
                    if(nBoard.content[i][j]) {
                        break;
                    }
                }
            }
        }
    }
    for (let i = nBoard.height -1; i >= 0; i--) {
        for (let j = 0; j < nBoard.width; j++) {
            if(!nBoard.content[i][j]) {
                nBoard.content[i][j] = generator.next();
            }
        }
    }

    effects.push({kind: 'Refill', board: nBoard})

    if(getMatches(nBoard).length !== 0) {
       return handleMatches(getMatches(nBoard), nBoard, generator, effects);
    }else{
        return effects;
    }
}
export function create<T>(generator: Generator<T>, width: number, height: number): Board<T> {
    let content : T[][] = []
    for (let row = 0; row < height; row++) {
        content[row] = []
        for (let col = 0; col < width; col++) {
            content[row][col] = generator.next()
        }
    }
    return {width : width, height : height, content : content}
}    

export function piece<T>(board: Board<T>, p: Position): T | undefined {
    return board.content[p.row] ? board.content[p.row][p.col] : undefined
}    

export function canMove<T>(board: Board<T>, first: Position, second: Position): boolean {
    if(piece(board, first) && piece(board, second)) {
        if(first.row === second.row || first.col === second.col) {
            const nBoard: Board<T> = JSON.parse(JSON.stringify(board)) as typeof board;
            nBoard.content[first.row][first.col] = piece(board, second);
            nBoard.content[second.row][second.col] = piece(board, first);
            if(getMatches(nBoard).length > 0) {
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
}

export function move<T>(generator: Generator<T>, board: Board<T>, first: Position, second: Position): MoveResult<T> {
    if(canMove(board,first,second)){
        const nBoard: Board<T> = JSON.parse(JSON.stringify(board)) as typeof board;
        nBoard.content[first.row][first.col] = piece(board, second);
        nBoard.content[second.row][second.col] = piece(board, first);
        return {board : {...nBoard}, effects : handleMatches(getMatches(nBoard), nBoard,generator, [])};
    }
    return {board : board, effects :[]};
}
