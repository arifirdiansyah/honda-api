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
    if (isEmailExist) return res.status(400).send({ messages: 'Email already used!' });
  
    let user = new User({
      ...lodash.pick(body, ['email', 'picture', 'user_id']),
    });

    if (!user.picture) {
      user.picture = 'https://via.placeholder.com/300';
    }

    // Set default Role
    user.role = 'CUSTOMER';

    //Save User To Database
    let newUser = await user.save();

    newUser = lodash.pick(newUser, ['email, ', 'user_id']);

    return res.send(newUser);
  } catch (e) {
    return res.status(500).sendError(e);
  }
};
