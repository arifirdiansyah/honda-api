import lodash from 'lodash';

/*
 * GET
 * Find all addresses
 */
export const getAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    return res.json(addresses);
  } catch (error) {
    console.error('Failed to load addresses data:', error);
    return res.status(500).send({ error: 'Failed to load addresses data', details: error.message });
  }
};

/*
 * GET
 * Find address by id
 */
export const findAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).send({ error: 'Address not found!' });
    }
    return res.json(address);
  } catch (error) {
    console.error('Error finding address by id:', error);
    return res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
};

/*
 * POST
 * Create a new address
 */
export const createAddress = async (req, res) => {
  try {
    const { provinces, state, city, subdistrict } = req.body;
    const address = new Address({ provinces, state, city, subdistrict });
    await address.save();
    return res.status(201).json(address);
  } catch (error) {
    console.error('Error creating address:', error);
    return res.status(500).send({ error: 'Failed to create address', details: error.message });
  }
};

/*
 * PUT
 * Update an existing address
 */
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const address = await Address.findByIdAndUpdate(
      id,
      lodash.pick(body, ['provinces', 'state', 'city', 'subdistrict']),
      { new: true }
    );

    if (!address) {
      return res.status(404).send({ error: 'Address not found!' });
    }
    return res.json(address);
  } catch (error) {
    console.error('Error updating address:', error);
    return res.status(500).send({ error: 'Failed to update address', details: error.message });
  }
};

/*
 * DELETE
 * Delete an existing address
 */
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res.status(404).send({ error: 'Address not found!' });
    }
    return res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    return res.status(500).send({ error: 'Failed to delete address', details: error.message });
  }
};
