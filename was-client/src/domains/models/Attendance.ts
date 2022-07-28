import { User } from "./User";

export class Attendance {
    public attendees: User[] = [];
    public absentees: User[] = [];
    public guests: string[] = [];
    public count() {
        return this.attendees.length + this.guests.length;
    };
}