import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import { departments } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface AssignRosterFormModelProps extends HTMLAttributes<HTMLDivElement> { }

const AssignRosterFormModel = ({ ...props }: AssignRosterFormModelProps) => {

  const [staffs, setStaff] = useState([{ id: '123', name: 'Dr. AJ' }])

  const { handleSubmit, control, register, formState: { errors }, reset } = useForm<z.infer<typeof AssignRosterSchema>>(
    {
      resolver: zodResolver(AssignRosterSchema)
    }
  )

  function onSubmit(formData: z.infer<typeof AssignRosterSchema>) {

    console.log(formData);


  }


  return (
    <>
      <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

      <MaxWidthWrapper className='fixed lg:!px-40 h-auto max-h-[90vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

        <form className='p-3 bg-white rounded-md' onSubmit={handleSubmit(onSubmit)}>

          <div className='flex justify-between pt-2 pb-3 border-b border-gray-200 col-span-full'>
            <p className='font-semibold text-xl'>Assign Roster</p>
            <div {...props}>
              <X className='cursor-pointer' />
            </div>
          </div>



          <div className="grid md:grid-cols-3 gap-5">

            {/* Staff */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='staff_id' render={({ field }) => {
                return <>
                  <Label>Staff</Label>
                  <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                    <SelectTrigger >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent className='z-[200]'>
                      {staffs?.map((staff, index) => {
                        return <SelectItem key={index} value={staff.id}>{staff.name}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                </>
              }} />
              {errors.staff_id && <p className='text-sm text-red-500'>{errors.staff_id.message}</p>}
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


            {/* department */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='department' render={({ field }) => {
                return <>
                  <Label>Department</Label>
                  <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                    <SelectTrigger >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent className='z-[200]'>
                      {departments?.map((department, index) => {
                        return <SelectItem key={index} value={department.value}>{department.label}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                </>
              }} />
              {errors.department && <p className='text-sm text-red-500'>{errors.department.message}</p>}
            </div>


            {/* note */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Note</Label>
              <Input type='text' {...register('note')} />
            </div>

          </div>

          <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end">
            <Button type='submit' size={'sm'} variant={'ghost'} onClick={() => { reset() }}>Reset</Button>
            <Button type='submit' size={'sm'}>Save</Button>
          </div>

        </form>
      </MaxWidthWrapper>
    </>
  )
}

export default AssignRosterFormModel