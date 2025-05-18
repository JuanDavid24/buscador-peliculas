const API_KEY = 'c9960f3b'
const API_BASE_URL = 'https://omdbapi.com'

export const searchMovies = async (search) => {
  if (search === '') { return } // valido search
  try {
    const res = await fetch(`${API_BASE_URL}/?apikey=${API_KEY}&s=${search}`)
    const json = await res.json()
    const movies = json.Search

    return movies?.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
      type: movie.Type,
      poster: movie.Poster
    })) || []
  } catch (error) {
    throw new Error('Error fetching movies from API')
  }
}
