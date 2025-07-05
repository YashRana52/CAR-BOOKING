import React from 'react'
import { assets, footerLinks } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'
      >
        <div>
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='w-34 md:w-32'
            src={assets.logo2}
            alt='dummyLogoColored'
          />
          <p className='max-w-[410px] mt-6'>
            Ab car rental hua aasaan – chuno car, karo booking, aur pao doorstep delivery!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'
        >
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className='hover:underline transition'>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className='py-4 text-center text-sm md:text-base text-gray-500/80'
      >
        YashRana 2025 © Car-Rental All Right Reserved.
      </motion.p>
    </motion.div>
  )
}

export default Footer
