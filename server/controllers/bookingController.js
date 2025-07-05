import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


//function to check availability  of car for a given date



 const checkAvailability = async(car,pickupDate,returnDate)=>{

    const booking = await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return booking.length === 0;

}

//Api to check Availability of cars for the given Date and location
export const checkAvailabilityOfCar = async(req,res)=>{
    try {
        const {location,pickupDate,returnDate} = req.body;
        //fetch all available car for the given location
        const cars = await Car.find({location,isAvailable:true})
        //check car availability for the given data range using promise
        const availabeCarsPromises = cars.map(async(car)=>{
         const isAvailable =   await checkAvailability(car._id,pickupDate,returnDate)
         return{...car._doc,isAvailable:isAvailable}

        })
        let availableCars = await Promise.all(availabeCarsPromises);
        availableCars = availableCars.filter(car=>car.isAvailable === true)

        res.json({success:true,availableCars})


        
    } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }

}

//Api to create Booking

export const createBooking = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {car,pickupDate,returnDate} = req.body;
        const isAvailable= await checkAvailability(car,pickupDate,returnDate)
        if (!isAvailable) {
            return res.json({success:false,message:"Car is not available in this time period"})
            
        }
        const carData = await Car.findById(car)

        //calculate price based on pickup and return date

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil((returned - picked)/(1000 * 60 * 60 *24))
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
         return res.json({ success: true, message:"Booking created" });
        
    } catch (error) {
         console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }

}

//Api to list User bookings

export const getUserBookings = async(req,res)=>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
        
    } catch (error) {
          console.log(error.message);
    return res.json({ success: false, message: error.message });
    }

}

//api to get Owner Bookings
export const getOwnerBookings = async(req,res)=>{
    try {
      if (req.user.role !== 'owner') {
        return res.json({success:false,message:"Unauthorized"})
        
      } 
      const bookings  = await Booking.find({owner:req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1})
       res.json({success:true,bookings})
        
    } catch (error) {
          console.log(error.message);
    return res.json({ success: false, message: error.message });
    }

}

//owner can confirm booking and cancel booking
export const changeBookingStatus = async(req,res)=>{
    try {
      const {_id} = req.user;
      const {bookingId,status} = req.body;
      const booking = await Booking.findById(bookingId)
      if (booking.owner.toString() !== _id.toString()) {
        return res.json({success:false,message:"Not Authorized"})
        
      }
      booking.status = status;
      await booking.save()
      return res.json({success:true,message:"status updated"})
        
    } catch (error) {
          console.log(error.message);
    return res.json({ success: false, message: error.message });
    }

}
