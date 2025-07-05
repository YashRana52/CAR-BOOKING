import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function Cards({ car }) {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.015 }}
      onClick={() => {
        navigate(`/cars-details/${car._id}`)
        scrollTo(0, 0)
      }}
      className='group rounded-xl overflow-hidden shadow-lg transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-100 via-slate-200 to-rose-100'
    >
      <div className='relative h-48 overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={car.image}
          alt='carimg'
          className='w-full h-full object-cover'
        />

        {car.isAvailable && (
          <p className='absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full'>
            Available Now
          </p>
        )}

        <div className='absolute bottom-4 right-4 bg-black/80 backdrop:blur-sm text-white px-3 py-2 rounded-lg'>
          <span className='font-semibold'>
            {currency}
            {car.pricePerDay}
          </span>
          <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='text-lg font-medium'>
              {car.brand} {car.model}
            </h3>
            <p className='text-muted-foreground text-sm'>
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.users_icon} alt='usericon' className='h-4 mr-2' />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.fuel_icon} alt='fuelicon' className='h-4 mr-2' />
            <span>{car.fuel_type}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.car_icon} alt='caricon' className='h-4 mr-2' />
            <span>{car.transmission}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt='locationicon' className='h-4 mr-2' />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cards
