<template>
    <div
        v-if="authenticated"
         class="header row space-between"
    >
        <it-avatar
            v-if="user.picture"
            :src="user.picture"
            size="55px"
        />
        <div class="logo-wrapper">
            <img class="logo" src="broom.png"/>
        </div>
        <it-dropdown
            :clickable="true"
            placement="bottom-right"
        >
            <it-button
                type="black"
                outlined
                icon="menu"
                size="big"
            >
            </it-button>
            <template v-slot:menu>
                <it-dropdown-menu>
                    <it-dropdown-item
                        icon="logout"
                        @click="logout"
                    >
                        Logout
                    </it-dropdown-item>
                </it-dropdown-menu>
            </template>
        </it-dropdown>
    </div>
    <div
        v-else
        class="header row center"
    >
        <div class="logo-wrapper">
            <img class="logo" src="broom.png"/>
        </div>
        <h1>Cleanly</h1>
    </div>
    <div class="content row">
        <Authenticate
            v-if="!authenticated"
            @login="login"
        />
        <Dashboard
            v-else
        />
    </div>
    <div class="footer row">
        <a href="#">Impressum</a>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Authenticate from "@/authentication/Authenticate.vue";
import HouseholdView from "@/HouseholdView.vue";
import {Household} from "@/models/Household";
import {User} from "@/models/User";
import Dashboard from "@/Dashboard.vue";

@Options({
    components: {Dashboard, Authenticate, HouseholdView},
    data: () => ({
        household: null as Household | null,
        user: {} as User | null,
        authenticated: false as boolean,
    })
})

export default class Cleanly extends Vue {
    user: User | null = {
        name: 'Schmop',
        picture: '/bellycratsches.jpg',
        mail: window.client.getMail(),
    } as User;
    authenticated: boolean = window.client.isAuthenticated();
    household: Household | null = null;

    login(user: User) {
        this.user = user;
        this.authenticated = true;
    }

    logout() {
        this.user = null;
        this.authenticated = false;
        window.client.logout();
    }
}

</script>

<style>
.logo-wrapper {
    width: 35px;
    height: 35px;
    background-color: #2c4850;
    border-radius: 50%;
    padding: 10px;
    margin-right: 10px;
}

.authentication > * {
    margin-bottom: 10px;
}

.logo {
    width: 35px;
    height: 35px;
}

.row {
    padding: 8px;
}

.header {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 50px;
    border-bottom: #74a1ad 1px solid;
    margin-bottom: 10px;
    box-shadow: 0 0 3px 3px #74a1ad;
    text-align: center;
}

.space-between {
    justify-content: space-between;
}

.center {
    justify-content: center;
}

.content {
    flex-grow: 1;
}

.footer {
    align-items: center;
    justify-content: center;
    display: flex;
    border-top: #74a1ad 1px solid;
    box-shadow: 0 0 3px 3px #74a1ad;
}

#app {
    display: flex;
    height: 100vh;
    flex-direction: column;
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
