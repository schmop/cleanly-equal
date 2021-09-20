<template>
    <form name="register" @submit.prevent="register" method="post">
        <it-input
            key="email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="E-Mail Adresse"
            v-model="mail"
            required
        />
        <it-input
            key="login"
            type="text"
            name="login"
            autocomplete="nickname"
            placeholder="Username"
            v-model="name"
            required
        />
        <it-input
            key="password"
            type="password"
            name="password"
            autocomplete="new-password"
            placeholder="Passwort"
            v-model="password"
            required
        />
        <it-input
            key="password-retype"
            type="password"
            name="password-retyping"
            autocomplete="new-password"
            placeholder="Passwort erneut eingeben"
            v-model="passwordRetype"
            required
        />
        <it-button
            name="submit"
            type="primary"
            icon="account_circle"
            @click="register"
        >
            Registrieren
        </it-button>
    </form>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
    data: () => ({
        mail: '' as string,
        name: '' as string,
        password: '' as string,
        passwordRetype: '' as string,
    }),
    props: {}
})

export default class Register extends Vue {
    register() {
        this.$emit('loading');
        setTimeout(() => {
            Math.random() > 0.5
                ? this.$emit('stop-loading')
                : this.$emit('login')
            ;
        }, 2000);
    }
}
</script>

<style scoped>
form > * {
    margin: 10px;
}
</style>