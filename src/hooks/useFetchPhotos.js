import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(PHOTOS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Photo service returned status ${response.status}`)
        }
        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('We couldn’t load the photos. Please check your connection and try again.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}