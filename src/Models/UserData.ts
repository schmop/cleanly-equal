import {User} from "@/Models/User";

export interface UserData extends User {
    jwt: string,
    mail: string,
}