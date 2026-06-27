import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';
import {User} from '../models/User.js';

export async function requireAuth(req, res, next){
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if(!token){
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = jwt.verify(token, env.accessSecret);
    const user = await User.findById(payload.sub).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
}
