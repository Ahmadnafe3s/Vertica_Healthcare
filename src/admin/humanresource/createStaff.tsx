import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createStaffFormSchema } from '@/formSchemas/createStaffFormSchema'
import { bloodGroups, departments, maritalStatus, roles } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateStaff = () => {

  const { handleSubmit, register, setValue, control, formState: { errors } } = useForm<z.infer<typeof createStaffFormSchema>>({
    resolver: zodResolver(createStaffFormSchema)
  })


  function onSubmit(formData: z.infer<typeof createStaffFormSchema>) {
    console.log(formData);
  }

  return (
    <section className='bg-slate-50 pt-2 pb-20'>
      <form className='p-5 grid lg:grid-cols-4 md:grid-cols-3 ring-1 ring-gray-200 rounded-lg gap-4' onSubmit={handleSubmit(onSubmit)}>

        {/* header */}
        <div className="col-span-full">
          <h1 className='text-lg font-bold'>Basic Information</h1>
        </div>

        {/* separator */}
        <div className="h-px bg-gray-200 col-span-full mt-3 mb-4" />


        {/* staff iD */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Staff ID</Label>
          <Input type='number' {...register('staff_id')} />
          {errors.staff_id && <p className='text-sm text-red-500'>{errors.staff_id.message}</p>}
        </div>

        {/* role */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='role' render={({ field }) => {
            return <>
              <Label>Doctor</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {roles?.map((role, index) => {
                    return <SelectItem key={index} value={role.value}>{role.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.role && <p className='text-sm text-red-500'>{errors.role.message}</p>}
        </div>


        {/* Designation */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='designation' render={({ field }) => {
            return <>
              <Label>Designation</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {roles?.map((role, index) => {
                    return <SelectItem key={index} value={role.value}>{role.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.designation && <p className='text-sm text-red-500'>{errors.designation.message}</p>}
        </div>


        {/* Department */}

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
        </div>

        {/* name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input type='text' {...register('name')} />
          {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
        </div>

        {/*father name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Father Name</Label>
          <Input type='text' {...register('father_name')} />
          {errors.father_name && <p className='text-sm text-red-500'>{errors.father_name.message}</p>}
        </div>

        {/*mother name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Mother Name</Label>
          <Input type='text' {...register('mother_name')} />
          {errors.mother_name && <p className='text-sm text-red-500'>{errors.mother_name.message}</p>}
        </div>

        {/* gender */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='gender' render={({ field }) => {
            return <>
              <Label>Gender</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.gender && <p className='text-sm text-red-500'>{errors.gender.message}</p>}
        </div>


        {/* Marital Status */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='marital_status' render={({ field }) => {
            return <>
              <Label>Marital Status</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {maritalStatus?.map((status, index) => {
                    return <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
        </div>

        {/* Blood Group */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='blood_group' render={({ field }) => {
            return <>
              <Label>Blood Group</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {bloodGroups?.map((group, index) => {
                    return <SelectItem key={index} value={group.value}>{group.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
        </div>

        {/*Date of birth */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Date of birth</Label>
          <Input type='date' {...register('dob')} />
          {errors.dob && <p className='text-sm text-red-500'>{errors.dob.message}</p>}
        </div>

        {/*Date of joining */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Date of joining</Label>
          <Input type='date' {...register('date_of_joining')} />
        </div>

        {/*Phone */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Phone</Label>
          <Input type='number' {...register('phone')} />
        </div>

        {/*Emergency Contact */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Emergency Contact</Label>
          <Input type='number' {...register('emergency_contact')} />
        </div>

        {/* Email */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input type='email' {...register('email')} />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        {/* Image */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='image' render={({ field }) => {
            return <>
              <Label>Image</Label>
              <Input type='file'
                accept='image/*'
                onChange={(e) => { field.onChange(e.target.files?.[0]) }}
              />
            </>
          }} />
          {errors.image && <p className='text-sm text-red-500'>{errors.image.message}</p>}
        </div>

        {/* Current Address */}

        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
          <Label>Current Address</Label>
          <Input type='text' {...register('current_address')} />
        </div>

        {/* Permanent Address */}

        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
          <Label>Permanent Address</Label>
          <Input type='text' {...register('permanent_address')} />
        </div>

        {/* Qualification */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Qualification</Label>
          <Input type='text' {...register('qualification')} />
        </div>

        {/* Specialist */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Specialist</Label>
          <Input type='text' {...register('specialist')} />
        </div>

        {/* Work Experience */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Work Experience</Label>
          <Input type='text' {...register('work_experience')} />
        </div>

        {/* Note */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Note</Label>
          <Input type='text' {...register('note')} />
        </div>

        {/* Pan Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Pan Number</Label>
          <Input type='text' {...register('PAN')} />
        </div>

        {/* National Identification Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>National Identification Number</Label>
          <Input type='text' {...register('national_identification_number')} />
        </div>

        {/* local Identification Number */}

        <div className="w-full flex flex-col gap-y-2 lg:col-span-2">
          <Label>Local Identification Number</Label>
          <Input type='text' {...register('local_identification_number')} />
        </div>

        <div className="col-span-full">
          <Button type='submit' className='w-full sm:w-auto'>Save</Button>
        </div>

      </form>
    </section>
  )
}

export default CreateStaff