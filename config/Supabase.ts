import { createClient, SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl: string | undefined = import.meta.env.VITE_URL;
const supabaseKey: string | undefined = import.meta.env.VITE_KEY;

let supabase : SupabaseClient;

if (supabaseKey && supabaseUrl) {
    supabase = createClient(supabaseUrl, supabaseKey);
}
else {
    throw new Error("Supabase key or url is not provided")
}

export default supabase;