<template>
    <div class="container">
        <h1>Register</h1>
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
                <div class="txt_field">
                    <input type="password" v-model="password2"/>
                    <span></span>
                    <label>Repeat Password</label>
                </div>
                <button @click="register()">Login</button>
            </div>
            <p class="error">{{message}}</p>
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
            username: '',
            password: '',
            password2: '',
            message: ''
        }
    },
    methods: {
        register() {
            if (this.password == this.password2) {
                API.registerUser(this.username, this.password).then((result) => {
                    if (result !== 'Username already taken') {
                        this.message = '';
                    } else {
                        this.message = result;
                    }
                });
            } else {
                this.message = 'Passwords do not match';
            }
        }
    }
})
</script>