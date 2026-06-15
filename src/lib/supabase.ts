import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True only when real credentials are present. */
export const isSupabaseConfigured = Boolean(url && key)

// Fall back to harmless placeholders so the client can be created even before
// the project is provisioned — data hooks check `isSupabaseConfigured` first.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)

export const PROJECT_IMAGES_BUCKET = 'project-images'
