import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function Testimonial() {
  const testimonials = [
    {
      name: 'Rahul Verma',
      location: 'Delhi, India',
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        'Amazing car rental experience! The vehicle was clean, well‑maintained, and the booking process was super smooth. Will definitely rent again.',
    },
    {
      name: 'Priya Nair',
      location: 'Bengaluru, India',
      image: assets.testimonial_image_2,
      rating: 4,
      testimonial:
        'Booked a sedan for a weekend trip. The customer support was helpful, and the pickup/drop service was right on time. Great value for money!',
    },
    {
      name: 'Nita Singh',
      location: 'Lucknow, India',
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        'Rented an SUV for a family road trip — the experience was seamless! The car was in excellent condition, and pricing was very reasonable. Totally satisfied with the service.',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25, duration: 0.6 },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className='py-28 px-6 md:px-16 lg:px-24 xl:px-44'>
      <Title
        title='What Our Customers Say'
        subTitle='Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.'
      />

      <motion.div
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-80px' }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={card}
            className='bg-gradient-to-br from-slate-100 via-slate-200 to-rose-100 p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500'
          >
            <div className='flex items-center gap-3'>
              <img className='w-12 h-12 rounded-full' src={t.image} alt={t.name} />
              <div>
                <p className='text-xl'>{t.name}</p>
                <p className='text-gray-500'>{t.location}</p>
              </div>
            </div>

            <div className='flex items-center gap-1 mt-4'>
              {Array(t.rating)
                .fill(0)
                .map((_, i2) => (
                  <img key={i2} src={assets.star_icon} alt='star' />
                ))}
            </div>

            <p className='text-gray-500 max-w-90 mt-4 font-light'>
              "{t.testimonial}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Testimonial
