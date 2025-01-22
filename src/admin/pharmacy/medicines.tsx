import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, FileText, ListMinus, Pencil, Plus, Printer, SearchX, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import AddMedicineFormModel from './forms/addMedicineFormModel'
import { useEffect, useRef, useState } from 'react'
import { MedicineList } from '@/types/type'
import toast from 'react-hot-toast'
import { deleteMedicine, getMedicineList, searchMedicine } from './pharmacyApiHandler'
import AlertModel from '@/components/alertModel'
import MedicineDetailsModel from './medicineDetailsModel'

const Medicines = () => {

  const [model, setModel] = useState<{ addMedicineForm: boolean, alert: boolean, medicineDetails: boolean }>({
    addMedicineForm: false,
    alert: false,
    medicineDetails: false
  })

  const [medicines, setMedicines] = useState<MedicineList[]>([])
  const id = useRef<number | undefined>(undefined)


  const fetchMedicineList = async () => {
    try {
      const data = await getMedicineList()
      setMedicines(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = async (value: string) => {
    try {
      const data = await searchMedicine(value)
      setMedicines(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  const onDelete = async () => {
    try {
      const data = await deleteMedicine(Number(id.current))
      toast.success(data.message)
      fetchMedicineList();   // after deleting refetch data
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel((rest) => {
        return {
          ...rest,
          alert: false
        }
      });
      id.current = undefined
    }
  }



  useEffect(() => {
    fetchMedicineList();
  }, [])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Medicines</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Button className='flex gap-x-1' variant={'outline'} size={'sm'}
              onClick={() => {
                setModel((rest) => {
                  return {
                    ...rest,
                    addMedicineForm: true
                  }
                })
              }}>
              <Plus />
              Add Medicine
            </Button>


            <Link to={'../purchase'} className={buttonVariants({
              variant: 'outline',
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
            <Input type='text' height='10px' placeholder='name , category , company' onChange={(e) => onSearch(e.target.value)} />
          </div>

          <div className='flex gap-x-2'>

            <FileText className='cursor-pointer text-gray-600' />
            <Printer className='cursor-pointer text-gray-600' />

          </div>
        </div>


        <Table className='my-10'>

          <TableHeader>
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
            {medicines.map((med, i) => {
              return <TableRow key={i} >
                <TableCell className='text-gray-800 font-semibold'>{med.name}</TableCell>
                <TableCell>{med.company}</TableCell>
                <TableCell>{med.composition}</TableCell>
                <TableCell>{med.category}</TableCell>
                <TableCell>{med.group}</TableCell>
                <TableCell>
                  {med.quantity === 0 ? (<span className='text-red-600'>out of stock</span>) : med.quantity}
                </TableCell>
                <TableCell className='flex gap-2'>


                  <Eye className='cursor-pointer text-gray-500 w-4  active:scale-95'
                    onClick={() => {
                      id.current = med.id;
                      setModel((rest) => {
                        return {
                          ...rest,
                          medicineDetails: true
                        }
                      })
                    }}
                  />
                  
                  {/* edit mode */}

                  <Pencil className='cursor-pointer text-gray-500 w-4  active:scale-95'
                    onClick={() => {
                      setModel((rest) => {
                        return {
                          ...rest,
                          addMedicineForm: true
                        }
                      });
                      id.current = med.id
                    }}
                  />

                  {/* DELETE MEDICINE */}

                  <Trash className='cursor-pointer text-gray-500 w-4 active:scale-95 '
                    onClick={() => {
                      setModel((rest) => {
                        return {
                          ...rest,
                          alert: true
                        }
                      });
                      id.current = med.id
                    }}
                  />

                </TableCell>
              </TableRow>
            })}
          </TableBody>

        </Table>

      </div >


      {/* if list is empty */}

      {medicines.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>Not found <SearchX className='h-5 w-5' /></h1>}


      {/* Model */}

      {model.addMedicineForm && <AddMedicineFormModel ID={id.current}
        onClick={() => {
          setModel((rest) => {
            return {
              ...rest,
              addMedicineForm: false
            }
          });
          id.current = undefined;
          fetchMedicineList()
        }}
      />}


      {/* Alert Model */}

      {model.alert && <AlertModel
        cancel={() => {
          setModel((rest) => {
            return {
              ...rest,
              alert: false
            }
          });
          id.current = undefined;
        }}

        continue={() => { onDelete() }}
      />}


      {/* Medicine Details Model */}

      {model.medicineDetails && <MedicineDetailsModel
        onClick={() => {
          setModel((rest) => {
            return {
              ...rest,
              medicineDetails: false
            }
          });
          id.current = undefined
        }}
        ID={Number(id.current)}
      />}

    </>

  )
}

export default Medicines