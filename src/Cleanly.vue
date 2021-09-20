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
        <it-button
            type="black"
            outlined
            icon="menu"
            size="big"
        >
        </it-button>
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
        <it-loading
            v-else-if="null == household"
            color="#74a1ad"
        />
        <HouseholdView
            v-else
            :household="household"
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
import {Household} from "@/Models/Household";
import {UserData} from "@/Models/UserData";
import {Task} from "@/Models/Task";
import {User} from "@/Models/User";

@Options({
    components: {Authenticate, HouseholdView},
    data: () => ({
        household: null as Household | null,
        user: {} as UserData | null,
        authenticated: false as boolean,
    })
})

export default class Cleanly extends Vue {
    user: UserData | null = null;
    authenticated: boolean = false;
    household: Household | null = null;

    login(userData: UserData) {
        this.user = userData;
        this.authenticated = true;
        setTimeout(() => {
            this.household = {
                name: "Chaos WG",
                picture: null,
                tasks: [
                    {
                        assignedTo: this.user,
                        duration: 14 * 24 * 60, // 2 weeks in minutes
                        icon: 'local_laundry_service',
                        color: '#07d85b',
                        lastComplete: null,
                        name: 'Wäsche waschen',
                        uuid: '1298asdkjh23-asfdkjh21378asd'
                    },
                    {
                        assignedTo: this.user,
                        duration: 14 * 24 * 60, // 2 weeks in minutes
                        icon: 'cleaning_services',
                        color: '#3051ff',
                        lastComplete: this.someDayInThePast(),
                        name: 'Fegen',
                        uuid: '129asdgfdgfd378asd'
                    },
                ] as Task[],
                users: [] as User[]
            } as Household;
        }, 1000);
    }

    someDayInThePast() {
        let date = new Date();
        date.setDate(date.getDate() - 7);

        return date;
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
