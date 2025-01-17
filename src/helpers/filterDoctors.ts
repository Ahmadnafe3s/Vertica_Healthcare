import { Doctors } from "@/types/type";


export const filterDoctors = (doctors: Doctors[], id: number):Doctors | undefined => {
    const doctor = doctors.find((doctor) => doctor.staff.id === id)
    return doctor
}