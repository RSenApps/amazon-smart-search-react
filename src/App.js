import 'typeface-roboto'
import React, { useState, useEffect } from 'react'
import BasicTable from './Table'
import fetcher from './fetcher'

const App = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetcher.get_products("fake_query")
      .then(data => {
        setProducts(data);
        return data;
      })
      .then(data => {
        data.map((item, index) => {
          fetcher.fetch_review_meta(item.asin)
          .then(meta_result => {
            let new_rating = meta_result.rating;
            let new_count = meta_result.count;
            if (new_rating !== "" && new_count !== "") {
              new_rating = parseFloat(new_rating);
              new_count = parseInt(new_count);
              let product_copy = {...item};
              product_copy.reviews.rating = new_rating;
              product_copy.reviews.total_reviews = new_count;
              setProducts(products => products.map(product => 
                product.asin !== product_copy.asin ? product : product_copy));
            }
          })
        }
        )
      })
  }, [])

  return BasicTable(products);
};



export default App;