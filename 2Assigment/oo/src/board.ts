export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type Piece<T> = {
    value: T,
    position: Position;
};
export type BoardEvent<T> = [];

export type BoardListener<T> = {};

export class Board<T> {
    width: number;
    height: number;

    pieces : Piece<T>[] = [];

    constructor(generator: Generator<T>, columns: number, rows: number) {
        this.width = columns;
        this.height = rows;

        this.initBoard(generator);
    }
    private initBoard(generator: Generator<T>) {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.pieces.push({
                    value: generator.next(),
                    position: { row, col }
                });
            }
        }
    }
    private findPosition(p:Position){
        return this.pieces.find((piece) => {
            return (piece.position.row === p.row && piece.position.col === p.col);
        })
    }
    private findPositionOutside(p:Position):boolean{
        if(p.col >= this.width || p.col < 0){
            return false;
        }
        if(p.row >= this.height || p.row < 0){
            return false;
        }
        return true;
    }
    private countPiecesinArray(array : Piece<T>[]): {} {
        const result = {} as any;
        array.forEach((piece) => {
            if(result[piece.value]){
                result[piece.value] += 1;
            }else{
                result[piece.value] = 1;
            }
        });
        return result;

    }
    private swapPieces(first: Position, second: Position) {
        const firstPiece = this.findPosition(first);
        const secondPiece = this.findPosition(second);
        const firstindex = this.pieces.indexOf(firstPiece);
        const secondindex = this.pieces.indexOf(secondPiece);
        const firstPieceValue = firstPiece.value;
        const secondPieceValue = secondPiece.value;
        this.pieces[firstindex].value = secondPieceValue;
        this.pieces[secondindex].value = firstPieceValue;
    }
    private findMatchInRow(row?: number){
        if(row > this.height){
            return[];
        }
        if(!row){
            row = 0;
        }
        const piecesInRow = this.pieces.filter((piece) => {
            return piece.position.row === row;
        });
        const pieces = this.countPiecesinArray(piecesInRow);

        let matchFound = false;
        for (const piece in pieces) {
            if (pieces[piece] >= 3) {
                    matchFound = true;
            }
        }
        return matchFound;
    }
    private isMovePossible(first: Position, second: Position): boolean {
        if(!this.findPositionOutside(first) || !this.findPositionOutside(second)){
            return false;
        }
        if(first.row === second.row && first.col === second.col){
            return false;
        }
        if(first.row !== second.row && first.col !== second.col){
            return false;
        }
        if(first.col === second.col){
            this.swapPieces(first, second);
            const isFirstRowMatch = this.findMatchInRow(first.row);
            const isSecondRowMatch = this.findMatchInRow(second.row);
            if(!isFirstRowMatch && !isSecondRowMatch){
                return false;
            }
        }
        return true;
    }

    addListener(listener: BoardListener<T>) {
    }

    piece(p: Position): T | undefined {
        if(!this.findPositionOutside(p)){
            return undefined;
        }
        return this.findPosition(p).value;
    }

    canMove(first: Position, second: Position): boolean {
        return this.isMovePossible(first, second);
    }
    
    move(first: Position, second: Position) {
       
    }
}
