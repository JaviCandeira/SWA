import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "../model/board";

export interface GamePlay{
    selectedPiece: Position | undefined;
    message : string;
    matches : Position[];
    calculatingMove : boolean;
}

const initialState: GamePlay = {
    selectedPiece: undefined,
    message: '',
    matches: [],
    calculatingMove: false
};

export const gamePlaySlice = createSlice({
    name: 'gamePlay',
    initialState,
    reducers: {
        setSelectedPiece: (state : GamePlay, action: PayloadAction<Position | undefined>) => {
            state.selectedPiece = action.payload ? {row : action.payload.row, col: action.payload.col} : undefined;
        },
        setMessage: (state : GamePlay, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setMatches: (state : GamePlay, action: PayloadAction<Position[]>) => {
            state.matches.push(...action.payload);
        },
        clearMatches: (state : GamePlay) => {
            state.matches = [];
        },
        setCalculatingMove: (state : GamePlay, action: PayloadAction<boolean>) => {
            state.calculatingMove = action.payload;
        }
    }
});

export const { setSelectedPiece, setMessage, setMatches, clearMatches, setCalculatingMove } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;