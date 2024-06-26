import { Service } from '../models/Service.js';
import lodash from 'lodash';

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
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }
    return res.json(service);
  } catch (error) {
    console.error('Error finding service by id:', error);
    return res.status(500).send({ error: 'Failed to find service', details: error });
  }
};

/*
 * POST
 * Create a new service
 */
export const createService = async (req, res) => {
  try {
    let body = req.body;

    // Create service object
    const service = new Service(body);

    // Save service to db
    const savedService = await service.save();

    // Return service response
    return res.status(201).json(savedService);
  } catch (error) {
    return res.status(400).send({ error: 'Failed to create service', details: error });
  }
};

/*
 * PUT
 * Update an existing service
 */
export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    let body = req.body;

    // Find service by id and update the data in the database
    const service = await Service.findByIdAndUpdate(
      serviceId,
      lodash.pick(body, [
        'servicePackage',
        'motorcycleId',
        'dealership',
        'technician',
        'serviceDate',
        'mileage',
        'price',
      ]),
      { new: true }
    );

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }

    return res.send({ message: 'Service successfully updated!' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to update service', details: error });
  }
};

/*
 * DELETE
 * Delete an existing service
 */
export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Find service by id and delete on DB
    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return res.status(404).send({ error: 'Service not found!' });
    }

    return res.send({ message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to delete service', details: error });
  }
};
