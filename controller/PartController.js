import { Part } from '../models/PartModel.js';
import lodash from 'lodash';

/*
 * POST
 * Add part data
 */
export const addPart = async (req, res) => {
  try {
    let body = req.body;

    // Create part object
    const part = new Part(body);

    // Save part to db
    const savedPart = await part.save();

    // Return part response
    return res.send(savedPart);
  } catch (error) {
    return res.status(400).send({ error: 'Failed to create part', details: error });
  }
};

/*
 * GET
 * Get all parts data
 */
export const getAllPart = async (req, res) => {
  try {
    const parts = await Part.find().populate('catalogs');
    return res.send(parts);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to load parts data', details: error });
  }
};

/*
 * GET
 * Find part by id
 */
export const findPart = async (req, res) => {
  try {
    const { partId } = req.params;

    // Find part by id
    const part = await Part.findById(partId).populate('vehicleCompatibility');

    if (!part) {
      return res.status(404).send({ error: 'Part not found!' });
    }

    return res.send(part);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to find part', details: error });
  }
};

/*
 * PUT
 * Update part data
 */
export const updatePart = async (req, res) => {
  try {
    const { partId } = req.params;
    let body = req.body;

    // Find part by id and update the data on DB
    const part = await Part.findByIdAndUpdate(
      partId,
      lodash.pick(body, ['partName', 'partNumber', 'picture', 'price', 'catalogs']),
      { new: true }
    );

    if (!part) {
      return res.status(404).send({ error: 'Part not found!' });
    }

    return res.send({ message: 'Part successfully updated!' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to update part', details: error });
  }
};

/*
 * DELETE
 * Remove part data
 */
export const deletePart = async (req, res) => {
  try {
    const { partId } = req.params;

    // Find part by id and delete on DB
    const part = await Part.findByIdAndDelete(partId);

    if (!part) {
      return res.status(404).send({ error: 'Part not found!' });
    }

    return res.send({ message: 'Successfully deleted' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to delete part', details: error });
  }
};
