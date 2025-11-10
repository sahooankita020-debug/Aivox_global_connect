import { supabase } from '../config/supabaseClient.js';

export async function getMyProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      email,
      user_type,
      created_at,
      profiles(first_name,last_name)
    `)
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMyProfile(userId, { first_name, last_name }) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, first_name, last_name }, { onConflict:'id' });

  if (error) throw new Error(error.message);

  const { data, error: getErr } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', userId)
    .single();

  if (getErr) throw new Error(getErr.message);
  return data;
}
