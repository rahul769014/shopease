import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/productCard/ProductCard";
import {
  addToCart,
  loadCart,
  selectVisibleProducts,
  toggleWishlist,
} from "../store/shopSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectVisibleProducts);
  const {
    loading,
    error,
    wishlistIds,
    cartItems,
    cartError,
    addingProductId,
  } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  if (loading) {
    return <p className="p-8 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="min-h-screen">
      {cartError ? (
        <p className="p-4 text-center text-red-600">
          Your cart could not be loaded. You can still browse products.
        </p>
      ) : null}
      {products.length === 0 ? (
        <h1 className="mt-10 text-center text-3xl">No items found</h1>
      ) : (
        <div className="grid grid-cols-1 place-items-center gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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

export default Dashboard;
