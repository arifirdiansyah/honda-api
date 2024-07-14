import { ServicePackage } from '../models/ServicePackage.js';

/*
 * POST
 * Add service package data
 */
export const addServicePackage = async (req, res) => {
  try {
    let { packageName, parts, description } = req.body;

    // Create service package object
    const servicePackage = new ServicePackage({ packageName, parts, description, ownedByDealer: req.user.dealer });

    // Save service package to db
    const savedServicePackage = await servicePackage.save();

    // Return service package response
    return res.send(savedServicePackage);
  } catch ( error ) {
    console.error('Error adding service package:', error);
    return res.status(400).send({ error: 'Failed to add service package', details: error.message });
  }
};

/*
 * PUT
 * Update service package data
 */
export const updateServicePackage = async (req, res) => {
  try {
    const { servicePackageId } = req.params;
    let { packageName, parts, description } = req.body;

    // Find service package by id and update the data in the database
    const servicePackage = await ServicePackage.findByIdAndUpdate(
      servicePackageId,
      { packageName, parts, description },
      { new: true },
    ).populate('parts');

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }

    return res.send(servicePackage);
  } catch ( error ) {
    console.error('Error updating service package:', error);
    return res.status(500).send({ error: 'Failed to update service package', details: error.message });
  }
};

/*
 * DELETE
 * Remove service package data
 */
export const deleteServicePackage = async (req, res) => {
  try {
    const { servicePackageId } = req.params;

    // Find service package by id and delete it from the database
    const servicePackage = await ServicePackage.findOneAndDelete({_id: servicePackageId, ownedByDealer: req.user.dealer});

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }

    return res.send({ message: 'Service package deleted successfully' });
  } catch ( error ) {
    console.error('Error deleting service package:', error);
    return res.status(500).send({ error: 'Failed to delete service package', details: error.message });
  }
};

/*
 * GET
 * Find service package by id
 */
export const findServicePackageById = async (req, res) => {
  try {
    const { servicePackageId } = req.params;

    // Find service package by id
    const servicePackage = await ServicePackage.findById(servicePackageId);

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }

    return res.send(servicePackage);
  } catch ( error ) {
    console.error('Error finding service package by id:', error);
    return res.status(500).send({ error: 'Failed to find service package', details: error.message });
  }
};

/*
 * GET
 * Get all service packages
 */
export const getAllServicePackage = async (req, res) => {
  try {
    const servicePackages = await ServicePackage.find({ ownedByDealer: req.user.dealer }).populate(['ownedByDealer', 'parts'] );
    return res.send(servicePackages);
  } catch ( error ) {
    console.error('Error getting all service packages:', error);
    return res.status(500).send({ error: 'Failed to get service packages', details: error.message });
  }
};
