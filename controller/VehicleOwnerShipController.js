import { VehicleOwnership } from '../models/VehicleOwnershipModel.js';

/*
 * POST
 * Add vehicle ownership
 */
export const addVehicleOwnership = async (req, res) => {
  try {
    const { user_id, motorcycleId } = req.body;
    const vehicleOwnership = new VehicleOwnership({ user_id, motorcycleId });
    await vehicleOwnership.save();
    return res.status(201).json(vehicleOwnership);
  } catch (error) {
    console.error('Error creating vehicle ownership:', error);
    return res.status(500).send({ error: 'Failed to create vehicle ownership' });
  }
};

/*
 * PUT
 * Update vehicle ownership
 */
export const updateVehicleOwnership = async (req, res) => {
  try {
    const { vehicleOwnershipId } = req.params;
    const { user_id, motorcycleId } = req.body;
    const vehicleOwnership = await VehicleOwnership.findByIdAndUpdate(
      vehicleOwnershipId,
      { user_id, motorcycleId },
      { new: true }
    );

    if (!vehicleOwnership) {
      return res.status(404).send({ error: 'Vehicle ownership not found!' });
    }
    return res.json(vehicleOwnership);
  } catch (error) {
    console.error('Error updating vehicle ownership:', error);
    return res.status(500).send({ error: 'Failed to update vehicle ownership' });
  }
};

/*
 * DELETE
 * Delete vehicle ownership
 */
export const deleteVehicleOwnership = async (req, res) => {
  try {
    const { vehicleOwnershipId } = req.params;
    const vehicleOwnership = await VehicleOwnership.findByIdAndDelete(vehicleOwnershipId);

    if (!vehicleOwnership) {
      return res.status(404).send({ error: 'Vehicle ownership not found!' });
    }
    return res.json({ message: 'Vehicle ownership deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle ownership:', error);
    return res.status(500).send({ error: 'Failed to delete vehicle ownership' });
  }
};

/*
 * GET
 * Find vehicle ownership by id
 */
export const findVehicleOwnershipById = async (req, res) => {
  try {
    const { vehicleOwnershipId } = req.params;
    const vehicleOwnership = await VehicleOwnership.findById(vehicleOwnershipId).populate('motorcycleId');

    if (!vehicleOwnership) {
      return res.status(404).send({ error: 'Vehicle ownership not found!' });
    }
    return res.json(vehicleOwnership);
  } catch (error) {
    console.error('Error finding vehicle ownership by id:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/*
 * GET
 * Get all vehicle ownerships
 */
export const getAllVehicleOwnership = async (req, res) => {
  try {
    const vehicleOwnerships = await VehicleOwnership.find().populate('motorcycleId');
    return res.json(vehicleOwnerships);
  } catch (error) {
    console.error('Failed to load vehicle ownerships data:', error);
    return res.status(500).send({ error: 'Failed to load vehicle ownerships data' });
  }
};
