import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPERBASE_URL as string,
  process.env.SUPERBASE_ANON_KEY as string
);

export default supabase;
