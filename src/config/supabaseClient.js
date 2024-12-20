import { createClient, } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;