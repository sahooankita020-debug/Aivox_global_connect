import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabaseClient.js';

export async function requestReset(req, res) {
  try {
    const { email } = req.body;

    const { data: user } = await supabase.from('users').select('id,email').eq('email', email).single();

    if (!user) {
      return res.json({ success:true, message:'If account exists, email sent' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await supabase.from('password_resets').insert([{ user_id: user.id, token, expires_at }]);

    return res.json({ success:true, reset_token: token });
  } catch (err) {
    return res.status(400).json({ success:false, message:err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, new_password } = req.body;

    const { data: pr } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .single();

    if (!pr || pr.used || new Date(pr.expires_at) < new Date()) {
      return res.status(400).json({ success:false, message:'Invalid or expired token' });
    }

    const hash = await bcrypt.hash(new_password, 10);

    await supabase.from('users').update({ password_hash: hash }).eq('id', pr.user_id);
  
    await supabase.from('password_resets').update({ used:true }).eq('id', pr.id);

    return res.json({ success:true, message:'Password reset successful' });
  } catch (err) {
    return res.status(400).json({ success:false, message:err.message });
  }
}
