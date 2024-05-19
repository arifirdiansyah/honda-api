import { ServicePackage } from '../models/ServicePackage.js';
import lodash from 'lodash';

/*
 * POST
 * Add service package data
 */
export const addServicePackage = async (req, res) => {
  try {
    let body = req.body;

    // Create service package object
    const servicePackage = new ServicePackage(body);

    // Save service package to db
    const savedServicePackage = await servicePackage.save();

    // Return service package response
    return res.send(savedServicePackage);
  } catch (error) {
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
    const body = req.body;

    // Find service package by id and update the data in the database
    const servicePackage = await ServicePackage.findByIdAndUpdate(
      servicePackageId,
      lodash.pick(body, ['packageName']),
      { new: true }
    );

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }

    return res.send({ message: 'Service package successfully updated!' });
  } catch (error) {
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
    const servicePackage = await ServicePackage.findByIdAndDelete(servicePackageId);

    if (!servicePackage) {
      return res.status(404).send({ error: 'Service package not found!' });
    }

    return res.send({ message: 'Service package deleted successfully' });
  } catch (error) {
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
  } catch (error) {
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
    const servicePackages = await ServicePackage.find();
    return res.send(servicePackages);
  } catch (error) {
    console.error('Error getting all service packages:', error);
    return res.status(500).send({ error: 'Failed to get service packages', details: error.message });
  }
};
