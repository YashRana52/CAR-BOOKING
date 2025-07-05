import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
// eslint-disable-next-line no-unused-vars
import {motion, scale} from 'motion/react'

function Hero() {
  const [pickupLocation, setPickupLocation] = useState('')
      const {pickupDate,setPickupDate,returnDate,setReturnDate,navigate} = useAppContext()
  const handleSearch = async(e)=>{
    e.preventDefault()
    navigate(
  '/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate
);




  }

  return (
    <motion.div
    initial={{opacity:0}}
   animate={{opacity:1}}
    transition={{duration:0.8}}
     className='h-screen flex flex-col items-center justify-center gap-14 bg-gradient-to-br from-slate-100 via-slate-200 to-rose-100 text-center '>
     <motion.h1
  initial={{ y: 60, opacity: 0, scale: 0.95 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
  className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 leading-snug tracking-tight"
>
Rent Your Dream Car with a Click


</motion.h1>

      <motion.form
       initial={{scale:0.95,opacity:0,y:50}}
   animate={{scale:1,opacity:1,y:0}}
    transition={{duration:0.6,delay:0.4}}
      
      onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-gradient-to-r from-rose-100 via-slate-200 to-rose-100
shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8 '>

          <div className='flex flex-col items-start gap-2'>
            <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
              <option value=''>Select City</option>
              {
                cityList.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))
              }
            </select>

            <p>{pickupLocation ? pickupLocation : 'Please choose a city'}</p>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="pickup-date">Start Date</label>
            <input value={pickupDate}onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="return-date">End Date</label>
            <input value={returnDate}onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='text-sm text-gray-500' required />
          </div>

        </div>

        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        
        className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
          <img src={assets.search_icon} alt="search" className='brightness-300' />
          Find Cars
        </motion.button>
      </motion.form>

     <motion.img
  initial={{ x: 100, opacity: 0 }}        
  animate={{ x: 0, opacity: 1 }}         
  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
  src={assets.main_car}
  alt="car"
  className="max-h-74 mx-auto"
 />

    </motion.div>
  )
}

export default Hero
