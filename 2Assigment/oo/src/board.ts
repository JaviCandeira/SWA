export type Generator<T> = { next: () => T };

export type Position = {
  row: number;
  col: number;
};

export type Match<T> = {
  matched: T;
  positions: Position[];
};

export type BoardEvent<T> = {
  kind: string;
  match?: Match<T>;
};

export type BoardListener<T> = (e: BoardEvent<T>) => any;

export class Board<T> {
  width: number;
  height: number;

  pieces: T[][];
  generator: Generator<T>;
  listener: BoardListener<T>;

  constructor(generator: Generator<T>, columns: number, rows: number) {
    this.width = columns;
    this.height = rows;
    this.generator = generator;
    this.pieces = [];
    for (let row = 0; row <= this.height - 1; row++) {
      this.pieces[row] = [];
      for (let col = 0; col <= this.width - 1; col++) {
        this.pieces[row][col] = generator.next();
      }
    }
  }

  private getMatches(board: Board<T>): Match<T>[] {
    const matches: Match<T>[] = [],
      match: Match<T> = { matched: undefined, positions: [] };
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width - 1; col++) {
        if (board.pieces[row][col] === board.pieces[row][col + 1]) {
          if (
            match.positions.length > 0
              ? !(
                  JSON.stringify(
                    match.positions[match.positions.length - 1]
                  ) === JSON.stringify({ row, col })
                )
              : true
          ) {
            match.positions.push({ row: row, col: col });
          }
          match.matched = board.pieces[row][col + 1];
          match.positions.push({ row: row, col: col + 1 });
        } else {
          match.positions.length < 3
            ? (match.positions = [])
            : (matches.push({ ...match }), (match.positions = []));
        }
      }
      match.positions.length < 3
        ? (match.positions = [])
        : (matches.push({ ...match }), (match.positions = []));
    }
    for (let col = board.width - 1; col >= 0; col--) {
      for (let row = 0; row < board.height - 1; row++) {
        if (board.pieces[row][col] === board.pieces[row + 1][col]) {
          if (
            match.positions.length > 0
              ? !(
                  JSON.stringify(
                    match.positions[match.positions.length - 1]
                  ) === JSON.stringify({ row, col })
                )
              : true
          ) {
            match.positions.push({ row: row, col: col });
          }
          match.matched = board.pieces[row + 1][col];
          match.positions.push({ row: row + 1, col: col });
        } else {
          match.positions.length < 3
            ? (match.positions = [])
            : (matches.push({ ...match }), (match.positions = []));
        }
      }
      match.positions.length < 3
        ? (match.positions = [])
        : (matches.push({ ...match }), (match.positions = []));
    }
    return matches;
  }
  private handleMatches<T>() {
    const matches = this.getMatches(this);
    matches.forEach((match) => {
      if (this.listener) {
        this.listener({ kind: "Match", match: match });
      }
      match.positions.forEach((pos) => {
        this.pieces[pos.row][pos.col] = null;
      });
    });
    for (let i = this.height - 1; i >= 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (this.pieces[i][j]) {
          for (let k = i; k > 0; k--) {
            this.pieces[i][j] = this.pieces[k - 1][j];
            this.pieces[k - 1][j] = null;
            if (this.pieces[i][j]) {
              break;
            }
          }
        }
      }
    }
    for (let row = this.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (!this.pieces[row][col]) {
          this.pieces[row][col] = this.generator.next();
        }
      }
    }
    if (this.listener) {
      this.listener({ kind: "Refill" });
    }
    if (this.getMatches(this).length !== 0) {
      return this.handleMatches();
    }
  }
  addListener(listener: BoardListener<T>) {
    this.listener = listener;
  }

  piece(p: Position): T | undefined {
    return this.pieces[p.row] ? this.pieces[p.row][p.col] : undefined;
  }

  canMove(first: Position, second: Position): boolean {
    if (this.piece(first) && this.piece(second)) {
      if (first.row === second.row && first.col === second.col) {
        const nBoard: Board<T> = JSON.parse(JSON.stringify(this)) as Board<T>;
        nBoard.pieces[first.row][first.col] = this.piece(second);
        nBoard.pieces[second.row][second.col] = this.piece(first);
        if (this.getMatches(nBoard).length > 0) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }

  move(first: Position, second: Position) {
    if (this.canMove(first, second)) {
      const temp = this.piece(first);
      this.pieces[first.row][first.col] = this.piece(second);
      this.pieces[second.row][second.col] = temp;
      this.handleMatches();
    }
  }
}
