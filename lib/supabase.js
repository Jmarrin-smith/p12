import { createClient } from "@supabase/supabase-js";
// Create a supabase client for DB management
// Credentials stored in .env local currentl
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
