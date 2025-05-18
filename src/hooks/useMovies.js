import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/searchMovies'

export function useMovies ({ search, sortBy }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const lastSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      if (!search) return
      if (search === lastSearch.current) {
        return
      }
      setLoading(true)
      setError(null)
      try {
        lastSearch.current = search
        const movies = await searchMovies(search)
        setMovies(movies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const sortedMovies = useMemo(
    () =>
      sortBy
        ? [...movies].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : movies,
    [sortBy, movies]
  )

  return { movies, getMovies, sortedMovies, loading, error }
}
