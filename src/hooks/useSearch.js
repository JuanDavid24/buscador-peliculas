import { useEffect, useState, useRef } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('El campo de busqueda no puede estar vacío. Por favor, ingrese un valor para buscar')
      return
    }
    if (search.length < 3) {
      setError('El campo debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return ({ search, updateSearch, error })
}
