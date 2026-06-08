import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// どこからでもこの「supabase」をインポートすれば、DBを操作できるようになります
export const supabase = createClient(supabaseUrl, supabaseAnonKey)