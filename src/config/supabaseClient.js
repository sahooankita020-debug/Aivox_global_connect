import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

// Server-side privileged client (service role key)
if (!config.supabaseUrl || !config.supabaseServiceKey) {
  throw new Error('Supabase ENV vars missing. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

export const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey, {
  auth: { persistSession: false },
});
