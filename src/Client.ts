export class Client {
    private _token: null|string = null;

    get HOST() {
        return "http://127.0.0.1:8000";
    }

    constructor() {
    }

    async signUp(name: string, mail: string, password: string) {
        const formData = new FormData();
        formData.append('_name', name);
        formData.append('_mail', mail);
        formData.append('_password', password);
        const response = await this.request('signup', {
            body: formData,
            method: 'POST',
        });
        if (response.status === 200) {
            return;
        }
        let errors = "";

        try {
            errors = (await response.json())['errors'];
        } catch (e) {
            // noop
        }

        throw new Error("Could not sign up\n" + errors);
    }

    async signIn(mail: string, password: string) {
        const response = await this.sendJson(
            'api/login_check',
            {
                username: mail,
                password: password,
            },
            {
                method: 'POST',
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            if ('token' in data) {
                this._token = data.token;

                return;
            }
        }
        throw new Error('Could not authenticate, code: ' + response.status);
    }

    private async sendJson(endpoint: string, data: object, init: any) {
        if (!(init.headers instanceof Headers)) {
            init.headers = new Headers(init.headers ?? {});
        }
        init.headers.append('Content-Type', 'application/json');
        init.body = JSON.stringify(data);

        return await this.request(endpoint, init);
    }

    private async request(endpoint: string, init: any) {
        if (!(init.headers instanceof Headers)) {
            init.headers = new Headers(init.headers ?? {});
        }
        if (null != this._token) {
            init.headers.append("Authorization", `Bearer ${this._token}`);
        }

        return await fetch(`${this.HOST}/${endpoint}`, init);
    }
}