import { Link } from 'react-router-dom';
import { Package, ChefHat, Truck, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusConfig = {
  preparing: { icon: ChefHat, label: 'Preparing', color: 'text-amber-600', bgColor: 'bg-[#fff3e2]' },
  'on-the-way': { icon: Truck, label: 'On the Way', color: 'text-sky-600', bgColor: 'bg-[#eaf4ff]' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-emerald-600', bgColor: 'bg-[#e8f8ef]' },
};

export default function Orders() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-12">
        <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fff3eb] text-[#FF5A3D]">
            <Package className="h-12 w-12" />
          </div>
          <h2 className="mb-3 text-3xl font-semibold text-slate-900">No orders yet</h2>
          <p className="mb-6 text-sm leading-7 text-slate-600">Your orders will appear here once you place a delicious delivery request.</p>
          <Link to="/" className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Order now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-10 text-slate-800">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#FF5A3D]">Order history</p>
            <h1 className="text-4xl font-semibold text-slate-900">Your orders</h1>
          </div>
          <p className="text-sm text-slate-500">Review past deliveries and reorder your favorites instantly.</p>
        </div>
        <div className="space-y-6">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            return (
              <div key={order.id} className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{order.restaurantName}</h3>
                    <p className="text-sm text-slate-500">{order.id}</p>
                  </div>
                  <div className={`flex items-center gap-2 rounded-full px-3 py-1 ${status.bgColor}`}>
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className={`text-sm font-semibold ${status.color}`}>{status.label}</span>
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {order.items.map((item, index) => (<div key={index} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">{item.quantity}× {item.name}</div>))}
                </div>
                <div className="mb-4 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{order.date}</span></div>
                  <div className="font-semibold text-slate-900">Total: ₹{order.total}</div>
                </div>
                {order.status !== 'delivered' && (
                  <div className="relative pt-2">
                    <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200">
                      <div className="h-1 rounded-full bg-[#FF5A3D] transition-all duration-500" style={{ width: order.status === 'preparing' ? '33%' : order.status === 'on-the-way' ? '66%' : '100%' }} />
                    </div>
                  </div>
                )}
                <div className="mt-4 flex gap-4 border-t border-slate-200 pt-4">
                  <button className="flex-1 rounded-full border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-700">View details</button>
                  <button className="flex-1 rounded-full bg-[#FF5A3D] py-3 text-sm font-semibold text-white">Reorder</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
