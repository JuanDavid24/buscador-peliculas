export function MovieList ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li
          key={movie.id}
          className='movie'
        >
          <div className='movie-info'>
            <h3>{movie.title}</h3>
            <h4>{movie.year}</h4>
          </div>
          <img src={movie.poster} alt={movie.poster} />
        </li>
      ))}
    </ul>
  )
}

export function NoMoviesResult () {
  return (<p>No se encontraron películas</p>)
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <MovieList movies={movies} />
      : <NoMoviesResult />
  )
}
