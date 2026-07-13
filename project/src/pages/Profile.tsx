import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";
import { Mail, Phone, MapPin, CreditCard, Heart, Package, Bell, LogOut, ChevronRight, Camera, Sparkles } from "lucide-react";

interface ProfileProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function Profile({ setIsLogin }: ProfileProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User>({ id: 0, username: "", firstName: "", lastName: "", email: "", phone: "" });
  const [addresses] = useState([
    { id: 1, type: "Home", address: "123 Main Street, Banjara Hills, Hyderabad" },
    { id: 2, type: "Work", address: "456 Tech Park, Hitech City, Hyderabad" },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`));
        const data = await response.json();
        if (response.ok) setProfile(data.user);
        else alert(data.message);
      } catch (error) {
        console.log(error);
        alert("Unable to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLogin(false);
    navigate("/login");
  };

  const menuItems = [
    { icon: Heart, label: "Favorites", href: "/favorites", count: 4 },
    { icon: Package, label: "Order History", href: "/orders", count: 2 },
    { icon: MapPin, label: "Saved Addresses", href: "#", count: 2 },
    { icon: CreditCard, label: "Payment Methods", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-slate-700">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen bg-transparent py-10 text-slate-800">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 rounded-[2.25rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF5A3D] text-3xl font-semibold text-white shadow-lg">
                  <span>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</span>
                </div>
                <button className="absolute bottom-0 right-0 rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{profile.firstName} {profile.lastName}</h1>
                <p className="text-sm text-slate-500">@{profile.username}</p>
              </div>
            </div>
            <button onClick={() => navigate("/update")} className="soft-button bg-[#FF5A3D] text-white hover:-translate-y-0.5">Edit profile</button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"><div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#FF5A3D]" /><span>{profile.email}</span></div></div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"><div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#FF5A3D]" /><span>{profile.phone}</span></div></div>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
          {menuItems.map((item, index) => (
            <Link key={item.label} to={item.href} className={`flex items-center justify-between gap-4 p-4 transition ${index !== menuItems.length - 1 ? 'border-b border-slate-200' : ''} hover:bg-slate-50`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3eb] text-[#FF5A3D]"><item.icon className="h-5 w-5" /></div>
                <span className="font-semibold text-slate-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && <span className="rounded-full bg-[#fff3eb] px-3 py-1 text-sm font-semibold text-[#FF5A3D]">{item.count}</span>}
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-6 rounded-[2.25rem] border border-slate-200 bg-[#1F2937] p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Invite & earn</h3>
              <p className="mt-1 text-sm text-slate-300">Get ₹200 for every friend who orders using your code.</p>
            </div>
            <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#FF5A3D]">{profile.username.toUpperCase()}200</div>
          </div>
        </div>

        <div className="mb-6 rounded-[2.25rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Saved addresses</h2>
            <button className="text-sm font-semibold text-[#FF5A3D]">Add new</button>
          </div>
          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <MapPin className="mt-1 h-5 w-5 text-[#FF5A3D]" />
                <div>
                  <h4 className="font-semibold text-slate-800">{address.type}</h4>
                  <p className="text-sm text-slate-500">{address.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5A3D] py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
          <LogOut className="h-5 w-5" /> Log out
        </button>
        <p className="mt-6 text-center text-sm text-slate-500">BiteBox © 2026. All rights reserved.</p>
      </div>
    </div>
  );
}