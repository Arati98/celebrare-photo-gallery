import { useCallback, useMemo, useState } from 'react'
import { Camera, Heart, Search, Image as ImageIcon } from 'lucide-react'
import useFetchPhotos from './hooks/useFetchPhotos'
import useFavourites from './hooks/useFavourites'
import PhotoCard from './components/PhotoCard'

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const favouriteIds = useMemo(
    () => new Set(favourites.map((photo) => photo.id)),
    [favourites],
  )

  const displayedPhotos = useMemo(() => {
    const source = activeTab === 'favourites' ? favourites : photos
    const query = searchTerm.trim().toLowerCase()
    if (!query) return source
    return source.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, favourites, searchTerm, activeTab])

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Frame gallery home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <Camera size={21} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900">frame<span className="text-indigo-600">.</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">A little visual escape</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Your photo collection
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">Discover something beautiful</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">A gallery for the <span className="text-indigo-600">curious.</span></h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">Explore moments captured by photographers around the world. Search by creator and keep the ones you love close.</p>
        </div>

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search photographer..."
              aria-label="Search by photographer name"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
          <div className="flex w-full rounded-xl border border-slate-200 bg-white p-1 sm:w-auto" role="tablist" aria-label="Photo collection">
            <button type="button" role="tab" aria-selected={activeTab === 'all'} onClick={() => setActiveTab('all')} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:flex-none ${activeTab === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <ImageIcon size={16} /> All photos <span className="text-xs opacity-70">{photos.length}</span>
            </button>
            <button type="button" role="tab" aria-selected={activeTab === 'favourites'} onClick={() => setActiveTab('favourites')} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:flex-none ${activeTab === 'favourites' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <Heart size={16} /> Favourites <span className="text-xs opacity-70">{favourites.length}</span>
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" role="status" aria-label="Loading photos" />
            <p className="text-sm font-medium text-slate-500">Gathering beautiful moments...</p>
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
            <p className="font-semibold text-rose-800">Something went wrong</p>
            <p className="mt-2 text-sm text-rose-700">{error}</p>
          </div>
        )}

        {!loading && !error && displayedPhotos.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <p>{activeTab === 'favourites' ? 'Your saved moments' : 'The collection'}</p>
              <p><span className="font-semibold text-slate-800">{displayedPhotos.length}</span> {displayedPhotos.length === 1 ? 'photo' : 'photos'}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {displayedPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favouriteIds.has(photo.id)}
                  onToggleFavourite={toggleFavourite}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && displayedPhotos.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400"><Search size={21} /></span>
            <h2 className="mt-4 font-semibold text-slate-800">{activeTab === 'favourites' && !searchTerm ? 'No favourites yet' : 'No photos found'}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{activeTab === 'favourites' && !searchTerm ? 'Tap the heart on any photo to save it here.' : 'Try another photographer name or clear your search.'}</p>
          </div>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          Made for looking a little closer · Photos provided by Picsum
        </footer>
      </section>
    </main>
  )
}