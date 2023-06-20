import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid'
import { appName } from '../strings'

const AppBar = ({ user }) => {
    return (
        <section className='flex items-center w-full bg-white py-4 px-6 max-h-[70px] justify-between'>
            <section className='flex justify-start items-center space-x-4'>
                <img className='w-[36px] h-[36px]' src='logo.svg'></img>
                <h2 className='font-semibold text-[30px] text-stone-500 font-pacifico'>{appName}</h2>
            </section>
            <section className='flex items-center justify-center space-x-4 cursor-pointer'>
                <UserIcon className='rounded-full w-12 h-12 border-2 p-2 border-green-500' color='gray' />
                <div className='flex flex-col items-start justify-start'>
                    <span className='text-[22px] font-semibold tracking-wide text-gray-700'>{user.firstName} {user.lastName}</span>
                    <span className='font-bold text-stone-500 text-[16px] tracking-wide -translate-y-1'>{user.email}</span>
                </div>
                <ChevronDownIcon className='w-8 h-8' color='gray' />

            </section>
        </section>
    )
}

export default AppBar