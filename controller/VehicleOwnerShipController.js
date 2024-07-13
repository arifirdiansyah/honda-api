import { VehicleOwnerShip } from '../models/VehicleOwnerShip.js';

/*
 * POST
 * Add vehicle ownership
 */
export const addVehicleOwnership = async (req, res) => {
  try {
    const { motorcycleId } = req.body;

    if(!motorcycleId) {
      return res.status(500).send({ error: 'Wrong motorcycle data' });
    }

    const registeredVehicle = await VehicleOwnerShip.findOne({ user_id: req.user.id }).populate('motorcycleId');

    if (registeredVehicle) {
      console.log(registeredVehicle);
      const isVehicleExist = registeredVehicle.motorcycleId.find(motor => motor.id === motorcycleId);

      // When vehicle exist dont register it again
      if (isVehicleExist) {
        return res.send(registeredVehicle);
      }

      registeredVehicle.motorcycleId.push(motorcycleId);
      const savedVehicle = await registeredVehicle.save();
      return res.send(savedVehicle);
    }

    const vehicleOwnership = new VehicleOwnerShip({ user_id: req.user.id, motorcycleId: [motorcycleId] });
    await vehicleOwnership.save();
    return res.send(vehicleOwnership);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to create vehicle ownership', details: error.message });
  }
};


/*
 * DELETE
 * Delete vehicle ownership
 */
export const deleteVehicleOwnership = async (req, res) => {
  try {
    const { motorcycleId } = req.body;
    const vehicleOwnership = await VehicleOwnerShip.findOne({ user_id: req.user.id }).populate('motorcycleId');

    if (!vehicleOwnership) {
      return res.status(404).send({ error: 'Vehicle ownership not found!' });
    }

    vehicleOwnership.motorcycleId = vehicleOwnership.motorcycleId.filter(motor => motor.id !== motorcycleId);
    await vehicleOwnership.save();

    return res.send({ message: 'Vehicle ownership deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle ownership:', error);
    return res.status(500).send({ error: 'Failed to delete vehicle ownership', details: error.message });
  }
};

/*
 * GET
 * Find vehicle ownership by id
 */
export const getVehicleOwnershipData = async (req, res) => {
  try {
    const vehicleOwnership = await VehicleOwnerShip.findOne({ user_id: req.user.id }).populate('motorcycleId');

    if (!vehicleOwnership) {
      return res.send({});
    }
    return res.send(vehicleOwnership);
  } catch (error) {
    console.error('Error finding vehicle ownership by id:', error);
    return res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
};


