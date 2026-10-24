import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'frame-gallery-favourites'

function readSavedFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const alreadySaved = state.some((photo) => photo.id === action.photo.id)
      return alreadySaved
        ? state.filter((photo) => photo.id !== action.photo.id)
        : [...state, action.photo]
    }
    default:
      return state
  }
}

export default function useFavourites() {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    readSavedFavourites,
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // The gallery still works for this session if storage is unavailable.
    }
  }, [favourites])

  const toggleFavourite = (photo) => dispatch({ type: 'TOGGLE', photo })

  return { favourites, toggleFavourite }
}