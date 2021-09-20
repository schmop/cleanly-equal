import {User} from "@/Models/User";
import {Task} from "@/Models/Task";

export interface Household {
    name: string,
    users: User[],
    tasks: Task[],
    picture?: string | null,
}