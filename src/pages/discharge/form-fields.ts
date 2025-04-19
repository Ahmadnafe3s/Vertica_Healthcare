import { FormField } from "@/components/form-modals/form-modal";
import { dischargeTypes } from "@/helpers/formSelectOptions";
import { Doctors } from "@/types/type";



export const dischargeFormFields = <T extends FormField[]>(doctor: Doctors[]): T => {
    const fields = [
        { name: 'discharge_date', label: 'Discharge Date', type: 'date', },
        { name: 'discharge_type', label: 'Discharge Type', type: 'select', selectOptions: dischargeTypes },
        {
            name: 'doctor', label: 'Refered Doctor', type: 'select',
            selectOptions: doctor.map((doctor) => {
                return { value: doctor.staff.name, label: doctor.staff.name }
            })
        },
        {
            name: 'billingStatus', label: 'Billing Status', type: 'select', selectOptions: [
                { value: 'Cleared', label: 'Cleared' },
                { value: 'Pending', label: 'Pending' },
            ]
        },
        { name: 'discharge_note', label: 'Discharge Note', type: 'textarea' },

    ] as T


    return fields
}


