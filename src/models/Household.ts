import {User} from "@/models/User";
import {Task} from "@/models/Task";

export interface Household {
    name: string,
    users: User[],
    tasks: Task[],
    picture?: string | null,
}