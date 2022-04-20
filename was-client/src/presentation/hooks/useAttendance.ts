import { useMemo } from 'react';
import { AssociativeObjectArray } from '../../core/helpers/types';
import { Day } from '../../domains/models/Day';
import { User } from '../../domains/models/User';

class Attendance {
    public attendees: User[] = [];
    public absentees: User[] = [];
    public guests: string[] = [];
    public attendanceCount() {
        return this.attendees.length + this.guests.length;
    };
}
export function useAttendance(day: Day, members: User[]) {

    const mappedMembers = useMemo(() => {
        return members.reduce((acc: AssociativeObjectArray<User>, member) => {
            acc[member.id] = member;
            return acc;
        }, {});
    }, [members]);

    const attendance = useMemo(() => {
        return day.commitments.reduce<Attendance>((acc, commitment) => {
            if (!commitment.committed)
                acc.absentees.push(mappedMembers[commitment.userId]);
            else
                acc.attendees.push(mappedMembers[commitment.userId]);
            acc.guests.push(...commitment.guests || []);
            return acc;
        }, new Attendance());
    }, [members, day]);

    return attendance;
}