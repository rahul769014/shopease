import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import Loading from "../loading/Loading";
import {
  addToCart,
  loadCart,
  selectVisibleProducts,
  toggleWishlist,
} from "../../store/shopSlice";

const formatCategoryName = (category) =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ProductListing = ({ mode }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectVisibleProducts);
  const {
    loading,
    error,
    wishlistIds,
    cartItems,
    cartError,
    cartLoaded,
    addingProductId,
  } = useSelector((state) => state.shop);
  const { category } = useParams();

  useEffect(() => {
    if (!cartLoaded) {
      dispatch(loadCart());
    }
  }, [cartLoaded, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  let visibleProducts = products;
  let title = "Products";

  if (mode === "new-arrivals") {
    visibleProducts = [...products].sort((first, second) => second.id - first.id);
    title = "New Arrivals";
  } else if (mode === "deals") {
    visibleProducts = products.filter(
      (product) => product.discountPercentage > 0,
    );
    title = "Deals";
  } else if (category) {
    visibleProducts = products.filter((product) => product.category === category);
    title = formatCategoryName(category);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold capitalize text-slate-900">
        {title}
      </h1>
      {visibleProducts.length === 0 ? (
        <p className="text-center text-slate-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addtoCart={(item) => dispatch(addToCart(item))}
              isInCart={cartItems.includes(product.id)}
              isAddingToCart={addingProductId === product.id}
              isAddDisabled={cartError || addingProductId !== null}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={(productId) =>
                dispatch(toggleWishlist(productId))
              }
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductListing;
