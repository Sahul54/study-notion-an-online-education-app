import React from 'react'


const StatsComponents = () => {

    const stats = [
        {count: '5K', lable: 'Active Students'},
        {count: '10', lable: 'Mentors'},
        {count: '200', lable: 'Courses'},
        {count: '50', lable: 'Awards'}
    ]
  return (
    <section className='bg-richblue-700'>
        <div className='flex flex-row gap-5 justify-between w-9/12 max-w-maxContent text-white mx-auto px-36'>
            {
                stats.map((data, index) => {
                    return (
                        <div key = {index} className='flex flex-col py-8 items-center '> 
                            <h1 className='text-2xl font-bold'>
                                {data.count}
                            </h1>
                            <p className='text-richblack-300'>
                                {data.lable}
                            </p>
                        </div>
                    )
                })
            }
        </div>

    </section>
  )
}

export default StatsComponents