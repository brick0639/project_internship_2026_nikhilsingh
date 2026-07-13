import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { sampleRestaurants, useApp } from '../context/AppContext';

export default function Favorites() {
  const { favorites } = useApp();
  const favoriteRestaurants = sampleRestaurants.filter((r) => favorites.includes(r.id));

  if (favoriteRestaurants.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-12">
        <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fff3eb] text-[#FF5A3D]">
            <Heart className="h-12 w-12" />
          </div>
          <h2 className="mb-2 text-3xl font-semibold text-slate-900">No favorites yet</h2>
          <p className="mb-6 text-sm leading-7 text-slate-600">Save your most-loved restaurants and come back to them anytime.</p>
          <Link to="/search" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5"><Search className="mr-2 h-4 w-4" />Explore restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-10 text-slate-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#FF5A3D]">Favorites</p>
            <h1 className="text-4xl font-semibold text-slate-900">Your favorites</h1>
          </div>
          <p className="text-sm text-slate-500">Your saved restaurants are ready whenever you are.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteRestaurants.map((restaurant) => (<RestaurantCard key={restaurant.id} restaurant={restaurant} />))}
        </div>
      </div>
    </div>
  );
}
