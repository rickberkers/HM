import { User } from "./User";

export type Guest = {
    addedBy: User,
    name: string
}

export class Attendance {
    public attendees: User[] = [];
    public absentees: User[] = [];
    public guests: Guest[] = [];
    public count() {
        return this.attendees.length + this.guests.length;
    };
}