import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, Sparkles } from "lucide-react";
import { getApiUrl } from "../config/api";

interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginForm {
  phone: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>({ phone: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(getApiUrl("/api/users/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userId", data.user.id);
        setIsLogin(true);
        navigate("/profile");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-5 py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 shadow-[0_35px_100px_-40px_rgba(17,24,39,0.45)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden min-h-[540px] lg:block">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Luxury meal" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Freshly delivered</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">A premium login experience for modern food lovers.</h2>
          </div>
        </div>
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5A3D] text-white shadow-lg lg:mx-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">Sign in to continue your premium BiteBox journey.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <input type="tel" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                <Lock className="h-5 w-5 text-slate-400" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full rounded-full bg-[#FF5A3D] px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5">Login</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#FF5A3D]">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;