import { useCallback, useEffect, useState } from 'react'
import type { Project } from '@/lib/types'
import {
  fetchFeaturedProjects,
  fetchProjectBySlug,
  fetchPublishedProjects,
} from '@/lib/projects'

interface AsyncState<T> {
  data: T
  loading: boolean
  error: string | null
}

export function usePublishedProjects() {
  const [state, setState] = useState<AsyncState<Project[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true
    fetchPublishedProjects()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: [], loading: false, error: String(e?.message ?? e) }))
    return () => {
      active = false
    }
  }, [])

  return state
}

export function useFeaturedProjects(limit = 6) {
  const [state, setState] = useState<AsyncState<Project[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true
    fetchFeaturedProjects(limit)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: [], loading: false, error: String(e?.message ?? e) }))
    return () => {
      active = false
    }
  }, [limit])

  return state
}

export function useProject(slug: string | undefined) {
  const [state, setState] = useState<AsyncState<Project | null>>({
    data: null,
    loading: true,
    error: null,
  })

  const reload = useCallback(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null })
      return
    }
    setState((s) => ({ ...s, loading: true }))
    fetchProjectBySlug(slug)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => setState({ data: null, loading: false, error: String(e?.message ?? e) }))
  }, [slug])

  useEffect(() => {
    let active = true
    if (!slug) {
      setState({ data: null, loading: false, error: null })
      return
    }
    fetchProjectBySlug(slug)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: null, loading: false, error: String(e?.message ?? e) }))
    return () => {
      active = false
    }
  }, [slug])

  return { ...state, reload }
}
