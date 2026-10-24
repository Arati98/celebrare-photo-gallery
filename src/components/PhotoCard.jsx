import { Heart } from 'lucide-react'

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full shadow-md backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isFavourite ? 'bg-rose-500 text-white' : 'bg-white/95 text-slate-600 hover:text-rose-500'
          }`}
        >
          <Heart size={19} fill={isFavourite ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Photographer</p>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-800">{photo.author}</h2>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">#{photo.id}</span>
      </div>
    </article>
  )
}