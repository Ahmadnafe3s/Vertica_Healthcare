import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Plus, SearchX, Trash } from 'lucide-react';
import OperationForm from './operationForm';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOperation, deleteOperation, getOperation_Details, getOperation_List, updateOperation } from '../../opdApiHandler';
import AlertModel from '@/components/alertModel';
import OperationDetailsModel from './operationDetails';
import LoaderModel from '@/components/loader';
import { z } from 'zod';
import { operationFormSchema } from '@/formSchemas/addOperationFormSchema';
import { operationDetailsType, PaginatedOperations } from '@/types/opd_section/operationType';
import CustomPagination from '@/components/customPagination';
import { Separator } from '@/components/ui/separator';



const OperationList = () => {

  // Route params
  const { patientId, opdId } = useParams()

  // search params
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page') || '1', 10)


  const id = useRef<string | null>(null)


  // spinner state
  const [isPending, setPending] = useState<boolean>(false)


  // API states
  const [OPERATION_LIST, SET_OPERATION] = useState<PaginatedOperations>() // dont use squre bracket
  const [OPERATION_DETAILS, SET_OPERATION_DETAILS] = useState<operationDetailsType | undefined>(undefined)


  // model state
  const [MODEL, SET_MODEL] = useState<{ operationForm: boolean, alert: boolean, operationDetails: boolean, loader: boolean }>({
    operationForm: false,
    alert: false,
    operationDetails: false,
    loader: false
  })


  // performing upsert
  const handleSubmit = async (formData: z.infer<typeof operationFormSchema>) => {
    try {
      setPending(true)
      let data;
      if (OPERATION_DETAILS) {
        data = await updateOperation(OPERATION_DETAILS.id, formData)
        SET_OPERATION_DETAILS(undefined)
      } else {
        data = await createOperation(Number(patientId), opdId!, formData) //opd is is string
      }
      toast.success(data.message)
      fetchOPeration_list() // refetching list
      SET_MODEL((rest) => {
        return {
          ...rest,
          operationForm: false
        }
      })
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // fetching operation details
  const fetchOperationDetails = async (id: string) => {
    try {
      SET_MODEL((rest) => {
        return {
          ...rest,
          loader: true
        }
      })
      const data = await getOperation_Details(id)
      SET_OPERATION_DETAILS(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      SET_MODEL((rest) => {
        return {
          ...rest,
          loader: false
        }
      })
    }
  }



  const fetchOPeration_list = async () => {
    try {
      const data = await getOperation_List(page, opdId!)
      SET_OPERATION(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }




  const onDelete = async () => {
    try {
      const data = await deleteOperation(String(id.current))
      toast.success(data.message)
      fetchOPeration_list()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      SET_MODEL((rest) => {
        return {
          ...rest,
          alert: false
        }
      });
      id.current = null
    }
  }


  useEffect(() => {
    fetchOPeration_list()
  }, [page])


  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 font-semibold">Operations</h1>
          <Button size='sm' onClick={() => {
            SET_MODEL((rest) => {
              return {
                ...rest,
                operationForm: true
              }
            })
          }}>
            <Plus /> Add Operation
          </Button>
        </div>

        <Separator />

        {/* with pagination */}

        <div className="flex flex-col min-h-[80vh]">
          <div className='flex-1'>
            <Table className="rounded-lg border">
              <TableHeader className='bg-zinc-100'>
                <TableRow>
                  <TableHead>Reference No</TableHead>
                  <TableHead>Operation Date</TableHead>
                  <TableHead>Operation Name</TableHead>
                  <TableHead>Operation Category</TableHead>
                  <TableHead>OT Technician</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {OPERATION_LIST?.data?.map((opertion, i) => {
                  return <TableRow key={i}>
                    <TableCell className='cursor-pointer font-semibold text-blue-500 hover:text-blue-400'
                      onClick={async () => {
                        await fetchOperationDetails(opertion.id)
                        SET_MODEL((rest) => {
                          return {
                            ...rest,
                            operationDetails: true
                          }
                        });
                      }}
                    >
                      {opertion.id}
                    </TableCell>
                    <TableCell>{opertion.date}</TableCell>
                    <TableCell>{opertion.operationName.name}</TableCell>
                    <TableCell>{opertion.operationCategory.name}</TableCell>
                    <TableCell>{opertion.ot_technician}</TableCell>
                    <TableCell className='flex space-x-2'>

                      <Pencil className='w-4 text-gray-600 active:scale-95 cursor-pointer'
                        onClick={async () => {
                          await fetchOperationDetails(opertion.id)
                          SET_MODEL((rest) => {
                            return {
                              ...rest,
                              operationForm: true
                            }
                          });
                        }}
                      />

                      <Trash className='w-4 text-gray-600 active:scale-95 cursor-pointer'
                        onClick={() => {
                          SET_MODEL((rest) => {
                            return {
                              ...rest,
                              alert: true
                            }
                          });
                          id.current = opertion.id
                        }}
                      />
                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>


            {/* error on emply list */}

            {OPERATION_LIST?.data.length! < 1 && <h1 className='text-gray-900 mt-4 sm:mt-5 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
          </div>

          <div className='my-10'>
            <CustomPagination total_pages={OPERATION_LIST?.total_pages!} currentPage={page} />
          </div>
        </div>

      </section>


      {/* models */}

      {MODEL.operationForm && (
        <OperationForm
          Submit={handleSubmit}
          isPending={isPending}
          operationDetails={OPERATION_DETAILS}
          onSubmitCapture={() => alert('hello')}
          onClick={() => {
            SET_MODEL((rest) => ({
              ...rest,
              operationForm: false,
            }));
            fetchOPeration_list();
            SET_OPERATION_DETAILS(undefined);
          }}
        />
      )}


      {/* Alert Model */}

      {
        MODEL.alert && <AlertModel
          cancel={() => {
            SET_MODEL((rest) => {
              return {
                ...rest,
                alert: false
              }
            });
            id.current = null
          }}
          continue={onDelete}
        />
      }


      {/* Operation details model */}

      {MODEL.operationDetails && <OperationDetailsModel operationDetails={OPERATION_DETAILS}
        onClick={() => {
          SET_MODEL((rest) => {
            return {
              ...rest,
              operationDetails: false
            }
          });
          SET_OPERATION_DETAILS(undefined)
        }}
      />}


      {/* loader */}

      {MODEL.loader && (
        <LoaderModel />
      )}
    </>
  )
}

export default OperationList