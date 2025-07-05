import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function AddCar() {
  const {axios,currency} = useAppContext()

  const [isLoading,setIsLoading] =  useState(false)

  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  });

  const onSubmitHandler = async (e) => {
     e.preventDefault();
    if (isLoading)  return null

    setIsLoading(true)
      
    

    try {
      const formData = new FormData()
      formData.append('carData',JSON.stringify(car))
        formData.append('image', image);

      const {data} = await axios.post('api/owner/add-car',formData)
      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
           brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',

        })
        
      }else{
        toast.error(data.message)
      }
         
      
    } catch (error) {
        toast.success(error.message)
      
    }
    finally{
        setIsLoading(false)
      }
    
  };

 
  const inputStyle =
    'w-full px-3 py-2 mt-1 border border-borderColor rounded-md text-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-primary transition';

  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-5xl mx-auto">
      <Title
        title="Add New Car"
        subTitle="Provide details like brand, model, fuel type, seating capacity, and pricing to add a new car to your fleet."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-700 mt-8 max-w-3xl w-full"
      >
        {/* 📸 image upload */}
        <div className="mx-auto sm:mx-0">
          <label htmlFor="car-image" className="block w-fit cursor-pointer">
            <div className="w-28 h-28 border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-primary transition">
             <img
  src={image ? URL.createObjectURL(image) : assets.upload_icon}
  alt="Upload"
  className={`object-contain ${image ? "w-24 h-24" : "w-10 h-10"}`}
/>

            </div>
            <input
              hidden
              id="car-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
            Upload a clear image of the car
          </p>
        </div>

        {/*  brand / model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Brand</label>
            <input
              type="text"
              required
              placeholder="e.g. BMW"
              className={inputStyle}
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Model</label>
            <input
              type="text"
              required
              placeholder="e.g. X5"
              className={inputStyle}
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/*  year /  price /  category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm">Year</label>
            <input
              type="number"
              required
              placeholder="2025"
              className={inputStyle}
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Price Per Day ({currency})</label>
            <input
              type="number"
              required
              placeholder="1500"
              className={inputStyle}
              value={car.pricePerDay}
              onChange={(e) =>
                setCar({ ...car, pricePerDay: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm">Category</label>
            <select
              required
              className={inputStyle}
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/*  transmission /  fuel /  seats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm">Transmission</label>
            <select
              required
              className={inputStyle}
              value={car.transmission}
              onChange={(e) =>
                setCar({ ...car, transmission: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Fuel Type</label>
            <select
              required
              className={inputStyle}
              value={car.fuel_type}
              onChange={(e) =>
                setCar({ ...car, fuel_type: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Gas">Gas</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Seating Capacity</label>
            <input
              type="number"
              required
              placeholder="4"
              className={inputStyle}
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/*  location */}
        <div>
          <label className="text-sm">Location</label>
          <select
            required
            className={inputStyle}
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Delhi">Delhi</option>
            <option value="Kanpur">Kanpur</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/*  description */}
        <div>
          <label className="text-sm">Description</label>
          <textarea
            rows={4}
            required
            placeholder="Write a short description..."
            className={inputStyle + ' resize-none'}
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/*  button submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full sm:w-fit px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
        >
          <img src={assets.tick_icon} alt="Tick" className="w-4 h-4 " />
         { isLoading ?"Listing..." :"List Your Car"}
        </button>
      </form>
    </div>
  );
}

export default AddCar;
