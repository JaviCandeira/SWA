<template>
    <button class="row-element"
        :class="{ 'row-element--selected': (selected || (model.gamePlay.matches.some((pos) => pos.row === rowIndex && pos.col === colIndex))) }"
        @click="selectedElement()">
        {{ element }}
    </button>
</template>

<script lang="ts">
import * as BoardModel from '../model/boardModel'
import * as api from '../API/gameAPI'
import { model } from '../API/store'
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        rowIndex: {
            type: Number,
            required: true
        },
        colIndex: {
            type: Number,
            required: true
        },
        element: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            model,
            selected: false,
            generator: new BoardModel.RandomGenerator('♥,♦,♣,♠'),
        }
    },
    methods: {
        timeout(delay: number) {
            return new Promise(res => setTimeout(res, delay));
        },
        async selectedElement() {
            if (!model.gamePlay.calculatingMove && !model.game.completed) {
                this.selected = true;
                if (model.gamePlay.selectedPiece) {
                    model.setCalculatingMove(true) 
                    const moveResults = BoardModel.move(this.generator, { ...model.game.board }, model.gamePlay.selectedPiece, { row: this.rowIndex, col: this.colIndex })
                    if (moveResults.effects.length > 0) {
                        model.decreaseMoves() 
                        const newBoard: BoardModel.Board<string> = JSON.parse(JSON.stringify(model.game.board)) as typeof model.game.board;
                        newBoard.pieces[model.gamePlay.selectedPiece.row][model.gamePlay.selectedPiece.col] = BoardModel.piece(newBoard, { row: this.rowIndex, col: this.colIndex })!;
                        newBoard.pieces[this.rowIndex][this.colIndex] = BoardModel.piece(model.game.board, model.gamePlay.selectedPiece)!;
                        model.setBoard(newBoard);
                        model.setSelectedPiece(undefined)
                        this.selected = false;
                        for (let effect of moveResults.effects) {
                            if (effect.kind === 'Match') {
                                if(effect.match?.positions.length){
                                    model.increaseScore((effect.match?.positions.length - 2) * 5) 
                                }
                                model.setMatches(effect.match?.positions ? effect.match?.positions : [])
                            } else {
                                model.setMessage("Refilling...")
                                await this.timeout(1000)
                                model.setBoard(effect.board!)
                                model.setMessage('')
                                model.clearMatches()
                            }
                        }
                        await this.timeout(1000)
                    } else {
                        model.setMessage("MOVE NOT ALLOWED")
                        setTimeout(() => {
                            model.setMessage('')
                        }, 1000);
                    }
                    model.setSelectedPiece(undefined)                    
                    this.selected = false;
                    model.setCalculatingMove(false); //user can make moves again

                    if (!model.gamePlay.calculatingMove) {
                        if (model.game.score >= model.game.targetScore || (model.game.nrOfMoves === 0 && model.game.score < model.game.targetScore)) {
                            model.endGame();
                            api.updateGame(model.user.token!, model.game.id, { ...model.game, completed: true })
                        } else {
                            api.updateGame(model.user.token!, model.game.id, model.game)
                        }
                    }
                } else {
                    model.setSelectedPiece({ row: this.rowIndex, col: this.colIndex })
                }
            }
        }
    }
})
</script>


<style>
.row-element {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    background-color: aliceblue;
    padding: 10px;
    margin: 5px;
}

.row-element--selected {
    background-color: aqua;
}
</style>