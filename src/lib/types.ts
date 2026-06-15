export type ProjectStatus = 'draft' | 'published'

export type ProjectCategory =
  | 'residential'
  | 'commercial'
  | 'infrastructure'
  | 'renovation'
  | 'interior'
  | 'industrial'

export interface Project {
  id: string
  slug: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  content_en: string
  content_ar: string
  category: ProjectCategory
  location_en: string
  location_ar: string
  client: string | null
  year: number | null
  cover_image_url: string | null
  gallery: string[]
  featured: boolean
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'residential',
  'commercial',
  'infrastructure',
  'renovation',
  'interior',
  'industrial',
]
