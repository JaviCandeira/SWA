<template>
    <div class="container">
        <h1>Login</h1>
        <div class="content">
            <div class="form">
                <div class="txt_field">
                    <input type="text" v-model="username"/>
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="txt_field">
                    <input type="password" v-model="password"/>
                    <span></span>
                    <label>Password</label>
                </div>
                <button @click="logIn()">Login</button>
            </div>
        </div>
        <RouterLink to="/register">Not a member? Register!</RouterLink>
        <p class="error">{{message}}</p>
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
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        logIn() {
            API.loginUser(this.username, this.password).then((result) => {
                if (result !== 'Invalid username or password') {
                    
                    model.login(result);
                    this.message = '';
                    console.log(result);
                } else {
                    this.message = result;
                }
            });
        }
    },
    
})
</script>

