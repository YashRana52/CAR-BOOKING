import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { assets,  } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ManageCars() {
    const {axios,isOwner,currency} = useAppContext()

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async()=>{

    try {

      const {data }= await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
        
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
     toast.error(error.message);
      
      
    }

  }
  const toggleAvailability = async(carId)=>{

    try {

      const {data }= await axios.post('/api/owner/toggle-car',{carId})
      if (data.success) {
       toast.success(data.message)
       fetchOwnerCars()
        
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
     toast.error(error.message);
      
      
    }

  }
  const deleteCar = async(carId)=>{

    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if (!confirm) return null
        
      

      const {data }= await axios.post('/api/owner/delete-car',{carId})
      if (data.success) {
       toast.success(data.message)
       fetchOwnerCars()
        
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
     toast.error(error.message);
      
      
    }

  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

     
      <div className="max-w-3xl w-full mt-6 border border-borderColor rounded-md">
        <table className="w-full text-left text-sm text-gray-700 border-collapse">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium hidden sm:table-cell">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium hidden sm:table-cell">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className="border-t border-borderColor hover:bg-gray-50 transition"
              >
                {/* Car */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="truncate">
                    <p className="font-medium">
                      {car.brand}
                      <span className="hidden sm:inline"> {car.model}</span>
                    </p>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {car.seating_capacity} Seater · {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3 hidden sm:table-cell">{car.category}</td>

                {/* Price */}
                <td className="p-3 whitespace-nowrap">
                  {currency}
                  {car.pricePerDay}/day
                </td>

                {/* Status */}
                <td className="p-3 hidden sm:table-cell">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 flex items-center gap-3">
                  <img onClick={()=>toggleAvailability(car._id)}
                    src={
                      car.isAvailable
                        ? assets.eye_icon
                        : assets.eye_close_icon
                    }
                    alt="toggle"
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  />
                  <img onClick={()=>deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt="delete"
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCars;
