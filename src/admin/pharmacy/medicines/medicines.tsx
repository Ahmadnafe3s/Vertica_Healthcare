import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, ListMinus, Pencil, Plus, Printer, SearchX, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { createMedicine, deleteMedicine, getMedicinedetails, getMedicineList, updateMedicine } from '../pharmacyApiHandler'
import AlertModel from '@/components/alertModel'
import { AddMedicinesFormSchema } from '@/formSchemas/addMedicinesFormSchema'
import { z } from 'zod'
import LoaderModel from '@/components/loader'
import { medicineDetails, paginatedMedicines } from '@/types/pharmacy/pharmacy'
import { useDebouncedCallback } from 'use-debounce'
import CustomTooltip from '@/components/customTooltip'
import AddMedicineFormModel from './createMedicineForm'
import MedicineDetailsModel from './medicineDetailsModel'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'



const Medicines = () => {

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const itemID = useRef(0)

  //pending states
  const [loading, setLoading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

  // Model states
  const [model, setModel] = useState<{ MedicineForm: boolean, alert: boolean, medicineDetails: boolean }>({
    MedicineForm: false,
    alert: false,
    medicineDetails: false
  })


  // API States
  const [medicines, setMedicines] = useState<paginatedMedicines>({ data: [], total_pages: 0 })
  const [medicineDetails, setMedicineDetails] = useState<medicineDetails>()



  // performing both upsert
  const handleSubmit = async (formData: z.infer<typeof AddMedicinesFormSchema>) => {
    try {
      let data;
      setLoading(rest => ({ ...rest, inline: true }))
      // conditionally check is we have details
      medicineDetails ?
        (data = await updateMedicine(medicineDetails.id, formData), setMedicineDetails(undefined))
        :
        (data = await createMedicine(formData))
      setModel(rest => ({ ...rest, MedicineForm: false }))
      toast.success(data.message)
      fetchMedicineList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(rest => ({ ...rest, inline: false }))
    }
  }



  const fetchMedicineList = async () => {
    try {
      const data = await getMedicineList({ page, limit: 10, search: search! })
      setMedicines(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? (setSearch(value)) : setSearch(null)
    setPage(1)
  }, 400)



  const onDelete = async () => {
    try {
      setLoading(rest => ({ ...rest, inline: true }))
      const data = await deleteMedicine(itemID.current)
      toast.success(data.message)
      fetchMedicineList();   // after deleting refetch data
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel(rest => ({ ...rest, alert: false }))
      setLoading(rest => ({ ...rest, inline: false }))
    }
  }


  const fetchMedicineDetails = async (id: number) => {
    try {
      setLoading(rest => ({ ...rest, model: true }))
      const data = await getMedicinedetails(id)
      setMedicineDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(rest => ({ ...rest, model: false }))
    }
  }


  useEffect(() => {
    fetchMedicineList();
  }, [page, search])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Medicines</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Button className='flex gap-x-1' size={'sm'}
              onClick={() => setModel(rest => ({ ...rest, MedicineForm: true }))}>
              <Plus />
              Add Medicine
            </Button>


            <Link to={'../purchase'} className={buttonVariants({
              variant: 'default',
              size: 'sm',
              className: 'flex gap-x-1'
            })}>
              <ListMinus />
              Purcahse
            </Link>

          </div>
        </div>

        {/* search bar */}

        <div className='flex py-3 items-center justify-between border-b border-gray-200'>

          <div className='flex gap-x-2 w-56'>
            <Input type='text' height='10px' placeholder='name , category , company' onChange={(e) => onSearch(e.target.value)} defaultValue={search!} />
          </div>

          {/* <div className='flex gap-x-2'>

            <FileText className='cursor-pointer text-gray-600' />
            <Printer className='cursor-pointer text-gray-600' />

          </div> */}
        </div>

        <div className="flex flex-col mb-16 gap-y-10 min-h-[70vh]">
          <div className="flex-1">
            <Table className="rounded-lg border my-10">
              <TableHeader className='bg-zinc-100'>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Medicine Company</TableHead>
                  <TableHead>Medicine Composition</TableHead>
                  <TableHead>Medicine Categoy</TableHead>
                  <TableHead>Medicine Group</TableHead>
                  <TableHead>Avaliable Qty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {medicines.data.map((medicine) => {
                  return <TableRow key={medicine.id} >
                    <TableCell className='text-blue-500 hover:text-blue-400 cursor-pointer font-semibold'
                      onClick={async () => {
                        await fetchMedicineDetails(medicine.id)
                        setModel(rest => ({ ...rest, medicineDetails: true }))
                      }}
                    >
                      {medicine.name}
                    </TableCell>
                    <TableCell>{medicine.company.name}</TableCell>
                    <TableCell>{medicine.composition}</TableCell>
                    <TableCell>{medicine.category.name}</TableCell>
                    <TableCell>{medicine.group.name}</TableCell>
                    <TableCell>
                      {medicine.quantity === 0 ? (<span className='text-red-600 animate-pulse'>out of stock</span>) : medicine.quantity}
                    </TableCell>
                    <TableCell className='flex gap-2'>

                      {/* edit mode */}

                      <CustomTooltip message='EDIT'>
                        <Pencil className='cursor-pointer text-gray-500 w-4  active:scale-95'
                          onClick={async () => {
                            await fetchMedicineDetails(medicine.id)
                            setModel((rest) => ({ ...rest, MedicineForm: true }))
                          }}
                        />
                      </CustomTooltip>

                      {/* DELETE MEDICINE */}

                      <CustomTooltip message='DELETE'>
                        <Trash className='cursor-pointer text-gray-500 w-4 active:scale-95 '
                          onClick={() => {
                            setModel(rest => ({ ...rest, alert: true }));
                            itemID.current = medicine.id
                          }}
                        />
                      </CustomTooltip>


                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>

            {/* if list is empty */}
            {medicines.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>Not found <SearchX className='h-5 w-5' /></h1>}
          </div>

          {/* pagination buttons */}

          <section>
            <CustomPagination
              total_pages={medicines?.total_pages!}
              currentPage={page}
              next={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              previous={(p) => setPage(p)}
            />
          </section>
        </div>
      </div >




      {/* Model */}

      {model.MedicineForm && <AddMedicineFormModel
        Submit={handleSubmit}
        isPending={loading.inline}
        medicineDetails={medicineDetails!}
        onClick={() => {
          setModel((rest) => ({ ...rest, MedicineForm: false }))
          setMedicineDetails(undefined)
        }}
      />}


      {/* Alert Model */}

      {model.alert && <AlertModel
        cancel={() => setModel((rest) => ({ ...rest, alert: false }))}
        isPending={loading.inline}
        continue={onDelete}
      />}


      {/* Medicine Details Model */}

      {model.medicineDetails && <MedicineDetailsModel
        medicineDetails={medicineDetails!}
        onClick={() => { setModel((rest) => ({ ...rest, medicineDetails: false })), setMedicineDetails(undefined) }}
      />}


      {/* loader model */}

      {loading.model && <LoaderModel />}

    </>

  )
}

export default Medicines