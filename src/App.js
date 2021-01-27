import 'typeface-roboto'
import React, { useState, useEffect } from 'react'
import BasicTable from './Table'
import fetcher from './fetcher'
import MyScatter from './Scatter'
import Webframe from './Webframe'

const App = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    fetcher.get_products("fake_query")
      .then(data => {
        setProducts(data);
        return data;
      })
    // .then(data => {
    //   Promise.all([
    //     data.map((item, index) => {
    //       fetcher.fetch_review_meta(item.asin)
    //         .then(meta_result => {
    //           let new_rating = meta_result.rating;
    //           let new_count = meta_result.count;
    //           if (new_rating !== "" && new_count !== "") {
    //             new_rating = parseFloat(new_rating);
    //             new_count = parseInt(new_count);
    //             let product_copy = { ...item };
    //             product_copy.rating = new_rating;
    //             product_copy.reviews = new_count;
    //             setProducts(products => products.map(product =>
    //               product.asin !== product_copy.asin ? product : product_copy));
    //           }
    //         })
    //     })
    //   ])
    // })
  }, [])

  return (
    <div style = {{ width: "100%", height:"100%"}}>
      <div style={{ float: "left", width:"50%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-block" }}>
            {MyScatter(products, "price", "rating", "Price", "Rating")}
          </div>
          <div style={{ display: "inline-block"}}>
            {MyScatter(products, "rating", "reviews", "Rating", "Reviews")}
          </div>
        </div>
        {BasicTable(products, selected, setSelected)}
      </div>
      <div style={{ float: "right", width:"50%", height:"100%"}}>
        {Webframe("https://www.amazon.com/dp/" + selected[0])}
      </div>
    </div>

  )
};

export default App;