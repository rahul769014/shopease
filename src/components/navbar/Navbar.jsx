import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearCart,
  loadCart,
  removeFromCart,
  setSearchItem,
  toggleWishlist,
} from "../../store/shopSlice";

const categories = [
  { slug: "beauty", name: "Beauty" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "furniture", name: "Furniture" },
  { slug: "groceries", name: "Groceries" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [auth, setAuth] = useState(() =>
    Boolean(localStorage.getItem("jwt_token")),
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    allProducts,
    wishlistIds,
    cartItems,
    cartError,
    cartLoaded,
  } = useSelector((state) => state.shop);
  const wishlistProducts = allProducts.filter((product) =>
    wishlistIds.includes(product.id),
  );
  const cartProducts = cartItems
    .map((id) => allProducts.find((product) => product.id === id))
    .filter(Boolean);

  const handlePanelToggle = (panel) => {
    setActivePanel((currentPanel) =>
      currentPanel === panel ? null : panel,
    );
    if (panel === "cart" && auth && !cartLoaded) {
      dispatch(loadCart());
    }
    if (panel === "cart" && !auth) {
      toast.info("Please log in to view your cart.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setAuth(false);
    setActivePanel(null);
    dispatch(clearCart());
    navigate("/");
  };

  return (
   <div className="w-full shadow sticky top-0 z-50 bg-white">
       <nav className="mx-auto flex h-20 max-w-7xl  items-center justify-between px-4 sm:px-6 lg:px-8 ">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="ShopEase home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>

          <div className="hidden sm:block">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Shop
              <span className="text-orange-500">Ease</span>
            </span>

            <p className="-mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Everything you love
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
          >
            Home
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
              Categories
              <ChevronDown
                size={15}
                className="transition-transform group-hover:rotate-180"
              />
            </button>

            {/* Dropdown */}
            <div className="invisible absolute left-1/2 top-full mt-4 max-h-[70vh] w-64 -translate-x-1/2 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <Link
                to="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-500"
              >
                All products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-500"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/new-arrivals"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            New Arrivals
          </Link>

          <Link
            to="/deals"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Deals
          </Link>
        </div>

        {/* Search */}
        <div className="hidden max-w-sm flex-1 px-6 xl:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search products..."
              onChange={(event) => dispatch(setSearchItem(event.target.value))}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search on tablet/mobile */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((isOpen) => !isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:hidden"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
          >
            <Search size={21} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => handlePanelToggle("wishlist")}
            className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex"
            aria-label="Wishlist"
            aria-expanded={activePanel === "wishlist"}
          >
            <Heart size={21} />

            {wishlistProducts.length > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                {wishlistProducts.length}
              </span>
            ) : null}
          </button>
          {/* Cart */}
          <button
            type="button"
            onClick={() => handlePanelToggle("cart")}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/30"
            aria-label="Shopping cart"
            aria-expanded={activePanel === "cart"}
          >
            <ShoppingBag size={21} strokeWidth={2.3} />

            {cartProducts.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-slate-900 px-1 text-[10px] font-bold text-white">
                {cartProducts.length}
              </span>
            ) : null}
          </button>
          {/* Login */}
          {
            !auth ? <Link
            to="/login"
            className=" inline-flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30"
          >
            Login
          </Link>
          :
          <button
            className=" inline-flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30"
            onClick={handleLogout}
          >
            Logout
          </button>
          }

          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {mobileSearchOpen ? (
        <div className="px-4 pb-4 xl:hidden">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              onChange={(event) => dispatch(setSearchItem(event.target.value))}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}

      {activePanel ? (
        <section
          className="absolute right-4 top-full z-50 max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:right-8"
          aria-label={activePanel === "wishlist" ? "Wishlist items" : "Cart"}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {activePanel === "wishlist" ? "Your wishlist" : "Your cart"}
            </h2>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
              aria-label="Close panel"
            >
              Close
            </button>
          </div>
          {activePanel === "cart" && cartError ? (
            <p className="py-4 text-sm text-red-600">
              Could not load your cart. Please close and try again.
            </p>
          ) : activePanel === "cart" && !auth ? (
            <p className="py-4 text-sm text-slate-600">
              Log in to view items in your cart.
            </p>
          ) : activePanel === "wishlist" && wishlistProducts.length === 0 ? (
            <p className="py-4 text-sm text-slate-600">
              Your wishlist is empty. Tap a heart on a product to save it here.
            </p>
          ) : activePanel === "cart" && cartProducts.length === 0 ? (
            <p className="py-4 text-sm text-slate-600">
              Your cart is empty. Add a product to see it here.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {(activePanel === "wishlist"
                ? wishlistProducts
                : cartProducts
              ).map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 py-3"
                >
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="h-12 w-12 rounded-lg bg-slate-50 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {product.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      activePanel === "wishlist"
                        ? dispatch(toggleWishlist(product.id))
                        : dispatch(removeFromCart(product.id))
                    }
                    className="text-xs font-medium text-orange-600 hover:text-orange-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {activePanel === "cart" && cartProducts.length > 0 ? (
            <>
              <p className="mt-3 border-t border-slate-100 pt-3 text-right text-sm font-semibold text-slate-800">
                Total: $
                {cartProducts
                  .reduce(
                    (total, product) =>
                      total +
                      product.price * (1 - product.discountPercentage / 100),
                    0,
                  )
                  .toFixed(2)}
              </p>
              <Link
                to="/cart"
                onClick={() => setActivePanel(null)}
                className="mt-4 flex w-full justify-center rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                View full cart
              </Link>
            </>
          ) : null}
          {activePanel === "wishlist" && wishlistProducts.length > 0 ? (
            <Link
              to="/wishlist"
              onClick={() => setActivePanel(null)}
              className="mt-4 flex w-full justify-center rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              View full wishlist
            </Link>
          ) : null}
        </section>
      ) : null}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-lg lg:hidden">
          {/* Mobile Search */}
          <div className="relative mb-5">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search products..."
              onChange={(event) => dispatch(setSearchItem(event.target.value))}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              className="block rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-500"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileCategoriesOpen((open) => !open)}
              aria-expanded={mobileCategoriesOpen}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Categories
              <ChevronDown
                size={16}
                className={mobileCategoriesOpen ? "rotate-180" : ""}
              />
            </button>
            {mobileCategoriesOpen ? (
              <div className="max-h-64 space-y-1 overflow-y-auto pl-4">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-orange-50"
                >
                  All products
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              to="/new-arrivals"
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              New Arrivals
            </Link>

            <Link
              to="/deals"
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Deals
            </Link>

            <div className="my-3 h-px bg-slate-100" />

            <Link
              to={auth ? "/" : "/login"}
              onClick={auth ? handleLogout : undefined}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <User size={18} />
              {auth ? "Logout" : "Login"}
            </Link>

            <button
              type="button"
              onClick={() => handlePanelToggle("wishlist")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Heart size={18} />
              Wishlist ({wishlistProducts.length})
            </button>
          </div>
        </div>
      )}

   </div>
  );
}

export default Navbar;