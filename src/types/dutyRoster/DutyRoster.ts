export interface RosterDetails {
    id: number;
    staffId: number;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftStartDate: string;
    shiftEndDate: string;
    shift: string;
    note: string;
    staff: {
        name: string,
        department: string
    }
}



export type Rosters = {
    data: RosterDetails[],
    total_pages : number
} 