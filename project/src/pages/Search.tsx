import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Sparkles, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { sampleRestaurants } from '../context/AppContext';

const filterOptions = [
  { id: 'rating4', label: 'Rating 4.0+' },
  { id: 'fastDelivery', label: 'Fast Delivery' },
  { id: 'offers', label: 'Offers' },
];

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'deliveryTime', label: 'Delivery Time' },
  { id: 'rating', label: 'Rating' },
  { id: 'priceLowHigh', label: 'Cost: Low to High' },
  { id: 'priceHighLow', label: 'Cost: High to Low' },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('category') || '');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState('relevance');

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || searchParams.get('category') || '');
  }, [searchParams]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setSearchParams({});
  };

  let filteredRestaurants = sampleRestaurants;

  if (searchQuery) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));
  }
  if (activeFilters.includes('rating4')) filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= 4.0);
  if (activeFilters.includes('fastDelivery')) filteredRestaurants = filteredRestaurants.filter((r) => Number.parseInt(r.deliveryTime) <= 25);
  if (activeFilters.includes('offers')) filteredRestaurants = filteredRestaurants.filter((r) => r.offers && r.offers.length > 0);

  switch (activeSort) {
    case 'deliveryTime':
      filteredRestaurants = [...filteredRestaurants].sort((a, b) => Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime));
      break;
    case 'rating':
      filteredRestaurants = [...filteredRestaurants].sort((a, b) => b.rating - a.rating);
      break;
    case 'priceLowHigh':
      filteredRestaurants = [...filteredRestaurants].sort((a, b) => Number.parseInt(a.priceRange.replace(/[^0-9]/g, '')) - Number.parseInt(b.priceRange.replace(/[^0-9]/g, '')));
      break;
    case 'priceHighLow':
      filteredRestaurants = [...filteredRestaurants].sort((a, b) => Number.parseInt(b.priceRange.replace(/[^0-9]/g, '')) - Number.parseInt(a.priceRange.replace(/[^0-9]/g, '')));
      break;
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      <div className="sticky top-16 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex w-full gap-3 lg:w-[65%]">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for restaurants, cuisine or a dish" className="w-full rounded-full border border-slate-200 bg-white px-12 py-3 text-sm outline-none ring-0" />
            </div>
            <button type="submit" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Search</button>
          </form>
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <button key={filter.id} onClick={() => toggleFilter(filter.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilters.includes(filter.id) ? 'bg-[#FF5A3D] text-white' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}</h1>
            <p className="mt-2 text-sm text-slate-500">{filteredRestaurants.length} restaurant{filteredRestaurants.length === 1 ? '' : 's'} found</p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <SlidersHorizontal className="h-4 w-4 text-[#FF5A3D]" />
            <select value={activeSort} onChange={(e) => setActiveSort(e.target.value)} className="bg-transparent outline-none">
              {sortOptions.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>))}
            </select>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-12 text-center shadow-sm backdrop-blur-xl">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3eb] text-[#FF5A3D]">
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="mb-3 text-lg font-semibold text-slate-900">No restaurants found</p>
            <button onClick={clearFilters} className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Clear filters</button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (<RestaurantCard key={restaurant.id} restaurant={restaurant} />))}
          </div>
        )}
      </div>
    </div>
  );
}
