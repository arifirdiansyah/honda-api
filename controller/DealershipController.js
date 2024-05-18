import { Dealership } from '../models/DealershipModel.js';

/*
 * GET
 * Find all dealerships
 */
export const getAllDealership = async (req, res) => {
  try {
    const dealerships = await Dealership.find();
    return res.json(dealerships);
  } catch (error) {
    console.error('Failed to load dealerships data:', error);
    return res.status(500).send({ error: 'Failed to load dealerships data' });
  }
};

/*
 * GET
 * Find dealership by name
 */
export const findDealershipByName = async (req, res) => {
  try {
    const { name } = req.params;
    const dealership = await Dealership.findOne({ name });

    if (!dealership) {
      return res.status(404).send({ error: 'Dealership not found!' });
    }
    return res.json(dealership);
  } catch (error) {
    console.error('Error finding dealership by name:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/*
 * POST
 * Create a new dealership
 */
export const createDealership = async (req, res) => {
  try {
    const { name, address } = req.body;
    const dealership = new Dealership({ name, address });
    await dealership.save();
    return res.status(201).json(dealership);
  } catch (error) {
    console.error('Error creating dealership:', error);
    return res.status(500).send({ error: 'Failed to create dealership' });
  }
};

/*
 * PUT
 * Update an existing dealership
 */
export const updateDealership = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const dealership = await Dealership.findByIdAndUpdate(id, { name, address }, { new: true });

    if (!dealership) {
      return res.status(404).send({ error: 'Dealership not found!' });
    }
    return res.json(dealership);
  } catch (error) {
    console.error('Error updating dealership:', error);
    return res.status(500).send({ error: 'Failed to update dealership' });
  }
};

/*
 * DELETE
 * Delete an existing dealership
 */
export const deleteDealership = async (req, res) => {
  try {
    const { id } = req.params;
    const dealership = await Dealership.findByIdAndDelete(id);

    if (!dealership) {
      return res.status(404).send({ error: 'Dealership not found!' });
    }
    return res.json({ message: 'Dealership deleted successfully' });
  } catch (error) {
    console.error('Error deleting dealership:', error);
    return res.status(500).send({ error: 'Failed to delete dealership' });
  }
};
