import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Plus, SearchX, Trash } from 'lucide-react';
import OperationForm from './operationForm';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteOperation, getOperation_Details, getOperation_List } from '../../opdApiHandler';
import { Operation_Details, Operation_list } from '@/types/type';
import AlertModel from '@/components/alertModel';
import OperationDetailsModel from './operationDetails';
import LoaderModel from '@/components/loader';



const OperationList = () => {

  const { caseId } = useParams()

  const id = useRef<string | null>(null)

  const [OPERATION_LIST, SET_OPERATION] = useState<Operation_list[]>([])
  const [OPERATION_DETAILS, SET_OPERATION_DETAILS] = useState<Operation_Details | undefined>(undefined)


  const [MODEL, SET_MODEL] = useState<{ operationForm: boolean, alert: boolean, operationDetails: boolean, loader: boolean }>({
    operationForm: false,
    alert: false,
    operationDetails: false,
    loader: false
  })


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
      const data = await getOperation_List(Number(caseId))
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
  }, [])


  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 font-semibold">Operations</h1>
          <Button variant='outline' size='sm' onClick={() => {
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

        <Table>

          <TableHeader>
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
            {OPERATION_LIST?.map((opertion, i) => {
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
                <TableCell>{opertion.name}</TableCell>
                <TableCell>{opertion.category}</TableCell>
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

      </section>

      {/* error on emply list */}

      {OPERATION_LIST.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}


      {/* models */}

      {MODEL.operationForm && (
        <OperationForm
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