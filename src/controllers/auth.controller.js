import { register } from '../services/auth.service.js';

export async function registerUser(req, res) {
  try {
    const { email, password, user_type } = req.body;
    const { user, token } = await register({ email, password, user_type });
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

export async function loginUser(req, res) {
  return res.json({ message: 'login working' });
}

