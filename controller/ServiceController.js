import { Service } from '../models/ServiceModel.js';

/*
 * GET
 * Find all services
 */
export const getAllService = async (req, res) => {
  try {
    const services = await Service.find();
    return res.json(services);
  } catch (error) {
    console.error('Failed to load services data:', error);
    return res.status(500).send({ error: 'Failed to load services data' });
  }
};

/*
 * GET
 * Find service by id
 */
export const findServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }
    return res.json(service);
  } catch (error) {
    console.error('Error finding service by id:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/*
 * POST
 * Create a new service
 */
export const createService = async (req, res) => {
  try {
    const { servicePackage, motorcycleId, dealership, technician, serviceDate, mileage, price } = req.body;
    const service = new Service({ servicePackage, motorcycleId, dealership, technician, serviceDate, mileage, price });
    await service.save();
    return res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).send({ error: 'Failed to create service' });
  }
};

/*
 * PUT
 * Update an existing service
 */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { servicePackage, motorcycleId, dealership, technician, serviceDate, mileage, price } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { servicePackage, motorcycleId, dealership, technician, serviceDate, mileage, price },
      { new: true }
    );

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }
    return res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).send({ error: 'Failed to update service' });
  }
};

/*
 * DELETE
 * Delete an existing service
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }
    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).send({ error: 'Failed to delete service' });
  }
};
