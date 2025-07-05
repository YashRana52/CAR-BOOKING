import React, { useEffect, useState } from 'react';

import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ManageBookings() {
      const {axios,currency} = useAppContext()
  const [bookings, setBookings] = useState([]);


  const fetchOwnerData = async () => {
    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) :toast.error(data.message)
      
    } catch (error) {
      toast.error(error.message)
      
    }

  };
  const changeBookingStatus = async (bookingId,status) => {
    try {
     const { data } = await axios.post('/api/bookings/change-status', {
      bookingId,
      status
    });
   if(data.success) {
    toast.success(data.message)
    fetchOwnerData()
    
   }else{
    toast.error(data.message)
   }
      
    } catch (error) {
      toast.error(error.message)
      
    }

  };

  useEffect(() => {
    fetchOwnerData();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      <div className="max-w-3xl w-full mt-6 border border-borderColor rounded-md overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700 border-collapse">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium hidden sm:table-cell">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium hidden sm:table-cell">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-borderColor hover:bg-gray-50 transition text-gray-600"
              >
                {/* Car info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.car.seating_capacity} Seater
                    </p>
                  </div>
                </td>

                {/* Date range */}
                <td className="p-3 hidden sm:table-cell whitespace-nowrap">
                  {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                </td>

                {/* Price */}
                <td className="p-3 whitespace-nowrap">
                  {currency}
                  {booking.price}
                </td>

                {/* Payment method */}
                <td className="p-3 hidden sm:table-cell">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">
                    Offline
                  </span>
                </td>

                {/* Status Actions */}
                <td className="p-3">
                  {booking.status === 'pending' ? (
                    <select onChange={(e)=>changeBookingStatus(booking._id,e.target.value)}
                      value={booking.status}
                      className="px-3 py-1.5 mt-1 text-sm text-gray-600 border border-borderColor rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="canceled">Canceled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBookings;
