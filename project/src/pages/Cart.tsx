import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Tag, Percent, Trash2, Sparkles } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, getCartTotal, placeOrder } = useApp();
  const [address, setAddress] = useState('123 Main Street, Banjara Hills, Hyderabad');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  if (cart.length === 0 && !showOrderSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-12">
        <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fff3eb] text-[#FF5A3D]">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="mb-3 text-3xl font-semibold text-slate-900">Your cart is empty</h2>
          <p className="mb-6 text-sm leading-7 text-slate-600">Explore the city’s best restaurants and build your next order.</p>
          <Link to="/" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Browse restaurants</Link>
        </div>
      </div>
    );
  }

  if (showOrderSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-12">
        <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e8f8ef] text-[#2f7d56]">
            <Sparkles className="h-12 w-12" />
          </div>
          <h2 className="mb-3 text-3xl font-semibold text-slate-900">Order placed successfully</h2>
          <p className="mb-6 text-sm leading-7 text-slate-600">Your order is on its way and you can track it in your orders section.</p>
          <Link to="/orders" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">View orders</Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const deliveryFee = 40;
  const taxes = Math.round(subtotal * 0.05);
  const discount = appliedPromo ? 100 : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'BITEBOX100') {
      setAppliedPromo('BITEBOX100');
      setPromoCode('');
    }
  };

  const handlePlaceOrder = () => {
    placeOrder(address);
    setShowOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-transparent py-10 text-slate-800">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-slate-900">Your cart</h1>
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-slate-700">
                <MapPin className="h-5 w-5 text-[#FF5A3D]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF5A3D]">Delivery address</p>
                  <p className="mt-1 text-slate-700">{address}</p>
                </div>
              </div>
              <button onClick={() => setShowAddressModal(true)} className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                Change delivery address
              </button>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Order details</p>
              <div className="space-y-4">
                {cart.map((item) => (<CartItem key={item.menuItem.id} item={item} />))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700"><Tag className="h-5 w-5 text-[#FF5A3D]" /> Apply promo code</div>
              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-full bg-[#e8f8ef] px-4 py-4 text-sm font-semibold text-[#2f7d56]">
                  <span>₹100 discount applied</span>
                  <button onClick={() => setAppliedPromo(null)}><Trash2 className="h-4 w-4" /></button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter promo code" className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none" />
                  <button onClick={handleApplyPromo} className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Apply</button>
                </div>
              )}
              <p className="mt-3 text-xs text-slate-500">Try BITEBOX100 for ₹100 off</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700"><Percent className="h-5 w-5 text-[#FF5A3D]" /> Add a tip</div>
              <div className="grid grid-cols-2 gap-3">
                {['₹10', '₹20', '₹50', '₹100'].map((tip) => (<button key={tip} className="rounded-full border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">{tip}</button>))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            <h3 className="mb-6 text-2xl font-semibold text-slate-900">Order summary</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-slate-900">₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery fee</span><span className="font-semibold text-slate-900">₹{deliveryFee}</span></div>
              <div className="flex justify-between"><span>Taxes</span><span className="font-semibold text-slate-900">₹{taxes}</span></div>
              {appliedPromo && (<div className="flex justify-between text-[#2f7d56]"><span>Promo discount</span><span className="font-semibold">-₹{discount}</span></div>)}
              <div className="my-4 h-px bg-slate-200" />
              <div className="flex justify-between text-lg font-semibold text-slate-900"><span>Total</span><span>₹{total}</span></div>
            </div>
            <button onClick={handlePlaceOrder} className="mt-8 w-full rounded-full bg-[#FF5A3D] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5">Place order</button>
            <p className="mt-4 text-center text-xs text-slate-500">By placing your order, you agree <Link to="/terms" className="text-[#FF5A3D]">Terms of Service</Link></p>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Change delivery address</h3>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="min-h-24 w-full resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm outline-none" rows={3} />
            <div className="mt-4 flex gap-3">
              <button onClick={() => setShowAddressModal(false)} className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700">Cancel</button>
              <button onClick={() => setShowAddressModal(false)} className="flex-1 rounded-full bg-[#FF5A3D] px-5 py-3 text-sm font-semibold text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
