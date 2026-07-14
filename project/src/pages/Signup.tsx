import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";
import { User, Phone, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

interface SignupForm {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(getApiUrl("/api/users/create"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully");
        navigate("/login");
      } else {
        alert(data.message || "Signup Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-5 py-12">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 shadow-[0_35px_100px_-40px_rgba(17,24,39,0.45)] backdrop-blur-xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[640px] lg:block">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Fresh meals" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Join the club</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Create your account and let luxury food find you.</h2>
          </div>
        </div>
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5A3D] text-white shadow-lg lg:mx-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">Join DownTown and discover the city's most exciting food.</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Username</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><User className="h-5 w-5 text-slate-400" /><input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /></div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">First Name</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><User className="h-5 w-5 text-slate-400" /><input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /></div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Last Name</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><User className="h-5 w-5 text-slate-400" /><input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /></div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><Phone className="h-5 w-5 text-slate-400" /><input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /></div>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><Mail className="h-5 w-5 text-slate-400" /><input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><Lock className="h-5 w-5 text-slate-400" /><input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3"><Lock className="h-5 w-5 text-slate-400" /><input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-transparent text-sm outline-none" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400">{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
              </div>
            </div>
            <button type="submit" className="w-full rounded-full bg-[#FF5A3D] px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5">Create Account</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-[#FF5A3D]">Login</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;