import { useEffect, useState } from 'react';
import { AssociativeObjectArray } from '../../core/utils/typeUtils';
import { Attendance, Guest } from '../../domains/models/Attendance';
import { Commitment } from '../../domains/models/Commitment';
import { User } from '../../domains/models/User';

/**
 * Generates attendance object based on day and household members
 * @param commitments 
 * @param members 
 * @returns attendance of day
 */
export function useAttendance(commitments: Commitment[], members: User[]) {

    const [attendance, setAttendance ] = useState<Attendance>(new Attendance());

    useEffect(() => {

        if (!commitments || !members) {
            return;
        }

        const newAttendance = calculateAttendance(commitments, members);
        setAttendance(newAttendance);

    }, [members, commitments]);

    return attendance;
}

const calculateAttendance = (commitments: Commitment[], members: User[]): Attendance => {

    // Map of household members
    const memberMap = members.reduce((acc: AssociativeObjectArray<User>, member) => {
        acc[member.id] = member;
        return acc;
    }, {});

    // Map of abstentees that are members in the household
    const absenteesMap = commitments.reduce((acc: AssociativeObjectArray<User>, commitment) => {
        if (commitment.committed || !memberMap[commitment.userId]) return acc;
        acc[commitment.userId] = memberMap[commitment.userId];
        return acc;
    }, {});

    // Create attendance of attendants and abstentees
    let newAttendance = members.reduce<Attendance>((acc, member) => {
        if (absenteesMap[member.id]) {
            acc.absentees.push(memberMap[member.id]);
        } else {
            acc.attendees.push(memberMap[member.id]);
        }
        return acc;
    }, new Attendance());

    // Add guests to attendance
    newAttendance = commitments.reduce<Attendance>((acc, commitment) => {
        const member = memberMap[commitment.userId];

        // only add guests in household
        if(!member) return acc;

        const guests: Guest[] = commitment.guests.map(guest => ({addedBy: member, name: guest}));
        acc.guests.push(...guests);
        
        return acc;
    }, newAttendance);

    return newAttendance;
}