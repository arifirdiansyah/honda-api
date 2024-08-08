import { User } from '../models/UserModel.js';

/*
 * POST
 * Find all users
 * */
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch ( e ) {
    return res.status(500).sendError('Failed load users data');
  }
};

/*
 * PUT
 * Update user
 * */
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body);

    if (!user) {
      return res.status(404).sendError('User not found!');
    }
    const newUpdatedUser = await User.findById(user.id);
    return res.send(newUpdatedUser);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};


/*
 * GET
 * Find user by email
 * */
export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).sendError('User not found!');
    }
    return res.send(user);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
 * GET
 * Find user by email
 * */
export const findUserCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('dealer');

    if (!user) {
      return res.status(401).sendError('Incorrect user!');
    }
    return res.send(user);
  } catch ( e ) {
    return res.status(500).sendError(e);
  }
};

/*
 * GET
 * Find user by email
 * */
export const updateProfil = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phoneNumber, address } = req.body; // Ambil name, phoneNumber, dan address dari request body
    const user = await User.findById(userId); // findUserById diganti dengan findById

    if (!user) {
      return res.status(404).sendError('User not found!');
    }

    // Update nama
    if (name) {
      user.name = name;
    }

    // Update nomor HP dan alamat jika peran adalah CUSTOMER
    if (user.role === 'CUSTOMER') {
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (address) {
        user.address = address;
      }
    }

    await user.save();
    return res.send(user);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};