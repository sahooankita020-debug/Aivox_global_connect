import { register, login } from '../services/auth.service.js';

export async function registerUser(req, res) {
  try {
    const { first_name, last_name, email, password, user_type } = req.body;
    const { user, token } = await register({ first_name, last_name, email, password, user_type });
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await login({ email, password });
    return res.status(200).json({ success: true, user, token });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

export async function logoutUser(req, res) {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
}
