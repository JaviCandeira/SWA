<template>

<LoginComponent  style="float:left; "/>
<RegisterComponent  />
<UserProfile />
<HighScores />
<BoardComponent />

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import BoardComponent from './components/BoardComponent.vue';
import UserProfile from './components/UserProfile.vue';
import HighScores from './components/HighScores.vue';
@Options({
  components: {
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    UserProfile,
    HighScores
  },
})
export default class App extends Vue {}
</script>


