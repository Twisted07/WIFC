import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr";


export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

