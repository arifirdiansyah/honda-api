import { User } from '../models/UserModel.js';
import { selectOnlyGeneralUsersFields } from '../libs/users/user-populate-filed.js';

/*
 * POST
 * Find all users
 * */
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select(selectOnlyGeneralUsersFields());
    return res.send(users);
  } catch (e) {
    return res.status(500).sendError('Failed load users data');
  }
};

/*
 * GET
 * Find user by email
 * */
export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email, status: 'ACTIVE' })
      .select(selectOnlyGeneralUsersFields());

    if (!user) {
      return res.status(404).sendError('User not found!');
    }
    return res.send(user);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};
