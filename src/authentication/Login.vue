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
import {UserData} from "@/Models/UserData";

@Options({
    data: () => ({
        mail: '' as string,
        password: '' as string,
        loading: false as boolean,
    })
})

export default class Login extends Vue {
    mail: string = ''
    password: string = ''
    loading: boolean = false

    setLoading(loading: boolean) {
        this.loading = loading;
        if (loading) {
            this.$emit('loading');
        } else {
            this.$emit('stop-loading');
        }
    }

    login() {
        this.setLoading(true);
        setTimeout(() => {
            this.$emit(
                'login',
                {
                    jwt: 'bla',
                    name: 'Schmop',
                    picture: '/bellycratsches.jpg',
                    mail: this.mail,
                    uuid: "ab243-f123-asfd23-gdsf"
                } as UserData
            );
            this.setLoading(false);
        }, 1000);
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
