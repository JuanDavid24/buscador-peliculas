import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import circlesBouncing from './assets/circlesBouncing.svg'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { getMovies, sortedMovies, loading } = useMovies({ search, sortBy: sort })

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 500),
    [getMovies])

  const handleChange = event => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
    // getMovies({ search: newSearch })
  }

  const handleSubmit = event => {
    event.preventDefault()
    /* esto era para formulario no controlado
    const formData = new window.FormData(event.target)
    const query = formData.get('query') */
    if (!error) {
      getMovies({ search })
    }
  }

  const handleSort = (event) => {
    const newSort = event.target.value
    setSort(newSort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input onChange={handleChange} name='query' type='text' placeholder='Movie name' />
            <button>Buscar</button>
          </div>
          <div className='form-control'>
            <label htmlFor='sort'>Ordenar por:</label>
            <select name='sort' onChange={handleSort}>
              <option value=''>Defecto</option>
              <option value='title'>Título</option>
              <option value='year'>Año</option>
            </select>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading
            ? <img className='spinner' src={circlesBouncing} alt='Cargando películas...' />
            : <Movies movies={sortedMovies} />
        }
      </main>
    </div>
  )
}

export default App
