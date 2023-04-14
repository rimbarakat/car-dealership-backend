const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
    {
        car:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Car", 
            required: true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"User", 
            required: true
        },
        date: {type:String, required: true},
        time:[{
            from:{type:String, required: true}, 
            to:{type:String, required: true}
        }],
        notes:{
            type:String
        },
    },
    {timestamps:true}
);


module.exports = mongoose.model("Booking", BookingSchema);
