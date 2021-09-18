<template>
    <div class="authentication">
        <transition name="fadeHeight" mode="out-in">
            <it-input
                v-if="isRegister"
                key="login"
                type="text"
                name="login"
                placeholder="Username"
                required
            />
        </transition>
            <it-input
                key="email"
                type="email"
                name="email"
                placeholder="E-Mail Adresse"
                required
            />
            <it-input
                key="password"
                type="password"
                name="password"
                placeholder="Password"
                v-model="password"
                required
            />
        <transition name="fadeHeight" mode="out-in">
            <it-input
                v-if="isRegister"
                key="password-retype"
                type="password"
                name="password-retyping"
                placeholder="Password erneut eingeben"
                @blur="validatePassword"
                @focus="resetPasswordStatus"
                v-model="passwordRetyped"
                :message="passwordRetypeMessage"
                :status="passwordRetypedStatus"
                required
            />
        </transition>
        <it-toggle
            :options="['Login', 'Registrieren']"
            round
            v-model="action"
        />
        <it-button
            name="submit"
            type="primary"
            :icon="icon"
        >
            {{ action }}
        </it-button>
    </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Watch} from 'vue-property-decorator';

@Options({
    components: {Authenticate},
    data: () => ({
        action: 'Login' as string,
        passwordRetypeCorrect: true as boolean,
        password: '' as string,
        passwordRetyped: '' as string,
        passwordRetypedStatus: 'default' as string,
    }),
    props: {
    },
})
export default class Authenticate extends Vue {
    action: string = 'Login';
    password: string = '';
    passwordRetyped: string = '';
    passwordRetypedCorrect: boolean = true;
    passwordRetypedStatus: string = 'default';
    iconMap: any = {
        'Login': 'login',
        'Registrieren': 'account_circle'
    };

    @Watch('action')
    onPropertyChanged(value: string) {
        console.log(value);
    }

    resetPasswordStatus() {
        this.passwordRetypedCorrect = true;
        this.passwordRetypedStatus = 'default';
    }

    validatePassword() {
        this.passwordRetypedCorrect = this.password === this.passwordRetyped;
        this.passwordRetypedStatus = this.passwordRetypedCorrect ? 'success' : 'danger';
    }

    get passwordRetypeMessage() {
        return this.passwordRetypedCorrect ? '' : 'Passwörter sind nicht identisch!';
    }
    get icon() {
        return this.iconMap[this.action];
    }
    get isLogin() {
        return this.action === 'Login';
    }
    get isRegister() {
        return this.action === 'Registrieren';
    }
}
</script>
<style scoped>

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.2s;
    max-height: 230px;
}
.fadeHeight-enter-from,
.fadeHeight-leave-to
{
    opacity: 0;
    max-height: 0;
}

.authentication > * {
    margin-bottom: 10px;
}
</style>