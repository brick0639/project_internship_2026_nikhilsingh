import { Plus, Minus, Star, Leaf } from 'lucide-react';
import { MenuItem, useApp } from '../context/AppContext';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

export default function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const { cart, addToCart, updateQuantity } = useApp();
  const cartItem = cart.find((ci) => ci.menuItem.id === item.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 bg-slate-950 border border-white/10 rounded-3xl shadow-2xl hover:-translate-y-1 transition-transform duration-300">
      <div className="relative w-full md:w-32 h-40 rounded-3xl overflow-hidden shadow-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isBestseller && (
          <div className="absolute top-3 left-3 bg-orange-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Bestseller
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.isVeg ? 'border-emerald-500' : 'border-rose-500'}`}>
              {item.isVeg && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
            </span>
            <h4 className="text-lg font-semibold text-slate-100">{item.name}</h4>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-slate-400">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Star className="w-3 h-3" />
              <span>4.2</span>
            </span>
            <span>(120 ratings)</span>
          </div>
          <p className="text-slate-400 text-sm leading-6 line-clamp-2">{item.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
          <span className="text-xl font-bold text-slate-100">₹{item.price}</span>
          {!cartItem ? (
            <button
              onClick={() => addToCart(item, restaurantId, restaurantName)}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold shadow-lg hover:from-orange-400 hover:to-red-400 transition-colors"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="px-3 py-2 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-slate-100 font-semibold">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                className="px-3 py-2 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
