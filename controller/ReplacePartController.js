import { ReplacePart } from '../models/ReplaceParts.js';
import lodash from 'lodash';

/*
 * POST
 * Add replace part data
 */
export const addReplacePart = async (req, res) => {
  try {
    const body = req.body;

    // Create replace part object
    const replacePart = new ReplacePart(body);

    // Save replace part to database
    const savedReplacePart = await replacePart.save();

    // Return replace part response
    return res.send(savedReplacePart);
  } catch (error) {
    console.error('Error adding replace part:', error);
    return res.status(400).send({ error: 'Failed to add replace part', details: error.message });
  }
};

/*
 * PUT
 * Update replace part data
 */
export const updateReplacePart = async (req, res) => {
  try {
    const { replacePartId } = req.params;
    const body = req.body;

    // Find replace part by id and update the data in the database
    const replacePart = await ReplacePart.findByIdAndUpdate(
      replacePartId,
      lodash.pick(body, ['servicePackage', 'parts']),
      { new: true }
    );

    if (!replacePart) {
      return res.status(404).send({ error: 'Replace part not found!' });
    }

    return res.send({ message: 'Replace part successfully updated!' });
  } catch (error) {
    console.error('Error updating replace part:', error);
    return res.status(500).send({ error: 'Failed to update replace part', details: error.message });
  }
};

/*
 * DELETE
 * Remove replace part data
 */
export const deleteReplacePart = async (req, res) => {
  try {
    const { replacePartId } = req.params;

    // Find replace part by id and delete it from the database
    const replacePart = await ReplacePart.findByIdAndDelete(replacePartId);

    if (!replacePart) {
      return res.status(404).send({ error: 'Replace part not found!' });
    }

    return res.send({ message: 'Replace part deleted successfully' });
  } catch (error) {
    console.error('Error deleting replace part:', error);
    return res.status(500).send({ error: 'Failed to delete replace part', details: error.message });
  }
};

/*
 * GET
 * Find replace part by id
 */
export const findReplacePartById = async (req, res) => {
  try {
    const { replacePartId } = req.params;

    // Find replace part by id
    const replacePart = await ReplacePart.findById(replacePartId).populate('servicePackage parts');

    if (!replacePart) {
      return res.status(404).send({ error: 'Replace part not found!' });
    }

    return res.send(replacePart);
  } catch (error) {
    console.error('Error finding replace part by id:', error);
    return res.status(500).send({ error: 'Failed to find replace part', details: error.message });
  }
};

/*
 * GET
 * Get all replace parts
 */
export const getAllReplaceParts = async (req, res) => {
  try {
    const replaceParts = await ReplacePart.find().populate('servicePackage parts');
    return res.send(replaceParts);
  } catch (error) {
    console.error('Error getting all replace parts:', error);
    return res.status(500).send({ error: 'Failed to get replace parts', details: error.message });
  }
};
