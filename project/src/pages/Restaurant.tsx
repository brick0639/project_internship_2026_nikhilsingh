import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart, ChevronLeft, Share2 } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import { sampleRestaurants, useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Restaurant() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, cart } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const restaurant = sampleRestaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-10 text-center shadow-xl backdrop-blur-xl">
          <h2 className="mb-4 text-3xl font-semibold text-slate-900">Restaurant not found</h2>
          <Link to="/" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Go back home</Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(restaurant.id);
  const categories = ['All', ...new Set(restaurant.menu.map((item) => item.category))];
  const filteredMenu = activeCategory === 'All' ? restaurant.menu : restaurant.menu.filter((item) => item.category === activeCategory);
  const currentRestaurantItems = cart.filter((item) => item.restaurantId === restaurant.id);
  const currentRestaurantTotal = currentRestaurantItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-transparent pb-28 text-slate-800">
      <div className="relative h-[360px] md:h-[420px]">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute inset-x-0 top-5 flex items-center justify-between px-4 sm:px-6">
          <Link to="/" className="rounded-full border border-white/20 bg-white/15 p-3 text-white shadow-lg backdrop-blur">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-3">
            <button onClick={() => toggleFavorite(restaurant.id)} className={`rounded-full p-3 shadow-lg transition ${favorite ? 'bg-[#FF5A3D] text-white' : 'bg-white/15 text-white backdrop-blur'}`}>
              <Heart className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white/15 p-3 text-white shadow-lg backdrop-blur">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h1 className="mb-3 text-3xl font-semibold text-white sm:text-4xl">{restaurant.name}</h1>
            <p className="mb-4 text-slate-200">{restaurant.cuisine.join(', ')}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-semibold text-white">
                <Star className="h-4 w-4" /> {restaurant.rating}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-4 py-2 text-slate-100"><Clock className="h-4 w-4" /> {restaurant.deliveryTime}</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-4 py-2 text-slate-100">{restaurant.priceRange}</div>
            </div>
          </div>
        </div>
      </div>

      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-wrap gap-3">
            {restaurant.offers.map((offer, index) => (
              <div key={index} className="rounded-full bg-[#fff3eb] px-4 py-2 text-sm font-semibold text-[#FF5A3D]">
                {offer}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-3 overflow-x-auto scrollbar-hide md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-[#FF5A3D]" /><span>{restaurant.address}</span></div>
            <div className="text-sm text-slate-600">{restaurant.distance}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-3 py-2">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeCategory === category ? 'bg-[#FF5A3D] text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:px-6">
        <h2 className="text-2xl font-semibold text-slate-900">Menu</h2>
        <div className="space-y-4">
          {filteredMenu.map((item) => (<MenuItemCard key={item.id} item={item} restaurantId={restaurant.id} restaurantName={restaurant.name} />))}
        </div>
      </div>

      {currentRestaurantItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 px-4 py-4 shadow-[0_-20px_80px_-30px_rgba(17,24,39,0.3)] backdrop-blur-xl">
          <div className="mx-auto max-w-6xl">
            <Link to="/cart" className="flex items-center justify-between rounded-[1.5rem] bg-[#1F2937] px-5 py-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold">{currentRestaurantItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                <span className="font-semibold">View Cart</span>
              </div>
              <span className="font-bold">₹{currentRestaurantTotal}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
