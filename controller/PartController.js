import { Part } from '../models/PartModel.js';
import lodash from 'lodash';

/*
* POST
* Add part data
* */
export const addPart = async (req, res) => {
  try {
    let body = req.body;

    // Create part object
    const part = new Part(body);

    // save part to db
    const savedPart = await part.save();
    const retrievePart = await Part.findById(savedPart.id).populate('catalogs');

    // return part response
    return res.send(retrievePart);
  } catch ( e ) {
    return res.status(400).sendError(e);
  }
}

/*
* GET
* Get all parts data
* */
export const getAllPart = async (req, res) => {
  try {
    const parts = await Part.find().populate('catalogs');
    return res.send(parts);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* GET
* Find motorcycle by id
* */
export const findPart = async (req, res) => {
  try {
    const { partId } = req.params;

    // Find part by id
    const part = await Part.findById(partId).populate('catalogs');

    if (!part) {
      return res.status(404).sendError('Part not found!');
    }

    return res.send(part);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* PUT
* Update part data
* */
export const updatePart = async (req, res) => {
  try {
    const { partId } = req.params;

    let body = req.body;


    // Find part by id and update the data on DB
    const part = await Part.findByIdAndUpdate(partId, lodash.pick(body, ['partName', 'partNumber', 'picture', 'price', 'catalogs']));

    if (!part) {
      return res.status(404).sendError('Part not found!');
    }

    const updatedPart = await Part.findById(partId).populate('catalogs');

    return res.send(updatedPart);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
* DELETE
* Remove part data
* */
export const deletePart = async (req, res) => {
  try {
    const { partId } = req.params;

    // Find part by id and delete on DB
    const part = await Part.findByIdAndDelete(partId);

    if (!part) {
      return res.status(404).sendError('Part not found!');
    }

    return res.send({ message: `Successfully deleted` });
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};