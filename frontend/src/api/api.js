import axios from 'axios';
import { useState } from 'react';

export async function productsData() {
  const products = await axios.get(
    'https://fakestoreapiserver.reactbd.com/amazonproducts'
  );

  return products;
}
export async function getProduct(id) {
  const product = await axios
    .get('https://fakestoreapiserver.reactbd.com/amazonproducts/')
    .then((response) => {
      response.data.filter((prod) => prod.id === id);
    });

  console.log(product);

  return product;
}
