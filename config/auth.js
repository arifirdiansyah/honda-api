import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';

export async function auth(req, res, next) {
  let token = req.header('Authorization');

  if (!token) return res.status(401).sendError('Access denied. No token provided.');

  token = token.replace('Bearer ', '');

  if (token.includes('Bearer')) {
    token = token.split(' ')[1];
  }

  try {
    const { sub } = jwt.decode(token, process.env.AUTH0_SECRET_KEY.replace(/\\n/g, '\n'));
    req.user = await User.findOne({ user_id: sub });
    next();
  } catch (ex) {
    res.status(401).sendError(' Token Invalid or Expired.');
  }
}
