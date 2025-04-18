import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AddMedicinesFormSchema } from '@/formSchemas/addMedicinesFormSchema'
import { useConfirmation } from '@/hooks/useConfirmation'
import { medicineDetails, paginatedMedicines } from '@/types/pharmacy/pharmacy'
import { ListMinus, Plus, SearchX } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import { createMedicine, deleteMedicine, getMedicinedetails, getMedicineList, updateMedicine } from '../pharmacyApiHandler'
import AddMedicineFormModel from './createMedicineForm'
import MedicineDetailsModel from './medicineDetailsModel'



const Medicines = () => {

  // custom hooks
  const { confirm, confirmationProps } = useConfirmation()

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  //pending states
  const [loading, setLoading] = useState({ inline: false, model: false })

  // Model states
  const [model, setModel] = useState({ MedicineForm: false, medicineDetails: false })

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



  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteMedicine(id)
      toast.success(data.message)
      fetchMedicineList();   // after deleting refetch data
    } catch ({ message }: any) {
      toast.error(message)
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
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Medicines</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='medicines'>
              <Button className='flex gap-x-1' size={'sm'}
                onClick={() => setModel(rest => ({ ...rest, MedicineForm: true }))}>
                <Plus />
                Add Medicine
              </Button>
            </PermissionProtectedAction>

            <PermissionProtectedAction action='view' module='purchase_medicine'>
              <Link to={'../purchase'} className={buttonVariants({
                variant: 'default',
                size: 'sm',
                className: 'flex gap-x-1'
              })}>
                <ListMinus />
                Purcahse
              </Link>
            </PermissionProtectedAction>

          </div>
        </div>

        <Separator />


        {/* search bar */}

        <div className='flex py-3 items-center justify-between'>

          <div className='flex gap-x-2 w-56'>
            <Input type='text' height='10px' placeholder='name , category , company' onChange={(e) => onSearch(e.target.value)} defaultValue={search!} />
          </div>

        </div>

        <Separator />

        <div className="flex flex-col mb-16 gap-y-10 min-h-[75vh]">
          <div className="flex-1">
            <Table className="rounded-lg border my-10 dark:border-gray-800">
              <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
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
                      {/* DELETE & EDIT */}
                      <PermissionTableActions
                        module='medicines'
                        onEdit={async () => {
                          await fetchMedicineDetails(medicine.id)
                          setModel((rest) => ({ ...rest, MedicineForm: true }))
                        }}
                        onDelete={() => onDelete(medicine.id)}
                      />
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

      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
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