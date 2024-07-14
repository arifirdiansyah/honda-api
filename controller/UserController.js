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
