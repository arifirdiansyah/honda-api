import { ReplacedPart } from '../models/ReplacedPart.js';

/*
 * POST
 * Add replaced part data
 */
export const addReplacedPart = async (req, res) => {
  try {
    const body = req.body;

    // Create replaced part object
    const replacedPart = new ReplacedPart(body);

    // Save replaced part to database
    const savedReplacedPart = await replacedPart.save();

    // Return replaced part response
    return res.send(savedReplacedPart);
  } catch (error) {
    console.error('Error adding replaced part:', error);
    return res.status(400).send({ error: 'Failed to add replaced part' });
  }
};

/*
 * PUT
 * Update replaced part data
 */
export const updateReplacedPart = async (req, res) => {
  try {
    const { replacedPartId } = req.params;
    const body = req.body;

    // Find replaced part by id and update the data in the database
    const replacedPart = await ReplacedPart.findByIdAndUpdate(replacedPartId, body, { new: true });

    if (!replacedPart) {
      return res.status(404).send({ error: 'Replaced part not found!' });
    }

    return res.send({ message: 'Replaced part successfully updated!' });
  } catch (error) {
    console.error('Error updating replaced part:', error);
    return res.status(500).send({ error: 'Failed to update replaced part' });
  }
};

/*
 * DELETE
 * Remove replaced part data
 */
export const deleteReplacedPart = async (req, res) => {
  try {
    const { replacedPartId } = req.params;

    // Find replaced part by id and delete it from the database
    const replacedPart = await ReplacedPart.findByIdAndDelete(replacedPartId);

    if (!replacedPart) {
      return res.status(404).send({ error: 'Replaced part not found!' });
    }

    return res.send({ message: 'Replaced part deleted successfully' });
  } catch (error) {
    console.error('Error deleting replaced part:', error);
    return res.status(500).send({ error: 'Failed to delete replaced part' });
  }
};

/*
 * GET
 * Find replaced part by id
 */
export const findReplacedPartById = async (req, res) => {
  try {
    const { replacedPartId } = req.params;

    // Find replaced part by id
    const replacedPart = await ReplacedPart.findById(replacedPartId);

    if (!replacedPart) {
      return res.status(404).send({ error: 'Replaced part not found!' });
    }

    return res.send(replacedPart);
  } catch (error) {
    console.error('Error finding replaced part by id:', error);
    return res.status(500).send({ error: 'Failed to find replaced part' });
  }
};

/*
 * GET
 * Get all replaced parts
 */
export const getAllReplacedPart = async (req, res) => {
  try {
    const replacedParts = await ReplacedPart.find();
    return res.send(replacedParts);
  } catch (error) {
    console.error('Error getting all replaced parts:', error);
    return res.status(500).send({ error: 'Failed to get replaced parts' });
  }
};
