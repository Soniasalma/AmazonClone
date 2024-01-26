import React, { useContext } from 'react';
import { useLoaderData, useRouteError } from 'react-router-dom';

import CatContext from '../../hooks/CatContext';

import { motion } from 'framer-motion';

import ProductCard from './ProductCard';
import { productsData } from '../../api/api';
import Error from '../../pages/Error';

const Products = () => {
  const data = useLoaderData();
  //console.log(data.data);
  const productsData = data.data;

  const { filter, search, changeWishList, setChangeWishList } =
    useContext(CatContext);
  //console.log(changeWishList);
  //console.log(filter);
  //console.log(search);

  let filteredProducts = [];
  if (filter === 'All') {
    if (search) {
      filteredProducts = productsData.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filteredProducts = productsData;
    }
  } else {
    if (search) {
      filteredProducts = productsData.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) &&
          product.category.toLowerCase() === filter.toLowerCase()
      );
    } else {
      filteredProducts = productsData.filter(
        (product) => product.category.toLowerCase() === filter.toLowerCase()
      );
    }
  }
  if (changeWishList) {
    filteredProducts = productsData.filter((product) =>
      product.title.toLowerCase().includes(' ')
    );
    setChangeWishList(false);
  }
  //console.log(filteredProducts);

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="max-w-screen-2xl  mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className=" mx-auto  flex  items-center justify-center gap-4 py-10 z-50 "
        >
          <div
            className="mx-auto  p-4 bg-white flex flex-col items-center rounded-md 
        shadow-lg 
        "
          >
            <h1 className="font-titleFont text-base lg:text-xl font-bold whitespace-nowrap">
              No results found for your search.
            </h1>
            <h3>try again</h3>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Products;
export function loader() {
  return productsData();
}

export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <Error message="Failed to fetch products." status="500" />
    </div>
  );
}
