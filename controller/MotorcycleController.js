import { Motorcycle } from '../models/Motorcycle.js';
import lodash from 'lodash';

/*
* POST
* Add motor cycle data
* */
export const addMotorCycle = async (req, res) => {
  try {
    let body = req.body;

    // Create motorcycle object
    const motorCycle = new Motorcycle(body);

    // save motorcycle to db
    const savedMotorCycle = await motorCycle.save();
    const retrieveMotorCycle = await Motorcycle.findById(savedMotorCycle.id).populate('catalogId');

    // return motor cycle response
    return res.send(retrieveMotorCycle);
  } catch ( e ) {
    return res.status(400).sendError(e);
  }
};

/*
* PUT
* Update motor cycle data
* */
export const updateMotorCycle = async (req, res) => {
  try {
    const { motorCycleId } = req.params;

    let body = req.body;


    // Find motorcycle by id and update the data on DB
    let motorCycle = await Motorcycle.findByIdAndUpdate(motorCycleId, lodash.pick(body, ['catalogId', 'modelName', 'buildDate', 'transmission', 'color', 'cover', 'vin']));

    if (!motorCycle) {
      return res.status(404).sendError('Motor cycle not found!');
    }

    // Retrieve updated data
    motorCycle = await Motorcycle.findById(motorCycleId).populate('catalogId');

    return res.send(motorCycle);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* DELETE
* Remove motor cycle data
* */
export const deleteMotorCycle = async (req, res) => {
  try {
    const { motorCycleId } = req.params;

    // Find motorcycle by id and delete on DB
    const motorCycle = await Motorcycle.findByIdAndDelete(motorCycleId);

    if (!motorCycle) {
      return res.status(404).sendError('Motor cycle not found!');
    }

    return res.send({ message: `Successfully deleted` });
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};


/*
* GET
* Find motorcycle by id
* */
export const findMotorCycle = async (req, res) => {
  try {
    const { motorCycleId } = req.params;

    // Find motorcycle by id
    const motorCycle = await Motorcycle.findById(motorCycleId).populate('catalogId');

    if (!motorCycle) {
      return res.status(404).sendError('Motor cycle not found!');
    }

    return res.send(motorCycle);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* GET
* Find motorcycle by VIN Number
* */
export const findMotorCycleByVinNumber = async (req, res) => {
  try {
    const { vin } = req.params;

    // Find motorcycle by id
    const motorCycle = await Motorcycle.findOne({ vin }).populate('catalogId');

    if (!motorCycle) {
      return res.status(404).sendError('Motor cycle not found!');
    }

    return res.send(motorCycle);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* GET
* Get all motorcycle
* */
export const getAllMotorCycle = async (req, res) => {
  try {
    const motorCycle = await Motorcycle.find().populate('catalogId');
    return res.send(motorCycle);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};