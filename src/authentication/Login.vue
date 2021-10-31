<template>
    <form
        name="login"
        method="post"
        @submit.prevent
    >
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
                key="password"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="Passwort"
                v-model="password"
                required
            />
            <it-button
                name="submit"
                type="primary"
                icon="login"
                @click="login"
                :loading="loading"
            >
                Anmelden
            </it-button>
        </fieldset>
    </form>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {User} from "@/models/User";
import {Message} from 'equal-vue';

@Options({
    data: () => ({
        mail: '' as string,
        password: '' as string,
        loading: false as boolean,
    })
})

export default class Login extends Vue {
    mail: string = '';
    password: string = '';
    loading: boolean = false;

    setLoading(loading: boolean) {
        this.loading = loading;
        if (loading) {
            this.$emit('loading');
        } else {
            this.$emit('stop-loading');
        }
    }

    async login() {
        this.setLoading(true);
        try {
            await window.client.signIn(this.mail, this.password);
            this.$emit(
                'login',
                {
                    name: 'Schmop',
                    picture: '/bellycratsches.jpg',
                    mail: this.mail,
                } as User
            );
            Message.success({text: 'Login successful!'});
        } catch (e) {
            Message.danger({text: "Could not login!\n" + e.message});
            console.error(e);
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
