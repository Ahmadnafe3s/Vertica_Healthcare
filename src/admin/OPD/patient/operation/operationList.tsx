import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Plus, SearchX, Trash } from 'lucide-react';
import OperationForm from './operationForm';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteOperation, getOperation_List } from '../../opdApiHandler';
import { Operation_list } from '@/types/type';
import AlertModel from '@/components/alertModel';
import OperationDetailsModel from './operationDetails';



const OperationList = () => {

  const { caseId } = useParams()

  const id = useRef<string | null>(null)

  const [OPERATION_LIST, SET_OPERATION] = useState<Operation_list[]>([])



  const [MODEL, SET_MODEL] = useState<{ operationForm: boolean, alert: boolean, operationDetails: boolean }>({
    operationForm: false,
    alert: false,
    operationDetails: false
  })



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
                  onClick={() => {
                    SET_MODEL((rest) => {
                      return {
                        ...rest,
                        operationDetails: true
                      }
                    });
                    id.current = opertion.id
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
                    onClick={() => {
                      SET_MODEL((rest) => {
                        return {
                          ...rest,
                          operationForm: true
                        }
                      });
                      id.current = opertion.id
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

      {MODEL.operationForm && <OperationForm ID={id.current}
        onClick={() => {
          SET_MODEL((rest) => {
            return {
              ...rest,
              operationForm: false
            }
          });
          fetchOPeration_list();
          id.current = null
        }}
      />}

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

      {MODEL.operationDetails && <OperationDetailsModel ID={String(id.current)}
        onClick={() => {
          SET_MODEL((rest) => {
            return {
              ...rest,
              operationDetails: false
            }
          });
          id.current = null
        }}
      />}
    </>
  )
}

export default OperationList