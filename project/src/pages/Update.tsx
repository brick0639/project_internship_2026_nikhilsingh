import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, User, Mail, Phone, Sparkles } from "lucide-react";
import { getApiUrl } from "../config/api";

interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function Update() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData>({ id: 0, username: "", firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`));
        const data = await response.json();
        if (response.ok) setFormData(data.user);
        else alert(data.message || "Unable to load profile");
      } catch (error) {
        console.error(error);
        alert("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(getApiUrl(`/api/users/${userId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully");
        navigate("/profile");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/users/${userId}`), { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        alert("Account deleted successfully");
        navigate("/login");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete account");
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-slate-700">Loading profile…</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-6 text-slate-800">
      <div className="w-full max-w-2xl rounded-[2.25rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/profile" className="rounded-full border border-slate-200 bg-slate-50 p-3 text-slate-700 shadow-sm"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Update profile</h1>
            <p className="text-sm text-slate-500">Keep your BiteBox details polished and accurate.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><User className="h-4 w-4 text-[#FF5A3D]" />First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><User className="h-4 w-4 text-[#FF5A3D]" />Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" required className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><User className="h-4 w-4 text-[#FF5A3D]" />Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" required className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Mail className="h-4 w-4 text-[#FF5A3D]" />Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Phone className="h-4 w-4 text-[#FF5A3D]" />Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone" required className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
          </div>

          <button type="submit" disabled={saving} className="w-full rounded-full bg-[#FF5A3D] px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5 disabled:bg-slate-400">
            {saving ? 'Saving...' : 'Save changes'}
          </button>

          <div className="rounded-[1.75rem] border border-red-200 bg-red-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700"><Trash2 className="h-4 w-4" />Danger zone</div>
            <p className="mb-4 text-sm text-red-600">Deleting your account will permanently remove all your data. This action cannot be undone.</p>
            <button type="button" onClick={handleDelete} className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white"> <Trash2 className="h-4 w-4" />Delete account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;