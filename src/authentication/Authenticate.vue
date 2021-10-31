<template>
    <div class="authentication">
        <it-tabs ref="tabs">
            <it-tab
                :disabled="isLoading"
                title="Anmelden"
                box
            >
                <Login
                    @loading="loading"
                    @stop-loading="stopLoading"
                    @login="onLogin"
                />
            </it-tab>
            <it-tab
                :disabled="isLoading"
                title="Registrieren"
                box
            >
                <Register
                    @signup="onSignup"
                />
            </it-tab>
        </it-tabs>
    </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Login from "@/authentication/Login.vue";
import Register from "@/authentication/Register.vue";
import {User} from "@/models/User";

@Options({
    components: {Login, Register, Authenticate},
    data: () => ({
        isLoading: false as boolean
    }),
    props: {},
})
export default class Authenticate extends Vue {
    isLoading: boolean = false;

    onLogin(user: User) {
        this.$emit('login', user);
        this.isLoading = true;
    }

    onSignup() {
        (this.$refs.tabs as any).selectTab(0);
    }

    loading() {
        this.isLoading = true;
    }

    stopLoading() {
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