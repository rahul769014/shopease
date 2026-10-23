import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, toggleWishlist } from "../store/shopSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    loading,
    error,
    wishlistIds,
    addingProductId,
    cartItems,
  } = useSelector((state) => state.shop);

  if (loading) {
    return <p className="p-8 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  const wishlistProducts = allProducts.filter((product) =>
    wishlistIds.includes(product.id),
  );
  const total = wishlistProducts.reduce(
    (sum, product) =>
      sum + product.price * (1 - product.discountPercentage / 100),
    0,
  );

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Your wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg text-slate-600">Your wishlist is empty.</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Explore products
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
            {wishlistProducts.map((product) => {
              const discountedPrice =
                product.price * (1 - product.discountPercentage / 100);

              return (
                <article
                  key={product.id}
                  className="flex flex-wrap items-center gap-4 py-5"
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
                  <div className="flex items-center gap-4">
                    {cartItems.includes(product.id) ? (
                      <Link
                        to="/cart"
                        className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                      >
                        Go to cart
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled={addingProductId === product.id}
                        onClick={() => dispatch(addToCart(product))}
                        className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-wait disabled:opacity-60"
                      >
                        {addingProductId === product.id
                          ? "Adding..."
                          : "Add to cart"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleWishlist(product.id))}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Wishlist summary
            </h2>
            <div className="mt-5 flex justify-between text-slate-600">
              <span>Saved items ({wishlistProducts.length})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
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

export default Wishlist;
