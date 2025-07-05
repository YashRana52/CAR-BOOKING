import React, { useEffect, useState } from 'react';
import { assets, } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function Dashboard() {
  const {axios,isOwner,currency} = useAppContext()
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });



  const dashboardCards = [
    { title: 'Total Cars', value: data.totalCars, icon: assets.carIconColored },
    { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored },
    { title: 'Pending Bookings', value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: 'Confirmed', value: data.completedBookings, icon: assets.listIconColored },
  ];

  const fetchdashBoardData = async()=>{
    try {
      const {data} = await axios.get('/api/owner/dashboard')
      if (data.success) {
        setData(data.dashboardData)
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
       toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchdashBoardData()
      
    }
    
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Admin Dashboard" subTitle="Monitor, Manage, and Maintain Your Car Booking System" />

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-5xl">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-borderColor bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div>
              <h1 className="text-sm text-gray-500">{card.title}</h1>
              <p className="text-xl font-bold text-gray-800">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Monthly Revenue */}
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full max-w-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
          <p className="text-sm text-gray-500 mb-4">Latest customer bookings</p>

          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between border-b last:border-none pb-3">
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img src={assets.listIconColored} alt="" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{booking.car.brand} {booking.car.model}</p>
                  <p className="text-sm text-gray-500">{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <p>{currency}{booking.price}</p>
                <span className="px-3 py-0.5 border border-borderColor rounded-full text-xs capitalize text-gray-600">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full max-w-sm shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Monthly Revenue</h2>
          <p className="text-sm text-gray-500 mb-2">Revenue for current month</p>
          <p className="text-3xl font-bold text-green-600">{currency}{data.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
