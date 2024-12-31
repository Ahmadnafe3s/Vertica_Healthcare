import React, { HTMLAttributes } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { X } from 'lucide-react'


interface AddAppointmentProps extends HTMLAttributes<HTMLDivElement> { }

function AddAppointment({ ...props }: AddAppointmentProps) {
    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto max-h-[90vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className='p-3 bg-white rounded-md'>

                    <div>
                        <div className='flex justify-between'>
                            <p className='font-semibold mb-3'>Add Appointment</p>
                            <div {...props}>
                                <X className='cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div>
                                <Input type='search' placeholder='search patient' />
                            </div>
                            <div>
                                <Button type='button' variant='outline' size='sm'>New Patient</Button>
                            </div>
                        </div>

                        <div className='h-px w-full bg-gray-200 my-3' />
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Doctor</Label>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Doctor Fees$</Label>
                            <Input type='number' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Shift</Label>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="morning">Morning</SelectItem>
                                    <SelectItem value="evening">Evening</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Appointment Date</Label>
                            <Input type='date' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Appointment Priority</Label>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                    <SelectItem value="very urgent">Very Urgent</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Symptom Type</Label>
                            <Input type='text' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                            <Label>Description</Label>
                            <Textarea placeholder='write your symptoms here' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Payment mode</Label>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="to bank">Transfer to Bank</SelectItem>
                                    <SelectItem value="cheque">Cheque</SelectItem>
                                    <SelectItem value="upi">UPI</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Status</Label>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="cancel">Cancel</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Discount Percentage</Label>
                            <Input type='number' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Alternative Address</Label>
                            <Input type='text' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Reference</Label>
                            <Input type='text' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Previous Issue</Label>
                            <Input type='text' />
                        </div>

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                            <Label>Message</Label>
                            <Textarea placeholder='write your messsage here' />
                        </div>

                    </div>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end">
                        <Button type='submit' size={'sm'}>Save & Print</Button>
                        <Button type='submit' size={'sm'}>Save</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default AddAppointment