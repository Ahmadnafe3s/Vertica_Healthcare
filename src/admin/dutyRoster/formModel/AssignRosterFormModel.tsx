import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createRoster, fetchRosterDetails, fetchStaffs, updateRoster } from '../apihandlers'
import { ScrollArea } from '@/components/ui/scroll-area'
import Dialog from '@/components/Dialog'



interface AssignRosterFormModelProps extends HTMLAttributes<HTMLDivElement> {
  ID: number | null
}


interface staffs {
  id: string,
  name: string,
  role: string
}


const AssignRosterFormModel = ({ ID, ...props }: AssignRosterFormModelProps) => {

  const [staffs, setStaff] = useState<staffs[]>([])
  const [isPending, setPending] = useState<boolean>(false)

  const { handleSubmit, setValue, control, register, formState: { errors }, reset } = useForm<z.infer<typeof AssignRosterSchema>>(
    {
      resolver: zodResolver(AssignRosterSchema)
    }
  )


  // performing both works (create update)

  const onSubmit = async (formData: z.infer<typeof AssignRosterSchema>) => {
    try {
      setPending(true)
      let message = ''

      if (!!ID) {  //id editmode then upadte
        message = await updateRoster(formData, ID)
      } else {
        message = await createRoster(formData)
      }

      toast.success(message)

    } catch ({ message }: any) {
      toast.error(message)
    }
    finally {
      setPending(false)
    }

  }


  useEffect(() => {

    (async function () {

      try {

        const data = await fetchStaffs()   // it is required to keep at top
        setStaff(data)

        // if edit mode then set form values
        if (!!ID) {
          const data = await fetchRosterDetails(ID)
          setValue('staffId', data.staffId.toString()) // this will select associated staff with roster
          setValue('shiftStartTime', data.shiftStartTime)
          setValue('shiftEndTime', data.shiftEndTime)
          setValue('shiftStartDate', data.shiftStartDate)
          setValue('shiftEndDate', data.shiftEndDate)
          setValue('shift', data.shift)
          setValue('note', data.note)
        }

      } catch ({ message }: any) {
        toast.error(message)
      }

    })() //IIEF

  }, [])




  return (
    <Dialog pageTitle='Assign Roster' className='sm:w-[550px] mx-auto' {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ScrollArea className='h-[60vh] sm:h-[55vh]'>
          <div className="grid sm:grid-cols-2 gap-5 pb-5 px-2.5">

            {/* Staff */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='staffId' render={({ field }) => {
                return <>
                  <Label>Staff</Label>
                  <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                    <SelectTrigger >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent className='z-[200]'>
                      {staffs?.map((staff, index) => {
                        return <SelectItem key={index} value={staff.id.toString()}>{`${staff.name} (${staff.role})`}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                </>
              }} />
              {errors.staffId && <p className='text-sm text-red-500'>{errors.staffId.message}</p>}
            </div>

            {/* Shift Start Time */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift Start Time</Label>
              <Input type='time' {...register('shiftStartTime')} />
              {errors.shiftStartTime && <p className='text-sm text-red-500'>{errors.shiftStartTime.message}</p>}
            </div>

            {/* Shift End Time */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift End Time</Label>
              <Input type='time' {...register('shiftEndTime')} />
              {errors.shiftEndTime && <p className='text-sm text-red-500'>{errors.shiftEndTime.message}</p>}
            </div>

            {/* Shift Start Date */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift Start Date</Label>
              <Input type='date' {...register('shiftStartDate')} />
              {errors.shiftStartDate && <p className='text-sm text-red-500'>{errors.shiftStartDate.message}</p>}
            </div>


            {/* Shift End Date */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift End Date</Label>
              <Input type='date' {...register('shiftEndDate')} />
              {errors.shiftEndDate && <p className='text-sm text-red-500'>{errors.shiftEndDate.message}</p>}
            </div>


            {/* Shift */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='shift' render={({ field }) => {
                return <>
                  <Label>Shift</Label>
                  <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                    <SelectTrigger >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent className='z-[200]'>
                      <SelectItem value='morning'>Morning</SelectItem>
                      <SelectItem value='evening'>Evening</SelectItem>
                      <SelectItem value='night'>Night</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              }} />
              {errors.shift && <p className='text-sm text-red-500'>{errors.shift.message}</p>}
            </div>


            {/* note */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Note</Label>
              <Input type='text' {...register('note')} />
            </div>

          </div>
        </ScrollArea>

        <div className="flex mt-5 mb-2 gap-x-2 px-2.5">
          <Button type='submit' variant='outline' onClick={() => { reset(); ID = null }}>Reset</Button>
          <Button type='submit' className='flex-1'>{ID ? 'Update Roster' : 'Save Roster'} {isPending && <Loader className='h-4 w-4 animate-spin' />}</Button>
        </div>
      </form>
    </Dialog>
  )
}

export default AssignRosterFormModel