import { Camera } from 'lucide-react'


interface Props {
    onChange: (e: any) => void
    selected: string
}

const ImageInput = ({ onChange, selected }: Props) => {



    return (
        <div className='flex gap-x-2 items-center' >

            {selected && (
                <div className='relative h-[40px] w-[40px] flex items-center'>
                    <img src={selected} alt="profile" className='object-cover rounded-md' />
                </div>
            )}

            <label className='flex-1 '>
                <input type='file'
                    accept='image/*'
                    onChange={onChange}
                    className='hidden'
                />
                <div className="bg-primary/45 dark:bg-[#1e1e1e] dark:ring-border cursor-pointer ring-1 ring-primary h-[40px] w-full rounded-lg flex items-center justify-center">
                    <Camera />
                </div>
            </label>

        </div>
    )
}

export default ImageInput