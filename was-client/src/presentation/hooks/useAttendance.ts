import { AssociativeObjectArray } from '../../core/helpers/types';
import { Day } from '../../domains/models/Day';
import { User } from '../../domains/models/User';

class Attendance {
    public attendees: User[] = [];
    public absentees: User[] = [];
    public guests: string[] = [];
    public count() {
        return this.attendees.length + this.guests.length;
    };
}

/**
 * Generates attendance object based on day and household members
 * @param day 
 * @param members 
 * @returns attendance of day
 */
export function useAttendance(day: Day, members: User[]) {

    // Map of household members
    const memberMap = members.reduce((acc: AssociativeObjectArray<User>, member) => {
        acc[member.id] = member;
        return acc;
    }, {});

    // Map of abstentees that are members in the household
    const absenteesMap = day.commitments.reduce((acc: AssociativeObjectArray<User>, commitment) => {
        if (commitment.committed || !memberMap[commitment.userId]) return acc;
        acc[commitment.userId] = memberMap[commitment.userId];
        return acc;
    }, {});

    // Create attendance of attendants and abstentees
    let attendance = members.reduce<Attendance>((acc, member) => {
        if (absenteesMap[member.id]) {
            acc.absentees.push(memberMap[member.id]);
        } else {
            acc.attendees.push(memberMap[member.id]);
        }
        return acc;
    }, new Attendance());

    // Add guests to attendance
    attendance = day.commitments.reduce<Attendance>((acc, commitment) => {
        if(!memberMap[commitment.userId]) return acc;
        acc.guests.push(...commitment.guests || []);
        return acc;
    }, attendance);

    return attendance;
}