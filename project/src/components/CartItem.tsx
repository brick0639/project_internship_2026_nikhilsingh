import { Plus, Minus, Trash2, Leaf } from 'lucide-react';
import { CartItem as CartItemType, useApp } from '../context/AppContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useApp();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-950 border border-white/10 rounded-3xl p-4 shadow-2xl">
      <img
        src={item.menuItem.image}
        alt={item.menuItem.name}
        className="w-full md:w-28 h-28 rounded-3xl object-cover shadow-lg"
      />
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-2">
          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.menuItem.isVeg ? 'border-emerald-500' : 'border-rose-500'}`}>
            {item.menuItem.isVeg && <Leaf className="w-2 h-2 text-emerald-500" />}
          </span>
          <h4 className="font-semibold text-slate-100 text-lg">{item.menuItem.name}</h4>
        </div>
        <p className="text-slate-400 text-sm">{item.restaurantName}</p>
        <p className="font-semibold text-orange-400 mt-3">₹{item.menuItem.price}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
            className="px-3 py-2 text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 text-slate-100 font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
            className="px-3 py-2 text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.menuItem.id)}
          className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-orange-400 hover:bg-orange-500/10 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
