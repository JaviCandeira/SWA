import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RandomGenerator } from "../components/Board";
import { Board } from "../model/board";
import * as BoardModel from '../model/board'
export interface Game {
    user: number;
    id: number;
    board: Board<string>;
    score: number;
    nrOfMoves: number;
    targetScore: number;
    completed: boolean;
}
const generator : RandomGenerator = new RandomGenerator("♥,♦,♣,♠");
const initBoard = BoardModel.create(generator,5,5);
BoardModel.handleMatches(BoardModel.getMatches(initBoard),initBoard,generator, []);

const initialState: Game = {
    user: 0,
    id: 0,
    board: initBoard,
    score: 0,
    nrOfMoves: 20,
    targetScore: 100,
    completed: false
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame: (state: Game, action: PayloadAction<Game>) => {
            state = {...state}
            for(let keys in state) {
                if(action.payload[keys] && state[keys] !== action.payload[keys]) {
                    state[keys] = action.payload[keys];
                }
            }
            return state;
        }, setBoard: (state: Game, action: PayloadAction<Board<string> | undefined>) => {
            state.board = { ...action.payload };
        },
        increaseScore: (state: Game, action: PayloadAction<number>) => {
            state.score += action.payload;
        },
        decreaseMoves: (state: Game) => {
            --state.nrOfMoves;
        },
        endGame: (state: Game) => {
            state.completed = true;
        },
        startGame: (state: Game) => {
            state.completed = false;
        }
    }
});

export const { setGame, setBoard, increaseScore, decreaseMoves, endGame, startGame } = gameSlice.actions;
export default gameSlice.reducer;