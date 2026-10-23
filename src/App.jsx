import { Suspense } from "react";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./components/loading/Loading";
import { routes } from "./routes/routes";
import { fetchProducts } from "./store/shopSlice";
import { store } from "./store/store";

const StoreInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <RouterProvider router={routes} />;
};

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <StoreInitializer />
        </Provider>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default App;