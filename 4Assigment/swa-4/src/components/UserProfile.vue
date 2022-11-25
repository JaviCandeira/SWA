<template>
    <div class="mt-5">
        <h1 class="mt-3">Profile</h1>
        <h3>Username: <span>{{ username }}</span></h3>
        <div class='login-form form-group mb-3'>
            <div class='login-form-row form-group'>
                <label htmlFor='password'>Change Password</label>
                <input class="form-control" type='password' id='password' v-model="password" />
                <button class="btn btn-outline-warning form-control mt-1" @click="changePasswordAction()">Send</button>
            </div>
        </div>
        <div>
            <h4>My Completed Games:</h4>
            <div class='d-flex flex-row flex-wrap'>
                <div v-for="game in model.games.filter((game) => game.completed && game.user === model.user.userId).sort((a, b) => a.id -
                b.id)" class='alert alert-info m-auto mb-2' v-bind:key="game.id">Game {{ game.id }} - Score:
                    {{ game.score }} - Moves left: {{ game.nrOfMoves }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as API from '../API/gameAPI'
import { model } from '../API/store'
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            model,
            password: '',
            username: ''
        }
    },
    methods: {
        changePasswordAction() {
            API.changePassword(model.user.token!, this.password, model.user.userId!);
        }
    },
    mounted() {
        const findGames = async () => {
            API.getAllGames(model.user.token!).then((result) => {
                model.games = result!
            })
            setTimeout(findGames, 5000)
        }

        findGames()

        API.getUser(model.user.token!, model.user.userId!).then((result) => {
            this.username = result.username
        })
    }
})
</script>
