import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [allusers,setAllusers]=useState([])
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    let isMounted = true;

    axios
      .get("https://6ac67eb2bea0e72cf5c91b26.mockapi.io/users")
      .then(({ data }) => {
        if (isMounted) {
          setAllusers(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Could not load accounts. Please try again later.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
  }

  const handleForm=(e)=>{
    e.preventDefault()
    if (isLoadingUsers) {
      toast.info("Please wait while accounts are loading.");
      return;
    }

    const user=allusers.find((ele)=>ele.email===formData.email)
    if(!user){
      toast.error("Email is not Register",{position:"top-right"})
      return
    }
    if(user.password !== formData.password){
      toast.error("Invalid password",{position:"top-right"})
      return
    }
    const token="udyhisnccrghughbsnuhb$#@$V76."+user.id
    localStorage.setItem("jwt_token",JSON.stringify(token))
    setFormData({
      email:"",
      password:""
    })
    toast.success("Login Successfully.",{position:"top-center"})
    navigate("/dashboard")

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
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to your ShopEase account.
        </p>

        <form onSubmit={handleForm} className="mt-6 space-y-4">
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
              value={formData.email}
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
              value={formData.password}
              onChange={handleInput}
              type="password"
              autoComplete="current-password"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <button
            type="submit"
            disabled={isLoadingUsers}
            className="w-full rounded-xl bg-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/10 transition hover:bg-purple-700"
          >
            {isLoadingUsers ? "Loading accounts..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-purple-600 hover:text-purple-700"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
