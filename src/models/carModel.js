const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", 
        required: true
    },
    date: {type:String, required: true},
    from:{type:String, required: true}, 
    to:{type:String, required: true},
    },
    {timestamps:true}
  );

const TimeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true }
});

const DateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlots: { type: [TimeSchema], required: true, default: [] }
});

const CarSchema = new mongoose.Schema({

    model: { type: String, required: true },
    mileage: { type: String, required: true },
    price: { type: String, required: true },
    price_int: { type: Number, required: true },
    engine: { type: String, required: true },
    engineShort: { type: String, required: true },
    fuelType: { type: String, required: true },
    fuelTypeShort: { type: String, required: true },
    gearBox: { type: String, required: true },
    gearBoxShort: { type: String, required: true },
    drive: { type: String, required: true },
    driveShort: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isSold: { type: Boolean, required: true, default:false},
    bookings: [BookingSchema],
    slots: { type: [DateSchema], required: true, default: generateDateArray() },
  }, { timestamps: true });
  
  function generateDateArray() {
    const availabilityArray = [];
    const numDays = 90;
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
  
      const date = currentDate.toISOString().slice(0, 10);
      const timeSlots = generateSlotsArray();

      availabilityArray.push({ date: date, timeSlots: timeSlots });
    }
  
    return availabilityArray;
  }
  
  function generateSlotsArray() {
    const timeSlots = [];
  
    for (let i = 9; i < 18; i++) {
      const from = `${i}:00`;
      const to = `${i+1}:00`;
      timeSlots.push({ from: from, to: to, isAvailable: true });
    }
  
    return timeSlots;
  }
module.exports = mongoose.model("Car", CarSchema);