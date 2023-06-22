import { UserIcon, ArrowRightOnRectangleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid'
import { appName, salesText } from '../strings'

const AppBar = ({ user, handleLogout, handleProfileClick, handleSalesClick }) => {
    return (
        <section className='flex items-center w-full bg-white py-4 px-6 max-h-[70px] justify-between border-b-[4px]'>
            <section className='flex justify-start items-center space-x-4'>
                <img className='w-[36px] h-[36px]' src='logo.svg'></img>
                <h2 className='font-semibold text-[30px] text-stone-500 font-pacifico'>{appName}</h2>
            </section>
            <section
                className='flex items-center justify-center space-x-2 rounded-full bg-stone-600 px-3 py-2 cursor-pointer hover:drop-shadow-xl transition-all duration-300 ease-in-out'
                onClick={handleSalesClick}
                >
                <span className='text-white text-[16px] font-semibold tracking-wide'>{salesText}</span>
                <ArrowTrendingUpIcon className='w-6 h-6' color='white' />

            </section>


            <section className='flex items-center justify-center space-x-8'>
                <div className='flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-100 transition-colors duration-300 ease-in-out' onClick={handleProfileClick}>
                    <UserIcon className='rounded-full w-12 h-12 border-2 p-2 border-green-500' color='gray' />
                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-[20px] font-semibold tracking-wide text-gray-700'>{user.firstName} {user.lastName}</span>
                        <span className='font-bold text-stone-500 text-[14px] tracking-wide -translate-y-1'>{user.email}</span>
                    </div>
                </div>

                <ArrowRightOnRectangleIcon className='w-8 h-8 cursor-pointer' color='red' onClick={handleLogout} />

            </section>
        </section>
    )
}

export default AppBar