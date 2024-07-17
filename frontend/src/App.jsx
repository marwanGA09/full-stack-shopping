// dist/index.html                   1.01 kB │ gzip:  0.49 kB
// dist/assets/index-Bocbjr4O.css    6.63 kB │ gzip:  1.83 kB
// dist/assets/index-CyYnWROF.js   251.13 kB │ gzip: 80.90 kB

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './App.module.css';
import { createContext, lazy, Suspense, useState } from 'react';

// import HomePage from './HomePage';
// import ShoppingPage from './ShoppingPage';
// import ContactPage from './ContactPage';
// import CartPage from './CartPage';
// import DetailProduct from './DetailProduct';
// import Index from './Index';
const HomePage = lazy(() => import('./HomePage'));
const ShoppingPage = lazy(() => import('./ShoppingPage'));
const ContactPage = lazy(() => import('./ContactPage'));
const CartPage = lazy(() => import('./CartPage'));
const DetailProduct = lazy(() => import('./DetailProduct'));
const Index = lazy(() => import('./Index'));

import ErrorPage from './ErrorPage';
import Loading from './Loading';
import AddProduct, { action as addProductAction } from './AddProduct';

const queryClient = new QueryClient();
export const CartContext = createContext();

const route = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HomePage />
      </>
    ),
    children: [
      { index: true, element: <Index /> },
      {
        path: 'shopping',
        element: <ShoppingPage />,
        // loader: ShoppingPageLoader,
      },
      { path: 'shopping/:id', element: <DetailProduct /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'addProduct', element: <AddProduct />, action: addProductAction },
    ],
    errorElement: <ErrorPage />,
  },
]);

function CartContextProvider({ children }) {
  const [productInCart, setProductInCart] = useState([]);

  function handleProductInCart(product) {
    setProductInCart((oldProduct) => {
      const find = oldProduct.find((old) => old.id === product.id);
      if (find) {
        return oldProduct.map((old) =>
          old.id === product.id
            ? { ...old, count: old.count + product.count }
            : old
        );
      } else return [...oldProduct, product];
    });
  }

  return (
    <CartContext.Provider
      value={{
        inCart: productInCart,
        onInCart: handleProductInCart,
        cartSetter: setProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function App() {
  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={route} />
          </Suspense>
        </CartContextProvider>
      </QueryClientProvider>
    </div>
  );
}

// Function to merge items with the same ID
// const mergeItems = (items) => {
//   const mergedItems = {};
//   for (const item of items) {
//     const { id, ...rest } = item; // Destructure excluding count
//     if (mergedItems[id]) {
//       mergedItems[id].count += item.count; // Update count for existing ID
//     } else {
//       mergedItems[id] = { ...rest, count: item.count, id }; // Add new item
//     }
//   }

//   return Object.values(mergedItems);
// };

export default App;
