import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
);