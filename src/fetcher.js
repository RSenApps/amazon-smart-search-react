import React from 'react';
import axios from 'axios';


const get_products = query => {
  const url = "http://localhost:3001/products";
  return axios.get(url)
    .then(response => response.data)
}

const fetch_review_meta = asin => {
  const url = "https://reviewmeta.com/api/amazon/" + asin;
  return axios.get(url)
    .then(response => response.data)
}

export default {
  get_products,
  fetch_review_meta
}