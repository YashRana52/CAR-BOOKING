import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLater from '../components/NewsLater'


function Home() {
  return (
    <div className='bg-gradient-to-br from-slate-100 via-slate-200 to-rose-100



'>
        <Hero/>
        <FeaturedSection/>
        <Banner/>
        <Testimonial/>
        <NewsLater/>
        
    </div>
  )
}

export default Home