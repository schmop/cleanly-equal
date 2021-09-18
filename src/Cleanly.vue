<template>
    <div class="header row">
        <div class="logo-wrapper">
            <img class="logo" src="broom.png"/>
        </div>
        <h1>Cleanly</h1>
    </div>
    <div class="content row">
        <div class="authentication"
             v-if="!authenticated"
        >
            <it-input type="text" name="login" placeholder="Username"/>
            <it-input type="password" name="password" placeholder="Password"/>
            <it-button
                name="submit"
                type="primary"
                icon="login"
            >
                Login
            </it-button>


        </div>
    </div>
    <div class="footer row">
        <a href="#">Impressum</a>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

interface User {
    name: string,
    uuid: string,
    picture: string,
}

interface UserData extends User {
    jwt: string,
    tasks: Task[],
}

interface Task {
    name: string,
    icon: string,
    lastComplete: Date,
    duration: number,
    assignedTo: User,
}

interface Household {
    name: string,
    picture: string,
    users: User[],
    tasks: Task[],
}

@Options({
    data: () => ({
        household: {} as Household,
        user: {} as UserData,
        authenticated: false as boolean,
    })
})
export default class Cleanly extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.logo-wrapper {
    width: 50px;
    height: 50px;
    background-color: #2c4850;
    border-radius: 50%;
    padding: 16px;
    margin-right: 10px;
}

.authentication > * {
    margin-bottom: 10px;
}

.logo {
    width: 50px;
    height: 50px;
}

.row {
    padding: 8px;
}

.header {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    height: 150px;
    border-bottom: #74a1ad 1px solid;
    box-shadow: 0 0 5px 5px #74a1ad;
    text-align: center;
}

.content {
    height: 1200px;
}

.footer {
    align-items: center;
    justify-content: center;
    display: flex;
    border-top: #74a1ad 1px solid;
}

a {
    color: #b97842;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c4850;
}

body {
    margin: 0;
    padding: 0;
}
</style>
