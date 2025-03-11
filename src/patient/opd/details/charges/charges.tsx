
import { useEffect, useState } from "react"
import {  SearchX } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { currencyFormat } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import LoaderModel from "@/components/loader"
import { ChargeDetailsType, ChargeListType } from "@/types/opd_section/charges"
import CustomPagination from "@/components/customPagination"
import { parseAsInteger, useQueryState } from "nuqs"
import { getChargeDetails, getCharges } from "@/admin/OPD/opdApiHandler"
import ChargeDetailsModel from "@/admin/OPD/details/charges/chargeDetailsModel"




const PatientOpdCharges = () => {

    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    //route param
    const { opdId } = useParams()


    // Api states
    //chargeDetails provides data to details MODEL and FORM (ON EDIT MODE)
    const [chargeDetails, setChargeDetails] = useState<ChargeDetailsType | undefined>(undefined)
    const [CHARGES, SET_CHARGES] = useState<ChargeListType>({ data: [], total_pages: 1 })


    // Models State
    const [isChargeLoading, setIsChargeLoading] = useState<boolean>(false)
    const [isChargeDetailsVisible, setIsChargeDetailsVisible] = useState<boolean>(false)


    //fetching charges list

    const fetchCharges = async () => {
        try {
            //on search limit will be 100
            const data = await getCharges({ opdId: opdId!, page, limit: 10, date: search! }) // opdId is here string
            SET_CHARGES(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // Fetching details for Details model and form on edit mode
    const fetchChargeDetails = async (id: number) => {
        try {
            setIsChargeLoading(true)
            const data = await getChargeDetails(id)
            setChargeDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setIsChargeLoading(false)
        }
    }


    const onSearch = async (date: string) => {
        date ? setSearch(date) : setSearch(null)
        setPage(1)
    }


    useEffect(() => {
        fetchCharges()
    }, [page, search])


    return (
        <section className="flex flex-col gap-y-5">

            <div className="flex justify-between items-center">
                <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
                <div className="sm:w-48 space-y-1">
                    <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
                </div>
            </div>

            <Separator />

            <div className="flex flex-col min-h-[70vh] mb-20">
                <div className="flex-1">
                    <Table className="rounded-lg border">
                        <TableHeader className="bg-zinc-100">
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Charge Name</TableHead>
                                <TableHead>Charge Type</TableHead>
                                <TableHead>Standard Charge {currencySymbol()}</TableHead>
                                <TableHead>TPA Charge {currencySymbol()}</TableHead>
                                <TableHead>Net Amount {currencySymbol()}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {CHARGES?.data.map((charge, i) => {
                                return <TableRow key={i}>
                                    <TableCell>{charge.date}</TableCell>
                                    {/* to view details model */}
                                    <TableCell className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold" onClick={async () => {
                                        await fetchChargeDetails(charge.id);
                                        setIsChargeDetailsVisible(true)
                                    }} >
                                        {charge.chargeNames.name}
                                    </TableCell>
                                    <TableCell>{charge.chargeType.charge_type}</TableCell>
                                    <TableCell>{currencyFormat(charge.standard_charge)}</TableCell>
                                    <TableCell>{currencyFormat(charge.tpa)}</TableCell>
                                    <TableCell>{currencyFormat(charge.net_amount)}</TableCell>                                  
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {CHARGES?.data.length! < 1 && <h1 className='text-gray-900 mt-5 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

                </div>

                {/* Pagination */}

                <div>
                    <section>
                        <CustomPagination
                            total_pages={CHARGES?.total_pages!}
                            currentPage={page}
                            previous={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            next={(p) => setPage(p)}
                        />
                    </section>
                </div>
            </div>


            {/* Details Model */}

            {isChargeDetailsVisible && <ChargeDetailsModel
                chargeDetails={chargeDetails}
                onClick={() => {
                    setIsChargeDetailsVisible(false);
                    setChargeDetails(undefined)
                }}
            />}


            {/* loader */}

            {isChargeLoading && <LoaderModel />}

        </section>
    )
}






export default PatientOpdCharges