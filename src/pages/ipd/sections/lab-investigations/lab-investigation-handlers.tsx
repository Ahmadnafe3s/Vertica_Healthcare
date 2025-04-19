import { IpdPatLabInvestigation, IpdRadLabInvestigation } from '@/types/IPD/ipd'
import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { getIpdPatInvestigation, getIpdRadInvestigation } from '../../api-handlers'




const useLabInvestigation = (search?: string) => {

    const { ipdId } = useParams()

    const [radiologies, setRadiologies] = React.useState<IpdRadLabInvestigation>([{ RadiologyBillItems: [] }])
    const [pathologies, setPathologies] = React.useState<IpdPatLabInvestigation>([{ PathologyBillItems: [] }])



    const fetchRadInvestigations = async () => {
        try {
            const data = await getIpdRadInvestigation(ipdId!, {search})
            setRadiologies(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchPatInvestigations = async () => {
        try {
            const data = await getIpdPatInvestigation(ipdId!, {search})
            setPathologies(data)
            console.log(data);
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        radiologies,
        pathologies,
        getRadiologies: fetchRadInvestigations,
        getPathologies: fetchPatInvestigations
    }
}





export default useLabInvestigation