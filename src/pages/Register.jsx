import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [userData,setUserData]=useState({
    username:"",
    email:"",
    password:""
  })
  const navigate=useNavigate()

  const handleForm=async(e)=>{
    e.preventDefault()
    try {
       const {username,email,password}=userData
       if(! username || !email || !password ){
          toast.error("All fields are required",{position:"top-center"})
          return
       }
      await axios.post(
        "https://6ac67eb2bea0e72cf5c91b26.mockapi.io/users",
        userData,
      );
      setUserData({
        username:"",
        email:"",
        password:""
      })

      toast.success("user register successfully.😀",{position:"top-center"})
      navigate("/login")
    } catch {
      toast.error("Something went wrong. Please try later.😀")
    }
  }

  const handleInput=(e)=>{
    const {name,value}=e.target
    setUserData({...userData,[name]:value})
  }
  return (
    <main className="auth-page flex min-h-screen items-center justify-center px-4 py-12">
      <section className="auth-card w-full max-w-md bg-white p-8 sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-900/15">
            <ShoppingBag size={23} />
          </span>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">
              ShopEase
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Everything you love
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">Create an account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Register for a ShopEase account.
        </p>

        <form onSubmit={handleForm} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              name="username"
              value={userData.username}
              onChange={handleInput}
              type="text"
              autoComplete="name"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInput}
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInput}
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/10 transition hover:bg-purple-700"
          >
            Create account
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
