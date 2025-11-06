import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabaseClient.js';
import { signJwt } from '../utils/jwt.js';

const ROLES = ['candidate','recruiter','business'];

export async function register({ first_name, last_name, email, password, user_type = 'candidate' }) {
  if(!first_name || !last_name || !email || !password) {
    throw new Error("first_name, last_name, email & password required");
  }

  if (!ROLES.includes(user_type)) throw new Error('invalid user_type');

  // check existing email
  const { data: existing, error: findErr } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (findErr) throw new Error(findErr.message);
  if (existing) throw new Error('Email already registered');

  const hash = await bcrypt.hash(password, 10);

  // insert into users
  const { data: user, error: insUserErr } = await supabase
    .from('users')
    .insert([{ email, user_type, password_hash: hash }])
    .select('id, email, user_type, created_at')
    .single();

  if (insUserErr) throw new Error(insUserErr.message);

  // insert profile
  const { error: profileErr } = await supabase
    .from('profiles')
    .insert([{ id: user.id, first_name, last_name }]);

  if(profileErr) throw new Error(profileErr.message);

  const token = signJwt({ id: user.id, email: user.email, user_type: user.user_type });

  return { user: { ...user, first_name, last_name }, token };
}


// login functionality add here
export async function login({ email, password }) {
  if(!email || !password){
    throw new Error("email & password required");
  }

  const { data: user, error: userErr } = await supabase
    .from('users')
    .select('id, email, password_hash, user_type')
    .eq('email', email)
    .single();

  if(userErr || !user){
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if(!validPassword){
    throw new Error("Invalid credentials");
  }

  const token = signJwt({ id: user.id, email: user.email, user_type: user.user_type });

  delete user.password_hash; // important security

  return { user, token };
}
