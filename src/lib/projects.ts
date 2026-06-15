import { supabase, isSupabaseConfigured, PROJECT_IMAGES_BUCKET } from './supabase'
import type { Project, ProjectInput } from './types'

const TABLE = 'projects'

/** Published projects (public), newest first. */
export async function fetchPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as Project[]) ?? []
}

/** Featured + published projects for the homepage. */
export async function fetchFeaturedProjects(limit = 6): Promise<Project[]> {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data as Project[]) ?? []
}

/** A single published project by slug. */
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error) throw error
  return (data as Project) ?? null
}

/** All projects incl. drafts — requires an authenticated admin session. */
export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as Project[]) ?? []
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Project) ?? null
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const { data, error } = await supabase.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<Project> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Project
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

/** Upload an image to storage and return its public URL. */
export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Turn a title into a URL-safe slug (supports Arabic by keeping unicode word chars). */
export function slugify(value: string): string {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
