import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Plus, SearchX, Trash } from 'lucide-react';
import OperationForm from './operationForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOperation, deleteOperation, getOperation_Details, getOperations, updateOperation } from '../../opdApiHandler';
import AlertModel from '@/components/alertModel';
import OperationDetailsModel from './operationDetails';
import LoaderModel from '@/components/loader';
import { z } from 'zod';
import { operationFormSchema } from '@/formSchemas/addOperationFormSchema';
import { operationDetailsType, PaginatedOperations } from '@/types/opd_section/operationType';
import CustomPagination from '@/components/customPagination';
import { Separator } from '@/components/ui/separator';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useAppSelector } from '@/hooks';
import { authSelector } from '@/features/auth/authSlice';
import { cn } from '@/lib/utils';
import usePermission from '@/authz';
import { useConfirmation } from '@/hooks/useConfirmation';
import CustomTooltip from '@/components/customTooltip';
import EmptyList from '@/components/emptyList';



const OperationList = () => {

  // Route params
  const { patientId, opdId } = useParams()

  // search params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  // custom hook
  const { hasPermission, loadPermission } = usePermission()
  const { confirm, confirmationProps } = useConfirmation()


  // session
  const { user } = useAppSelector(authSelector)

  // spinner state
  const [isPending, setPending] = useState<boolean>(false)


  // API states
  const [OPERATION_LIST, SET_OPERATION] = useState<PaginatedOperations>() // dont use squre bracket
  const [OPERATION_DETAILS, SET_OPERATION_DETAILS] = useState<operationDetailsType | undefined>(undefined)


  // model state
  const [model, setModel] = useState({ operationForm: false, operationDetails: false, loader: false })


  // performing upsert
  const handleSubmit = async (formData: z.infer<typeof operationFormSchema>) => {
    try {
      setPending(true)
      let data;

      OPERATION_DETAILS ? (
        data = await updateOperation(OPERATION_DETAILS.id, formData),
        SET_OPERATION_DETAILS(undefined)
      ) : (data = await createOperation(Number(patientId), opdId!, formData))

      toast.success(data.message)
      fetchOperations() // refetching list
      setModel({ ...model, operationForm: false })
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // fetching operation details
  const fetchOperationDetails = async (id: string) => {
    try {
      setModel({ ...model, loader: true })
      const data = await getOperation_Details(id)
      SET_OPERATION_DETAILS(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel({ ...model, loader: false })
    }
  }



  const fetchOperations = async () => {
    try {
      const data = await getOperations({ opdId: opdId!, page, limit: 10 })
      SET_OPERATION(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteOperation(id)
      toast.success(data.message)
      fetchOperations()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchOperations()
    loadPermission()
  }, [page])


  return (
    <>
      <section className="flex flex-col gap-y-5">
        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Operations</h1>
          {hasPermission('create', 'operation') && (
            <Button size='sm' className={cn({ 'hidden': user?.role === 'receptionist' })} onClick={() => {
              setModel({ ...model, operationForm: true })
            }}>
              <Plus /> Add Operation
            </Button>
          )}
        </div>

        <Separator />

        {/* with pagination */}

        <div className="flex flex-col min-h-[70vh] mb-20">
          <div className='flex-1'>
            <Table className="rounded-lg border dark:border-gray-800">
              <TableHeader className="bg-zinc-100 dark:bg-gray-900">
                <TableRow>
                  <TableHead>Reference No</TableHead>
                  <TableHead>Operation Date</TableHead>
                  <TableHead>Operation Name</TableHead>
                  <TableHead>Operation Category</TableHead>
                  <TableHead>OT Technician</TableHead>
                  {(hasPermission('update', 'operation') || hasPermission('delete', 'operation')) && (
                    <TableHead>Action</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {OPERATION_LIST?.data?.map((opertion, i) => {
                  return <TableRow key={i}>
                    <TableCell className='cursor-pointer font-semibold text-blue-500 hover:text-blue-400'
                      onClick={async () => {
                        await fetchOperationDetails(opertion.id)
                        setModel({ ...model, operationDetails: true })
                      }}
                    >
                      {opertion.id}
                    </TableCell>
                    <TableCell>{opertion.date}</TableCell>
                    <TableCell>{opertion.operationName.name}</TableCell>
                    <TableCell>{opertion.operationCategory.name}</TableCell>
                    <TableCell>{opertion.ot_technician}</TableCell>
                    <TableCell className={cn("flex space-x-2")}>

                      {/* EDIT */}
                      {hasPermission('update', 'operation') && (
                        <CustomTooltip message='EDIT'>
                          <Pencil className='w-4 text-gray-600 dark:text-gray-400 active:scale-95 cursor-pointer'
                            onClick={async () => {
                              await fetchOperationDetails(opertion.id)
                              setModel({ ...model, operationForm: true });
                            }}
                          />
                        </CustomTooltip>
                      )}

                      {/* DELETE */}
                      {hasPermission('delete', 'operation') && (
                        <CustomTooltip message='DELETE'>
                          <Trash className='w-4 text-gray-600 dark:text-gray-400 active:scale-95 cursor-pointer'
                            onClick={() => { onDelete(opertion.id) }} />
                        </CustomTooltip>
                      )}

                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>


            {/* error on emply list */}

            <EmptyList length={OPERATION_LIST?.data.length!} message="No operations found" />
          </div>

          <section>
            <CustomPagination
              total_pages={OPERATION_LIST?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </div>

      </section>


      {/* models */}

      {model.operationForm && (
        <OperationForm
          Submit={handleSubmit}
          isPending={isPending}
          operationDetails={OPERATION_DETAILS}
          onClick={() => {
            setModel({ ...model, operationForm: false });
            SET_OPERATION_DETAILS(undefined);
          }}
        />
      )}


      {/* Alert Model */}

      {
        confirmationProps.isOpen && <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      }


      {/* Operation details model */}

      {model.operationDetails && <OperationDetailsModel operationDetails={OPERATION_DETAILS}
        onClick={() => {
          setModel({ ...model, operationDetails: false })
          SET_OPERATION_DETAILS(undefined)
        }}
      />}


      {/* loader */}

      {model.loader && (
        <LoaderModel />
      )}
    </>
  )
}

export default OperationList