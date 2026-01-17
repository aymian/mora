
import { createClient } from '@supabase/supabase-js';

// Configuration from user input
const supabaseUrl = "https://ccltffqlssoccvqoduzc.supabase.co";
const supabaseAnonKey = "sb_publishable_dbF6Cp7Zp_ZWflwwvvAewg_O8ed0WMn";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
