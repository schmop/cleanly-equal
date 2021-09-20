<template>
    <div class="authentication">
        <it-tabs>
            <it-tab
                :disabled="isLoading"
                title="Anmelden"
                box
            >
                <Login
                    @loading="loading"
                    @stop-loading="stopLoading"
                    @login="login"
                />
            </it-tab>
            <it-tab
                :disabled="isLoading"
                title="Registrieren"
                box
            >
                <Register />
            </it-tab>
        </it-tabs>
    </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import Login from "@/authentication/Login.vue";
import Register from "@/authentication/Register.vue";
import {UserData} from "@/Models/UserData";

@Options({
    components: {Login, Register, Authenticate},
    data: () => ({
        isLoading: false as boolean
    }),
    props: {},
})
export default class Authenticate extends Vue {
    isLoading: boolean = false;

    @Watch('action')
    onPropertyChanged(value: string) {
        console.log(value);
    }

    register() {
        console.log("REGISTER");
    }

    login(userData: UserData) {
        console.log("login!");
        this.$emit('login', userData)
        this.isLoading = true;
    }

    loading() {
        console.log("loading");
        this.isLoading = true;
    }

    stopLoading() {
        console.log("stop Loading");
        this.isLoading = false;
    }
}
</script>
<style scoped>
</style>

<style>
.it-tabs-tab {
    flex-grow: 1 !important;
}
</style>