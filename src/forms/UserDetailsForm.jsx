
const UserDetailsForm = ({data, submitText, handleSubmit, handleChange}) => {
  return (
    <form noValidate onSubmit={handleSubmit}
            className="flex flex-col w-full space-y-4 items-center">
            <section className='flex w-full space-x-3'>
                <input
                    name='firstName'
                    type='text'
                    value={data.firstName}
                    onChange={handleChange}
                    placeholder='First name'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='lastName'
                    type='text'
                    value={data.lastName}
                    onChange={handleChange}
                    placeholder='Last name'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            {/* <input
                name='password'
                type='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
            </input> */}
            <section className='flex w-full space-x-3'>
                <input
                    name='road'
                    type='text'
                    value={data.address.road}
                    onChange={handleChange}
                    placeholder='Road name'
                    className='w-[50%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='roadNumber'
                    type='number'
                    value={data.address.roadNumber}
                    onChange={handleChange}
                    placeholder='Road No'
                    className='w-[20%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='postalCode'
                    type='number'
                    value={data.address.postalCode}
                    onChange={handleChange}
                    placeholder='Postal code'
                    className='w-[30%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <section className='flex w-full space-x-3'>
                <input
                    name='city'
                    type='text'
                    value={data.address.city}
                    onChange={handleChange}
                    placeholder='City'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='country'
                    type='text'
                    value={data.address.country}
                    onChange={handleChange}
                    placeholder='Country'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <button
                type="submit" 
                className="w-full my-16 p-4 bg-gray-800 transition ease-in-out duration:700 hover:bg-gray-700 text-white">
                {submitText}
            </button>
        </form>
  )
}

export default UserDetailsForm
