import React, {useEffect, useState} from "react";

import { Generator } from '../model/board'
import * as BoardModel from '../model/board'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    setSelectedPiece,
    setMessage,
    setMatches,
    clearMatches,
    setCalculatingMove,
} from '../features/playService';
import {
    setGame,
    setBoard,
    increaseScore,
    decreaseMoves,
    endGame,
    Game, startGame
} from '../features/gameService'
import './Board.css';
import { getAllGames, getGameById, startNewGame, updateGame } from '../api/gameAPI';


export class RandomGenerator implements Generator<string> {
    private values : string[];
    private min: number;
    private max: number;
    constructor(values:string){
        this.values = values.split(",");
        this.min = 0;
        this.max = this.values.length - 1;
    }
    next(): string {
        const index = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        return this.values[index];
    }
}
type ElementProps = {
    value: string;
    rowIndex : number;
    columnIndex : number;
}

export function RowElement ({rowIndex, columnIndex, value}:ElementProps) {
    const dispatch = useAppDispatch();
    const firstSelectedPiece : BoardModel.Position | undefined = useAppSelector((state:RootState) => state.play.selectedPiece);
    const game : Game = useAppSelector((state:RootState) => state.game);
    const matches : BoardModel.Position[] = useAppSelector((state:RootState) => state.play.matches);
    const calculatingMove : boolean = useAppSelector((state:RootState) => state.play.calculatingMove);
    const generator : Generator<string> = new RandomGenerator('♥,♦,♣,♠');
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if(!firstSelectedPiece){
            setSelected(false);
        }
    }, [firstSelectedPiece, setSelected])
    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const selectedElement = async () => {
        if (!calculatingMove && !game.completed){
            setSelected(true);
            if(firstSelectedPiece){
                dispatch(setCalculatingMove(true));
                const moveResults : BoardModel.MoveResult<string> = BoardModel.move(generator, {...game.board}, firstSelectedPiece, {row: rowIndex, col: columnIndex});
                if(moveResults.effects.length > 0){
                    dispatch(decreaseMoves())
                    const nBoard : BoardModel.Board<string> = JSON.parse(JSON.stringify(game.board)) as typeof game.board;
                    nBoard.pieces[firstSelectedPiece.row][firstSelectedPiece.col] = BoardModel.piece(nBoard, {row: rowIndex, col : columnIndex});
                    nBoard.pieces[rowIndex][columnIndex] = BoardModel.piece(game.board, firstSelectedPiece);
                    dispatch(setBoard(nBoard));
                    dispatch(setSelectedPiece(undefined));
                    setSelected(false);
                    for (let effect of moveResults.effects){
                        if(effect.kind === "Match"){
                            dispatch(increaseScore((effect.match.positions.length -2) *5));
                            dispatch(setMatches( effect.match.positions));
                        }else{
                            dispatch(setMessage("Refilling"));
                            await timeout(1000);
                            dispatch(setBoard(effect.board))
                            dispatch(setMessage(""));
                            dispatch(clearMatches());
                        }
                    }
                    await timeout(1000);
            }else{
                dispatch(setMessage("Invalid Move"));
                setTimeout(() => {
                    dispatch(setMessage(""));
                }, 1000);
            }
            dispatch(setSelectedPiece(undefined));
            setSelected(false);
            dispatch(setCalculatingMove(false));
        }else{
            dispatch(setSelectedPiece({row: rowIndex, col: columnIndex}));
        }
    }
}
    return (
        <>
        <button className={(selected || (matches.some(pos => pos.row === rowIndex && pos.col === columnIndex))) ? 'row-element row-element--selected' : 'row-element'} onClick ={() => selectedElement()}>{value}</button>
        </>
    );
}
type rowProps = {
    rowIndex : number;
    row : string[];
}
export function Row ({rowIndex, row}:rowProps) {
    return (
        <div>{row.map((value, columnIndex) => <RowElement key={'element' + rowIndex + columnIndex} rowIndex={rowIndex} columnIndex={columnIndex} value={value}/>)}</div>
    );
}

export default function Board() {
    const token = useAppSelector((state:RootState) => state.user.token);
    const game : Game = useAppSelector((state:RootState) => state.game);
    const message : string = useAppSelector((state:RootState) => state.play.message);
    const [playStarted, setPlayStarted] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [games, setGames] = useState<Game[]>([]);
    const continueGame = (id : number) => {
        setPlayStarted(true);
        getGameById(token, id).then((game) => { dispatch(setGame(game))});
    }
    const startNew = () => {
        setPlayStarted(true);
        dispatch(startGame());
        startNewGame(token).then((game) => { dispatch(setGame(game))});
    }
    useEffect(() => {
        if(!playStarted){
            getAllGames(token).then((games) => { setGames(games)});
        }
    }, [playStarted]);
    useEffect(() => {
        if(playStarted){
            if(game.score >= game.targetScore || (game.nrOfMoves === 0 && game.score < game.targetScore)) {
                dispatch(endGame());
                updateGame(token, game.id, { ...game,completed: true})
            }else{
                updateGame(token, game.id, game);
            }
        }
    }, [game.board]);

    return (
       <>
        {playStarted ? (
            <>
            {!game.completed ? (
                <div className="info">    
                 <div className='target-score'>
                                TARGET SCORE: {game.targetScore}
                            </div>
                            <div className='score'>
                                YOUR SCORE: {game.score}
                            </div>
                            <div className='moves'>
                                MOVES LEFT: {game.nrOfMoves}
                            </div>
                        </div>
            ) : (
                <div className='play-end'>
                            GAME OVER!
                            <div>
                                <button onClick={() => setPlayStarted(false)}>Back to main page</button>
                            </div>
                        </div>
                    )}
                    <div className='board'>
                        {game.board ? game.board.pieces ? game.board.pieces.map((row, rowIndex) => <Row key={'row' + rowIndex} rowIndex={rowIndex} row={row} />) : null : null}
                    </div>
                    <div className='message'>
                        {message}
                    </div>
                    </>
                ) : (
                    <div>
                    {games.filter((game) => !game.completed).map((game) => (
                        <button key={game.id} onClick={() => continueGame(game.id)}>Game {game.id}</button>
                    ))}
                    <div>
                        <button onClick={() => startNew()}>New Game</button>
                    </div>
                </div>
        )}
       </>
    );
}