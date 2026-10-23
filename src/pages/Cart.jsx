import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadCart, removeFromCart } from "../store/shopSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    loading,
    error,
    cartItems,
    cartError,
    cartLoaded,
  } = useSelector((state) => state.shop);

  useEffect(() => {
    if (!cartLoaded) {
      dispatch(loadCart());
    }
  }, [cartLoaded, dispatch]);

  if (loading) {
    return <p className="p-8 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  if (cartError) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Your cart</h1>
        <p className="mt-4 text-red-600">
          Your saved cart could not be loaded. Please try again.
        </p>
        <button
          type="button"
          onClick={() => dispatch(loadCart())}
          className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Try again
        </button>
      </main>
    );
  }

  const cartProducts = cartItems
    .map((id) => allProducts.find((product) => product.id === id))
    .filter(Boolean);
  const total = cartProducts.reduce(
    (sum, product) =>
      sum + product.price * (1 - product.discountPercentage / 100),
    0,
  );

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Your cart</h1>

      {cartProducts.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg text-slate-600">Your cart is empty.</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Continue shopping
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
            {cartProducts.map((product) => {
              const discountedPrice =
                product.price * (1 - product.discountPercentage / 100);

              return (
                <article
                  key={product.id}
                  className="flex items-center gap-4 py-5"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-24 w-24 rounded-xl bg-slate-50 object-contain p-2"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm capitalize text-slate-500">
                      {product.category.replaceAll("-", " ")}
                    </p>
                    <h2 className="mt-1 font-semibold text-slate-900">
                      {product.title}
                    </h2>
                    <p className="mt-2 font-bold text-orange-600">
                      ${discountedPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </article>
              );
            })}
          </section>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-5 flex justify-between text-slate-600">
              <span>Items ({cartProducts.length})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Shipping and taxes are calculated at checkout.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex w-full justify-center rounded-lg border border-orange-500 px-4 py-3 font-semibold text-orange-600 hover:bg-orange-50"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
