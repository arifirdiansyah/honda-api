import { DealershipModel } from '../models/DealershipModel.js';
import lodash from 'lodash';

/*
 * POST
 * Create a new dealership
 */
export const createDealership = async (req, res) => {
  try {
    let body = req.body;

    // Create dealership object
    const dealership = new DealershipModel(body);

    // Save dealership to db
    const savedDealership = await dealership.save();

    // Return dealership response
    return res.send(savedDealership);
  } catch (error) {
    return res.status(400).send({ error: 'Failed to create dealership', details: error });
  }
};

/*
 * PUT
 * Update an existing dealership
 */
export const updateDealership = async (req, res) => {
  try {
    const { dealershipId } = req.params;
    let body = req.body;

    // Find dealership by id and update the data in the database
    const dealership = await DealershipModel.findByIdAndUpdate(dealershipId, lodash.pick(body, ['name', 'address']), {
      new: true,
    });

    if (!dealership) {
      return res.status(404).send({ error: 'DealershipModel not found!' });
    }

    return res.send({ message: 'DealershipModel successfully updated!' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to update dealership', details: error });
  }
};

/*
 * DELETE
 * Delete an existing dealership
 */
export const deleteDealership = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    // Find dealership by id and delete on DB
    const dealership = await DealershipModel.findByIdAndDelete(dealershipId);

    if (!dealership) {
      return res.status(404).send({ error: 'Dealership not found!' });
    }

    return res.send({ message: 'Successfully deleted' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to delete dealership', details: error });
  }
};

/*
 * GET
 * Find dealership by id
 */
export const findDealershipById = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    // Find dealership by id
    const dealership = await DealershipModel.findById(dealershipId);

    if (!dealership) {
      return res.status(404).send({ error: 'DealershipModel not found!' });
    }

    return res.send(dealership);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to find dealership', details: error });
  }
};

/*
 * GET
 * Get all dealerships
 */
export const getAllDealership = async (req, res) => {
  try {
    const dealerships = await DealershipModel.find();
    return res.send(dealerships);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to load dealerships data', details: error });
  }
};
