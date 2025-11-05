import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabaseClient.js';
import { signJwt } from '../utils/jwt.js';

const ROLES = ['candidate','recruiter','business'];

export async function register({ first_name, last_name, email, password, user_type = 'candidate' }) {
  if(!first_name || !last_name || !email || !password) {
    throw new Error("first_name, last_name, email & password required");
  }

  if (!ROLES.includes(user_type)) throw new Error('invalid user_type');

  const { data: existing, error: findErr } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (findErr) throw new Error(findErr.message);
  if (existing) throw new Error('Email already registered');

  const hash = await bcrypt.hash(password, 10);

  const { data: user, error: insErr } = await supabase
    .from('users')
    .insert([{
      first_name,
      last_name,
      email,
      user_type,
      password_hash: hash
    }])
    .select('id, first_name, last_name, email, user_type, created_at')
    .single();

  if (insErr) throw new Error(insErr.message);

  const token = signJwt({ id: user.id, email: user.email, user_type: user.user_type });

  return { user, token };
}
