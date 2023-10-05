/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import { CartIcon } from "./assets/cart";
import CartModal from "./components/cartModal";
import ListingCards from "./components/listingCards";
import Navbar from "./components/navBar";
import { getAllProductStore, productStore, showCountStore } from "./store/productStore";

export interface ProductItems {
  id?: number;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  title?: string;
  thumbnail?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  images?: string[];
  cartCount?: number|any;
}

export interface AllProduct {
  [x: string]: any;
  map?: any;
  id?: number;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  title?: string;
  thumbnail?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  images?: string[];
  cartCount?: number|any;
}
[];

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
};

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, status } = useQuery("users", fetchProducts);


  const { products, addProduct, deleteProduct, updateProduct } = productStore();

  const {storeProduct,getFetchData} = getAllProductStore();

  const { count, addCount } = showCountStore();
  
  const handleAddMoreProduct = (i: number, item: ProductItems) => {
    const add = item.cartCount + 1;
    item.cartCount = add;
    updateProduct(item, i);
  };

  const handleLessProduct = (i: number, item: ProductItems) => {
    if (item.cartCount < 2) {
      console.log('restrict no add product');      
    } else {
      const add = item.cartCount - 1;
      item.cartCount = add;
      updateProduct(item, i);
    }
  };

  const handleCartToggle = () => {
    setShowModal(!showModal);
  };

  const handleAddCart = (item: ProductItems) => {
    item.cartCount = 1;
    addProduct(item);
  };

  const handleDeleteCart = (id: number) => {
    deleteProduct(id);
  };

  useEffect(() => {
    if(data){
      getFetchData(data?.products)
    }
  },[data,status])
  
  return (
    <>
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-1">
          <Navbar />
        </div>

        <main className="px-16 py-16 md:col-span-4">
          <div className="flex justify-end">
            <a
              className="hover:bg-lime-500 hover:text-white hover:transition ease-in duration-1000 border-lime-300 md:border-2 rounded-full py-1 px-4 text-md text-lime-500 font-bold cursor-pointer traking-wider"
              href="/"
            >
              Sign In
            </a>
            <div
              className="hover:bg-lime-500 relative flex justify-center items-center gap-1 hover:text-white hover:transition ease-in duration-1000 border-lime-300 md:border-2 rounded-full py-1 px-4 text-md text-lime-500 font-bold cursor-pointer traking-wider ml-3"
              onClick={() => handleCartToggle()}
            >
              <span>
                <CartIcon />
              </span>
              <span>Cart</span>
              {products?.length > 0 && (
                <div className="absolute -top-6 right-1 bg-lime-500 py-1 px-3 z-0 text-md text-white rounded-full">
                  <h3>{products?.length}</h3>
                </div>
              )}
            </div>
          </div>
          {status === "error" && <p className="text-red-600 text-xl font-serif">Error fetching data</p>}
          {status === "loading" && <p className="text-lime-600 text-xl font-serif">Your products Fetching...</p>}
          {status === "success" && (
            <>
              <header>
                <h2 className="font-serif text-gray-500 text-3xl">Recipes</h2>
                <h3 className="font-serif text-gray-500 text-sm mt-6">
                  For Electronic shop world
                </h3>
              </header>

              <div>
                <h1 className="font-bold mt-12 pb-4 text-gray-500 font-mono">
                  Last Recipes
                </h1>

                <div className="grid md:grid-cols-2 gap-10 lg:grid-cols-3 gap-10 mb-10">
                  {storeProduct?.slice(0, count)?.map((list: AllProduct) => (
                    <ListingCards
                      products={list}
                      handleAddCart={handleAddCart}
                      key={list?.id}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="animate-bounce text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => addCount(3)}
                  >
                    Load More
                  </button>
                </div>
                <CartModal
                  products={products}
                  showModal={showModal}
                  handleDeleteCart={handleDeleteCart}
                  setShowModal={handleCartToggle}
                  handleAddMoreProduct={handleAddMoreProduct}
                  handleLessProduct={handleLessProduct}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;

