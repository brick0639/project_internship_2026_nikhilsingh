import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Restaurant, useApp } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(restaurant.id);

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute bottom-4 left-4 rounded-full bg-[#FF5A3D] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              {restaurant.offers[0]}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(restaurant.id);
            }}
            className={`absolute right-4 top-4 rounded-full p-2.5 shadow-lg transition ${favorite ? 'bg-[#FF5A3D] text-white' : 'bg-white/90 text-slate-700 hover:text-[#FF5A3D]'}`}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/restaurant/${restaurant.id}`}>
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-[#FF5A3D]">{restaurant.name}</h3>
        </Link>
        <p className="mt-2 text-sm text-slate-500">{restaurant.cuisine.join(', ')}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-full bg-[#fff3eb] px-3 py-1 font-semibold text-[#FF5A3D]">
            <Star className="h-4 w-4" /> <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500"><Clock className="h-4 w-4" /><span>{restaurant.deliveryTime}</span></div>
          <div className="text-slate-500">{restaurant.priceRange}</div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" /> <span>{restaurant.distance}</span>
        </div>
      </div>
    </div>
  );
}
