import { ServicePackage } from '../models/ServicePackage.js';

/*
 * GET
 * Find all service packages
 */
export const getAllServicePackage = async (req, res) => {
  try {
    const servicePackages = await ServicePackage.find();
    return res.json(servicePackages);
  } catch (error) {
    console.error('Failed to load service packages data:', error);
    return res.status(500).send({ error: 'Failed to load service packages data' });
  }
};

/*
 * GET
 * Find service package by id
 */
export const findServicePackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await ServicePackage.findById(id);

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }
    return res.json(servicePackage);
  } catch (error) {
    console.error('Error finding service package by id:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/*
 * POST
 * Create a new service package
 */
export const createServicePackage = async (req, res) => {
  try {
    const { packageName } = req.body;
    const servicePackage = new ServicePackage({ packageName });
    await servicePackage.save();
    return res.status(201).json(servicePackage);
  } catch (error) {
    console.error('Error creating service package:', error);
    return res.status(500).send({ error: 'Failed to create service package' });
  }
};

/*
 * PUT
 * Update an existing service package
 */
export const updateServicePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName } = req.body;

    const servicePackage = await ServicePackage.findByIdAndUpdate(id, { packageName }, { new: true });

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }
    return res.json(servicePackage);
  } catch (error) {
    console.error('Error updating service package:', error);
    return res.status(500).send({ error: 'Failed to update service package' });
  }
};

/*
 * DELETE
 * Delete an existing service package
 */
export const deleteServicePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await ServicePackage.findByIdAndDelete(id);

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }
    return res.json({ message: 'Service package deleted successfully' });
  } catch (error) {
    console.error('Error deleting service package:', error);
    return res.status(500).send({ error: 'Failed to delete service package' });
  }
};
