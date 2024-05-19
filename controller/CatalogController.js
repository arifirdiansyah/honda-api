import lodash from 'lodash';
import { Catalog } from '../models/Catalog.js';

/*
 * POST
 * Add catalog data
 * */
export const addCatalog = async (req, res) => {
  try {
    let body = req.body;

    // Create catalog object
    const catalog = new Catalog(body);

    // save catalog to db
    const savedCatalog = await catalog.save();

    // return motor cycle response
    return res.send(savedCatalog);
  } catch (e) {
    return res.status(400).sendError(e);
  }
};

/*
 * PUT
 * Update catalog data
 * */
export const updateCatalog = async (req, res) => {
  try {
    const { catalogId } = req.params;

    let body = req.body;

    // Find catalog by id and update the data on DB
    const motorCycle = await Catalog.findByIdAndUpdate(
      catalogId,
      lodash.pick(body, ['modelName', 'frame', 'transmission', 'picture', 'engine'])
    );

    if (!motorCycle) {
      return res.status(404).sendError('Catalog not found!');
    }

    return res.send({ message: 'Catalog successfully updated!' });
  } catch (e) {
    return res.status(500).sendError(e);
  }
};

/*
 * DELETE
 * Remove catalog data
 * */
export const deleteCatalog = async (req, res) => {
  try {
    const { catalogId } = req.params;

    // Find catalog by id and delete on DB
    const catalog = await Catalog.findByIdAndDelete(catalogId);

    if (!catalog) {
      return res.status(404).sendError('Catalog not found!');
    }

    return res.send({ message: `Successfully deleted` });
  } catch (e) {
    return res.status(500).sendError(e);
  }
};

/*
 * GET
 * Find catalog by id
 * */
export const findCatalog = async (req, res) => {
  try {
    const { catalogId } = req.params;

    // Find catalog by id
    const catalog = await Catalog.findById(catalogId);

    if (!catalog) {
      return res.status(404).sendError('Motor cycle not found!');
    }

    return res.send(catalog);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};

/*
 * GET
 * Get all catalog
 * */
export const getAllCatalog = async (req, res) => {
  try {
    const catalogs = await Catalog.find();
    return res.send(catalogs);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};
