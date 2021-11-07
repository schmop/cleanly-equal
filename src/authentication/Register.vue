<template>
    <it-alert
        v-if="'' !== error"
        type="danger"
        title="Something went wrong..."
        :body="error"
        :closable="true"
        @on-close="error = ''"
    />
    <form name="register" @submit.prevent="register" method="post">
        <fieldset :disabled="loading">
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
        </fieldset>
    </form>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Message} from 'equal-vue';

@Options({
    data: () => ({
        mail: '' as string,
        name: '' as string,
        error: '' as string,
        password: '' as string,
        passwordRetype: '' as string,
        loading: false as boolean,
    }),
    props: {},
    emits: [
        'loading',
        'stop-loading',
        'signup',
    ]
})

export default class Register extends Vue {
    loading: boolean = false;
    name: string = "";
    mail: string = "";
    password: string = "";
    error: string = "";

    setLoading(loading: boolean) {
        this.loading = loading;
        if (loading) {
            this.$emit('loading');
        } else {
            this.$emit('stop-loading');
        }
    }

    async register() {
        this.setLoading(true);
        try {
            await window.client.signUp(this.name, this.mail, this.password);
            Message.success({text: 'Successfully signed up!'});
            this.$emit('signup');
        } catch (e) {
            this.error = '' + e;
            console.error("Could not sign up!", e);
        }
        this.setLoading(false);
    }
}
</script>

<style scoped>
fieldset > * {
    margin: 10px;
}

fieldset {
    border: 0;
}
</style>