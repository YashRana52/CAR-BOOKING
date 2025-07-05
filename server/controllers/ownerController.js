import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'
//change role
export const changeRoleToOwner = async(req,res)=>{

    try {
        const{_id} = req.user;
        await User.findByIdAndUpdate(_id,{role:'owner'})
        return res.json({
            success:true,message:"Now you can list cars"
        })
        
    } catch (error) {
        console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }


}

//api to list car

export const addCar = async(req,res)=>{

    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
     //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
      const response =  await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        })
// optimize through imagekit URL tranformation
var optimizedImageUrl = imagekit.url({
    path : response.filePath,
   
    transformation : [{
        width:'1280'},//width resize
        
    {quality:'auto'},//Auto compression
    {format:'webp'},//convert to modern formate 
]
});
const image = optimizedImageUrl;
await Car.create({
    ...car,owner:_id,image
})
res.json({
    success:true,message:"car added"
})


        
    } catch (error) {
         console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }
}


//api to list owner cars

export const getOwnerCars = async(req,res)=>{
    try {
         const {_id} = req.user;

         const cars = await Car.find({owner:_id})
           return res.json({ success: true, cars });
        
    } catch (error) {
         console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }

}

//Api to toggle car Availability

export const toggleCarAvailability = async(req,res)=>{
    try {
         const {_id} = req.user;
         const {carId} = req.body;

         const car = await Car.findById(carId)
         //checking is car belong to the user
         if (car.owner.toString()!==_id.toString()) {
              return res.json({ success: false, message: "Unauthorized" });
            
         }
         car.isAvailable = !car.isAvailable
         await car.save()
           return res.json({ success: true,message:"Availability Toggled" });

        
    } catch (error) {
         console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }

}

//Api to delete a car

export const deleteCar = async(req,res)=>{
    try {
         const {_id} = req.user;
         const {carId} = req.body;

         const car = await Car.findById(carId)
         //checking is car belong to the user
         if (car.owner.toString()!==_id.toString()) {
              return res.json({ success: false, message: "Unauthorized" });
            
         }
        car.owner = null;
        car.isAvailable= false;
         await car.save()
           return res.json({ success: true,message:"Car Removed" });

        
    } catch (error) {
         console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }

}


//Api to get Dashboard Data

export const getDashboardData = async(req,res)=>{
    try {
        const {_id,role} = req.user;
        if (role!== 'owner') {
              return res.json({ success: false, message: "Unauthorized" });
            
        }
        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1})
        const pendingBookings = await Booking.find({owner:_id,status:"pending"})
        const completedBookings = await Booking.find({owner:_id,status:"confirmed"})

        //Calculate monthly revenue from booking where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking=>booking.status === 'confirmed').reduce((acc,booking)=>acc + booking.price,0)

        const dashboardData = {
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue


        }
        res.json({success:true,dashboardData})
        
        
    } catch (error) {
        console.log(error.message);
    return res.json({ success: false, message: error.message });
        
    }


}

//api to update user image

export const updateUserImage = async(req,res)=>{
    try {
         const {_id} = req.user;

          const imageFile = req.file;
     //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
      const response =  await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/users'
        })
// optimize through imagekit URL tranformation
var optimizedImageUrl = imagekit.url({
    path : response.filePath,
   
    transformation : [{
        width:'400'},//width resize
        
    {quality:'auto'},//Auto compression
    {format:'webp'},//convert to modern formate 
]
});
const image = optimizedImageUrl;

await User.findByIdAndUpdate(_id,{image})

res.json({success:true,message:"Image updated"})

       
        
    } catch (error) {
         console.log(error.message);
        return res.json({success:false,message:error.message})
        
    }


}







