import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const { currency, user, axios } = useAppContext()

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.4 },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto'
    >
      <Title
        title='My Bookings'
        subTitle='View and manage all your car bookings'
        align='left'
      />

      {bookings.length === 0 && (
        <p className='text-gray-500 mt-10'>You have no bookings yet.</p>
      )}

      {bookings.map((b, i) => (
        <motion.article
          variants={card}
          key={b._id}
          className='bg-white/70 border border-borderColor rounded-lg shadow-sm mt-8 first:mt-12 mb-12'
        >
          <div className='grid grid-cols-1 md:grid-cols-12 gap-6 p-6'>
            <div className='md:col-span-3'>
              <div className='rounded-md overflow-hidden aspect-video mb-3'>
                <img
                  src={b.car.image}
                  alt={`${b.car.brand} ${b.car.model}`}
                  className='w-full h-full object-cover'
                />
              </div>
              <h2 className='text-lg font-semibold'>
                {b.car.brand} {b.car.model}
              </h2>
              <p className='text-gray-500'>
                {b.car.year} • {b.car.category} • {b.car.location}
              </p>
            </div>

            <div className='md:col-span-5 flex flex-col gap-4'>
              <div className='flex items-center flex-wrap gap-2'>
                <span className='px-3 py-1.5 bg-light rounded text-xs font-medium'>
                  Booking #{i + 1}
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    b.status === 'confirmed'
                      ? 'bg-green-400/15 text-green-600'
                      : 'bg-red-400/15 text-red-600'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <div className='flex items-start gap-3'>
                <img
                  src={assets.calendar_icon_colored}
                  className='w-4 h-4 mt-0.5 shrink-0'
                  alt=''
                />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p className='text-base font-medium text-gray-700'>
                    📅 {formatDate(b.pickupDate)} → {formatDate(b.returnDate)}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <img
                  src={assets.location_icon_colored}
                  className='w-4 h-4 mt-0.5 shrink-0'
                  alt=''
                />
                <div>
                  <p className='text-gray-500'>Pick‑up Location</p>
                  <p>{b.car.location}</p>
                </div>
              </div>
            </div>

            <div className='md:col-span-4 flex flex-col justify-between items-start md:items-end'>
              <div>
                <p className='text-gray-500 mb-1'>Total Price</p>
                <p className='text-2xl font-bold leading-none'>
                  {currency}
                  {b.price}
                </p>
              </div>
              <p className='text-gray-500 mt-4 md:mt-0 flex items-center gap-1'>
                <img
                  src={assets.calendar_icon_colored}
                  className='w-3 h-3'
                  alt=''
                />
                Booked on {formatDate(b.createdAt)}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

export default MyBookings
