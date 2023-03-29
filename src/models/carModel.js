const mongoose = require("mongoose");

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
    isAvailable: { type: Boolean, required: true, default:true},
    isSold: { type: Boolean, required: true, default:false},
    availability: {
      type: [{
        slots: [{
          time: { type: String },
          available: { type: Boolean, default: true }
        }]
      }],
      default: generateAvailabilityArray(30)
    }
  }, { timestamps: true });
  
  function generateAvailabilityArray(numDays) {
    const availabilityArray = [];
  
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
  
      const dateStr = currentDate.toISOString().slice(0, 10);
      const slots = generateSlotsArray();
  
      availabilityArray.push({ date: dateStr, slots: slots });
    }
  
    return availabilityArray;
  }
  
  function generateSlotsArray() {
    const slots = [];
  
    for (let i = 9; i < 18; i++) {
      const timeSlot = `${i}-${i+1}`;
      slots.push({ time: timeSlot, available: true });
    }
  
    return slots;
  }
module.exports = mongoose.model("Car", CarSchema);