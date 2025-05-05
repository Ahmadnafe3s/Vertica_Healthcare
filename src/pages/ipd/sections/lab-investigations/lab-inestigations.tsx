import EmptyList from '@/components/emptyList'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQueryState } from 'nuqs'
import { Fragment, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useLabInvestigation from './lab-investigation-handlers'



const IpdLabInvestigations = () => {

    const [search, setSearch] = useQueryState('search')

    const { radiologies, pathologies, getRadiologies, getPathologies } = useLabInvestigation(search!)

    const onSearch = useDebouncedCallback((value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
    }, 400)

    useEffect(() => {
        getRadiologies()
        getPathologies()
    }, [search])



    return (
        <section className="flex flex-col gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Medication</h1>
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
                <Input type="search" placeholder='test name , date' onChange={(e) => { onSearch(e.target.value) }} />
            </div>

            <Separator />

            {/* pagination */}
            <section className="flex flex-col gap-y-5 min-h-[60vh]">
                <div className="flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Lab</TableHead>
                                <TableHead>Sample Collected</TableHead>
                                <TableHead>Expected Date</TableHead>
                                <TableHead>Approved By</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {radiologies.map((radio, i) => (
                                <Fragment key={i}>
                                    {radio?.RadiologyBillItems?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item?.testName?.name}</TableCell>
                                            <TableCell>Radiology</TableCell>
                                            <TableCell className='flex flex-col'>
                                                <p>{item?.RadioSampleCollection?.staff?.name}</p>
                                                <p className='text-[12px]'>{item?.RadioSampleCollection?.date}</p>
                                                <p className='text-[12px]'>{item?.RadioSampleCollection?.center}</p>
                                            </TableCell>
                                            <TableCell>{item.reportDate}</TableCell>
                                            <TableCell className='flex flex-col'>
                                                <p>{item.RadioSampleCollection?.staff?.name}</p>
                                                <p className='text-[12px]'>{item?.RadioSampleCollection?.date}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </Fragment>
                            ))}

                            {pathologies.map((pato, i) => (
                                <Fragment key={i}>
                                    {pato?.PathologyBillItems?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item.testName?.name}</TableCell>
                                            <TableCell>Pathology</TableCell>
                                            <TableCell className='flex flex-col'>
                                                <p>{item.PathSampleCollection?.staff?.name}</p>
                                                <p className='text-[12px]'>{item.PathSampleCollection?.date}</p>
                                                <p className='text-[12px]'>{item.PathSampleCollection?.center}</p>
                                            </TableCell>
                                            <TableCell>{item?.reportDate}</TableCell>
                                            <TableCell className='flex flex-col'>
                                                <p>{item.PathologyReport?.staff?.name}</p>
                                                <p className='text-[12px]'>{item.PathologyReport?.date}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </ Fragment>
                            ))}
                        </TableBody>
                    </Table>

                    <EmptyList length={(radiologies.length + pathologies.length)} message="No Lab Investigations found" />
                </div>

                {/* pagination buttons */}
                {/* <section>
                    <CustomPagination
                        total_pages={medications?.total_pages!}
                        currentPage={page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section> */}
            </section>
        </section>
    )
}



export default IpdLabInvestigations