const Car = require('../models/carModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { json } = require('express');
carServices = require('../services/carServices');
const userModel = require('../models/userModel');
const carModel = require('../models/carModel');

const mockcar = {
  model:"Toyota",
  year:"2019",
  color:"Red",
  description:"This is a car",
} 

class CarsController {
  async getCar(req, res, next) {
    try{const id = req.params.id;
      const test = await carServices.getCarbyId(id);
      console.log(test)
    } catch(err){
      next(err);
    } 
  }
  async getCars(req, res, next) {
    try{    
      const test = await carServices.getAllCars();
      if(test){
        res.status(200).json({message: "Cars found", data: test});
      } else {
        res.status(404).json({message: "No cars found"});
      }
    } catch(err){
      next(err);
    }
    
  }
  async updateCar(req, res, next) {
    const id = req.params.id;
    const{model, year, color, description, image} = req.body;
    const test = await carServices.updateCar(id, {model, year, color, description, image});
    if(test){
      console.log(test)
      res.status(200).json({message: "Car updated", data: test});
    } else {
      res.status(404).json({message: "Car not found"});
    }
  }
  async addCar(req, res, next) {
    try{
      const{model, year, color, description, image} = req.body;
      const test = await carServices.addCar({model, year, color, description, image});
      if(test){
        console.log(test)
        res.status(200).json({message: "Car added", data: test});
      } else {
        res.status(404).json({message: "Car cannot be added"});
      }
    } catch(err){
      next(err);
    }
  }
  async deleteCar(req, res, next) {
    try{
      const id = req.params.id;
      const test = await carServices.deleteCar(id);
      if(test){
        console.log(test)
        res.status(200).json({message: "Car deleted", data: test});
      } else {
        res.status(404).json({message: "Car not found"});
      }
    } catch(err){
      next(err);
    }
  }
  getCarBookings(req, res, next) {}
  
  
}

module.exports = new CarsController();
