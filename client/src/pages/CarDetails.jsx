import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  const {
    cars,
    axios,
    currency,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  } = useAppContext()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find((car) => car._id === id))
  }, [cars, id])

  return car ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 bg-gradient-to-r from-slate-100 via-gray-200 to-slate-100'
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className='flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-700 transition-all'
        onClick={() => navigate(-1)}
      >
        <img
          src={assets.arrow_icon}
          alt='Back'
          className='rotate-180 opacity-65 h-4'
        />
        Back to all cars
      </motion.button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-2'
        >
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className='w-full h-auto md:max-h-[420px] object-cover rounded-xl mb-6 shadow-md'
          />

          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>
                {car.brand} {car.model}
              </h1>
              <p className='text-gray-500 text-lg'>
                {car.category} • {car.year}
              </p>
            </div>

            <hr className='border-borderColor my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location }
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className='flex flex-col items-center bg-light p-4 rounded-lg shadow-sm'
                >
                  <img src={icon} alt='' className='h-5 mb-2' />
                  <p className='text-sm text-gray-700'>{text}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className='text-xl font-medium mb-3'>Description</h2>
              <p className='text-gray-600 leading-relaxed'>{car.description}</p>
            </div>

            <div>
              <h2 className='text-xl font-medium mb-3'>Features</h2>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {[
                  '360 Camera',
                  'Bluetooth',
                  'GPS',
                  'Heated Seats',
                  'Rear View Mirror'
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center text-gray-600 text-sm'
                  >
                    <img src={assets.check_icon} className='h-4 mr-2' alt='✓' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='shadow-lg h-max sticky top-24 rounded-xl p-6 space-y-6 text-gray-600 border border-gray-200'
        >
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}
            {car.pricePerDay}
            <span className='text-base text-gray-400 font-normal'>per day</span>
          </p>

          <hr className='border-borderColor my-4' />

          <div className='flex flex-col space-y-1'>
            <label htmlFor='pickup-date' className='font-medium'>
              Pickup Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type='date'
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='pickup-date'
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <label htmlFor='return-date' className='font-medium'>
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type='date'
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='return-date'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'
          >
            Book Now
          </button>

          <p className='text-center text-sm text-gray-500'>
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </motion.div>
  ) : (
    <Loading />
  )
}

export default CarDetails
