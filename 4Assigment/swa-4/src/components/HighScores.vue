<template>
   <div class='mt-5'>
        <div class='mt-5'>
            <h2>Top 5 Scores:</h2>
            <div class='d-flex flex-row flex-wrap'>
                <div v-for="game in model.games.filter((game) => game.completed).sort((a, b) => b.score - a.score).splice(0, 5)"
                    class='alert alert-info m-auto mb-2' v-bind:key="game.id">
                    Player {{ game.user }} - {{ game.score }} points
                </div>
            </div>
        </div>
        <div>
            <h2 class='mt-3'>Your Top 3 Scores:</h2>
            <div v-for="game in model.games.filter((game) => game.completed && game.user === model.user.userId).sort((a, b) => b.score - a.score).splice(0, 3)"
                class='alert alert-info' v-bind:key="game.id">
                Game {{ game.id }} - Score: {{ game.score }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as API from '../API/gameAPI'
import { model } from '../API/store'
export default {
    data() {
        return {
            model
        }
    },
    mounted(){
        API.getAllGames(model.user.token!).then((result) => {
            model.games = result!
        })
    }
}
</script>

