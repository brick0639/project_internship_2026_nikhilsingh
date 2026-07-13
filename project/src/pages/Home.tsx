import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, Clock3, Star } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { sampleRestaurants } from '../context/AppContext';

const categories = [
  { name: 'Biryani', image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=150', count: 254 },
  { name: 'Pizza', image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=150', count: 187 },
  { name: 'Burgers', image: 'https://images.pexels.com/photos/1633565/pexels-photo-1633565.jpeg?auto=compress&cs=tinysrgb&w=150', count: 143 },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=150', count: 221 },
  { name: 'North Indian', image: 'https://t4.ftcdn.net/jpg/08/36/02/45/360_F_836024580_GMq3eGTwA8WS6JeHUP9I6iT2epmNIINx.jpg', count: 312 },
  { name: 'South Indian', image: 'https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_640.jpg', count: 178 },
  { name: 'Desserts', image: 'https://images.pexels.com/photos/5408352/pexels-photo-5408352.jpeg?auto=compress&cs=tinysrgb&w=150', count: 89 },
  { name: 'Beverages', image: 'https://media.istockphoto.com/id/1395736637/photo/spring-or-summer-cold-cocktail-raspberry-lemonade.jpg?s=612x612&w=0&k=20&c=Eim8oSm-ycxAVssFPrOVwWpeo6iOaoZkkglKrmbKSk4=', count: 156 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Hyderabad');

  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Luxury food backdrop" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-200 backdrop-blur">
                <Sparkles className="h-4 w-4" /> Premium delivery
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Order your next favorite meal in a premium, effortless way.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Discover elevated restaurants, track your order in real time, and enjoy beautifully curated dishes from around the city.
              </p>
              <div className="mt-8 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/90 px-4 py-3">
                    <MapPin className="h-5 w-5 text-[#FF5A3D]" />
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Location" />
                  </div>
                  <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/90 px-4 py-3">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Search for a dish or cuisine" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Biryani', 'Pizza', 'Desserts', 'Coffee'].map((chip) => (
                    <button key={chip} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/20">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.75)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#fff8f3] p-5">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Fast delivery</span>
                  <span className="text-[#FF5A3D]">12 min</span>
                </div>
                <img src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Chef plating food" className="mt-4 h-56 w-full rounded-[1.25rem] object-cover" />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">The Spice Route</p>
                    <p className="text-sm text-slate-500">Signature biryani • 4.8</p>
                  </div>
                  <Link to="/search" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">
                    Order now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF5A3D]">Popular categories</p>
            <h2 className="text-3xl font-semibold text-slate-900">What are you craving?</h2>
          </div>
          <Link to="/search" className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#FF5A3D]">
            Explore all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/75 p-6 shadow-[0_30px_100px_-50px_rgba(17,24,39,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF5A3D]">Featured restaurants</p>
              <h2 className="text-3xl font-semibold text-slate-900">Luxury picks near you</h2>
            </div>
            <Link to="/search" className="soft-button border-slate-200 bg-white text-slate-700 hover:border-[#FF5A3D] hover:text-[#FF5A3D]">Browse all</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {sampleRestaurants.slice(0, 3).map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">Featured</div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{restaurant.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{restaurant.cuisine.join(' • ')}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-[#fff3eb] px-3 py-1 text-sm font-semibold text-[#FF5A3D]">
                      <Star className="h-4 w-4" /> {restaurant.rating}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {restaurant.deliveryTime}</span>
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-[#1F2937] p-8 text-white shadow-[0_30px_100px_-40px_rgba(31,41,55,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">BiteBox mobile</p>
            <h2 className="mt-3 text-3xl font-semibold">Order on the go with gorgeous, fast experiences.</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">Stay on top of your delivery, discover personalized recommendations, and unlock exclusive offers from the app.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Download for iOS</button>
              <button className="soft-button border-white/20 bg-white/10 text-white hover:bg-white/20">Download for Android</button>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/75 p-6 shadow-[0_30px_100px_-50px_rgba(17,24,39,0.45)] backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {['Hot & Fresh', 'Top Rated', 'Exclusive Offers', 'Fast Delivery'].map((pill) => (
                <div key={pill} className="rounded-[1.5rem] border border-slate-200 bg-[#fff8f3] p-4 text-sm font-semibold text-slate-700">
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
