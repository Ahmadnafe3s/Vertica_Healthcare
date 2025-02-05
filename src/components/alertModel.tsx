import { BadgeAlert, Loader } from "lucide-react"
import { Button } from "./ui/button"
import { HTMLAttributes } from "react";



interface alertModelProps extends HTMLAttributes<HTMLDivElement> {
  cancel: () => void;
  continue: () => void;
  isPending?: boolean
}


const AlertModel = ({ isPending, cancel, continue: continueAction }: alertModelProps) => {


  return (
    <>
      <div onClick={cancel} className='fixed top-0 left-0 h-screen w-full transition-all z-[500]' style={{ background: '#0000009c' }}></div>

      <div className="fixed flex flex-col gap-2 rounded-md ring-1 p-2.5 ring-gray-200 shadow-lg w-[300px] bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[500]">

        <div className="flex justify-center mt-3">
          <div className="h-16 w-16 bg-red-500 flex items-center rounded-full">
            <BadgeAlert className="h-12 w-12 text-white mx-auto" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Alert</h1>
        </div>

        <div className="text-center">
          <p className="text-gray-600">Do you really want to perform the certain action?</p>
        </div>


        <div className="mt-2 space-y-2">
          <Button type="button" variant={'destructive'} size={'sm'} className="w-full" onClick={continueAction} >{isPending ? <Loader className="animate-spin" /> : 'Continue'}</Button>
          <Button type="button" variant={'outline'} size={'sm'} className="w-full" onClick={cancel}>Cancel</Button>
        </div>
      </div>

    </>
  )
}

export default AlertModel