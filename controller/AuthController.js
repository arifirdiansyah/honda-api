import { User } from '../models/UserModel.js';
import lodash from 'lodash';

export const postRegisterUser = async (req, res) => {
  try {
    let body = req.body;

    // Validate the request
    if (!lodash.isEqual(body.auth0_key, process.env.AUTH0_ACCESS_KEY)) {
      return res.status(401).sendError('Unauthorized request');
    }

    //Validate user
    let isEmailExist = await User.findOne({ email: body.email });
    let isUsernameExist = await User.findOne({ username: body.username });
    if (isEmailExist) return res.status(400).send({ messages: 'Email already used!' });
    if (isUsernameExist) {
      return res.status(400).send({ messages: 'Username already taken!' });
    }

    let user = new User({
      ...lodash.pick(body, ['email', 'username', 'picture', 'user_id']),
    });

    if (!user.picture) {
      user.picture = 'https://via.placeholder.com/300';
    }

    // Set default Role
    user.role = '';

    //Save User To Database
    let newUser = await user.save();

    newUser = lodash.pick(newUser, ['fullName', 'email', 'username', 'user_id']);

    return res.send(newUser);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};
