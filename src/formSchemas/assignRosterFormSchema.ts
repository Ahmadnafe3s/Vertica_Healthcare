import { z } from "zod";

export const AssignRosterSchema = z.object({
        
    staff_id: z.string()
        .min(1, { message: 'Staff is required' }).default(''),

    shiftStartTime: z.string()
        .min(1, { message: 'Shift start time is required' }),

    shiftEndTime: z.string()
        .min(1, { message: 'Shift end time is required' }),

    shiftStartDate: z.string()
        .min(1, { message: 'Shift start date is required' }),

    shiftEndDate: z.string()
        .min(1, { message: 'Shift end date is required' }),

    shift: z.string()
        .min(1, { message: 'Shift is required' }).default(''),

    department: z.string().min(1, { message: 'Department is required' }),

    note: z.string().optional(),

}).refine(data => new Date(data.shiftEndDate) >= new Date(data.shiftStartDate), {
    message: 'End date must be after start date',
    path: ['shiftEndDate'],
})