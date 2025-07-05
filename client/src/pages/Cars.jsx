import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Cards from '../components/Cards';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Cars() {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const [input, setInput] = useState('');
  const { cars, axios } = useAppContext();
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = () => {
    if (input === '') {
      setFilteredCars(cars);
      return;
    }
    const value = input.trim().toLowerCase();
    const filtered = cars.filter((car) => {
      return (
        car?.brand?.toLowerCase().includes(value) ||
      car?.model?.toLowerCase().includes(value) ||
      car?.category?.toLowerCase().includes(value) ||
      car?.transmission?.toLowerCase().includes(value)
      );
    });
    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast('No cars available');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSearchData && cars.length > 0) {
      searchCarAvailability();
    }
  }, [pickupLocation, pickupDate, returnDate, cars]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [input, cars]);

  return (
    <div className="bg-light min-h-screen">
      <div className="flex flex-col items-center py-20 px-4 sm:px-6 lg:px-12 ">
        <Title
          title="Available Cars"
          subTitle="Find your premium car for a smooth and stylish ride."
        />
        <div className="flex items-center bg-white px-4 mt-6 w-full max-w-2xl h-12 rounded-full shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-3 opacity-60" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-gray-700 placeholder-gray-400"
          />
          <img src={assets.filter_icon} alt="filter" className="w-5 h-5 ml-3 opacity-60" />
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mt-10 pb-10">
        <p className="text-gray-600 font-medium mb-4">
          Showing <span className="font-bold text-black">{filteredCars.length}</span> Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <div key={index} className="transition-transform hover:scale-[1.02] duration-200">
              <Cards car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cars;
