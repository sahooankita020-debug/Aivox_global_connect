import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabaseClient.js';
import { signJwt } from '../utils/jwt.js';

const ROLES = ['candidate','recruiter','business'];

export async function register({ email, password, user_type = 'candidate' }) {
  if (!email || !password) throw new Error('email & password required');
  if (!ROLES.includes(user_type)) throw new Error('invalid user_type');

  // check existing
  const { data: existing, error: findErr } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (findErr) throw new Error(findErr.message);
  if (existing) throw new Error('Email already registered');

  const hash = await bcrypt.hash(password, 10);

  // insert user
  const { data: user, error: insErr } = await supabase
    .from('users')
    .insert([{ email, user_type, password_hash: hash }])
    .select('id, email, user_type, created_at')
    .single();

  if (insErr) throw new Error(insErr.message);

  const token = signJwt({ id: user.id, email: user.email, user_type: user.user_type });
  return { user, token };
}
